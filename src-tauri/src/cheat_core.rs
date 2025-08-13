use std::sync::{Arc, Mutex};
use std::thread;
use std::time::Duration;
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct CheatConfig {
    pub game_id: String,
    pub cheat_id: String,
    pub offsets: Vec<u64>,
    pub value_type: String,
    pub size: u32,
    pub is_enabled: bool,
    pub current_value: Option<serde_json::Value>,
}

pub struct MemoryManager {
    active_cheats: Arc<Mutex<Vec<CheatConfig>>>,
    loop_thread: Option<thread::JoinHandle<()>>,
    should_stop: Arc<Mutex<bool>>,
    is_attached: bool,
}

impl MemoryManager {
    pub fn new() -> Self {
        Self {
            active_cheats: Arc::new(Mutex::new(Vec::new())),
            loop_thread: None,
            should_stop: Arc::new(Mutex::new(false)),
            is_attached: false,
        }
    }

    pub fn attach_to_process(&mut self, process_name: &str) -> Result<(), String> {
        // Simulated process attachment for now
        println!("Attempting to attach to process: {}", process_name);
        
        // In a real implementation, this would:
        // 1. Find the process by name
        // 2. Open a handle to the process
        // 3. Get the module base address
        
        self.is_attached = true;
        println!("Successfully attached to process: {} (simulated)", process_name);
        Ok(())
    }

    pub fn add_cheat(&self, cheat: CheatConfig) -> Result<(), String> {
        if !self.is_attached {
            return Err("Not attached to any process".to_string());
        }

        let mut cheats = self.active_cheats.lock().unwrap();
        cheats.push(cheat);
        println!("Added cheat to active list");
        Ok(())
    }

    pub fn remove_cheat(&self, cheat_id: &str) -> Result<(), String> {
        let mut cheats = self.active_cheats.lock().unwrap();
        cheats.retain(|cheat| cheat.cheat_id != cheat_id);
        println!("Removed cheat: {}", cheat_id);
        Ok(())
    }

    pub fn start_cheat_loop(&mut self) -> Result<(), String> {
        if !self.is_attached {
            return Err("Not attached to any process".to_string());
        }

        // Stop any existing loop
        self.stop_cheat_loop()?;

        let active_cheats = Arc::clone(&self.active_cheats);
        let should_stop = Arc::clone(&self.should_stop);
        
        // Reset stop flag
        *should_stop.lock().unwrap() = false;

        let handle = thread::spawn(move || {
            println!("🚀 Starting cheat loop thread...");
            
            loop {
                // Check if we should stop
                if *should_stop.lock().unwrap() {
                    println!("🛑 Stopping cheat loop thread");
                    break;
                }

                // Apply all active cheats
                let cheats = active_cheats.lock().unwrap();
                for cheat in cheats.iter() {
                    if cheat.is_enabled {
                        println!("🎯 Applying cheat: {} (type: {}, value: {:?})", 
                                cheat.cheat_id, cheat.value_type, cheat.current_value);
                        
                        // In a real implementation, this would:
                        // 1. Resolve the pointer chain
                        // 2. Write the value to memory
                        // 3. Handle errors gracefully
                    }
                }

                // Sleep for a short interval (e.g., 100ms)
                thread::sleep(Duration::from_millis(100));
            }
        });

        self.loop_thread = Some(handle);
        println!("✅ Cheat loop started successfully");
        Ok(())
    }

    pub fn stop_cheat_loop(&mut self) -> Result<(), String> {
        // Signal the thread to stop
        *self.should_stop.lock().unwrap() = true;

        // Wait for the thread to finish
        if let Some(handle) = self.loop_thread.take() {
            match handle.join() {
                Ok(_) => println!("✅ Cheat loop stopped successfully"),
                Err(_) => println!("⚠️ Error stopping cheat loop thread"),
            }
        }

        Ok(())
    }

    pub fn apply_cheat(&self, cheat: &CheatConfig) -> Result<(), String> {
        if !self.is_attached {
            return Err("Not attached to any process".to_string());
        }

        println!("🎯 Applying cheat: {} to offsets {:?}", cheat.cheat_id, cheat.offsets);
        
        // In a real implementation, this would:
        // 1. Resolve the pointer chain using the offsets
        // 2. Write the value to the final memory address
        // 3. Handle different value types (bool, int, float)
        
        match cheat.value_type.as_str() {
            "bool" => {
                let value = cheat.current_value
                    .as_ref()
                    .and_then(|v| v.as_bool())
                    .unwrap_or(false);
                println!("Set bool value: {} at memory address", value);
            }
            "int" => {
                let value = cheat.current_value
                    .as_ref()
                    .and_then(|v| v.as_u64())
                    .unwrap_or(0) as i32;
                println!("Set int value: {} at memory address", value);
            }
            "float" => {
                let value = cheat.current_value
                    .as_ref()
                    .and_then(|v| v.as_f64())
                    .unwrap_or(0.0) as f32;
                println!("Set float value: {} at memory address", value);
            }
            _ => return Err(format!("Unsupported value type: {}", cheat.value_type)),
        }

        Ok(())
    }

    pub fn is_attached(&self) -> bool {
        self.is_attached
    }

    pub fn get_active_cheats(&self) -> Vec<CheatConfig> {
        self.active_cheats.lock().unwrap().clone()
    }

    pub fn cleanup(&mut self) {
        self.stop_cheat_loop().ok();
        self.is_attached = false;
        println!("🧹 Memory manager cleaned up");
    }
}

impl Drop for MemoryManager {
    fn drop(&mut self) {
        self.cleanup();
    }
}
