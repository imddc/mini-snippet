<script setup lang="ts">
import type { SnippetV2 } from '@/types/snippet'
import { useSettingStore } from '@/store/settingStore'
import { Egg } from 'lucide-vue-next'
import { codeToHtml } from 'shiki'
import { ref, watchEffect } from 'vue'

const props = defineProps<{
  selectedSnippet: SnippetV2 | null
}>()

const settingStore = useSettingStore()

const codeHTML = ref('')
const loading = ref(false)

async function highlightCode(code: string) {
  loading.value = true
  const res = await codeToHtml(code, {
    lang: 'javascript',
    theme: settingStore.getCodeTheme(),
  })

  loading.value = false
  codeHTML.value = res
  return res
}

watchEffect(() => {
  if (props.selectedSnippet) {
    highlightCode(props.selectedSnippet.content)
  }
})
</script>

<template>
  <div class="h-full">
    <template v-if="selectedSnippet">
      <div class="h-full min-w-0 flex-1 grow-0 overflow-auto rounded-lg bg-gray-900/90 p-4 shadow-md">
        <div
          v-if="!loading"
          class="text-ellipsis text-sm"
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
