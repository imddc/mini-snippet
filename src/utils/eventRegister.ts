import { Events } from '@/constants/eventEnums'
import { WindowLabel } from '@/constants/windowEnums'
import { useMainWindowStoreWithOut } from '@/store/mainWindowStore'
import { emitEvent, useEvent } from '@/utils/eventHandler'
import { getWindow } from '@/utils/window'
import { WebviewWindow } from '@tauri-apps/api/webviewWindow'

const mainWindowStore = useMainWindowStoreWithOut()

export function registerEvents() {
  useEvent(Events.OPEN_CONTENT_WINDOW, async () => {
    const webviewWindow = new WebviewWindow(WindowLabel.CONTENT, {
      url: 'content',
      x: 0,
      y: 0,
      width: 800,
      height: 600,
    })

    webviewWindow.once('tauri://created', () => {
      emitEvent(Events.CLOSE_MAIN_WINDOW)
    })
  })

  useEvent(Events.OPEN_MAIN_WINDOW, async () => {
    const mainWindow = await getWindow(WindowLabel.MAIN)
    mainWindow && mainWindow.show()
    mainWindowStore.isShow = true
  })

  useEvent(Events.CLOSE_MAIN_WINDOW, async () => {
    const mainWindow = await getWindow(WindowLabel.MAIN)
    mainWindow && mainWindow.hide()
    mainWindowStore.isShow = false
  })

  useEvent(Events.TOGGLE_MAIN_WINDOW, async () => {
    emitEvent(mainWindowStore.isShow ? Events.CLOSE_MAIN_WINDOW : Events.OPEN_MAIN_WINDOW)
  })
}
