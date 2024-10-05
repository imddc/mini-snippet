import { store } from '@/plugins/pinia'
import { defineStore } from 'pinia'

const mainWindowStore = defineStore('mainWindow', {
  state: () => ({
    isShow: true,
  }),
})

export function useMainWindowStoreWithOut() {
  return mainWindowStore(store)
}
