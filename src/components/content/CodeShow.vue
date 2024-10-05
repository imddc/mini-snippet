<script setup lang="ts">
import { Egg } from 'lucide-vue-next'

defineProps<{
  selectedSnippet: string
}>()
</script>

<template>
  <div class="h-full">
    <template v-if="selectedSnippet">
      <div class="h-full min-w-0 flex-1 grow-0 overflow-auto rounded-lg bg-gray-900/90 p-4 shadow-md">
        <pre class="text-white">
        <code class="text-ellipsis text-sm">
          {{ selectedSnippet }}
        </code>
      </pre>
      </div>
    </template>

    <template v-else>
      <div class="flex-col-center h-full gap-4 text-gray-200/90">
        <Egg class="size-10" />
        <p>Select a category and subcategory</p>
      </div>
    </template>
  </div>
</template>
