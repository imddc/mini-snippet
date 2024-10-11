<script setup lang="ts">
import { Events } from '@/constants/eventEnums'
import { emitEvent } from '@/utils/eventHandler'
import { Bolt, Code, X } from 'lucide-vue-next'
import { useRoute } from 'vue-router'
import Button from '../ui/button/Button.vue'

const route = useRoute()

function isCurrentPath(path: '/content' | '/setting') {
  return route.path === path
}

function closeContent() {
  emitEvent(Events.CLOSE_CONTENT_WINDOW)
}
</script>

<template>
  <div data-tauri-drag-region class="flex-between h-[var(--content-header-height)] cursor-pointer p-4">
    <div class="flex-between size-full gap-2">
      <button
        class="group relative flex size-4 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-red-400 to-pink-400 shadow-lg transition-all duration-300 hover:shadow-xl"
        @click="closeContent"
      >
        <div class="absolute inset-0 bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-20">
          <X class="size-3 text-white transition-transform duration-300 group-hover:rotate-90" />
        </div>
      </button>

      <div class="h-full flex-1" data-tauri-drag-region />

      <div class="flex-center gap-2">
        <Button
          :variant="isCurrentPath('/content') ? 'outline' : 'ghost'"
          size="icon"
          class="h-8"
          @click="$router.push('/content')"
        >
          <Code class="size-4" />
        </Button>
        <Button
          :variant="isCurrentPath('/setting') ? 'outline' : 'ghost'"
          size="icon"
          class="h-8"
          @click="$router.push('/setting')"
        >
          <Bolt class="size-4" />
        </Button>
      </div>
    </div>
  </div>
</template>
