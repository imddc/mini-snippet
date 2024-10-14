<script setup lang="ts">
import { Toaster } from '@/components/ui/sonner'
// import { setupSystemTray } from '@/plugins/tray'
import { onMounted } from 'vue'

onMounted(async () => {
  // await setupSystemTray()
})
</script>

<template>
  <div>
    <RouterView v-slot="{ Component }">
      <KeepAlive>
        <component :is="Component" />
      </KeepAlive>
    </RouterView>

    <Toaster theme="dark" />
  </div>
</template>
