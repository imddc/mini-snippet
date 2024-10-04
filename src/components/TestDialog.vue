<script setup lang="ts">
import { ask, confirm, message } from '@tauri-apps/plugin-dialog'

async function handleAsk() {
  const result = await ask('title', {
    title: 'this is a ask',
    kind: 'info',
  })

  console.log(result)
}

async function handleConfirm() {
  const result = await confirm('title', {
    title: 'do you want this?',
    kind: 'error',
    okLabel: 'yes',
    cancelLabel: 'cancel',
  })
  console.log(result)
}

async function handleMessage() {
  await message('title', {
    title: 'this is a message',
    kind: 'warning',
  })
}
</script>

<template>
  <div class="flex gap-2">
    <button type="button" @click="handleAsk">
      ask
    </button>
    <button type="button" @click="handleConfirm">
      confirm
    </button>
    <button type="button" @click="handleMessage">
      message
    </button>
  </div>
</template>

<style scoped></style>
