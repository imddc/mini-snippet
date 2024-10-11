import type { BundledTheme } from 'shiki'
import { store } from '@/plugins/pinia'
import { defineStore } from 'pinia'

interface State {
  codeTheme: BundledTheme
}

export const useSettingStore = defineStore('setting', {
  state: (): State => ({
    codeTheme: 'github-dark',
  }),
  actions: {
    setCodeTheme(theme: BundledTheme) {
      this.codeTheme = theme
    },
    getCodeTheme() {
      return this.codeTheme
    },
  },
})

export function useSettingStoreWithOut() {
  return useSettingStore(store)
}
