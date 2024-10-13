import type { App } from 'vue'
import { setupSettingStore } from '@/store/settingStore'
import { setupSnippetsStore } from '@/store/snippetsStoreV2'
import { useTauriStore } from '@/utils/tauriStore'
import { createPinia } from 'pinia'

const tauriStore = useTauriStore()
const store = createPinia()

export async function setupStore(app: App) {
  await tauriStore.initStore()
  app.use(store)

  setupSettingStore()
  setupSnippetsStore()
}

export { store }
