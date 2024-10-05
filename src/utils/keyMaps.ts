import hotkey from 'hotkeys-js'
import { Events } from '~/constants/eventEnums'
import { emitEvent } from '~/utils/eventHandler'

const keyMaps: Record<string, Events> = {
  'alt+space': Events.OPEN_MAIN_WINDOW,
}

function handleKeyDown() {
  for (const key in keyMaps) {
    hotkey(key, () => {
      emitEvent(keyMaps[key])
    })
  }
}

export function initKeyMaps() {
  if (typeof window === 'undefined') {
    return
  }
  handleKeyDown()
}
