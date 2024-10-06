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
    getSnippetsTitles(category: string) {
      return Object.keys(this.snippets[category] || {})
    },
    getAllSnippetsTitles() {
      const result: string[] = []
      Object.keys(this.snippets).forEach((category) => {
        Object.keys(this.snippets[category]).forEach((subcategory) => {
          result.push(subcategory)
        })
      })
      return result
    },
    matchSnippetsTitles(subcategory: string) {
      const regex = new RegExp(subcategory)
      return this.getAllSnippetsTitles().filter(sub => regex.test(sub))
    },
    getSnippetsByTitle(title: string) {
      return Object.values(this.snippets).flatMap(category => category[title] || [])
    },
    getSnippetsByTitleAndCategory(title: string, category: string): string[] {
      const res = this.snippets[category][title]
      return res ? [res] : []
    },

    matchSnippetsByTitleAndCategory(title: string, category: string): string[] {
      const regex = new RegExp(title)
      const res = Object.keys(this.snippets[category]).filter(sub => regex.test(sub))
      return res
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
