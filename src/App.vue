<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
</script>

<template>
  <div data-tauri-drag-region />
  <div class="size-full">
    <input v-model="value" placeholder="输入代码片段标题" class="h-10 w-full font-bold text-xl border-red-300 border-2 rounded-lg p-2">
  </div>
</template>
