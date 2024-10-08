import type { ShortcutEvent } from '@tauri-apps/plugin-global-shortcut'
import { systemKeyMaps } from '@/constants/keyMaps'
import { emitEvent } from '@/utils/eventHandler'
import { register, unregister } from '@tauri-apps/plugin-global-shortcut'

// 便于处理开发环境下注册快捷键
async function registerShortcuts(shortcuts: string[], callback: (e: ShortcutEvent) => void) {
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
  systemKeyMaps.forEach((value, key) => {
    registerShortcuts(key, () => {
      emitEvent(value)
    })
  })
}
