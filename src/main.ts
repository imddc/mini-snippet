import { createApp } from 'vue'
import { registerEvents } from '~/utils/eventRegister'
import { initKeyMaps } from '~/utils/keyMaps'
import App from './App.vue'
import { setupRouter } from './plugins/router'
import './style/index.css'

const app = createApp(App)
setupRouter(app)
app.mount('#app')

registerEvents()
initKeyMaps()
