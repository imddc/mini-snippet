<script setup lang="ts">
import type { SnippetV2 } from '@/types/snippet'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useSnippetsStoreWithOut } from '@/store/snippetsStoreV2'
import { ref } from 'vue'
import { toast } from 'vue-sonner'

type SnippetV2WithoutId = Omit<SnippetV2, 'id'>

const props = withDefaults(defineProps<{
  editingSnippet: SnippetV2 | null
}>(), {})

const emit = defineEmits<{
  close: []
  change: [SnippetV2WithoutId]
}>()

const snippetsStore = useSnippetsStoreWithOut()

const snippet = ref<SnippetV2WithoutId>(props.editingSnippet || {
  categoryId: '',
  title: '',
  content: '',
})

function change() {
  if (snippet.value.categoryId && snippet.value.title && snippet.value.content) {
    emit('change', snippet.value)
  }
  else {
    toast.error('Please fill in all fields')
  }
}
</script>

<template>
  <div class="flex h-full flex-col rounded-lg bg-gray-900/90 p-4">
    <div class="mb-4 text-lg font-bold">
      {{ props.editingSnippet ? 'update' : 'add' }}
    </div>
    <div class="mb-4 grid grid-cols-2 gap-4">
      <div>
        <label for="category" class="mb-2 block text-sm font-medium text-gray-400">category</label>
        <Select v-model="snippet.categoryId">
          <SelectTrigger class="w-full">
            <SelectValue placeholder="Select a category" class="placeholder:text-gray-400" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem
              v-for="category in snippetsStore.getCategories()"
              :key="category.id"
              :value="category.id"
            >
              {{ category.name }}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <label for="title" class="mb-2 block text-sm font-medium text-gray-400">title</label>
        <Input id="title" v-model="snippet.title" placeholder="Enter snippet title" class="h-8 w-full placeholder:text-gray-400" />
      </div>
    </div>
    <div class="mb-4 grow">
      <label for="content" class="mb-2 block text-sm font-medium text-gray-400">content</label>
      <ScrollArea class="h-[calc()]">
        <Textarea
          id="content"
          v-model="snippet.content"
          placeholder="enter your code snippet here"
          class="size-full min-h-[200px] resize-none font-mono placeholder:text-gray-400"
          :rows="13"
        />
      </ScrollArea>
    </div>
    <div class="flex justify-end space-x-4">
      <Button variant="outline" size="sm" @click="$emit('close')">
        Cancel
      </Button>
      <Button variant="outline" size="sm" @click="change">
        Save
      </Button>
    </div>
  </div>
</template>
