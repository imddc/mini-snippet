<script setup lang="ts">
import type { BundledTheme } from 'shiki'
import Header from '@/components/content/Header.vue'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Select, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import SelectContent from '@/components/ui/select/SelectContent.vue'
import { Switch } from '@/components/ui/switch'
import { useSettingStore } from '@/store/settingStore'
import { disable, enable } from '@tauri-apps/plugin-autostart'
import { bundledThemesInfo } from 'shiki'
import { watchEffect } from 'vue'

const settingStore = useSettingStore()

function updateCodeTheme(theme: string) {
  settingStore.setCodeTheme(theme as BundledTheme)
}

watchEffect(async () => {
  if (settingStore.autoStart) {
    await enable()
  }
  else {
    disable()
  }
})
</script>

<template>
  <div class="content-animate-gradient min-h-screen rounded-lg">
    <!-- 控制按钮区域 -->
    <Header />

    <div class="grid grid-cols-1 gap-4 p-4 pt-0 md:grid-cols-2 lg:grid-cols-3">
      <!-- 开机启动 -->
      <Card>
        <CardHeader>
          <CardTitle>
            Auto Start
          </CardTitle>
          <CardDescription>
            enable auto start
          </CardDescription>
        </CardHeader>
        <CardContent class="flex items-center gap-2">
          <Switch
            id="autoStart"
            :checked="settingStore.getAutoStart()"
            @update:checked="settingStore.setAutoStart"
          />
          <Label for="autoStart" class="text-xl">
            {{ settingStore.autoStart ? 'Enabled' : 'Disabled' }}
          </Label>
        </CardContent>
      </Card>
      <!-- 代码主题 -->
      <Card>
        <CardHeader>
          <CardTitle>
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
