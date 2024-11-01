<script setup>
import AsyncCityWeather from '@/components/AsyncCityWeather.vue';
</script>

<template>
  <suspense>
    <AsyncCityWeather />
    <template #fallback>
      <p class="text-center text-white">Loading...</p>
    </template>
  </suspense>
</template>
