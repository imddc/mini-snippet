import { useMagicKeys } from '@vueuse/core'
import { watchEffect } from 'vue'

interface KeyMaps {
  chooseNext: () => void
  choosePrev: () => void
  select: (numberKey?: string) => void
  quit: () => void
}

const { control, n, p, j, k, arrowUp, arrowDown, enter, escape, meta, current } = useMagicKeys()
const numbers = Array.from({ length: 9 }).map((_, i) => i + 1).map(String)
let num = ''
function isNumber(): string {
  for (let i = 0; i < numbers.length; i++) {
    if (current.has(numbers[i])) {
      return numbers[i]
    }
  }
  return ''
}

export function useKeyMaps({
  chooseNext,
  choosePrev,
  select,
  quit,
}: KeyMaps) {
  watchEffect(() => {
    // choose next
    if (
      (control.value && n.value)
      || arrowDown.value
      || (control.value && j.value)
    ) {
      chooseNext()
    }

    // choose prev
    if (
      (control.value && p.value)
      || arrowUp.value
      || (control.value && k.value)
    ) {
      choosePrev()
    }

    // select
    if (enter.value) {
      select()
    }

    // press number
    if (meta.value && (num = isNumber())) {
      select(num)
    }

    // quit
    if (escape.value) {
      quit()
    }
  })
}
