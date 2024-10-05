<script setup lang="ts">
import { snippets } from '@/constants/mockData'
import { computed, ref } from 'vue'

const categories = ref(Object.keys(snippets))
const selectedCategory = ref(categories.value[0])
const subcategories = computed(() => Object.keys(snippets[selectedCategory.value] || {}))
const selectedSubcategory = ref('')
const selectedSnippet = computed(() => {
  if (selectedCategory.value && selectedSubcategory.value) {
    return snippets[selectedCategory.value][selectedSubcategory.value] || 'Select a snippet'
  }
  return 'Select a category and subcategory'
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
  <div class="min-h-screen rounded-lg bg-gradient-to-br from-purple-700 to-blue-500">
    <!-- 控制按钮区域 -->
    <div data-tauri-drag-region class="flex-between h-[var(--header-height)] cursor-pointer p-4">
      <button class="rounded bg-blue-600 px-4 py-2 text-white transition duration-300 hover:bg-blue-700">
        Add New Snippet
      </button>
    </div>

    <!-- 内容区域 -->
    <div class="p-4">
      <div class="flex h-[calc(100vh-2rem-var(--header-height))] gap-2">
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
            <ul class="flex-1">
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
        <div class="h-full min-w-0 flex-1 shrink-0 overflow-x-auto rounded-lg bg-gray-900/90 p-4 shadow-md">
          <pre class="text-white">
            <code class="min-w-0 text-ellipsis text-sm">
              {{ selectedSnippet }}
            </code>
          </pre>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
:root {
  --header-height: 80px;
}

.animate-gradient-x {
  background-size: 400% 400%;
  animation: gradient-x 5s ease infinite;
}

@keyframes gradient-x {
  0%,
  100% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }
}
</style>
