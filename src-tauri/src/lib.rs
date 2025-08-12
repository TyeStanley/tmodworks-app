use tauri::Manager;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  tauri::Builder::default()
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
      quit_app
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
