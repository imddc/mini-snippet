import type { Events } from '../../constants/eventEnums'
import { EventHandler } from './eventBus'

const eventHandler = new EventHandler()

export function useEvent(event: Events, callback: (...args: any[]) => void) {
  eventHandler.on(event, callback)
}

export function emitEvent(event: Events, ...args: any[]) {
  eventHandler.emit(event, ...args)
}

export default eventHandler
