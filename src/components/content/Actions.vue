<script setup lang="ts">
import { Pencil, Trash } from 'lucide-vue-next'

defineProps<{
  edit: boolean
  delete: boolean
}>()

defineEmits<{
  edit: []
  delete: []
}>()
</script>

<template>
  <div class="flex gap-1">
    <div
      class="cursor-pointer rounded-md bg-gray-500/50 p-1 transition hover:bg-gray-600/50 hover:text-blue-500"
      @click.stop="() => $emit('edit')"
    >
      <Pencil class="size-3" />
    </div>
    <div
      class="cursor-pointer rounded-md bg-gray-500/50 p-1 transition hover:bg-gray-600/50 hover:text-red-500"
      @click.stop="() => $emit('delete')"
    >
      <Trash class="size-3" />
    </div>
  </div>
</template>

<style scoped>

</style>
