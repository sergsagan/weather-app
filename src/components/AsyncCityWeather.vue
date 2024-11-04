<script setup>
import { getWeatherData } from '@/api.js';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const weatherData = ref(null);
const error = ref(null);

const fetchWeatherData = async () => {
  try {
    const data = await getWeatherData(route.query.lat, route.query.lng, '3.0');

    const localOffset = new Date().getTimezoneOffset() * 60000;
    const utc = data.current.dt * 1000 + localOffset;
    data.currentTime = utc + 1000 * data.timezone_offset;

    data.hourly.forEach((hour) => {
      const utc = hour.dt * 1000 + localOffset;
      hour.currentTime = utc + 1000 * data.timezone_offset;
    });

    weatherData.value = data;
  } catch (error) {
    error.value = 'Failed to load weather data';
  }
};

onMounted(() => {
  fetchWeatherData();
});

const removeCity = () => {
  const cities = JSON.parse(localStorage.getItem('savedCities'));
  const updatedCities = cities.filter((city) => city.id !== route.query.id);
  localStorage.setItem('savedCities', JSON.stringify(updatedCities));
  router.push({
    name: 'home',
  });
};
</script>

<template>
  <div v-if="weatherData" class="flex flex-1 flex-col items-center">
    <!-- Error message -->
    <div v-if="error" class="text-red-500">
      {{ error }}
    </div>

    <div v-else>
      <!-- Banner -->
      <div
        v-if="route.query.preview"
        class="w-full bg-weather-secondary p-4 text-center text-white"
      >
        <p>
          You are currently previewing this city, click the "+" icon to start tracking this city
        </p>
      </div>

      <!-- Weather Overview -->
      <div class="flex flex-col items-center py-12 text-white">
        <h1 class="mb-2 text-4xl">{{ route.params.city }}</h1>
        <p class="mb-12 text-sm">
          {{
            new Date(weatherData.currentTime).toLocaleDateString('en-GB', {
              weekday: 'short',
              day: '2-digit',
              month: 'long',
            })
          }},
          {{
            new Date(weatherData.currentTime).toLocaleTimeString('en-GB', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: false,
            })
          }}
        </p>
        <p class="mb-8 text-8xl">{{ Math.round(weatherData.current.temp) }} &deg;</p>
        <p>Feels Like {{ Math.round(weatherData.current.feels_like) }} &deg;</p>
        <p class="capitalize">{{ weatherData.current.weather[0].description }}</p>
        <img
          class="h-auto w-[150px]"
          :src="`https://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`"
          alt="icon"
        />
      </div>
      <hr class="w-full border border-white/10" />

      <!-- Hourly Weather -->
      <div class="w-full max-w-screen-sm p-12">
        <div class="mx-8 text-white">
          <h2 class="mb-4">Hourly Weather</h2>
          <div class="flex gap-10 overflow-x-scroll">
            <div
              v-for="hourData in weatherData.hourly"
              :key="hourData.dt"
              class="flex flex-col items-center gap-4"
            >
              <p class="whitespace-nowrap text-sm">
                {{
                  new Date(hourData.currentTime).toLocaleTimeString('en-GB', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                  })
                }}
              </p>
              <img
                class="h-[50px] w-auto object-cover"
                :src="`https://openweathermap.org/img/wn/${hourData.weather[0].icon}@2x.png`"
                alt="icon"
              />
              <p class="text-xl">{{ Math.round(hourData.temp) }}&deg;</p>
            </div>
          </div>
        </div>
      </div>
      <hr class="w-full border border-white/10" />

      <!-- Weekly Weather -->
      <div class="w-full max-w-screen-sm py-12">
        <div class="mx-8 text-white">
          <h2 class="mb-4">7 Day Forecast</h2>
          <div v-for="day in weatherData.daily" :key="day.dt" class="flex items-center">
            <p class="flex-1">
              {{
                new Date(day.dt * 1000).toLocaleDateString('en-GB', {
                  weekday: 'long',
                })
              }}
            </p>
            <img
              class="size-[50px] object-cover"
              :src="`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`"
              alt="icon"
            />
            <div class="flex flex-1 justify-end gap-2">
              <p>H: {{ Math.round(day.temp.max) }}</p>
              <p>L: {{ Math.round(day.temp.min) }}</p>
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="route.query.id"
        class="flex cursor-pointer items-center justify-center gap-2 py-12 text-white duration-150 hover:text-red-500"
        @click="removeCity"
      >
        <i class="fa-solid fa-trash"></i>
        <p>Remove City</p>
      </div>
    </div>
  </div>
</template>
