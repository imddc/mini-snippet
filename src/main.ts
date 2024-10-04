import { createApp } from 'vue'
import { setupSystemTray } from '~/plugins/tray'
import App from './App.vue'
import './style/index.css'

setupSystemTray()

createApp(App).mount('#app')
