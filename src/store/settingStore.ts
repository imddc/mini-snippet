import type { BundledTheme } from 'shiki'
import { TAURI_STORE_KEYS } from '@/constants/tauri'
import { store } from '@/plugins/pinia'
import { useTauriStore } from '@/utils/tauriStore'
import { defineStore } from 'pinia'

interface State {
  codeTheme: BundledTheme
}

const tauriStore = useTauriStore()

export const useSettingStore = defineStore('setting', {
  state: (): State => ({
    codeTheme: 'github-dark',
  }),
  actions: {
    setCodeTheme(theme: BundledTheme) {
      this.codeTheme = theme
      tauriStore.set(TAURI_STORE_KEYS.CODE_THEME, theme)
    },
    getCodeTheme() {
      return this.codeTheme
    },
  },
})

export function useSettingStoreWithOut() {
  return useSettingStore(store)
}
