<script setup lang="ts">
import type { BundledTheme } from 'shiki'
import Header from '@/components/content/Header.vue'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import SelectContent from '@/components/ui/select/SelectContent.vue'
import { useSettingStore } from '@/store/settingStore'
import { bundledThemesInfo } from 'shiki'

const settingStore = useSettingStore()

function updateCodeTheme(theme: string) {
  settingStore.setCodeTheme(theme as BundledTheme)
}
</script>

<template>
  <div class="content-animate-gradient min-h-screen rounded-lg">
    <!-- 控制按钮区域 -->
    <Header />

    <div class="grid grid-cols-1 gap-4 p-4 pt-0 md:grid-cols-2 lg:grid-cols-3">
      <!-- 代码主题 -->
      <Card>
        <CardHeader>
          <CardTitle class="text-lg">
            Code Theme
          </CardTitle>
          <CardDescription>choose a code theme</CardDescription>
        </CardHeader>
        <CardContent>
          <Select
            v-model="settingStore.codeTheme"
            class="mt-2"
            @update:model-value="updateCodeTheme"
          >
            <SelectTrigger class="w-[280px]">
              <SelectValue placeholder="choose a code theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem v-for="theme in bundledThemesInfo" :key="theme.id" :value="theme.id">
                {{ theme.displayName }}
              </SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<style scoped></style>
