<script setup lang="ts">
import { Events } from '@/constants/eventEnums'
import { emitEvent } from '@/utils/eventHandler'
import { X } from 'lucide-vue-next'

function closeContent() {
  emitEvent(Events.CLOSE_CONTENT_WINDOW)
}
</script>

<template>
  <div data-tauri-drag-region class="flex-between h-[var(--content-header-height)] cursor-pointer p-4">
    <div class="flex items-center gap-2">
      <button
        class="group relative flex size-4 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-red-400 to-pink-400 shadow-lg transition-all duration-300 hover:shadow-xl"
        @click="closeContent"
      >
        <div class="absolute inset-0 bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-20">
          <X class="size-3 text-white transition-transform duration-300 group-hover:rotate-90" />
        </div>
      </button>
    </div>
  </div>
</template>
