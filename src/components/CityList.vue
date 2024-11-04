<script setup>
import { getCities } from '@/api.js';
import CityCard from '@/components/CityCard.vue';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const savedCities = ref([]);

const getCity = async () => {
  if (localStorage.getItem('savedCities')) {
    savedCities.value = JSON.parse(localStorage.getItem('savedCities'));

    const requests = savedCities.value.map((city) =>
      getCities(city.coords.lat, city.coords.lng, '2.5'),
    );

    const weatherData = await Promise.all(requests);

    weatherData.forEach((data, index) => {
      savedCities.value[index].weather = data;
    });
  }
};

onMounted(() => {
  getCity();
});

const router = useRouter();

const goToCityView = (city) => {
  router.push({
    name: 'city',
    params: { state: city.state, city: city.city },
    query: { id: city.id, lat: city.coords.lat, lng: city.coords.lng },
  });
};
</script>

<template>
  <div v-for="city in savedCities" :key="city.id">
    <CityCard :city="city" @click="goToCityView(city)" />
  </div>

  <p v-if="savedCities.length === 0">
    No locations added. To start tracking a location, search in the field above.
  </p>
</template>
