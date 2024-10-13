<script setup lang="ts">
import type { SnippetV2 } from '@/types/snippet'
import { useSettingStore } from '@/store/settingStore'
import { useSnippetsStore } from '@/store/snippetsStoreV2'
import { Egg } from 'lucide-vue-next'
import { codeToHtml } from 'shiki'
import { ref, watchEffect } from 'vue'

const props = defineProps<{
  selectedSnippet: SnippetV2 | undefined
}>()

const settingStore = useSettingStore()
const snippetStore = useSnippetsStore()

const codeHTML = ref('')
const loading = ref(false)

async function highlightCode(snippet: SnippetV2) {
  loading.value = true
  const category = snippetStore.getCategories().find(c => c.id === snippet.categoryId)!
  const res = await codeToHtml(snippet.content, {
    lang: category.lang,
    theme: settingStore.getCodeTheme(),
  })

  loading.value = false
  codeHTML.value = res
  return res
}

watchEffect(() => {
  if (props.selectedSnippet) {
    highlightCode(props.selectedSnippet)
  }
})
</script>

<template>
  <div class="h-full overflow-hidden rounded-lg shadow-md">
    <template v-if="selectedSnippet">
      <div class="size-full rounded-lg bg-gray-900/90 p-2">
        <div
          v-if="!loading"
          class="size-full !select-text overflow-x-hidden text-sm"
          v-html="codeHTML"
        />
      </div>
    </template>

    <template v-else>
      <div class="flex-col-center h-full gap-4 text-gray-200/90">
        <Egg class="size-10" />
        <p>Select a category and snippetsTitle</p>
      </div>
    </template>
  </div>
</template>
