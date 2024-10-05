import { store } from '@/plugins/pinia'
import { defineStore } from 'pinia'

const contentWindowStore = defineStore('contentWindow', {
  state: () => ({
    isShow: true,
  }),
})

export function useContentWindowStoreWithOut() {
  return contentWindowStore(store)
}
