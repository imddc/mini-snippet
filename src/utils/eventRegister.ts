import { Events } from '@/constants/eventEnums'
import { WindowLabel } from '@/constants/windowEnums'
import { useContentWindowStoreWithOut } from '@/store/contentWindowStore'
import { useMainWindowStoreWithOut } from '@/store/mainWindowStore'
import { emitEvent, useEvent } from '@/utils/eventHandler'
import { getWindow } from '@/utils/window'
import { WebviewWindow } from '@tauri-apps/api/webviewWindow'

const mainWindowStore = useMainWindowStoreWithOut()
const contentWindowStore = useContentWindowStoreWithOut()

export function registerEvents() {
  useEvent(Events.OPEN_CONTENT_WINDOW, async () => {
    const webviewWindow = new WebviewWindow(WindowLabel.CONTENT, {
      url: 'content',
      width: 1000,
      height: 600,
      closable: true,
      decorations: false,
      transparent: true,
      resizable: false,
      alwaysOnTop: true,
      center: true,
      shadow: false,
    })

    webviewWindow.once('tauri://created', () => { })
  })

  // 主窗口
  useEvent(Events.OPEN_MAIN_WINDOW, async () => {
    const mainWindow = await getWindow(WindowLabel.MAIN)
    if (!mainWindow) {
      return
    }

    mainWindow.show()
    mainWindow.setFocus()
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

  // 内容窗口
  useEvent(Events.OPEN_CONTENT_WINDOW, async () => {
    const contentWindow = await getWindow(WindowLabel.CONTENT)
    contentWindow && contentWindow.show()
    contentWindowStore.isShow = true
  })

  useEvent(Events.CLOSE_CONTENT_WINDOW, async () => {
    const contentWindow = await getWindow(WindowLabel.CONTENT)
    contentWindow && contentWindow.close()
    contentWindowStore.isShow = false
  })
}
