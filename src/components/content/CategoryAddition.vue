<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useSnippetsStoreWithOut } from '@/store/snippetsStore'
import { FolderPlus } from 'lucide-vue-next'
import { ref } from 'vue'
import { toast } from 'vue-sonner'

const snippetsStore = useSnippetsStoreWithOut()
const categoryName = ref('')

function handleAddCategory() {
  snippetsStore.addCategory(categoryName.value)
  toast('add category success')
}
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <div
        class="flex-center h-8 w-full cursor-pointer gap-2 border-b border-gray-500 bg-gray-700/90"
      >
        <div class="flex-center size-5 text-gray-400" title="add category">
          <FolderPlus class="size-full" />
        </div>
      </div>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>add category</DialogTitle>
      </DialogHeader>

      <Input
        v-model="categoryName"
        placeholder="category name"
        class="mt-4 ring-1 ring-gray-500"
      />

      <DialogFooter>
        <DialogClose as-child>
          <Button size="sm" variant="outline">
            cancel
          </Button>
        </DialogClose>
        <DialogClose as-child>
          <Button size="sm" variant="outline" @click="handleAddCategory">
            submit
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
