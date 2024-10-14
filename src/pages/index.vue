<script setup lang="ts">
import type { SnippetV2 } from '@/types/snippet'
import Input from '@/components/ui/input/Input.vue'
import ScrollArea from '@/components/ui/scroll-area/ScrollArea.vue'
import { useKeyMaps } from '@/composables/useKeyMaps'
import { Events } from '@/constants/eventEnums'
import { useSnippetsStore } from '@/store/snippetsStoreV2'
import { useWindowStoreWithOut } from '@/store/windowStore'
import { emitEvent, useEvent } from '@/utils/eventHandler'
import { invoke } from '@tauri-apps/api/core'
import { listen } from '@tauri-apps/api/event'
import { writeText } from '@tauri-apps/plugin-clipboard-manager'
import { Command, EggIcon } from 'lucide-vue-next'
import { computed, onMounted, ref, useTemplateRef, watch } from 'vue'

const snippetsStore = useSnippetsStore()
const windowStore = useWindowStoreWithOut()

const searchValue = ref('')
const searchInputRef = useTemplateRef<InstanceType<typeof Input>>('searchInputRef')

const chooseSnippetsIndex = ref(0)
const foundSnippets = ref<SnippetV2[]>([])

function goContent() {
  emitEvent(Events.OPEN_CONTENT_WINDOW)
}

function getCategoryName(id: string) {
  return snippetsStore.getCategory(id)
}

async function pasteMock(content: string) {
  await writeText(content)
  await invoke('paste_mock')
}

const selectedSnippet = computed(() => foundSnippets.value?.[chooseSnippetsIndex.value])
async function select(numberKey?: string) {
  if (!selectedSnippet.value) {
    return
  }

  if (numberKey) {
    if (foundSnippets.value.length) {
      chooseSnippetsIndex.value = Number.parseInt(numberKey) - 1
      const res = foundSnippets.value[chooseSnippetsIndex.value]
      await pasteMock(res.content)
    }
  }
  else {
    await pasteMock(selectedSnippet.value.content)
  }
  // quit()
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

watch(
  () => windowStore.isMainWindowShow,
  (val) => {
    if (val) {
      searchInputRef.value?.setFocus()
    }
  },
)

watch(
  () => searchValue.value,
  (val) => {
    foundSnippets.value = val
      ? snippetsStore.matchSnippets(val)
      : []

    emitEvent(Events.CHANGE_MAIN_WINDOW_HEIGHT, foundSnippets.value.length || 0)
    chooseSnippetsIndex.value = 0
  },
  {
    immediate: true,
  },
)

onMounted(async () => {
  useEvent(Events.CLOSE_MAIN_WINDOW, () => {
    searchValue.value = ''
  })

  await listen(Events.STORE_MUTATION, () => {
    snippetsStore.syncData()
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
          ref="searchInputRef" v-model.trim="searchValue" placeholder="input here ..."
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
      <div v-if="foundSnippets.length" class="text-slate-300 backdrop-blur">
        <ScrollArea class="pr-3" :style="{ height: `${60 * foundSnippets.length}px` }">
          <div
            v-for="(snippet, index) in foundSnippets" :key="snippet.id"
            :class="index === chooseSnippetsIndex ? 'bg-gray-300/50' : ''"
            class="mt-1 w-full cursor-pointer truncate rounded-md p-1 px-2 text-lg"
            @mouseenter="chooseSnippetsIndex = index" @click="() => select()"
          >
            <div class="flex-between">
              <div class="truncate text-lg">
                {{ snippet.title }}
              </div>
              <div class="flex-center w-10 shrink-0 gap-1">
                <Command class="size-4" />
                {{ index + 1 }}
              </div>
            </div>

            <div class="flex items-center gap-2 text-sm">
              <span class="min-w-10 rounded-lg bg-pink-500/50 p-1 py-0 text-center text-xs text-slate-300">
                {{ getCategoryName(snippet.categoryId)?.name }}
              </span>
              <code class="truncate">{{ snippet.content }}</code>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  </div>
</template>
