<template>
  <div class="sort-controls mb-4">
    <v-chip-group
        v-model="sortField"
        @update:model-value="handleSort(sortField)"
        mandatory
    >
      <v-chip
          v-for="chip in chips"
          :value="chip.value"
          color="primary"
          variant="plain"
          class="custom-chip"
      >
        {{ chip.name }}
      </v-chip>
    </v-chip-group>
  </div>
</template>

<script lang="ts" setup>
import { useCarsStore } from "../store/cars.ts";
import { storeToRefs } from "pinia";

const chips = [
  {
    name: "By Year (asc)",
    value: "year (asc)",
  },
  {
    name: "By Year (desc)",
    value: "year (desc)",
  },
  {
    name: "By Price (asc)",
    value: "price (asc)",
  },
  {
    name: "By Price (desc)",
    value: "price (desc)",
  }
];

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