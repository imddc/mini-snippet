<script setup lang="ts">
import Actions from '@/components/content/Actions.vue'
import CategoryAddition from '@/components/content/CategoryAddition.vue'
import CodeShow from '@/components/content/CodeShow.vue'
import Search from '@/components/content/Search.vue'
import SnippetsEditor from '@/components/content/SnippetsEditor.vue'
import ScrollArea from '@/components/ui/scroll-area/ScrollArea.vue'
import { useSnippetsStoreWithOut } from '@/store/snippetsStore'
import { Egg, Folder } from 'lucide-vue-next'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import { toast } from 'vue-sonner'

const snippetsStore = useSnippetsStoreWithOut()
const { snippets, isSnippetsEditing, editingSnippet } = storeToRefs(snippetsStore)

const searchValue = ref('')
const selectedCategory = ref(snippetsStore.getCategories()[0])

// all snippets titles of selected category
const snippetsTitles = computed(() => snippetsStore.getSnippetsTitles(selectedCategory.value) || [])
const selectedSnippetsTitle = ref('')

// use to shown in snippet titles
const shownSnippetsTitles = computed(() => {
  if (searchValue.value) {
    return snippetsStore.matchSnippetsByTitleAndCategory(
      searchValue.value,
      selectedCategory.value,
    )
  }
  return snippetsTitles.value
})

const selectedSnippet = computed(() => {
  // handle after deleted
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
  snippetsStore.cancelCreatingSnippet()
  snippetsStore.cancelUpdatingSnippet()
  selectedSnippetsTitle.value = title
}

function handleAddSnippets() {
  snippetsStore.startCreatingSnippet()
}

// click edit button then start editing
function handleEditSnippets(category: string, title: string) {
  snippetsStore.startUpdatingSnippet({
    category,
    title,
    content: snippets.value[category][title],
  })
}

function handleEditorClose() {
  snippetsStore.cancelUpdatingSnippet()
}

function handleDeleteSnippets(category: string, title: string) {
  if (selectedCategory.value === category) {
    snippetsStore.deleteSnippet(category, title)

    // if delete the selected snippet, then select the first one
    // if titles is empty, then set empty
    if (selectedSnippetsTitle.value === title) {
      selectedSnippetsTitle.value = snippetsTitles.value.length > 0
        ? snippetsTitles.value[0]
        : ''
    }
  }

  toast('delete success')
}
</script>

<template>
  <div class="p-4 pt-0">
    <div class="flex h-[calc(100vh-1rem-var(--content-header-height))] gap-2">
      <!-- 左侧导航菜单 -->
      <div class="flex w-80 shrink-0 gap-2 text-sm text-white">
        <!-- 大分类 -->
        <div class="category-wrap w-2/5">
          <CategoryAddition />
          <ScrollArea class="size-full h-[calc(100%-2rem)] p-2">
            <div
              v-for="category in snippetsStore.getCategories()"
              :key="category"
              :class="{ 'bg-gray-800': selectedCategory === category }"
              :title="category"
              class="group mb-1 flex cursor-pointer items-center gap-1 rounded p-1 pr-2 transition hover:bg-gray-800"
              @click.prevent="selectCategory(category)"
            >
              <div class="flex flex-1 items-center gap-1 truncate">
                <Folder class="size-3 shrink-0" />

                <span class="truncate group-hover:max-w-[calc(100%-3rem)]">
                  {{ category }}
                </span>
              </div>

              <div class="absolute right-3 opacity-0 group-hover:opacity-100">
                <Actions
                  :edit="true"
                  :delete="true"
                />
              </div>
            </div>
          </ScrollArea>
        </div>

        <!-- 细分类别 -->
        <div class="category-wrap w-3/5">
          <Search v-model:search-value="searchValue" @add-snippets="handleAddSnippets" />

          <ScrollArea class="h-[calc(100%-2rem)] p-2 pb-1">
            <template v-if="!snippetsTitles.length && !searchValue">
              <div class="flex-col-center mt-12 gap-2 text-gray-500">
                <Egg class="size-10" />
                <p class="text-center">
                  not found
                </p>
              </div>
            </template>
            <template v-else>
              <div
                v-for="title in shownSnippetsTitles"
                :key="title"
                :class="{ 'bg-gray-800': selectedSnippetsTitle === title }"
                :title="title"
                class="group relative mb-1 flex cursor-pointer items-center truncate rounded p-1 px-2 transition-colors hover:bg-gray-800"
                @click="() => selectSnippetsTitle(title)"
              >
                <span class="truncate group-hover:max-w-[calc(100%-2rem)]">
                  {{ title }}
                </span>

                <div class="absolute right-1 flex gap-1 opacity-0 group-hover:opacity-100">
                  <Actions
                    :edit="true"
                    :delete="true"
                    @edit="handleEditSnippets(selectedCategory, title)"
                    @delete="handleDeleteSnippets(selectedCategory, title)"
                  />
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
