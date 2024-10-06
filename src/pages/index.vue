<script setup lang="ts">
import Input from '@/components/ui/input/Input.vue'
import { Events } from '@/constants/eventEnums'
import { useSnippetsStoreWithOut } from '@/store/snippetsStore'
import { emitEvent } from '@/utils/eventHandler'
import { EggIcon } from 'lucide-vue-next'
import { ref, watchEffect } from 'vue'

const snippetsStore = useSnippetsStoreWithOut()

const snippetsTitle = ref('')

const chooseSnippetsTitle = ref('')
const foundSnippetsTitles = ref<string[]>([])

function goContent() {
  emitEvent(Events.OPEN_CONTENT_WINDOW)
}

watchEffect(() => {
  foundSnippetsTitles.value = snippetsTitle.value ? snippetsStore.matchSnippetsTitles(snippetsTitle.value) : []

  if (foundSnippetsTitles.value.length) {
    chooseSnippetsTitle.value = foundSnippetsTitles.value[0]
  }
})
</script>

<template>
  <div data-tauri-drag-region class="flex min-h-screen cursor-pointer flex-col items-center space-y-2 rounded-lg bg-gray-800/95 p-2 shadow-2xl backdrop-blur-lg">
    <!-- 主体 -->
    <div class="w-full max-w-2xl ">
      <div class="flex-between gap-2 p-3">
        <div class="flex-1 rounded-lg bg-pink-200 p-1">
          <Input
            v-model.trim="snippetsTitle"
            placeholder="input code ..."
            class="h-12 text-lg"
          />

          <template v-if="foundSnippetsTitles.length">
            <div class="w-full overflow-hidden rounded-lg backdrop-blur-lg">
              <ul
                class="space-y-1 p-2 text-lg"
              >
                <li
                  v-for="title in foundSnippetsTitles"
                  :key="title"
                  :class="{ 'bg-gray-600': chooseSnippetsTitle === title }"
                  class="cursor-pointer truncate rounded-md p-1 hover:bg-gray-600"
                  @click="chooseSnippetsTitle = title"
                >
                  <code class="text-sm">
                    {{ title }} - {{ snippetsStore.getSnippetsByTitle(title) }}
                  </code>
                </li>
              </ul>
            </div>
          </template>
        </div>

        <button
          class="m-2 flex size-12 items-center justify-center self-start rounded-full bg-gray-500 text-white transition duration-300 ease-in-out hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-700"
          @click="goContent"
        >
          <EggIcon class="size-5" />
        </button>
      </div>
    </div>
  </div>
</template>
