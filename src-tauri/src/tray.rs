use tauri::{
    menu::{Menu, MenuItem},
    tray::{MouseButton, TrayIconBuilder, TrayIconEvent},
    Emitter, Runtime,
};

pub fn create_tray<R: Runtime>(app: &tauri::AppHandle<R>) -> tauri::Result<()> {
    let quit_i = MenuItem::with_id(app, "quit", "Quit", true, Some("icon.png"))?; // 修改图标路径
    let show_i = MenuItem::with_id(app, "show", "Show", true, Some("icon.png"))?; // 修改图标路径
    let hide_i = MenuItem::with_id(app, "hide", "Hide", true, Some("icon.png"))?; // 修改图标路径
    let menu = Menu::with_items(app, &[&quit_i, &show_i, &hide_i])?;

    let _ = TrayIconBuilder::with_id("tray")
        .tooltip("tauri")
        .icon(app.default_window_icon().unwrap().clone())
        .icon_as_template(true)
        .menu(&menu)
        .on_menu_event(|app, event| match event.id.as_ref() {
            "quit" => {
                println!("quit menu item clicked");
                // app.exit(0);
            }
            "show" => {
                println!("show menu item clicked");
                app.show().unwrap();
            }
            "hide" => {
                println!("hide menu item clicked");
                app.hide().unwrap();
            }
            _ => {
                println!("menu item not handle");
            }
        })
        .on_tray_icon_event(|tray, event| match event {
            TrayIconEvent::Click {
                id: _,
                position,
                rect: _,
                button,
                button_state: _,
            } => match button {
                MouseButton::Left {} => {
                    // ...
                }
                MouseButton::Right {} => {
                    tray.app_handle()
                        .emit("tray_contextmenu", position)
                        .unwrap();
                }
                _ => {}
            },
            TrayIconEvent::Enter {
                id: _,
                position,
                rect: _,
            } => {
                tray.app_handle().emit("tray_mouseenter", position).unwrap();
            }
            TrayIconEvent::Leave {
                id: _,
                position,
                rect: _,
            } => {
                // sleep(Duration::from_millis(500));
                tray.app_handle().emit("tray_mouseleave", position).unwrap();
            }
            _ => {}
        })
        .build(app);
    Ok(())
}
