import type { WindowLabel } from '@/constants/windowEnums'
import { getAllWindows } from '@tauri-apps/api/window'

export async function getWindow(label: WindowLabel) {
  const allWindows = await getAllWindows()
  return allWindows.find(window => window.label === label)
}
