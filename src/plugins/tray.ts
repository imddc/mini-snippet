import { Menu } from '@tauri-apps/api/menu'
import { TrayIcon } from '@tauri-apps/api/tray'

function onQuit() {}

function onShow() {
  console.log('show')
}

function onHide() {
  console.log('hide')
}

let tray: TrayIcon | null = null

export async function setupSystemTray() {
  console.log('setup system tray')
  if (tray !== null) {
    return
  }

  const menu = await Menu.new({
    items: [
      {
        id: 'quit',
        text: 'Quit11',
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

  tray = await TrayIcon.new({
    tooltip: 'mini-snippet',
  })

  await tray.setIcon('./icons/icon.png')
  await tray.setMenu(menu)
  await tray.setVisible(true)
  await tray.setIconAsTemplate(true)
}
