import type { App } from 'vue'
import { Webview } from '@tauri-apps/api/webview'
import { Window } from '@tauri-apps/api/window'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, _from, next) => {
  if (to.name === '/content') {
    const window = new Window('content')

    const webview = new Webview(window, 'content', {
      url: '/content',
      x: 0,
      y: 0,
      width: 1000,
      height: 1000,
    })

    webview.once('tauri://created', () => {
      // webview successfully created
    })
    webview.once('tauri://error', (e) => {
      console.log(e)
      // an error happened creating the webview
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
