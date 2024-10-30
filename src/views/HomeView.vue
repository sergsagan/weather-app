<script setup>
import axios from 'axios';
import { ref } from 'vue';

const mapboxAPIKey =
  'pk.eyJ1Ijoiam9obmtvbWFybmlja2kiLCJhIjoiY2t5NjFzODZvMHJkaDJ1bWx6OGVieGxreSJ9.IpojdT3U3NENknF6_WhR2Q';
const searchQuery = ref('');
const queryTimeout = ref(null);
const mapboxSearchResults = ref(null);
const searchError = ref(null);

const getSearchResults = () => {
  clearTimeout(searchQuery.value);
  queryTimeout.value = setTimeout(async () => {
    if (searchQuery.value !== '') {
      try {
        const result = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery.value}.json?access_token=${mapboxAPIKey}&types=place`,
        );
        mapboxSearchResults.value = result.data.features;
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
          No results math your query, try a different term.
        </p>
        <template v-else>
          <li
            v-for="searchResult in mapboxSearchResults"
            :key="searchResult.id"
            class="cursor-pointer py-2"
          >
            {{ searchResult.place_name }}
          </li>
        </template>
      </ul>
    </div>
  </main>
</template>
