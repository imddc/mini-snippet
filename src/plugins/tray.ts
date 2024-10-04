import { Menu } from '@tauri-apps/api/menu'
import { TrayIcon } from '@tauri-apps/api/tray'

function onQuit() {
}

function onShow() {}

function onHide() {}

let tray: TrayIcon | null = null

export async function setupSystemTray() {
  if (tray !== null) {
    return
  }

  const menu = await Menu.new({
    items: [
      {
        id: 'quit',
        text: 'Quit',
        action: onQuit,
      },
      {
        id: 'show',
        text: 'Show',
        action: onShow,
      },
      {
        id: 'hide',
        text: 'Hide',
        action: onHide,
      },
    ],
  })

  tray = await TrayIcon.new({ tooltip: 'awesome code' })

  tray.setTitle('code')
  tray.setIcon('icon.png')
  tray.setMenu(menu)
  tray.setVisible(true)
  tray.setIconAsTemplate(true)
}
