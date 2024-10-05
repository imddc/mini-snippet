<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
import Input from '@/components/ui/input/Input.vue'
import { Events } from '@/constants/eventEnums'
import { emitEvent } from '@/utils/eventHandler'
import { EggIcon } from 'lucide-vue-next'
import { ref } from 'vue'

const snippet = ref('')

function goContent() {
  emitEvent(Events.OPEN_CONTENT_WINDOW)
}
</script>

<template>
  <div data-tauri-drag-region class="flex-col-center min-h-screen cursor-pointer space-y-2 rounded-lg p-2">
    <!-- 主体 -->
    <div class="w-full max-w-2xl overflow-hidden rounded-xl bg-gray-800 shadow-xl backdrop-blur-lg">
      <div class="flex-between gap-2 p-3">
        <div class="flex-1">
          <Input
            v-model="snippet"
            placeholder="Enter your code snippet here..."
            class="!focus-visible:ring-0 h-12 border-0 ring-0 ring-gray-600 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>

        <button
          class="flex size-10 items-center justify-center rounded-full bg-gray-500 text-white transition duration-300 ease-in-out hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-700"
          @click="goContent"
        >
          <EggIcon class="size-5" />
        </button>
      </div>
    </div>
  </div>
</template>
