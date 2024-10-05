import type { ShortcutEvent } from '@tauri-apps/plugin-global-shortcut'
import { register, unregister } from '@tauri-apps/plugin-global-shortcut'
import { Events } from '~/constants/eventEnums'
import { emitEvent } from '~/utils/eventHandler'

const keyMaps: Record<string, Events> = {
  'alt+space': Events.TOGGLE_MAIN_WINDOW,
}

// 便于处理开发环境下注册快捷键
async function registerShortcuts(shortcuts: string | string[], callback: (e: ShortcutEvent) => void) {
  if (typeof shortcuts === 'string') {
    shortcuts = [shortcuts]
  }
  for (const shortcut of shortcuts) {
    await unregister(shortcut)
    await register(shortcut, (e) => {
      e.state === 'Pressed' && callback(e)
    })
  }
}

export async function initKeyMaps() {
  if (typeof window === 'undefined') {
    return
  }

  // 注册快捷键
  for (const key in keyMaps) {
    registerShortcuts(key, () => {
      emitEvent(keyMaps[key])
    })
  }
}
