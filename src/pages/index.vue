<script setup lang="ts">
import Input from '@/components/ui/input/Input.vue'
import ScrollArea from '@/components/ui/scroll-area/ScrollArea.vue'
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
  <div class="flex-center flex select-none rounded-lg p-10">
    <!-- 主体 -->
    <div
      data-tauri-drag-region
      class="index-animate-gradient flex w-full justify-between gap-2 rounded-md p-2 shadow-2xl backdrop-blur-lg"
    >
      <!-- input -->
      <div
        data-tauri-drag-region
        class="flex flex-1 flex-col gap-1 rounded-lg bg-gray-800/50 p-1"
      >
        <Input
          v-model.trim="snippetsTitle"
          placeholder="input code ..."
          class="mt-1 h-12 text-lg"
        />

        <!-- 下拉列表 -->
        <div
          v-if="foundSnippetsTitles.length"
          class="text-xl text-slate-500 backdrop-blur"
        >
          <ScrollArea class="h-[400px] pr-3">
            <div
              v-for="title in foundSnippetsTitles"
              :key="title"
              class="mr-2 mt-1 w-full cursor-pointer overflow-hidden truncate rounded-md p-1 transition hover:bg-gray-300/50"
              @click="chooseSnippetsTitle = title"
            >
              <div>
                {{ title }}
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>

      <!-- button -->
      <button
        class="flex-center m-2 size-12 shrink-0 grow-0 self-start rounded-full bg-gray-800/50 text-white transition duration-300 ease-in-out hover:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-gray-700"
        @click="goContent"
      >
        <EggIcon class="size-5" />
      </button>
    </div>
  </div>
</template>
