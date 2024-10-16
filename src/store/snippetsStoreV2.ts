import type { CategoryV2, SnippetV2 } from '@/types/snippet'
import { categoriesV2, snippetsV2 } from '@/constants/mockData'
import { TAURI_STORE_KEYS } from '@/constants/tauri'
import { store } from '@/plugins/pinia'
import { createRegexNoCase } from '@/utils/core'
import { useTauriStore } from '@/utils/tauriStore'
import { defineStore } from 'pinia'
import { v4 } from 'uuid'

interface SnippetStore {
  categories: CategoryV2[]
  snippets: SnippetV2[]
}

const tauriStore = useTauriStore()

export const useSnippetsStore = defineStore('snippetsV2', {
  state: (): SnippetStore => ({
    categories: [],
    snippets: [],
  }),
  actions: {
    async initSnippets() {
      await this.syncData()
    },
    async syncData() {
      const store = tauriStore.getStore()
      this.categories = await store?.get(TAURI_STORE_KEYS.CATEGORIES) || categoriesV2
      this.snippets = await store?.get(TAURI_STORE_KEYS.SNIPPETS) || snippetsV2
      await store?.save()
    },
    async setCategories(categories: CategoryV2[]) {
      this.categories = categories
      await tauriStore.set(TAURI_STORE_KEYS.CATEGORIES, this.categories)
    },
    // category curd
    getCategory(categoryId: string): CategoryV2 | undefined {
      return this.categories.find(category => category.id === categoryId)
    },
    getCategories() {
      return this.categories
    },
    async addCategory(category: CategoryV2) {
      this.categories.push({
        ...category,
        id: v4(),
      })
      await tauriStore.set(TAURI_STORE_KEYS.CATEGORIES, this.categories)
    },
    async updateCategory(categoryId: string, newCategory: CategoryV2) {
      const index = this.categories.findIndex(category => category.id === categoryId)
      if (index !== -1) {
        this.categories[index] = { ...newCategory, id: categoryId }
      }
      await tauriStore.set(TAURI_STORE_KEYS.CATEGORIES, this.categories)
    },
    async deleteCategory(categoryId: string) {
      const index = this.categories.findIndex(category => category.id === categoryId)
      if (index !== -1) {
        this.categories.splice(index, 1)
      }
      await tauriStore.set(TAURI_STORE_KEYS.CATEGORIES, this.categories)
    },

    // snippet curd
    async setSnippets(snippets: SnippetV2[]) {
      this.snippets = snippets
      await tauriStore.set(TAURI_STORE_KEYS.SNIPPETS, this.snippets)
    },
    getSnippet(snippetId: string): SnippetV2 | undefined {
      return this.snippets.find(snippet => snippet.id === snippetId)
    },
    getSnippets(categoryId: string): SnippetV2[] {
      return this.snippets.filter(snippet => snippet.categoryId === categoryId)
    },
    // 根据 categoryName 匹配 snippets
    matchSnippets(value: string, categoryId?: string) {
      const regex = createRegexNoCase(value)
      return categoryId
        ? this.snippets.filter(snippet => snippet.categoryId === categoryId && regex.test(snippet.title))
        : this.snippets.filter(snippet => regex.test(snippet.title))
    },
    async addSnippet(snippet: Omit<SnippetV2, 'id'>) {
      this.snippets.push({
        ...snippet,
        id: v4(),
      })
      await tauriStore.set(TAURI_STORE_KEYS.SNIPPETS, this.snippets)
    },
    async updateSnippet(snippet: SnippetV2) {
      const index = this.snippets.findIndex(s => s.id === snippet.id)
      if (index !== -1) {
        this.snippets[index] = snippet
      }
      await tauriStore.set(TAURI_STORE_KEYS.SNIPPETS, this.snippets)
    },
    async deleteSnippet(snippetId: string) {
      const index = this.snippets.findIndex(s => s.id === snippetId)
      if (index !== -1) {
        this.snippets.splice(index, 1)
      }
      await tauriStore.set(TAURI_STORE_KEYS.SNIPPETS, this.snippets)
    },
  },
})

export function useSnippetsStoreWithOut() {
  return useSnippetsStore(store)
}

export async function setupSnippetsStore() {
  const snippetsStore = useSnippetsStoreWithOut()
  await snippetsStore.initSnippets()
}
