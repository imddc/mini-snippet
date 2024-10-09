<script setup lang="ts">
import type { CategoryV2 } from '@/types/snippet'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { ref } from 'vue'
import { toast } from 'vue-sonner'

const { category } = defineProps<{
  category: CategoryV2 | null
}>()

const emit = defineEmits<{
  close: []
  change: [value: CategoryV2]
}>()

const value = ref(category || { id: '', name: '' })

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
    <DialogTrigger as-child>
      <slot />
    </DialogTrigger>
    <DialogContent aria-describedby="category-edit-dialog-description">
      <DialogHeader>
        <DialogTitle>
          {{ category ? 'update category' : 'add category' }}
        </DialogTitle>
      </DialogHeader>

      <Input
        v-model.trim="value.name"
        placeholder="category name"
        class="mt-4 ring-1 ring-gray-500"
      />

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
