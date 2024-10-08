import { Events } from '@/constants/eventEnums'

export const keyMaps = new Map<string[], Events>()

keyMaps.set(['alt+space', 'alt+Y'], Events.TOGGLE_MAIN_WINDOW)
keyMaps.set([], Events.TOGGLE_MAIN_WINDOW)
