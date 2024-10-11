<script setup lang="ts">
import type { SnippetV2 } from '@/types/snippet'
import Input from '@/components/ui/input/Input.vue'
import ScrollArea from '@/components/ui/scroll-area/ScrollArea.vue'
import { useKeyMaps } from '@/composables/useKeyMaps'
import { Events } from '@/constants/eventEnums'
import { useSnippetsStoreWithOut } from '@/store/snippetsStoreV2'
import { emitEvent, useEvent } from '@/utils/eventHandler'
import { writeText } from '@tauri-apps/plugin-clipboard-manager'
import { Command, EggIcon } from 'lucide-vue-next'
import { onMounted, ref, useTemplateRef, watchEffect } from 'vue'

const snippetsStore = useSnippetsStoreWithOut()

const searchValue = ref('')
const searchInputRef = useTemplateRef<InstanceType<typeof Input>>('searchInputRef')

const chooseSnippetsIndex = ref(0)
const foundSnippets = ref<SnippetV2[]>([])

function goContent() {
  emitEvent(Events.OPEN_CONTENT_WINDOW)
}

watchEffect(() => {
  foundSnippets.value = searchValue.value
    ? snippetsStore.matchSnippets(searchValue.value)
    : []

  chooseSnippetsIndex.value = 0
})

async function select() {
  await writeText(foundSnippets.value[chooseSnippetsIndex.value].content)
  quit()
}

function quit() {
  emitEvent(Events.CLOSE_MAIN_WINDOW)
}

useKeyMaps({
  chooseNext: () => {
    if (foundSnippets.value.length) {
      chooseSnippetsIndex.value = chooseSnippetsIndex.value < foundSnippets.value.length - 1
        ? chooseSnippetsIndex.value + 1
        : 0
    }
  },
  choosePrev: () => {
    if (foundSnippets.value.length) {
      chooseSnippetsIndex.value = chooseSnippetsIndex.value > 0
        ? chooseSnippetsIndex.value - 1
        : foundSnippets.value.length - 1
    }
  },
  select,
  quit,
})

onMounted(() => {
  if (searchInputRef.value) {
    searchInputRef.value?.setFocus()
  }

  useEvent(Events.CLOSE_MAIN_WINDOW, () => {
    searchValue.value = ''
  })
})
</script>

<template>
  <div class="flex-center flex select-none">
    <!-- 主体 -->
    <div
      data-tauri-drag-region
      class="index-animate-gradient flex w-full flex-col gap-2 rounded-2xl p-3 backdrop-blur-lg"
    >
      <div class="flex-between gap-2">
        <Input
          ref="searchInputRef"
          v-model.trim="searchValue"
          placeholder="input code ..."
          class="h-12 border-none bg-background/50 p-2 text-lg"
        />
        <!-- button -->
        <button
          class="flex-center size-12 shrink-0 grow-0 self-start rounded-full bg-gray-800/50 text-white transition duration-300 ease-in-out hover:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-gray-700"
          @click="goContent"
        >
          <EggIcon class="size-5" />
        </button>
      </div>

      <!-- 下拉列表 -->
      <div
        v-if="foundSnippets.length"
        class="text-slate-300 backdrop-blur"
      >
        <ScrollArea class="h-[400px] pr-3">
          <div
            v-for="(snippet, index) in foundSnippets"
            :key="snippet.id"
            :class="index === chooseSnippetsIndex ? 'bg-gray-300/50' : ''"
            class="mt-1 w-full cursor-pointer truncate rounded-md p-1 px-2 text-lg"
            @mouseenter="chooseSnippetsIndex = index"
            @click="select"
          >
            <div class="flex-between">
              <code>
                {{ snippet.title }}
              </code>
              <div class="flex-center w-10 shrink-0 gap-1">
                <Command class="size-4" />
                {{ index + 1 }}
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  </div>
</template>
