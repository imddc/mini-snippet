<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useSnippetsStoreWithOut } from '@/store/snippetsStore'
import { ref } from 'vue'
import { toast } from 'vue-sonner'

const props = defineProps<{
  category: string
}>()

const emit = defineEmits<{
  close: []
}>()

const snippetsStore = useSnippetsStoreWithOut()

const value = ref(props.category)

function handleCategory() {
  if (!value.value) {
    toast.error('category name is required')
    return
  }

  if (props.category) {
    // update
    snippetsStore.updateCategory(props.category, value.value)
    toast.success('update category success')
  }

  else {
    // add
    snippetsStore.addCategory(value.value)
    toast.success('add category success')
  }

  emit('close')
}
</script>

<template>
  <Dialog open>
    <DialogTrigger as-child>
      <slot />
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>
          {{ props.category ? 'update category' : 'add category' }}
        </DialogTitle>
      </DialogHeader>

      <Input
        v-model.trim="value"
        placeholder="category name"
        class="mt-4 ring-1 ring-gray-500"
      />

      <DialogFooter>
        <Button size="sm" variant="outline" @click="$emit('close')">
          cancel
        </Button>
        <Button size="sm" variant="outline" @click="handleCategory">
          submit
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
