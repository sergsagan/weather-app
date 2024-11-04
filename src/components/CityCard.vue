<script setup>
const props = defineProps({
  city: {
    type: Object,
    default: () => {},
  },
});
console.log('city', props.city);
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
    <div>
      <img
        class="h-auto w-[50px]"
        :src="`https://openweathermap.org/img/wn/${city.weather.weather[0].icon}@2x.png`"
        alt="icon"
      />
    </div>
    <div class="flex flex-col gap-2">
      <p class="self-end text-2xl">{{ Math.round(city.weather.main.temp) }}&deg;</p>
      <div class="flex gap-2">
        <span class="text-xs">H: {{ Math.round(city.weather.main.temp_max) }}&deg;</span>
        <span class="text-xs">L: {{ Math.round(city.weather.main.temp_min) }}&deg;</span>
      </div>
    </div>
  </div>
</template>
