import { setupStore } from '@/plugins/pinia'
import { registerEvents } from '@/utils/eventRegister'
import { initKeyMaps } from '@/utils/keyMapsRegister'
import { createApp } from 'vue'
import App from './App.vue'
import { setupRouter } from './plugins/router'
import './style/index.css'

const app = createApp(App)
setupRouter(app)
setupStore(app)

app.mount('#app')

initKeyMaps()
registerEvents()
