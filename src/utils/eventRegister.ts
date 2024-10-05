import { WebviewWindow } from '@tauri-apps/api/webviewWindow'
import { getAllWindows, getCurrentWindow } from '@tauri-apps/api/window'
import { Events } from '~/constants/eventEnums'
import { WindowLabel } from '~/constants/windowEnums'
import { useEvent } from '~/utils/eventHandler'

export function registerEvents() {
  useEvent(Events.OPEN_CONTENT_WINDOW, () => {
    const currentWindow = getCurrentWindow()

    const webviewWindow = new WebviewWindow(WindowLabel.CONTENT, {
      url: 'content',
      x: 0,
      y: 0,
      width: 800,
      height: 600,
    })

    webviewWindow.once('tauri://created', () => {
      currentWindow.hide()
    })
  })

  useEvent(Events.OPEN_MAIN_WINDOW, async () => {
    const allWindows = await getAllWindows()
    const mainWindow = allWindows.find(window => window.label === WindowLabel.MAIN)
    if (!mainWindow) {
      return
    }

    const isClosable = await mainWindow.isClosable()

    if (isClosable) {
      mainWindow.show()
      mainWindow.setFocus()
    }
    else {
      mainWindow.setClosable(true)
      mainWindow.show()
    }
  })
}
