import type { Snippet } from '@/types/snippet'
import { snippets } from '@/constants/mockData'
import { store } from '@/plugins/pinia'
import { defineStore } from 'pinia'

interface SnippetStore {
  snippets: Snippet
}

const snippetsStore = defineStore('snippets', {
  state: (): SnippetStore => ({
    snippets: {},
  }),
  actions: {
    initSnippets() {
      this.snippets = snippets
    },
  },
})

export function useSnippetsStoreWithOut() {
  return snippetsStore(store)
}

export function setupSnippetsStore() {
  const snippetsStore = useSnippetsStoreWithOut()
  snippetsStore.initSnippets()
}
