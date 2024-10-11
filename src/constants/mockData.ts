import type { CategoryV2, SnippetV2 } from '@/types/snippet'

export const categoriesV2: CategoryV2[] = [
  {
    id: '1',
    name: 'js',
    lang: 'javascript',
  },
  {
    id: '2',
    name: 'ts',
    lang: 'typescript',
  },
  {
    id: '3',
    name: 'react',
    lang: 'typescript',
  },
]

export const snippetsV2: SnippetV2[] = [
  {
    id: '1',
    title: 'debounce',
    content: 'function debounce(func, wait) { ... }',
    categoryId: '1',
  },
  {
    id: '2',
    title: 'useEffect',
    content: 'function useEffect(func, []) { ... }',
    categoryId: '2',
  },
  {
    id: '3',
    title: 'useState',
    content: 'function useState(initialState) { ... }',
    categoryId: '3',
  },
]
