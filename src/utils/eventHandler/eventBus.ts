export class EventHandler {
  private eventMap: Map<string, ((...args: any[]) => void)[]> = new Map()

  on(event: string, callback: (...args: any[]) => void) {
    const callbacks = this.eventMap.get(event) || []
    callbacks.push(callback)
    this.eventMap.set(event, callbacks)
  }

  emit(event: string, ...args: any[]) {
    const callbacks = this.eventMap.get(event) || []
    callbacks.forEach((callback) => {
      callback(...args)
    })
  }
}
