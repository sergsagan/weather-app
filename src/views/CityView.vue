<script setup>
import AsyncCityWeather from '@/components/AsyncCityWeather.vue';
</script>

<template>
  <div>
    <suspense>
      <AsyncCityWeather />
      <template #fallback>
        <p class="text-center text-white">Loading...</p>
      </template>
    </suspense>
  </div>
</template>
