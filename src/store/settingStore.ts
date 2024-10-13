import type { BundledTheme } from 'shiki'
import { TAURI_STORE_KEYS } from '@/constants/tauri'
import { store } from '@/plugins/pinia'
import { useTauriStore } from '@/utils/tauriStore'
import { isEnabled } from '@tauri-apps/plugin-autostart'
import { defineStore } from 'pinia'

interface State {
  codeTheme: BundledTheme
  autoStart: boolean
}

const tauriStore = useTauriStore()

export const useSettingStore = defineStore('setting', {
  state: (): State => ({
    codeTheme: 'github-dark',
    autoStart: false,
  }),
  actions: {
    async initSettingStore() {
      this.autoStart = await isEnabled()
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
  },
})

export function useSettingStoreWithOut() {
  return useSettingStore(store)
}

export async function setupSettingStore() {
  const settingStore = useSettingStore()
  await settingStore.initSettingStore()
}
