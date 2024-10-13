import { store } from '@/plugins/pinia'
import { defineStore } from 'pinia'

interface WindowState {
  isMainWindowShow: boolean
  isContentWindowShow: boolean
}

export const useWindowStore = defineStore<string, WindowState>('mainWindow', {
  state: () => ({
    isMainWindowShow: false,
    isContentWindowShow: false,
  }),
  persist: {
    storage: localStorage,
  },
})

export function useWindowStoreWithOut() {
  return useWindowStore(store)
}
