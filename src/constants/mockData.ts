import type { CategoryV2, Snippet, SnippetV2 } from '@/types/snippet'

// 模拟数据
export const snippets: Snippet = {
  mock: {
    // 给我十五条空的数据 key 不为空
    template1: 'template1 this is a mock data',
    template2: 'template2 this is a mock data',
  },
  ts: {
    debounce: `function debounce<F extends (...args: any[]) => any>(func: F, wait: number): (...args: Parameters<F>) => void {
      let timeout: ReturnType<typeof setTimeout>;
      return function(this: any, ...args: Parameters<F>) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
      };
    }`,
  },
  react: {
    useEffect: `import React, { useEffect } from 'react';
      function MyComponent() {
      useEffect(() => {
        // 这里的代码会在组件挂载后执行
        console.log('Component mounted');

        // 返回的函数会在组件卸载前执行
        return () => {
          console.log('Component will unmount');
        };
      }, []); // 空数组意味着这个效果只在挂载和卸载时运行

      return <div>My Component</div>;
    }`,
  },
  macos: {},
}

export const categoriesV2: CategoryV2[] = [
  {
    id: '1',
    name: 'js',
  },
  {
    id: '2',
    name: 'ts',
  },
  {
    id: '3',
    name: 'react',
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
