<script setup lang="ts">
import { CirclePlus } from 'lucide-vue-next'
import { ref } from 'vue'

defineEmits<{
  search: [searchValue: string]
}>()

const searchValue = ref('')
</script>

<template>
  <div class="relative h-8 border-b text-sm">
    <input
      v-model.trim="searchValue" placeholder="search..." class="size-full bg-gray-600/90 p-2 px-4"
      @input="() => $emit('search', searchValue)"
    >
    <CirclePlus class="absolute right-2 top-2 size-4" />
  </div>
</template>

<style scoped></style>
