<script setup lang="ts">
import CodeShow from '@/components/content/CodeShow.vue'
import ScrollArea from '@/components/ui/scroll-area/ScrollArea.vue'
import { useSnippetsStoreWithOut } from '@/store/snippetsStore'
import { CirclePlus } from 'lucide-vue-next'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'

const snippetsStore = useSnippetsStoreWithOut()
const { snippets } = storeToRefs(snippetsStore)

const categories = ref(Object.keys(snippets.value))
const selectedCategory = ref(categories.value[0])

const snippetsTitles = computed(() => Object.keys(snippets.value[selectedCategory.value] || {}))
const selectedSnippetsTitle = ref('')

const selectedSnippet = computed(() => {
  if (selectedCategory.value && selectedSnippetsTitle.value) {
    return snippets.value[selectedCategory.value][selectedSnippetsTitle.value]
  }
  return ''
})

function selectCategory(category: string) {
  selectedCategory.value = category
  selectedSnippetsTitle.value = ''
}

function selectSnippetsTitle(title: string) {
  selectedSnippetsTitle.value = title
}
</script>

<template>
  <div class="p-4 pt-0">
    <div class="flex h-[calc(100vh-1rem-var(--content-header-height))] gap-2">
      <!-- 左侧导航菜单 -->
      <div class="flex w-64 shrink-0 gap-2 text-sm text-white">
        <!-- 大分类 -->
        <div class="category-wrap w-2/5">
          <ScrollArea class="size-full p-2">
            <div
              v-for="category in categories"
              :key="category"
              :class="{ 'bg-gray-800': selectedCategory === category }"
              :title="category"
              class="mb-1 cursor-pointer truncate rounded p-1 px-2 transition hover:bg-gray-800"
              @click="selectCategory(category)"
            >
              {{ category }}
            </div>
          </ScrollArea>
        </div>

        <!-- 细分类别 -->
        <div class="category-wrap w-3/5">
          <div class="relative h-8 border-b text-sm">
            <input
              placeholder="search..."
              class="size-full bg-gray-600/90 p-2"
            >
            <CirclePlus class="absolute right-2 top-2 size-4" />
          </div>

          <ScrollArea class="h-[calc(100%-2rem)] p-2 pb-1">
            <div
              v-for="title in snippetsTitles"
              :key="title"
              :class="{ 'bg-gray-800': selectedSnippetsTitle === title }"
              :title="title"
              class="mb-1 cursor-pointer truncate rounded p-1 px-2 transition hover:bg-gray-800"
              @click="selectSnippetsTitle(title)"
            >
              {{ title }}
            </div>
          </ScrollArea>
        </div>
      </div>

      <!-- 代码区域 -->
      <div class="h-full flex-1 overflow-hidden">
        <CodeShow :selected-snippet="selectedSnippet" />
      </div>
    </div>
  </div>
</template>
