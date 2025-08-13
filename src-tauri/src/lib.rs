use tauri::Manager;
use serde::{Deserialize, Serialize};
use std::fs;
use std::path::Path;
use std::collections::HashSet;
use winreg::enums::*;
use winreg::RegKey;
use std::sync::Mutex;

mod cheat_core;
use cheat_core::{MemoryManager, CheatConfig};

// Global state for memory management
struct AppState {
    memory_manager: Mutex<MemoryManager>,
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  let app_state = AppState {
    memory_manager: Mutex::new(MemoryManager::new()),
  };

  tauri::Builder::default()
    .manage(app_state)
    .setup(|app| {
      if cfg!(debug_assertions) {
        app.handle().plugin(
          tauri_plugin_log::Builder::default()
            .level(log::LevelFilter::Info)
            .build(),
        )?;
      }

      // Create system tray
      use tauri::{
        menu::{Menu, MenuItem},
        tray::TrayIconBuilder,
      };

      let quit_i = MenuItem::with_id(app, "quit", "Quit", true, None::<&str>)?;
      let show_i = MenuItem::with_id(app, "show", "Show TModWorks", true, None::<&str>)?;
      let menu = Menu::with_items(app, &[&show_i, &quit_i])?;

             let _tray = TrayIconBuilder::new()
         .icon(app.default_window_icon().unwrap().clone())
         .menu(&menu)
         .show_menu_on_left_click(false) // Don't show menu on left click
         .on_menu_event(|app, event| match event.id.as_ref() {
           "show" => {
             if let Some(window) = app.get_webview_window("main") {
               let _ = window.show();
               let _ = window.set_focus();
             }
           }
           "quit" => {
             app.exit(0);
           }
           _ => {
            println!("menu item {:?} not handled", event.id);
           }
         })
         .on_tray_icon_event(|tray, event| {
           use tauri::tray::{MouseButton, MouseButtonState, TrayIconEvent};
           
           match event {
                           TrayIconEvent::Click {
                button: MouseButton::Left,
                button_state: MouseButtonState::Up,
                ..
              } => {
                // Show window and bring to focus on left click
                let app = tray.app_handle();
                if let Some(window) = app.get_webview_window("main") {
                  if !window.is_visible().unwrap() {
                    let _ = window.show();
                  }
                  let _ = window.set_focus();
                }
              }
             _ => {
               // Right click will show the menu automatically
               println!("unhandled tray event {event:?}");
             }
           }
         })
        .build(app)?;

      Ok(())
    })
    .on_window_event(|app, event| match event {
      tauri::WindowEvent::CloseRequested { api, .. } => {
        // Prevent the window from closing, hide it instead
        api.prevent_close();
        app.get_webview_window("main").unwrap().hide().unwrap();
      }
      _ => {}
    })
    .invoke_handler(tauri::generate_handler![
      minimize_window,
      maximize_window,
      hide_window,
      quit_app,
      scan_steam_games,
      attach_to_game,
      apply_cheat,
      start_cheat_loop,
      stop_cheat_loop,
      add_cheat,
      remove_cheat
    ])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

#[tauri::command]
async fn minimize_window(window: tauri::Window) {
  window.minimize().unwrap();
}

#[tauri::command]
async fn maximize_window(window: tauri::Window) {
  if window.is_maximized().unwrap() {
    window.unmaximize().unwrap();
  } else {
    window.maximize().unwrap();
  }
}

#[tauri::command]
async fn hide_window(window: tauri::Window) {
  window.hide().unwrap();
}

#[tauri::command]
async fn quit_app() {
  std::process::exit(0);
}
// Finding installed games logic
#[derive(Debug, Serialize, Deserialize)]
struct SteamGame {
    app_id: String,
    name: String,
}

#[derive(Debug)]
struct AcfGameInfo {
    app_id: String,
    name: String,
}

#[tauri::command]
async fn scan_steam_games() -> Result<Vec<SteamGame>, String> {
    let mut games = Vec::new();
    let mut found_app_ids = HashSet::new(); // To avoid duplicates
    
    // Get Steam installation path from Windows Registry
    let steam_path = get_steam_path()?;
    
    // Get all Steam library paths
    let steam_libraries = get_steam_libraries(&steam_path)?;
    
    // Scan each Steam library
    for library_path in steam_libraries {
        let steamapps_path = Path::new(&library_path).join("steamapps");
        
        if !steamapps_path.exists() {
            continue;
        }
        
        // Scan all .acf files in this steamapps directory
        if let Ok(entries) = fs::read_dir(steamapps_path) {
            for entry in entries {
                if let Ok(entry) = entry {
                    let path = entry.path();
                    
                    // Check if it's an ACF file
                    if path.extension().and_then(|s| s.to_str()) == Some("acf") {
                        if let Ok(content) = fs::read_to_string(&path) {
                            if let Some(game_info) = parse_acf_file(&content) {
                                                            // Only add if we haven't seen this app_id before and it's not a system component
                            if found_app_ids.insert(game_info.app_id.clone()) {
                                // Filter out system components and non-games
                                if !is_system_component(&game_info.name) {
                                    games.push(SteamGame {
                                        app_id: game_info.app_id,
                                        name: game_info.name,
                                    });
                                }
                            }
                            }
                        }
                    }
                }
            }
        }
    }
    
    Ok(games)
}

fn get_steam_path() -> Result<String, String> {
    let hklm = RegKey::predef(HKEY_LOCAL_MACHINE);
    
    // Try 64-bit registry first, then 32-bit
    let steam_key = hklm.open_subkey("SOFTWARE\\WOW6432Node\\Valve\\Steam")
        .or_else(|_| hklm.open_subkey("SOFTWARE\\Valve\\Steam"))
        .map_err(|_| "Steam registry key not found".to_string())?;
    
    let install_path: String = steam_key.get_value("InstallPath")
        .map_err(|_| "Steam install path not found".to_string())?;
    
    Ok(install_path)
}

fn get_steam_libraries(steam_path: &str) -> Result<Vec<String>, String> {
    let mut libraries = Vec::new();
    
    // Add the main Steam installation directory
    libraries.push(steam_path.to_string());
    
    // Read libraryfolders.vdf to find additional library locations
    let libraryfolders_path = Path::new(steam_path).join("steamapps").join("libraryfolders.vdf");
    
    if let Ok(content) = fs::read_to_string(libraryfolders_path) {
        // Parse libraryfolders.vdf to find additional Steam libraries
        for line in content.lines() {
            let line = line.trim();
            if line.starts_with("\"path\"") {
                if let Some(path) = line.split('"').nth(3) {
                    // Clean up the path (remove quotes and escape sequences)
                    let clean_path = path.replace("\\\\", "\\");
                    if !libraries.contains(&clean_path) {
                        libraries.push(clean_path);
                    }
                }
            }
        }
    }
    
    // Also scan common drive letters for Steam library folders
    let common_drives = vec!["C:", "D:", "E:", "F:", "G:", "H:", "I:", "J:", "K:", "L:", "M:", "N:", "O:", "P:"];
    let common_paths = vec!["Steam", "SteamLibrary", "Games\\Steam", "Program Files (x86)\\Steam"];
    
    for drive in common_drives {
        for path_suffix in &common_paths {
            let potential_path = format!("{}\\{}", drive, path_suffix);
            let steamapps_path = Path::new(&potential_path).join("steamapps");
            
            if steamapps_path.exists() && !libraries.contains(&potential_path) {
                libraries.push(potential_path);
            }
        }
    }
    
    Ok(libraries)
}

fn parse_acf_file(content: &str) -> Option<AcfGameInfo> {
    let mut app_id = None;
    let mut name = None;
    
    for line in content.lines() {
        let line = line.trim();
        
        if line.starts_with("\"appid\"") {
            app_id = line.split('"').nth(3).map(|s| s.to_string());
        } else if line.starts_with("\"name\"") {
            name = line.split('"').nth(3).map(|s| s.to_string());
        }
    }
    
    if let (Some(app_id), Some(name)) = (app_id, name) {
        Some(AcfGameInfo { app_id, name })
    } else {
        None
    }
}

fn is_system_component(name: &str) -> bool {
    let system_components = vec![
        "Steamworks Common Redistributables",
        "Steam Client Bootstrapper",
        "Steam",
        "SteamVR",
        "SteamVR Performance Test",
        "Steam Controller Config",
        "Steam Input",
        "Steam Link",
        "Steam Remote Play",
        "Steam Trading Card Bot",
        "Steam Workshop",
        "Steam Family Sharing",
        "Steam Cloud",
        "Steam Overlay",
        "Steam Screenshots",
        "Steam Broadcasting",
        "Steam Music",
        "Steam Video",
        "Steam Chat",
        "Steam Friends",
        "Steam Groups",
        "Steam Market",
        "Steam Inventory",
        "Steam Trading",
        "Steam Gifts",
        "Steam Curators",
        "Steam Reviews",
        "Steam Guides",
        "Steam Screenshots",
        "Steam Artwork",
        "Steam Backgrounds",
        "Steam Emoticons",
        "Steam Trading Cards",
        "Steam Badges",
        "Steam Profile",
        "Steam Level",
        "Steam XP",
        "Steam Achievements",
        "Steam Leaderboards",
        "Steam Statistics",
        "Steam Cloud Saves",
        "Steam Sync",
        "Steam Backup",
        "Steam Restore",
        "Steam Verify",
        "Steam Defrag",
        "Steam Optimize",
        "Steam Clean",
        "Steam Repair",
        "Steam Update",
        "Steam Download",
        "Steam Install",
        "Steam Uninstall",
        "Steam Move",
        "Steam Copy",
        "Steam Backup",
        "Steam Restore",
        "Steam Verify",
        "Steam Defrag",
        "Steam Optimize",
        "Steam Clean",
        "Steam Repair",
        "Steam Update",
        "Steam Download",
        "Steam Install",
        "Steam Uninstall",
        "Steam Move",
        "Steam Copy",
    ];
    
    system_components.iter().any(|component| {
        name.to_lowercase().contains(&component.to_lowercase())
    })
}

// Memory manipulation commands
#[tauri::command]
async fn attach_to_game(
    state: tauri::State<'_, AppState>,
    process_name: String,
) -> Result<(), String> {
    let mut memory_manager = state.memory_manager.lock().unwrap();
    memory_manager.attach_to_process(&process_name)
}

#[tauri::command]
async fn apply_cheat(
    state: tauri::State<'_, AppState>,
    cheat_config: CheatConfig,
) -> Result<(), String> {
    let memory_manager = state.memory_manager.lock().unwrap();
    memory_manager.apply_cheat(&cheat_config)
}

#[tauri::command]
async fn start_cheat_loop(
    state: tauri::State<'_, AppState>,
) -> Result<(), String> {
    let mut memory_manager = state.memory_manager.lock().unwrap();
    memory_manager.start_cheat_loop()
}

#[tauri::command]
async fn stop_cheat_loop(
    state: tauri::State<'_, AppState>,
) -> Result<(), String> {
    let mut memory_manager = state.memory_manager.lock().unwrap();
    memory_manager.stop_cheat_loop()
}

#[tauri::command]
async fn add_cheat(
    state: tauri::State<'_, AppState>,
    cheat_config: CheatConfig,
) -> Result<(), String> {
    let memory_manager = state.memory_manager.lock().unwrap();
    memory_manager.add_cheat(cheat_config)
}

#[tauri::command]
async fn remove_cheat(
    state: tauri::State<'_, AppState>,
    cheat_id: String,
) -> Result<(), String> {
    let memory_manager = state.memory_manager.lock().unwrap();
    memory_manager.remove_cheat(&cheat_id)
}

// End of finding installed games logic
