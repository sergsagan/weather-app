<script setup>
defineProps({
  city: {
    type: Object,
    default: () => {},
  },
});
</script>

<template>
  <div class="flex cursor-pointer rounded-md bg-weather-secondary px-3 py-6 shadow-md">
    <div class="flex flex-1 flex-col">
      <h2 class="text-2xl">{{ city.city }}</h2>
      <h3>{{ city.state }}</h3>
    </div>
    <div v-if="city.weather && city.weather.main" class="flex flex-col gap-2">
      <p class="self-end text-2xl">{{ Math.round(city.weather.main.temp) }}&deg;</p>
      <div class="flex gap-2">
        <span class="text-xs">H: {{ Math.round(city.weather.main.temp_max) }}&deg;</span>
        <span class="text-xs">L: {{ Math.round(city.weather.main.temp_min) }}&deg;</span>
      </div>
    </div>
  </div>
</template>
