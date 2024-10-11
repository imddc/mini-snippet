import type { BundledLanguage } from 'shiki'

export interface Snippet {
  [key: string]: Category
}

export interface Category {
  [key: string]: string
}

export interface SnippetEditor {
  category: string
  title: string
  content: string
}

export interface CategoryV2 {
  id: string
  name: string
  lang: BundledLanguage
}

export interface SnippetV2 {
  id: string
  title: string
  content: string
  categoryId: string
}
