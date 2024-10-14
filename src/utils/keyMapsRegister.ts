import { Events } from '@/constants/eventEnums'
import { useSettingStoreWithOut } from '@/store/settingStore'
import { emitEvent } from '@/utils/eventHandler'
import { register, unregisterAll } from '@tauri-apps/plugin-global-shortcut'

const settingStore = useSettingStoreWithOut()

export async function initKeyMaps() {
  await unregisterAll()
  await register(settingStore.shortcut, (e) => {
    e.state === 'Pressed' && emitEvent(Events.TOGGLE_MAIN_WINDOW)
  })
}
