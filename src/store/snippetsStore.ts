import type { Snippet, SnippetEditor } from '@/types/snippet'
import { snippets } from '@/constants/mockData'
import { store } from '@/plugins/pinia'
import { defineStore } from 'pinia'

interface SnippetStore {
  snippets: Snippet
  isSnippetsEditing: boolean
  isCreatingSnippet: boolean
  editingSnippet: SnippetEditor | undefined
}

const snippetsStore = defineStore('snippets', {
  state: (): SnippetStore => ({
    snippets: {},
    isSnippetsEditing: false,
    isCreatingSnippet: false,
    editingSnippet: undefined,
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
    startCreatingSnippet() {
      this.isSnippetsEditing = true
      this.isCreatingSnippet = true
    },
    cancelCreatingSnippet() {
      this.isSnippetsEditing = false
      this.isCreatingSnippet = false
    },
    addSnippet(snippet: SnippetEditor) {
      this.snippets[snippet.category][snippet.title] = snippet.content
    },
    updateSnippet(snippet: SnippetEditor) {
      this.snippets[snippet.category][snippet.title] = snippet.content
    },
    startUpdatingSnippet(category: string, title: string) {
      // 禁止创建
      this.isCreatingSnippet = false
      // 重置编辑状态
      this.isSnippetsEditing = false
      // 开始编辑
      this.isSnippetsEditing = true
      // 设置编辑的内容
      this.editingSnippet = {
        category,
        title,
        content: this.snippets[category][title],
      }
    },
    deleteSnippet(category: string, title: string) {
      delete this.snippets[category][title]
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
