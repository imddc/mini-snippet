import type { Store } from '@tauri-apps/plugin-store'
import { TAURI_STORE_NAME } from '@/constants/tauri'
import { createStore } from '@tauri-apps/plugin-store'

let store: Store | null = null

export function useTauriStore() {
  async function initStore() {
    if (store) {
      return
    }
    store = await createStore(TAURI_STORE_NAME, {
    })
  }

  function getStore() {
    return store
  }

  async function set(key: string, value: any) {
    if (!store) {
      throw new Error('Store not initialized')
    }
    await store.set(key, value)
  }

  async function get<T>(key: string) {
    if (!store) {
      throw new Error('Store not initialized')
    }
    return await store.get<T>(key)
  }

  async function save() {
    if (!store) {
      throw new Error('Store not initialized')
    }
    await store.save()
  }

  async function remove(key: string) {
    if (!store) {
      throw new Error('Store not initialized')
    }
    await store.delete(key)
  }

  async function clear() {
    if (!store) {
      throw new Error('Store not initialized')
    }
    await store.clear()
  }

  return {
    initStore,
    getStore,
    set,
    get,
    save,
    remove,
    clear,
  }
}
