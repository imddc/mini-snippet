<script setup lang="ts">
import CodeShow from '@/components/content/CodeShow.vue'
import Search from '@/components/content/Search.vue'
import SnippetsEditor from '@/components/content/SnippetsEditor.vue'
import ScrollArea from '@/components/ui/scroll-area/ScrollArea.vue'
import { useSnippetsStoreWithOut } from '@/store/snippetsStore'
import { Egg, FolderPlus, Pencil, Trash } from 'lucide-vue-next'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import { toast } from 'vue-sonner'

const snippetsStore = useSnippetsStoreWithOut()
const { snippets, isSnippetsEditing, editingSnippet } = storeToRefs(snippetsStore)

const categories = ref(Object.keys(snippets.value))
const selectedCategory = ref(categories.value[0])

const snippetsTitles = ref(Object.keys(snippets.value[selectedCategory.value] || {}))
const selectedSnippetsTitle = ref('')

// 刷新细分类别
function refreshSnippetsTitles() {
  snippetsTitles.value = Object.keys(snippets.value[selectedCategory.value] || {})
}

const selectedSnippet = computed(() => {
  if (selectedCategory.value && selectedSnippetsTitle.value) {
    return snippets.value[selectedCategory.value][selectedSnippetsTitle.value]
  }
  return ''
})

function selectCategory(category: string) {
  selectedCategory.value = category
  selectedSnippetsTitle.value = ''
  snippetsTitles.value = Object.keys(snippets.value[selectedCategory.value] || {})
}

function selectSnippetsTitle(title: string) {
  selectedSnippetsTitle.value = title
}

// 搜索相关
function handleSearch(searchValue: string) {
  snippetsTitles.value = snippetsStore.matchSnippetsByTitleAndCategory(
    searchValue,
    selectedCategory.value,
  )
}

function handleAddSnippets() {
  snippetsStore.startCreatingSnippet()
}

// 创建完成后更新列表
function handleEditorClose() {
  refreshSnippetsTitles()
}

function handleEditSnippets(category: string, title: string) {
  snippetsStore.startUpdatingSnippet({
    category,
    title,
    content: snippets.value[category][title],
  })
  refreshSnippetsTitles()
}

function handleDeleteSnippets(category: string, title: string) {
  if (selectedCategory.value === category && selectedSnippetsTitle.value === title) {
    snippetsStore.deleteSnippet(category, title)
    refreshSnippetsTitles()
    selectedSnippetsTitle.value = snippetsTitles.value.length > 0 ? snippetsTitles.value[0] : ''

    toast('delete success')
  }
}

function handleAddCategory() {
  console.log('add category')
}
</script>

<template>
  <div class="p-4 pt-0">
    <div class="flex h-[calc(100vh-1rem-var(--content-header-height))] gap-2">
      <!-- 左侧导航菜单 -->
      <div class="flex w-64 shrink-0 gap-2 text-sm text-white">
        <!-- 大分类 -->
        <div class="category-wrap w-2/5">
          <div
            class="flex-center h-8 w-full cursor-pointer gap-2 border-b border-gray-500 bg-gray-700/90"
            @click="handleAddCategory"
          >
            <div class="flex-center size-5 text-gray-400" title="add category">
              <FolderPlus class="size-full" />
            </div>
          </div>

          <ScrollArea class="size-full h-[calc(100%-2rem)] p-2">
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
          <Search @search="handleSearch" @add-snippets="handleAddSnippets" />

          <ScrollArea class="h-[calc(100%-2rem)] p-2 pb-1">
            <template v-if="snippetsTitles.length === 0">
              <div class="flex-col-center mt-12 gap-2 text-gray-500">
                <Egg class="size-10" />
                <p class="text-center">
                  not found
                </p>
              </div>
            </template>
            <template v-else>
              <div
                v-for="title in snippetsTitles"
                :key="title"
                :class="{ 'bg-gray-800': selectedSnippetsTitle === title }"
                :title="title"
                class="group relative mb-1 flex cursor-pointer items-center truncate rounded p-1 px-2  transition-colors hover:bg-gray-800"
                @click="selectSnippetsTitle(title)"
              >
                <span class="truncate group-hover:max-w-[calc(100%-2rem)]">
                  {{ title }}
                </span>

                <div class="absolute right-1 flex gap-1 opacity-0 group-hover:opacity-100">
                  <div
                    class="cursor-pointer rounded-md bg-gray-500/50 p-1 transition hover:bg-gray-600/50 hover:text-blue-500"
                    @click.prevent="() => handleEditSnippets(selectedCategory, title)"
                  >
                    <Pencil class="size-3" />
                  </div>
                  <div
                    class="cursor-pointer rounded-md bg-gray-500/50 p-1 transition hover:bg-gray-600/50 hover:text-red-500"
                    @click.prevent="() => handleDeleteSnippets(selectedCategory, title)"
                  >
                    <Trash class="size-3" />
                  </div>
                </div>
              </div>
            </template>
          </ScrollArea>
        </div>
      </div>

      <!-- 代码区域 -->
      <div class="h-full flex-1 overflow-hidden">
        <template v-if="isSnippetsEditing">
          <SnippetsEditor :editing-snippet="editingSnippet" @close="handleEditorClose" />
        </template>

        <template v-else>
          <CodeShow :selected-snippet="selectedSnippet" />
        </template>
      </div>
    </div>
  </div>
</template>
