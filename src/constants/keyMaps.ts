import { Events } from '@/constants/eventEnums'

export const systemKeyMaps = new Map<string[], Events>()

systemKeyMaps.set(['Alt+Space'], Events.TOGGLE_MAIN_WINDOW)
