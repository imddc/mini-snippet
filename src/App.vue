<script setup lang="ts">
import {ref} from 'vue'
const value = ref("")
</script>

<template>
  <div data-tauri-drag-region class="titlebar"></div>
  <div class="container">
     <input v-model="value" placeholder="输入代码片段标题" />
  </div>
</template>


<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;

  input {
    height: 40px;
    width: 98%;
    margin: 0;
    padding: 5px;
    border-radius: 5px;
    border: 1px solid skyblue;
    font-size: large;
  }
}
</style>
