import type { BundledTheme } from 'shiki'
import { TAURI_STORE_KEYS } from '@/constants/tauri'
import { store } from '@/plugins/pinia'
import { useTauriStore } from '@/utils/tauriStore'
import { isEnabled } from '@tauri-apps/plugin-autostart'
import { defineStore } from 'pinia'

interface State {
  codeTheme: BundledTheme
  autoStart: boolean
  shortcutHotKey: string
  shortcutModifierKey: string
}

const tauriStore = useTauriStore()

export const useSettingStore = defineStore('setting', {
  state: (): State => ({
    codeTheme: 'github-dark',
    autoStart: false,
    shortcutHotKey: '',
    shortcutModifierKey: '',
  }),
  getters: {
    shortcut(state) {
      return `${state.shortcutModifierKey}+${state.shortcutHotKey}`
    },
  },
  actions: {
    async initSettingStore() {
      this.autoStart = await tauriStore.get(TAURI_STORE_KEYS.AUTO_START) || await isEnabled()
      this.shortcutHotKey = await tauriStore.get(TAURI_STORE_KEYS.SHORTCUT_HOT_KEY) || 'space'
      this.shortcutModifierKey = await tauriStore.get(TAURI_STORE_KEYS.SHORTCUT_MODIFIER_KEY) || 'alt'
    },
    setCodeTheme(theme: BundledTheme) {
      this.codeTheme = theme
      tauriStore.set(TAURI_STORE_KEYS.CODE_THEME, theme)
    },
    getCodeTheme() {
      return this.codeTheme
    },
    setAutoStart(autoStart: boolean) {
      this.autoStart = autoStart
      tauriStore.set(TAURI_STORE_KEYS.AUTO_START, autoStart)
    },
    getAutoStart() {
      return this.autoStart
    },
    async setShortcutHotKey(hotKey: string) {
      this.shortcutHotKey = hotKey
      await tauriStore.set(TAURI_STORE_KEYS.SHORTCUT_HOT_KEY, hotKey)
    },
    getShortcutHotKey() {
      return this.shortcutHotKey
    },
    async setShortcutModifierKey(modifierKey: string) {
      this.shortcutModifierKey = modifierKey
      await tauriStore.set(TAURI_STORE_KEYS.SHORTCUT_MODIFIER_KEY, modifierKey)
    },
    getShortcutModifierKey() {
      return this.shortcutModifierKey
    },
  },
})

export function useSettingStoreWithOut() {
  return useSettingStore(store)
}

export async function setupSettingStore() {
  const settingStore = useSettingStoreWithOut()
  await settingStore.initSettingStore()
}
