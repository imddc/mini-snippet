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
    getCategories() {
      return Object.keys(this.snippets)
    },
    getSubcategories(category: string) {
      return Object.keys(this.snippets[category] || {})
    },
    getAllSubcategories() {
      const result: string[] = []
      Object.keys(this.snippets).forEach((category) => {
        Object.keys(this.snippets[category]).forEach((subcategory) => {
          result.push(subcategory)
        })
      })
      return result
    },
    matchSubcategories(subcategory: string) {
      const regex = new RegExp(subcategory)
      return this.getAllSubcategories().filter(sub => regex.test(sub))
    },
    getSnippets(subcategory: string) {
      return Object.values(this.snippets).flatMap(category => category[subcategory] || [])
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
