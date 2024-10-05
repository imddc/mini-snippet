import { defineStore } from 'pinia'
import { store } from '~/plugins/pinia'

const mainWindowStore = defineStore('mainWindow', {
  state: () => ({
    isShow: true,
  }),
})

export function useMainWindowStoreWithOut() {
  return mainWindowStore(store)
}
