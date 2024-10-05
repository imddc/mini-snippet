// 模拟数据
export const snippets = {
  js: {
    debounce: `function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
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
  node: {},
  git: {},
  docker: {},
  k8s: {},
  linux: {},
  macos: {},
}
