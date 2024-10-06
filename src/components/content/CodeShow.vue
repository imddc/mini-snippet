<script setup lang="ts">
import hljs from 'highlight.js'
import { Egg } from 'lucide-vue-next'
import 'highlight.js/styles/github-dark.min.css'

defineProps<{
  selectedSnippet?: string
}>()

function highlightCode(code: string) {
  return hljs.highlightAuto(code).value
}
</script>

<template>
  <div class="h-full">
    <template v-if="selectedSnippet">
      <div class="h-full min-w-0 flex-1 grow-0 overflow-auto rounded-lg bg-gray-900/90 p-4 shadow-md">
        <pre class="text-white">
          <code class="text-ellipsis text-sm" v-html="highlightCode(selectedSnippet)" />
        </pre>
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
