<script setup lang="ts">
import type { BundledTheme } from 'shiki'
import Header from '@/components/content/Header.vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Select, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import SelectContent from '@/components/ui/select/SelectContent.vue'
import { Switch } from '@/components/ui/switch'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useSettingStore } from '@/store/settingStore'
import { useSnippetsStore } from '@/store/snippetsStoreV2'
import { disable, enable } from '@tauri-apps/plugin-autostart'
import { BaseDirectory, writeTextFile } from '@tauri-apps/plugin-fs'
import { useKeyModifier } from '@vueuse/core'
import { CircleHelp, Command, Option, Plus, Regex } from 'lucide-vue-next'
import { bundledThemesInfo } from 'shiki'
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { toast } from 'vue-sonner'

type MethodsWithSetPrefix<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any ? (K extends `set${string}` ? K : never) : never;
}[keyof T]

const settingStore = useSettingStore()
const snippetStore = useSnippetsStore()

function updateCodeTheme(theme: string) {
  settingStore.setCodeTheme(theme as BundledTheme)
}

watch(() => settingStore.autoStart, async (val) => {
  if (val) {
    await enable()
  }
  else {
    await disable()
  }
})

// persistence
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
      const requiredKeys = Object.keys({ ...snippetStore.$state, ...settingStore.$state })
      const data = JSON.parse(text)

      const diffKeys = requiredKeys.filter(key => !(key in data))
      if (diffKeys.length > 0) {
        toast.error('invalid config file')
        return
      }

      Object.entries(data).forEach(([key, value]) => {
        if (key in snippetStore.$state) {
          const fnName = getSetFnName<typeof snippetStore>(key)
          snippetStore[fnName](value as any)
        }
        else if (key in settingStore.$state) {
          const fnName = getSetFnName<typeof settingStore>(key)
          settingStore[fnName](value as never)
        }
      })
      toast.success('load success')
    }
  })
  input.remove()
}

function getSetFnName<T extends typeof snippetStore | typeof settingStore>(key: string) {
  return `set${key.charAt(0).toUpperCase() + key.slice(1)}` as MethodsWithSetPrefix<T>
}

async function saveLocal() {
  const data: Record<string, any> = {}
  Object.entries({ ...snippetStore.$state, ...settingStore.$state }).forEach(([key, value]) => {
    data[key] = value
  })

  await writeTextFile('mini-snippet.json', JSON.stringify(data), {
    baseDir: BaseDirectory.Desktop,
  })
  toast.success('saved to desktop')
}

// shortcuts
const altKey = useKeyModifier('Alt')
const controlKey = useKeyModifier('Control')
const metaKey = useKeyModifier('Meta')

const isShortcutFocus = ref(false)
const hotKey = ref('')

const excludedKeys = ['alt', 'meta', 'control', 'shift', 'tab', 'escape', 'enter']
function testKey(e: KeyboardEvent) {
  const testRes = excludedKeys.some(excludedKey => e.key.toLowerCase().includes(excludedKey))
  // 不处理特殊按键
  if (testRes) {
    return
  }
  // 当指定修饰键按下且shortcut聚焦时,处理事件
  if (altKey.value || controlKey.value || metaKey.value) {
    if (e.code.startsWith('Key')) {
      hotKey.value = e.code.slice(3)
    }
    else if (e.code.startsWith('Digit')) {
      hotKey.value = e.code.slice(5)
    }
    else {
      hotKey.value = e.code
    }
  }
}

onMounted(() => {
  window.addEventListener('keyup', testKey)
})
onUnmounted(() => {
  window.removeEventListener('keyup', testKey)
})

watch(
  () => isShortcutFocus.value,
  (val) => {
    if (val) {
      hotKey.value = 'press'
    }
    else {
      hotKey.value = ''
    }
  },
)
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
          <Switch id="autoStart" :checked="settingStore.getAutoStart()" @update:checked="settingStore.setAutoStart" />
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
          <Select v-model="settingStore.codeTheme" class="mt-2" @update:model-value="updateCodeTheme">
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
          <div
            class="flex-center mx-auto w-fit gap-2 p-2 px-4"
            :class="{ 'ring-4 ring-blue-500': isShortcutFocus }"
            @click="isShortcutFocus = true"
          >
            <div
              class="flex items-center gap-2"
            >
              <div class="icon-wrapper" :class="{ active: (controlKey || metaKey) && isShortcutFocus }">
                <Command class="icon" />
              </div>
              <div class="icon-wrapper" :class="{ active: (altKey && isShortcutFocus) }">
                <Option class="icon" />
              </div>
            </div>
            <Plus class="size-4" />
            <div
              class="h-8 w-20 select-none rounded-md bg-background/50 px-2 py-1 text-foreground"
            >
              {{ hotKey }}
            </div>

            <TooltipProvider :delay-duration="100">
              <Tooltip>
                <TooltipTrigger as-child>
                  <div class="cursor-pointer rounded-full bg-gray-500/50 p-1 hover:bg-gray-600/50">
                    <CircleHelp class="size-4" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>type a shortcut, except modifierKey, like `Space`,`a`,`1`,`+`</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </CardContent>
      </Card>

      <!-- 本地化 -->
      <Card>
        <CardHeader>
          <CardTitle>
            Persistence
          </CardTitle>
          <CardDescription>config persistence</CardDescription>
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
