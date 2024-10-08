import { Events } from '@/constants/eventEnums'

export const systemKeyMaps = new Map<string[], Events>()

systemKeyMaps.set(['alt+space', 'alt+Y'], Events.TOGGLE_MAIN_WINDOW)
