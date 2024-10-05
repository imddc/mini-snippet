<template>
  <RouterView v-slot="{ Component }">
    <KeepAlive>
      <Transition name="fade">
        <component :is="Component" />
      </Transition>
    </KeepAlive>
  </RouterView>
</template>
