<script setup lang="ts">
import { CirclePlus } from 'lucide-vue-next'
import { ref } from 'vue'

defineEmits<{
  search: [searchValue: string]
  addSnippets: []
}>()

const searchValue = ref('')
</script>

<template>
  <div class="relative h-8 border-b text-sm">
    <input
      v-model.trim="searchValue" placeholder="search..." class="size-full bg-gray-600/90 py-2 pl-4 pr-7"
      @input="() => $emit('search', searchValue)"
    >
    <CirclePlus
      class="absolute right-2 top-2 size-4 cursor-pointer"
      @click="$emit('addSnippets')"
    />
  </div>
</template>

<style scoped></style>
