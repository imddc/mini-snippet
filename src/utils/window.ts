import { getAllWindows } from '@tauri-apps/api/window'
import type { WindowLabel } from '~/constants/windowEnums'

export async function getWindow(label: WindowLabel) {
  const allWindows = await getAllWindows()
  return allWindows.find(window => window.label === label)
}
