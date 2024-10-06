<script setup lang="ts">
import type { SnippetEditor } from '@/types/snippet'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useSnippetsStoreWithOut } from '@/store/snippetsStore'
import { storeToRefs } from 'pinia'
import { onUpdated, ref } from 'vue'

const props = withDefaults(defineProps<{
  editingSnippet?: SnippetEditor
}>(), {})

const emit = defineEmits<{
  (e: 'close'): void
}>()

const snippetsStore = useSnippetsStoreWithOut()
const { isCreatingSnippet } = storeToRefs(snippetsStore)

const snippet = ref(props.editingSnippet || {
  category: '',
  title: '',
  content: '',
})

const categories = snippetsStore.getCategories()
function saveSnippet() {
  if (snippet.value.category && snippet.value.title && snippet.value.content) {
    if (isCreatingSnippet.value) {
      snippetsStore.addSnippet(snippet.value)
    }
    else {
      snippetsStore.updateSnippet(snippet.value)
    }
    emit('close')
  }
  else {
    // 这里可以添加错误提示
    console.error('Please fill in all fields')
  }
}

function cancelEdit() {
  emit('close')
}

onUpdated(() => {
  if (props.editingSnippet) {
    snippet.value = props.editingSnippet
  }
})
</script>

<template>
  <div class="flex h-full flex-col rounded-lg bg-gray-900/90 p-4">
    <div class="mb-4 grid grid-cols-2 gap-4">
      <div>
        <label for="category" class="mb-2 block text-sm font-medium text-gray-400">category</label>
        <Select v-model="snippet.category">
          <SelectTrigger class="w-full">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem v-for="category in categories" :key="category" :value="category">
              {{ category }}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <label for="title" class="mb-2 block text-sm font-medium text-gray-400">title</label>
        <Input id="title" v-model="snippet.title" placeholder="Enter snippet title" class="h-8 w-full" />
      </div>
    </div>
    <div class="mb-4 grow">
      <label for="content" class="mb-2 block text-sm font-medium text-gray-400">content</label>
      <ScrollArea class="h-[calc(100vh-300px)]">
        <Textarea
          id="content" v-model="snippet.content" placeholder="enter your code snippet here"
          class="size-full min-h-[200px] resize-none font-mono"
        />
      </ScrollArea>
    </div>
    <div class="flex justify-end space-x-4">
      <Button variant="outline" size="sm" @click="cancelEdit">
        cancel
      </Button>
      <Button variant="outline" size="sm" @click="saveSnippet">
        {{ isCreatingSnippet ? 'create' : 'update' }} snippet
      </Button>
    </div>
  </div>
</template>
