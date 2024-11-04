<script setup>
import { searchCity } from '@/api';
import CityList from '@/components/CityList.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const searchQuery = ref('');
const queryTimeout = ref(null);
const mapboxSearchResults = ref(null);
const searchError = ref(null);

const router = useRouter();

const previewCity = (searchResult) => {
  const [city, state] = searchResult.place_name.split(',');
  router.push({
    name: 'city',
    params: {
      state: state.replace(' ', ''),
      city: city,
    },
    query: {
      lat: searchResult.geometry.coordinates[1],
      lng: searchResult.geometry.coordinates[0],
      preview: true,
    },
  });
};

const getSearchResults = () => {
  clearTimeout(queryTimeout.value);
  queryTimeout.value = setTimeout(async () => {
    if (searchQuery.value !== '') {
      try {
        mapboxSearchResults.value = await searchCity(searchQuery.value);
      } catch {
        searchError.value = true;
      }
      return;
    }
    mapboxSearchResults.value = null;
  }, 300);
};
</script>

<template>
  <main class="container text-white">
    <div class="relative mb-8 pt-4">
      <input
        class="w-full border-b bg-transparent px-1 py-2 focus:border-weather-secondary focus:shadow-[0px_1px_0_0_#004E71] focus:outline-none"
        type="text"
        placeholder="Search for a city or state"
        v-model="searchQuery"
        @input="getSearchResults"
      />
      <ul
        v-if="mapboxSearchResults"
        class="absolute top-[66px] w-full bg-weather-secondary px-1 py-2 text-white shadow-md"
      >
        <p v-if="searchError">Sorry, something went wrong, please try again</p>
        <p v-if="!searchError && mapboxSearchResults.length === 0">
          No results match your query, try a different term.
        </p>
        <template v-else>
          <li
            v-for="searchResult in mapboxSearchResults"
            :key="searchResult.id"
            class="cursor-pointer py-2"
            @click="previewCity(searchResult)"
          >
            {{ searchResult.place_name }}
          </li>
        </template>
      </ul>
    </div>
    <div class="flex flex-col gap-4">
      <Suspense>
        <CityList />
        <template #fallback>
          <p>Loading...</p>
        </template>
      </Suspense>
    </div>
  </main>
</template>
