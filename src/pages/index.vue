<script setup lang="ts">
import { SaveIcon } from 'lucide-vue-next'
import { ref } from 'vue'
import { emitEvent } from '~/utils/eventHandler'
import { Events } from '~/constants/eventEnums'

const snippet = ref('')

function goContent() {
  emitEvent(Events.OPEN_CONTENT_WINDOW)
}
</script>

<template>
  <div data-tauri-drag-region class="flex-center min-h-screen cursor-pointer rounded-lg bg-slate-50/10 p-2">
    <div class="w-full max-w-2xl overflow-hidden rounded-xl bg-white/80 backdrop-blur-lg">
      <div class="p-2">
        <div class="relative">
          <input
            v-model="snippet" placeholder="Enter your code snippet here..."
            class="w-full resize-none rounded-lg bg-gray-800/70 px-6 py-4 text-white placeholder:text-gray-400 focus:outline-none"
          >
          <button
            class="absolute bottom-2 right-3 flex size-10 items-center justify-center rounded-full bg-blue-500 text-white transition duration-300 ease-in-out hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-700"
          >
            <SaveIcon class="size-5" />
          </button>
        </div>
      </div>

      <div class="flex justify-center">
        <button type="button" @click="goContent">
          go content
        </button>
      </div>
    </div>
  </div>
</template>
