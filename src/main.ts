import { setupStore } from '@/plugins/pinia'
import { setupSnippetsStore } from '@/store/snippetsStoreV2'
import { registerEvents } from '@/utils/eventRegister'
import { initKeyMaps } from '@/utils/keyMapsRegister'
import { initStore } from '@/utils/tauriStore'
import { createApp } from 'vue'
import App from './App.vue'
import { setupRouter } from './plugins/router'
import './style/index.css'

const app = createApp(App)
setupRouter(app)
setupStore(app)

// 初始化 tauri store
initStore()
// 初始化 snippetsStore
setupSnippetsStore()

app.mount('#app')

initKeyMaps()
registerEvents()
