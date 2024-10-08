import type { Snippet, SnippetEditor } from '@/types/snippet'
import { snippets } from '@/constants/mockData'
import { store } from '@/plugins/pinia'
import { defineStore } from 'pinia'

interface SnippetStore {
  beforeSnippets: SnippetEditor | undefined
  snippets: Snippet
  isSnippetsEditing: boolean
  isCreatingSnippet: boolean
  editingSnippet: SnippetEditor | undefined
}

const snippetsStore = defineStore('snippets', {
  state: (): SnippetStore => ({
    beforeSnippets: undefined,
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
    // snippet curd
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
      if (!this.beforeSnippets) {
        return
      }
      delete this.snippets[this.beforeSnippets.category][this.beforeSnippets.title]
      this.snippets[snippet.category][snippet.title] = snippet.content
    },
    startUpdatingSnippet(beforeSnippets: SnippetEditor) {
      this.beforeSnippets = { ...beforeSnippets }
      // 禁止创建
      this.isCreatingSnippet = false
      // 重置编辑状态
      this.isSnippetsEditing = false
      // 开始编辑
      this.isSnippetsEditing = true
      // 设置编辑的内容
      this.editingSnippet = { ...beforeSnippets }
    },
    cancelUpdatingSnippet() {
      this.beforeSnippets = undefined
      this.isSnippetsEditing = false
      this.isCreatingSnippet = false
      this.editingSnippet = undefined
    },
    deleteSnippet(category: string, title: string) {
      delete this.snippets[category][title]
    },

    // category curd
    addCategory(category: string) {
      this.snippets[category] = {}
    },
    deleteCategory(category: string) {
      delete this.snippets[category]
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
