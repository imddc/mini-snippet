import { Menu } from '@tauri-apps/api/menu'
import { TrayIcon } from '@tauri-apps/api/tray'

export async function setupSystemTray() {
  const menu = await Menu.new({
    items: [
      {
        id: 'quit',
        text: 'Quit',
      },
    ],
  })

  const options = {
    menu,
    menuOnLeftClick: true,
  }

  const tray = await TrayIcon.new(options)

  tray.setTooltip('new tooltip')
}
