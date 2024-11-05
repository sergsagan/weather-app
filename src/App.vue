<script setup>
import BaseNavigation from '@/components/BaseNavigation.vue';
import { RouterView } from 'vue-router';
</script>
<template>
  <div class="flex min-h-screen flex-col bg-weather-primary font-Roboto">
    <BaseNavigation />
    <RouterView v-slot="{ Component }">
      <transition mode="out-in" name="page">
        <component :is="Component" />
      </transition>
    </RouterView>
  </div>
</template>
<style>
.page-enter-active {
  transition: 600ms ease all;
}

.page-enter-from {
  opacity: 0;
}
</style>
