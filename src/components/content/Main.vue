<script setup lang="ts">
import CodeShow from '@/components/content/CodeShow.vue'
import ScrollArea from '@/components/ui/scroll-area/ScrollArea.vue'
import { useSnippetsStoreWithOut } from '@/store/snippetsStore'
import { PlusIcon } from 'lucide-vue-next'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'

const snippetsStore = useSnippetsStoreWithOut()
const { snippets } = storeToRefs(snippetsStore)

const categories = ref(Object.keys(snippets.value))
const selectedCategory = ref(categories.value[0])

const subcategories = computed(() => Object.keys(snippets.value[selectedCategory.value] || {}))
const selectedSubcategory = ref('')

const selectedSnippet = computed(() => {
  if (selectedCategory.value && selectedSubcategory.value) {
    return snippets.value[selectedCategory.value][selectedSubcategory.value]
  }
  return ''
})

function selectCategory(category: string) {
  selectedCategory.value = category
  selectedSubcategory.value = ''
}

function selectSubcategory(subcategory: string) {
  selectedSubcategory.value = subcategory
}
</script>

<template>
  <div class="p-4 pt-0">
    <div class="flex h-[calc(100vh-1rem-var(--content-header-height))] gap-2">
      <!-- 左侧导航菜单 -->
      <div class="flex w-64 shrink-0 gap-2 text-white">
        <!-- 大分类 -->
        <div class="category-wrap">
          <ScrollArea class="size-full p-2">
            <div
              v-for="category in categories"
              :key="category"
              :class="{ 'bg-gray-800': selectedCategory === category }"
              :title="category"
              class="mt-1 cursor-pointer truncate rounded p-1 transition hover:bg-gray-800"
              @click="selectCategory(category)"
            >
              {{ category }}
            </div>
          </ScrollArea>
        </div>

        <!-- 细分类别 -->
        <div class="category-wrap">
          <ScrollArea class="h-[calc(100%-2rem)] p-2">
            <div
              v-for="subcategory in subcategories"
              :key="subcategory"
              :class="{ 'bg-gray-800': selectedSubcategory === subcategory }"
              :title="subcategory"
              class="mt-1 cursor-pointer truncate rounded p-1 transition hover:bg-gray-800"
              @click="selectSubcategory(subcategory)"
            >
              {{ subcategory }}
            </div>
          </ScrollArea>

          <div class="flex-center mt-1 h-7 gap-2 bg-gray-200/50 p-2">
            <PlusIcon class="size-4" />
            <span class="text-sm">Add</span>
          </div>
        </div>
      </div>

      <!-- 代码区域 -->
      <div class="h-full flex-1 overflow-hidden">
        <CodeShow :selected-snippet="selectedSnippet" />
      </div>
    </div>
  </div>
</template>
