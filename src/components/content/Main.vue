<script setup lang="ts">
import type { CategoryV2, SnippetV2 } from '@/types/snippet'
import CategoryEditDialog from '@/components/common/CategoryEditDialog.vue'
import Actions from '@/components/content/Actions.vue'
import CodeShow from '@/components/content/CodeShow.vue'
import Search from '@/components/content/Search.vue'
import SnippetsEditor from '@/components/content/SnippetsEditor.vue'
import ScrollArea from '@/components/ui/scroll-area/ScrollArea.vue'
import { useSnippetsStoreWithOut } from '@/store/snippetsStoreV2'
import { Egg, Folder, FolderPlus } from 'lucide-vue-next'
import { storeToRefs } from 'pinia'
import { computed, ref, watch } from 'vue'
import { toast } from 'vue-sonner'

const snippetsStore = useSnippetsStoreWithOut()
const { snippets, categories } = storeToRefs(snippetsStore)

const searchValue = ref('')
const selectedCategory = ref(snippetsStore.getCategories()[0])

// all snippets of selected category
const selectedSnippet = ref<SnippetV2 | null>(null)

// use to shown in snippet titles
const shownSnippets = computed(() => {
  if (searchValue.value) {
    return snippetsStore.matchSnippets(
      selectedCategory.value.name,
    )
  }
  return snippetsStore.getSnippets(selectedCategory.value.id)
})

const isDialogOpen = ref(false)
const dialogCategory = ref<CategoryV2 | null>(null)

function selectCategory(categoryId: string) {
  const category = snippetsStore.getCategory(categoryId)
  if (category) {
    selectedCategory.value = category
    selectedSnippet.value = snippetsStore.getSnippets(categoryId)[0]
  }
}

function addCategory() {
  dialogCategory.value = null
  isDialogOpen.value = true
}

function editCategory(categoryId: string) {
  const category = snippetsStore.getCategory(categoryId)
  if (category) {
    dialogCategory.value = { ...category }
    isDialogOpen.value = true
  }
}

function deleteCategory(categoryId: string) {
  snippetsStore.deleteCategory(categoryId)
}

function handleCategoryChange(value: CategoryV2 | null) {
  if (value) {
    if (dialogCategory.value) {
      snippetsStore.updateCategory(dialogCategory.value.id, value.name)
    }
    else {
      snippetsStore.addCategory(value.name)
    }
  }

  isDialogOpen.value = false
  dialogCategory.value = null
}

const isEditorOpen = ref(false)
const editorSnippet = ref<SnippetV2 | null>(null)

function selectSnippet(snippetId: string) {
  const snippet = snippetsStore.getSnippet(snippetId)
  if (snippet) {
    selectedSnippet.value = snippet
  }
}

function createSnippet() {
  isEditorOpen.value = false
  setTimeout(() => {
    editorSnippet.value = null
    isEditorOpen.value = true
  })
}

function updateSnippet(snippetId: string) {
  const snippet = snippetsStore.getSnippet(snippetId)
  if (snippet) {
    isEditorOpen.value = false
    setTimeout(() => {
      editorSnippet.value = { ...snippet }
      isEditorOpen.value = true
    })
  }
}

function deleteSnippet(snippetId: string) {
  snippetsStore.deleteSnippet(snippetId)
  toast('delete success')
}

function handleSnippetChange(snippet: Omit<SnippetV2, 'id'>) {
  if (!snippet) {
    return
  }
  if (editorSnippet.value) {
    snippetsStore.updateSnippet({
      ...snippet,
      id: editorSnippet.value.id,
    })
    toast('update success')
  }
  else {
    snippetsStore.addSnippet(snippet)
    toast('add success')
  }

  isEditorOpen.value = false
  editorSnippet.value = null
}

watch(
  () => selectedSnippet.value,
  (value) => {
    if (value) {
      isEditorOpen.value = false
    }
  },
)
</script>

<template>
  <div class="p-4 pt-0">
    <div class="flex h-[calc(100vh-1rem-var(--content-header-height))] gap-2">
      <!-- 左侧导航菜单 -->
      <div class="flex w-80 shrink-0 gap-2 text-sm text-white">
        <!-- 大分类 -->
        <div class="category-wrap w-2/5">
          <div
            class="flex-center h-8 w-full cursor-pointer gap-2 border-b border-gray-500 bg-gray-700/90"
            @click="addCategory"
          >
            <div class="flex-center size-5 text-gray-400" title="add category">
              <FolderPlus class="size-full" />
            </div>
          </div>
          <ScrollArea class="size-full h-[calc(100%-2rem)] p-2">
            <div
              v-for="category in categories"
              :key="category.id"
              :class="{ 'bg-gray-800': selectedCategory === category }"
              :title="category.name"
              class="group mb-1 flex cursor-pointer items-center gap-1 rounded p-1 pr-2 transition hover:bg-gray-800"
              @click.prevent="selectCategory(category.id)"
            >
              <div class="flex flex-1 items-center gap-1 truncate">
                <Folder class="size-3 shrink-0" />

                <span class="truncate group-hover:max-w-[calc(100%-3rem)]">
                  {{ category.name }}
                </span>
              </div>

              <div class="absolute right-3 opacity-0 group-hover:opacity-100">
                <Actions
                  :edit="true"
                  :delete="true"
                  @edit="editCategory(category.id)"
                  @delete="deleteCategory(category.id)"
                />
              </div>
            </div>
          </ScrollArea>
        </div>

        <!-- 细分类别 -->
        <div class="category-wrap w-3/5">
          <Search v-model:search-value="searchValue" @add-snippets="createSnippet" />

          <ScrollArea class="h-[calc(100%-2rem)] p-2 pb-1">
            <template v-if="!snippets.length && !searchValue">
              <div class="flex-col-center mt-12 gap-2 text-gray-500">
                <Egg class="size-10" />
                <p class="text-center">
                  not found
                </p>
              </div>
            </template>
            <template v-else>
              <div
                v-for="snippet in shownSnippets"
                :key="snippet.id"
                :class="{ 'bg-gray-800': selectedSnippet === snippet }"
                :title="snippet.title"
                class="group relative mb-1 flex cursor-pointer items-center truncate rounded p-1 px-2 transition-colors hover:bg-gray-800"
                @click="() => selectSnippet(snippet.id)"
              >
                <span class="truncate group-hover:max-w-[calc(100%-2rem)]">
                  {{ snippet.title }}
                </span>

                <div class="absolute right-1 flex gap-1 opacity-0 group-hover:opacity-100">
                  <Actions
                    :edit="true"
                    :delete="true"
                    @edit="() => updateSnippet(snippet.id)"
                    @delete="() => deleteSnippet(snippet.id)"
                  />
                </div>
              </div>
            </template>
          </ScrollArea>
        </div>
      </div>

      <!-- 代码区域 -->
      <div class="h-full flex-1 overflow-hidden">
        <template v-if="isEditorOpen">
          <SnippetsEditor
            :editing-snippet="editorSnippet"
            @close="isEditorOpen = false"
            @change="handleSnippetChange"
          />
        </template>
        <template v-else>
          <CodeShow :selected-snippet="selectedSnippet" />
        </template>
      </div>
    </div>

    <CategoryEditDialog
      v-if="isDialogOpen"
      :category="dialogCategory"
      @close="isDialogOpen = false"
      @change="handleCategoryChange"
    />
  </div>
</template>
