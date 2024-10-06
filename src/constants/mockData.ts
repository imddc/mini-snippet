import type { Snippet } from '@/types/snippet'

// 模拟数据
export const snippets: Snippet = {
  mock: {
    // 给我十五条空的数据 key 不为空
    template1: 'template1 this is a mock data',
    template2: 'template2 this is a mock data',
    template3: 'template3 this is a mock data',
    template4: 'template4 this is a mock data',
    template5: 'template5 this is a mock data',
    template6: 'template6 this is a mock data',
    template7: 'template7 this is a mock data',
    template8: 'template8 this is a mock data',
    template9: 'template9 this is a mock data',
    template12342134: 'template10 this is a mock data',
    template11template11: 'template11 this is a mock data',
    template12template12: 'template12 this is a mock data',
    template13template13: 'template13 this is a mock data',
    template14template14: 'template14 this is a mock data',
    template15template15: 'template15 this is a mock data',
  },
  js: {
    debounce: `function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
      clearTimeout(timeout);
      func(...args);
    };
    timeout = setTimeout(later, wait);
  };
};`,
    throttle: `function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}`,
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
  vue1234213421342134123421342134: {},
  vue: {},
  css: {},
  html: {},
  http: {},
  javascript: {},
  typescript: {},
  docker: {},
  git: {},
  linux: {},
  macos: {},
}
