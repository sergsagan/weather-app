<script setup>
import axios from 'axios';
import { useRoute } from 'vue-router';

const route = useRoute();

const getWeatherData = async () => {
  try {
    const weatherData = await axios.get(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${route.query.lat}&lon=${route.query.lng}&exclude={part}&appid=c5e5548fa5c87051e758646e5d95aec5&units=metric`,
    );
    // cal current date & time
    const localOffset = new Date().getTimezoneOffset() * 60000;
    const utc = weatherData.data.current.dt * 1000 + localOffset;
    weatherData.data.currentTime = utc + 1000 * weatherData.data.timezone_offset;

    // cal hourly weather offset
    weatherData.data.hourly.forEach((hour) => {
      const utc = hour.dt * 1000 + localOffset;
      hour.currentTime = utc + 1000 * weatherData.data.timezone_offset;
    });

    return weatherData.data;
  } catch (error) {
    console.log(error);
  }
};
const weatherData = await getWeatherData();
</script>

<template>
  <div class="flex flex-1 flex-col items-center">
    <!-- Banner -->
    <div v-if="route.query.preview" class="w-full bg-weather-secondary p-4 text-center text-white">
      <p>You are currently previewing this city, click the "+" icon to start tracking this city</p>
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
    <div class="w-full max-w-screen-md p-12">
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
    <div class="w-full max-w-screen-md py-12">
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
  </div>
</template>
