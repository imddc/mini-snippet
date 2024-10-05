import { WebviewWindow } from '@tauri-apps/api/webviewWindow'
import { Events } from '~/constants/eventEnums'
import { WindowLabel } from '~/constants/windowEnums'
import { useEvent } from '~/utils/eventHandler'
import { getWindow } from '~/utils/window'

let isMainWindowShow = true

export function registerEvents() {
  useEvent(Events.OPEN_CONTENT_WINDOW, async () => {
    const mainWindow = await getWindow(WindowLabel.MAIN)

    const webviewWindow = new WebviewWindow(WindowLabel.CONTENT, {
      url: 'content',
      x: 0,
      y: 0,
      width: 800,
      height: 600,
    })

    webviewWindow.once('tauri://created', () => {
      mainWindow?.hide()
    })
  })

  useEvent(Events.OPEN_MAIN_WINDOW, async () => {
    const mainWindow = await getWindow(WindowLabel.MAIN)
    mainWindow && mainWindow.show()
  })

  useEvent(Events.CLOSE_MAIN_WINDOW, async () => {
    const mainWindow = await getWindow(WindowLabel.MAIN)
    mainWindow && mainWindow.close()
  })

  useEvent(Events.TOGGLE_MAIN_WINDOW, async () => {
    const mainWindow = await getWindow(WindowLabel.MAIN)
    if (!mainWindow) {
      return
    }
    isMainWindowShow ? mainWindow.hide() : mainWindow.show()
    isMainWindowShow = !isMainWindowShow
  })
}
