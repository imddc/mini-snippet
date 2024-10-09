import { useMagicKeys } from '@vueuse/core'
import { watchEffect } from 'vue'

interface KeyMaps {
  chooseNext: () => void
  choosePrev: () => void
  select: () => void
}

const { control, n, p, j, k, arrowUp, arrowDown, enter } = useMagicKeys()

export function useKeyMaps({
  chooseNext,
  choosePrev,
  select,
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
  })
}
