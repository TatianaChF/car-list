<template>
  <div class="sort-controls mb-4">
    <v-chip-group
        v-model="sortField"
        @update:model-value="handleSort(sortField)"
        mandatory
    >
      <v-chip value="year (asc)">By Year (asc)</v-chip>
      <v-chip value="year (desc)">By Year (desc)</v-chip>
      <v-chip value="price (asc)">By Price (asc)</v-chip>
      <v-chip value="price (desc)">By Price (desc)</v-chip>
    </v-chip-group>
  </div>
</template>

<script lang="ts" setup>
import { useCarsStore } from "../store/cars.ts";
import { storeToRefs } from "pinia";

const { sortField } = storeToRefs(useCarsStore());
const { sortCars } = useCarsStore();

const handleSort = (field: string) => {
  console.log(field);
  sortCars(field);
}
</script>

<style scoped>
.sort-controls {
  display: flex;
  align-items: center;
}
</style>