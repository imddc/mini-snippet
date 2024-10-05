import type { App } from 'vue'
import { Window } from '@tauri-apps/api/window'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, _, next) => {
  if (to.name === '/content') {
    const newWindow = new Window('new-page', {
      title: '新页面',
      width: 800,
      height: 600,
    })

    await newWindow.once('tauri://created', () => {
      console.log('New window created')
    })

    next(false) // 阻止默认导航
  }
  else {
    next()
  }
})

export function setupRouter(app: App) {
  app.use(router)
}
