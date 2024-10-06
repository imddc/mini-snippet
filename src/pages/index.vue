<script setup lang="ts">
import Input from '@/components/ui/input/Input.vue'
import { Events } from '@/constants/eventEnums'
import { useSnippetsStoreWithOut } from '@/store/snippetsStore'
import { emitEvent } from '@/utils/eventHandler'
import { EggIcon } from 'lucide-vue-next'
import { ref, watchEffect } from 'vue'

const snippetsStore = useSnippetsStoreWithOut()

const subCategory = ref('')

const chooseSubCategory = ref('')
const foundSubcategories = ref<string[]>([])

function goContent() {
  emitEvent(Events.OPEN_CONTENT_WINDOW)
}

watchEffect(() => {
  foundSubcategories.value = subCategory.value ? snippetsStore.matchSubcategories(subCategory.value) : []

  if (foundSubcategories.value.length) {
    chooseSubCategory.value = foundSubcategories.value[0]
  }
})
</script>

<template>
  <div data-tauri-drag-region class="flex min-h-screen cursor-pointer flex-col items-center space-y-2 rounded-lg bg-gray-800/95 p-2 shadow-2xl backdrop-blur-lg">
    <!-- 主体 -->
    <div class="w-full max-w-2xl ">
      <div class="flex-between gap-2 p-3">
        <div class="flex-1 rounded-lg bg-pink-200 p-1">
          <Input
            v-model.trim="subCategory"
            placeholder="input code ..."
            class="h-12 text-lg ring-gray-600 focus-visible:ring-0 focus-visible:ring-offset-0"
          />

          <template v-if="foundSubcategories.length">
            <div class="w-full overflow-hidden rounded-lg backdrop-blur-lg">
              <ul
                class="space-y-1 p-2 text-lg"
              >
                <li
                  v-for="sub in foundSubcategories"
                  :key="sub"
                  :class="{ 'bg-gray-600': chooseSubCategory === sub }"
                  class="cursor-pointer truncate rounded-md p-1 hover:bg-gray-600"
                  @click="chooseSubCategory = sub"
                >
                  <code class="text-sm">
                    {{ sub }} - {{ snippetsStore.getSnippets(chooseSubCategory) }}
                  </code>
                </li>
              </ul>
            </div>
          </template>
        </div>

        <button
          class="m-2 flex size-12 items-center justify-center self-start rounded-full bg-gray-500 text-white transition duration-300 ease-in-out hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-700"
          @click="goContent"
        >
          <EggIcon class="size-5" />
        </button>
      </div>
    </div>
  </div>
</template>
