<script setup>
defineProps({
  city: {
    type: Object,
    default: () => {},
  },
});
</script>

<template>
  <div
    v-if="city && city.weather && city.weather.main"
    class="flex cursor-pointer items-center rounded-md bg-weather-secondary px-3 py-6 shadow-md"
  >
    <div class="flex flex-1 flex-col">
      <h2 class="text-2xl">{{ city.city }}</h2>
      <h3>{{ city.state }}</h3>
    </div>
    <div class="flex w-20 items-center justify-center">
      <img
        class="size-20"
        :src="`https://openweathermap.org/img/wn/${city.weather.weather[0].icon}@2x.png`"
        alt="icon"
      />
    </div>
    <div class="flex w-20 flex-col items-end gap-2">
      <p class="text-2xl">{{ Math.round(city.weather.main.temp) }}&deg;</p>
      <div class="flex gap-2">
        <span class="text-xs">H: {{ Math.round(city.weather.main.temp_max) }}&deg;</span>
        <span class="text-xs">L: {{ Math.round(city.weather.main.temp_min) }}&deg;</span>
      </div>
    </div>
  </div>
</template>
