<script setup lang="ts">
import CodeShow from '@/components/content/CodeShow.vue'
import Header from '@/components/content/Header.vue'
import { useSnippetsStoreWithOut } from '@/store/snippetsStore'
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
  <div class="content-animate-gradient min-h-screen rounded-lg">
    <!-- 控制按钮区域 -->
    <Header />

    <!-- 内容区域 -->
    <div class="p-4">
      <div class="flex h-[calc(100vh-2rem-var(--content-header-height))] gap-2">
        <!-- 左侧导航菜单 -->
        <div class="flex w-64 shrink-0 gap-2 text-white">
          <!-- 大分类 -->
          <div class="category-wrap overflow-y-auto">
            <ul class="space-y-2">
              <li
                v-for="category in categories"
                :key="category"
                :class="{ 'bg-gray-800': selectedCategory === category }"
                :title="category"
                class="cursor-pointer truncate rounded p-2 hover:bg-gray-800"
                @click="selectCategory(category)"
              >
                {{ category }}
              </li>
            </ul>
          </div>

          <!-- 细分类别 -->
          <div class="category-wrap overflow-y-auto">
            <ul class="space-y-2">
              <li
                v-for="subcategory in subcategories"
                :key="subcategory"
                :class="{ 'bg-gray-800': selectedSubcategory === subcategory }"
                :title="subcategory"
                class="cursor-pointer truncate rounded p-2 hover:bg-gray-800"
                @click="selectSubcategory(subcategory)"
              >
                {{ subcategory }}
              </li>
            </ul>
          </div>
        </div>

        <!-- 代码区域 -->
        <div class="flex-1 overflow-hidden">
          <CodeShow :selected-snippet="selectedSnippet" />
        </div>
      </div>
    </div>
  </div>
</template>
