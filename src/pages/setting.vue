<script setup lang="ts">
import type { BundledTheme } from 'shiki'
import Header from '@/components/content/Header.vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import SelectContent from '@/components/ui/select/SelectContent.vue'
import { Switch } from '@/components/ui/switch'
import { useSettingStore } from '@/store/settingStore'
import { disable, enable } from '@tauri-apps/plugin-autostart'
import { BaseDirectory, readFile } from '@tauri-apps/plugin-fs'
import { bundledThemesInfo } from 'shiki'
import { ref, watch } from 'vue'
import { toast } from 'vue-sonner'

const settingStore = useSettingStore()

const test = ref<Record<string, string>>({})

function updateCodeTheme(theme: string) {
  settingStore.setCodeTheme(theme as BundledTheme)
}

async function loadLocal() {
  const input = document.createElement('input')
  input.type = 'file'
  input.click()
  input.addEventListener('change', async () => {
    if (input.files) {
      const file = input.files[0]
      if (!file.name.endsWith('.json')) {
        toast.error('only support json file')
        return
      }
      const text = await file.text()
      test.value = JSON.parse(text)

      console.log(test.value)
    }
  })
  input.remove()
}

function saveLocal() {
}

watch(() => settingStore.autoStart, async (val) => {
  if (val) {
    await enable()
  }
  else {
    await disable()
  }
})
</script>

<template>
  <div class="setting-animate-gradient min-h-screen rounded-lg">
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

      <!-- 快捷键 -->
      <Card>
        <CardHeader>
          <CardTitle>
            Shortcut
          </CardTitle>
          <CardDescription>input a shortcut</CardDescription>
        </CardHeader>
        <CardContent>
          <Input placeholder="input a shortcut" />
        </CardContent>
      </Card>

      <!-- 本地化 -->
      <Card>
        <CardHeader>
          <CardTitle>
            Local
          </CardTitle>
          <CardDescription>config local</CardDescription>
        </CardHeader>
        <CardContent class="flex items-center gap-2">
          <Button size="sm" variant="outline" @click="loadLocal">
            load
          </Button>
          <Button size="sm" variant="outline" @click="saveLocal">
            save
          </Button>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
