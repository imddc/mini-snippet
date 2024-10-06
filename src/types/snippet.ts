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
