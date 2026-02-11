<template>
  <div class="sort-controls mb-4">
    <v-chip-group
        v-model="sortField"
        @update:model-value="handleSort(sortField)"
        mandatory
    >
      <v-chip
          value="year (asc)"
          color="primary"
          variant="plain"
          class="custom-chip"
      >
        By Year (asc)
      </v-chip>
      <v-chip
          value="year (desc)"
          color="primary"
          variant="plain"
          class="custom-chip"
      >
        By Year (desc)
      </v-chip>
      <v-chip
          value="price (asc)"
          color="primary"
          variant="plain"
          class="custom-chip"
      >
        By Price (asc)
      </v-chip>
      <v-chip
          value="price (desc)"
          color="primary"
          variant="plain"
          class="custom-chip"
      >
        By Price (desc)
      </v-chip>
    </v-chip-group>
  </div>
</template>

<script lang="ts" setup>
import { useCarsStore } from "../store/cars.ts";
import { storeToRefs } from "pinia";

const { sortField } = storeToRefs(useCarsStore());
const { sortCars } = useCarsStore();

const handleSort = (field: string) => {
  sortCars(field);
}
</script>

<style scoped>
.custom-chip {
  background-color: #1976D2 !important;
  color: white !important;
}

.custom-chip:hover {
  background-color: #1976D2 !important;
  color: white !important;
  opacity: 0.9 !important;
}
</style>