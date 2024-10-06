<script setup lang="ts">
import { Toaster } from '@/components/ui/sonner'
</script>

<template>
  <div>
    <RouterView v-slot="{ Component }">
      <KeepAlive>
        <Transition name="fade">
          <component :is="Component" />
        </Transition>
      </KeepAlive>
    </RouterView>

    <Toaster theme="dark" />
  </div>
</template>
