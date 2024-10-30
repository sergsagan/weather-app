<script setup>
import AsyncCityView from '@/components/AsyncCityView.vue';
</script>

<template>
  <suspense>
    <AsyncCityView />
    <template #fallback>
      <p>Loading...</p>
    </template>
  </suspense>
</template>

<style scoped></style>
