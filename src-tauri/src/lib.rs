// mod tray;
mod command;

#[tauri::command]
fn paste_mock() -> () {
    println!("paste_mock");
    command::switch_window();
    command::paste();
}

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_autostart::init(
            tauri_plugin_autostart::MacosLauncher::LaunchAgent,
            Some(vec!["--flag1", "--flag2"]),
        ))
        .plugin(tauri_plugin_store::Builder::new().build())
        .plugin(tauri_plugin_clipboard_manager::init())
        .plugin(tauri_plugin_global_shortcut::Builder::new().build())
        .plugin(tauri_plugin_dialog::init())
        // .setup(|app| {
        //     #[cfg(all(desktop))]
        //     {
        //         // let handle = app.handle();
        //         // tray::create_tray(handle)?;
        //     }
        //     Ok(())
        // })
        .invoke_handler(tauri::generate_handler![greet, paste_mock])
        .run(tauri::generate_context!())
        .expect("error while running tauri application")
}
