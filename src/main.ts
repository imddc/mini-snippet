// import { TrayIcon } from '@tauri-apps/api/tray';
// import { Menu } from '@tauri-apps/api/menu';

import { createApp } from 'vue'
import App from './App.vue'
import './style/index.css'

createApp(App).mount('#app')

// const menu = await Menu.new({
//   items: [
//     {
//       id: 'quit',
//       text: 'Quit',
//       action: onTrayMenuClick,
//     },
//   ],
// });

// const options = {
//   menu,
//   menuOnLeftClick: true,
// };

// const tray = TrayIcon.new(options);

// function onTrayMenuClick(itemId: string | number) {
//   // itemId === 'quit'
//   console.log(itemId)
// }
