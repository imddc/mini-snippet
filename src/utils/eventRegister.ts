/*
 * @Author: imddc easyhoo2426@163.com
 * @Date: 2024-10-05 19:50:04
 * @LastEditors: imddc easyhoo2426@163.com
 * @LastEditTime: 2024-10-16 16:33:56
 * @Description:
 */
import { Events } from '@/constants/eventEnums'
import { WindowLabel } from '@/constants/windowEnums'
import { useWindowStoreWithOut } from '@/store/windowStore'
import { emitEvent, useEvent } from '@/utils/eventHandler'
import { initKeyMaps } from '@/utils/keyMapsRegister'
import { useTauriStore } from '@/utils/tauriStore'
import { getWindow } from '@/utils/window'
import { PhysicalSize } from '@tauri-apps/api/dpi'
import { WebviewWindow } from '@tauri-apps/api/webviewWindow'

const windowStore = useWindowStoreWithOut()

export async function registerEvents() {
  const mainWindow = await getWindow(WindowLabel.MAIN)

  mainWindow?.onFocusChanged(({ payload }) => {
    if (!payload) {
      setTimeout(() => {
        emitEvent(Events.CLOSE_MAIN_WINDOW)
      })
    }
    else {
      emitEvent(Events.OPEN_MAIN_WINDOW)
    }
  })

  mainWindow?.listen('tauri://close-requested', async () => {
    await useTauriStore().save()
  })

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

    webviewWindow.once('tauri://created', () => {
    })
  })

  // 主窗口
  useEvent(Events.OPEN_MAIN_WINDOW, async () => {
    if (!mainWindow) {
      return
    }
    await mainWindow.show()

    emitEvent(Events.MAIN_WINDOW_FOCUS)
  })

  useEvent(Events.CLOSE_MAIN_WINDOW, async () => {
    if (mainWindow) {
      await mainWindow.hide()
      windowStore.isMainWindowShow = false
    }
  })

  useEvent(Events.TOGGLE_MAIN_WINDOW, async () => {
    emitEvent(windowStore.isMainWindowShow ? Events.CLOSE_MAIN_WINDOW : Events.OPEN_MAIN_WINDOW)
  })

  useEvent(Events.MAIN_WINDOW_FOCUS, async () => {
    if (!mainWindow) {
      return
    }

    await mainWindow.setFocus()
    windowStore.isMainWindowShow = true
  })

  useEvent(Events.CHANGE_MAIN_WINDOW_HEIGHT, async (listLength: number) => {
    if (mainWindow) {
      const height = (listLength * 60) + (listLength ? 10 : 0) + 72
      await mainWindow.setSize(new PhysicalSize(600, height))
    }
  })

  // 内容窗口
  useEvent(Events.OPEN_CONTENT_WINDOW, async () => {
    const contentWindow = await getWindow(WindowLabel.CONTENT)
    if (!contentWindow) {
      return
    }
    contentWindow.show()
    windowStore.isContentWindowShow = true

    emitEvent(Events.CLOSE_MAIN_WINDOW)
  })

  useEvent(Events.CLOSE_CONTENT_WINDOW, async () => {
    const contentWindow = await getWindow(WindowLabel.CONTENT)
    if (contentWindow) {
      contentWindow.hide()
      windowStore.isContentWindowShow = false
    }
  })

  // 监听快捷键更新
  useEvent(Events.SHORTCUT_UPDATE, () => {
    initKeyMaps()
  })
}
