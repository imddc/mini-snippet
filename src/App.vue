<script setup lang="ts">
import { ref } from 'vue'
import TestDialog from './components/TestDialog.vue'

const value = ref('')
</script>

<template>
  <div data-tauri-drag-region class="size-full cursor-pointer select-none p-4">
    <input
      v-model="value" placeholder="输入代码片段标题"
      class="h-12 w-full rounded-lg border-2 border-red-300 p-2 text-lg font-bold hover:bg-slate-100"
    >
    <div class="mt-2 text-center text-gray-500">
      by imddc
    </div>

    <TestDialog />
  </div>
</template>
