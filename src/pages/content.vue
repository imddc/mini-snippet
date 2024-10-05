<script setup>
import { getCurrentWindow } from '@tauri-apps/api/window'

async function closeWindow() {
  const window = getCurrentWindow()
  await window.close()
}
</script>

<template>
  <div class="new-page">
    <div class="title-bar">
      <div class="title">
        新页面
      </div>
      <button @click="closeWindow">
        X
      </button>
    </div>
    <div class="content">
      <h1>新页面内容</h1>
      <p>这是一个在新窗口中打开的页面。</p>
      <button @click="closeWindow">
        关闭窗口
      </button>
    </div>
  </div>
</template>

<style scoped>
.new-page {
  width: 100vw;
  height: 100vh;
  background-color: #f0f4f8;
  display: flex;
  flex-direction: column;
}

.title-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #1a202c;
  color: white;
  -webkit-app-region: drag;
}

.title-bar button {
  -webkit-app-region: no-drag;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 18px;
}

.title {
  font-weight: bold;
}

.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #4299e1;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #3182ce;
}
</style>
