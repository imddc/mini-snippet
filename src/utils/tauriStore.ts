import type { Store } from '@tauri-apps/plugin-store'
import { TAURI_STORE_NAME } from '@/constants/tauri'
import { createStore } from '@tauri-apps/plugin-store'

const store: Store | null = null

export async function initStore() {
  if (store) {
    return store
  }
  return await createStore(TAURI_STORE_NAME, {
    autoSave: true,
  })
}

export async function set(key: string, value: any) {
  if (!store) {
    throw new Error('Store not initialized')
  }
  await store.set(key, value)
}

export async function get<T>(key: string) {
  if (!store) {
    throw new Error('Store not initialized')
  }
  return await store.get<T>(key)
}

export async function save() {
  if (!store) {
    throw new Error('Store not initialized')
  }
  await store.save()
}

export async function remove(key: string) {
  if (!store) {
    throw new Error('Store not initialized')
  }
  await store.delete(key)
}

export async function clear() {
  if (!store) {
    throw new Error('Store not initialized')
  }
  await store.clear()
}
