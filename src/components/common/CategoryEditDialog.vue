<script setup lang="ts">
import type { CategoryV2 } from '@/types/snippet'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { bundledLanguagesInfo } from 'shiki'
import { ref } from 'vue'
import { toast } from 'vue-sonner'

const { category } = defineProps<{
  category: CategoryV2 | null
}>()

const emit = defineEmits<{
  close: []
  change: [value: CategoryV2]
}>()

const value = ref<CategoryV2>(category || {
  id: '',
  name: '',
  lang: 'javascript',
})

function change() {
  if (!value.value) {
    toast.error('category name is required')
    return
  }

  emit('change', value.value)
}
</script>

<template>
  <Dialog open>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          {{ category ? 'Update Category' : 'Add Category' }}
        </DialogTitle>
        <DialogDescription>
          {{ category ? 'update category' : 'add category' }}
        </DialogDescription>
      </DialogHeader>

      <div class="flex h-full gap-4">
        <Input
          v-model.trim="value.name"
          placeholder="category name"
          class="flex-1 ring-1 ring-gray-500"
          maxlength="20"
        />

        <Select v-model="value.lang">
          <SelectTrigger class="h-full w-2/5 ring-1 ring-gray-500">
            <SelectValue>{{ value.lang || 'select a language' }}</SelectValue>
          </SelectTrigger>
          <SelectContent class="max-h-[200px] overflow-auto">
            <SelectItem
              v-for="lang in bundledLanguagesInfo"
              :key="lang.id"
              :value="lang.id"
            >
              {{ lang.name }}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <DialogFooter>
        <Button size="sm" variant="outline" @click="$emit('close')">
          cancel
        </Button>
        <Button size="sm" variant="outline" @click="change">
          submit
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
