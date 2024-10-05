<script setup>
import { ref } from 'vue'

const categories = ref([
  {
    id: 1,
    name: 'JavaScript',
    isOpen: true,
    snippets: [
      { id: 1, name: '数组去重', code: 'const unique = (arr) => [...new Set(arr)];' },
      { id: 2, name: '深拷贝', code: 'const deepClone = (obj) => JSON.parse(JSON.stringify(obj));' },
    ],
  },
  {
    id: 2,
    name: 'Vue',
    isOpen: false,
    snippets: [
      { id: 3, name: '计算属性', code: 'const computed = computed(() => { /* 计算逻辑 */ });' },
      { id: 4, name: '监听器', code: 'watch(source, (newValue, oldValue) => { /* 监听逻辑 */ });' },
    ],
  },
  {
    id: 3,
    name: 'CSS',
    isOpen: false,
    snippets: [
      { id: 5, name: 'Flexbox居中', code: '.center { display: flex; justify-content: center; align-items: center; }' },
      { id: 6, name: '响应式布局', code: '@media (max-width: 768px) { /* 响应式样式 */ }' },
    ],
  },
])

const selectedSnippet = ref(null)

function selectSnippet(snippet) {
  selectedSnippet.value = snippet
}

function editSnippet() {
  // 实现编辑逻辑
  console.log('编辑片段:', selectedSnippet.value)
}

function deleteSnippet() {
  // 实现删除逻辑
  console.log('删除片段:', selectedSnippet.value)
  selectedSnippet.value = null
}
</script>

<template>
  <div class="flex h-screen bg-gray-100">
    <!-- 左侧导航菜单 -->
    <nav class="w-64 bg-gray-800 text-white">
      <div class="p-4">
        <h1 class="text-2xl font-semibold">
          代码片段管理
        </h1>
      </div>
      <ul class="mt-4">
        <li v-for="category in categories" :key="category.id" class="mb-2">
          <div
            class="flex cursor-pointer items-center justify-between px-4 py-2 hover:bg-gray-700"
            @click="category.isOpen = !category.isOpen"
          >
            <span>{{ category.name }}</span>
            <svg
              class="size-4 transition-transform" :class="{ 'rotate-180': category.isOpen }" fill="none"
              stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <ul v-if="category.isOpen" class="ml-4">
            <li
              v-for="snippet in category.snippets" :key="snippet.id"
              class="cursor-pointer px-4 py-2 hover:bg-gray-700" @click="selectSnippet(snippet)"
            >
              {{ snippet.name }}
            </li>
          </ul>
        </li>
      </ul>
    </nav>

    <!-- 右侧内容区域 -->
    <main class="flex-1 p-8">
      <div v-if="selectedSnippet" class="rounded-lg bg-white p-6 shadow-md">
        <h2 class="mb-4 text-2xl font-semibold">
          {{ selectedSnippet.name }}
        </h2>
        <div class="rounded-md bg-gray-100 p-4">
          <pre><code class="language-javascript">{{ selectedSnippet.code }}</code></pre>
        </div>
        <div class="mt-4 flex justify-end">
          <button
            class="mr-2 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600"
            @click="editSnippet"
          >
            编辑
          </button>
          <button class="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-600" @click="deleteSnippet">
            删除
          </button>
        </div>
      </div>
      <div v-else class="flex h-full items-center justify-center">
        <p class="text-xl text-gray-500">
          请选择一个代码片段
        </p>
      </div>
    </main>
  </div>
</template>

<style>
@import 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/atom-one-dark.min.css';
</style>
