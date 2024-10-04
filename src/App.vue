<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
</script>

<template>
  <div data-tauri-drag-region />

  <div class="size-full">
    <input
      v-model="value"
      placeholder="输入代码片段标题"
      class="h-10 w-full rounded-lg border-2 border-red-300 p-2 text-xl font-bold hover:bg-slate-100"
    >
  </div>
</template>
