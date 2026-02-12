<template>
  <div
      id="app"
      :class="{ 'blur-background': showForm }"
  >
    <div class="settings">
      <v-btn
          class="btn"
          color="primary"
          variant="flat"
          @click="showForm = true"
      >
        Add car
      </v-btn>

      <sorting/>
    </div>

    <div class="content">
      <cars-list/>
      <car-map/>
    </div>

    <Teleport to="body">
      <add-car-form
          v-if="showForm"
          @close="showForm = false"
      />
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import CarsList from './components/list/CarsList.vue';
import AddCarForm from './components/AddCarForm.vue';
import { onMounted, ref } from "vue";
import Sorting from "./components/Sorting.vue";
import CarMap from "./components/CarMap.vue";
import { useCarsStore } from "./store/cars.ts";

const showForm = ref(false);

const { getCarsToStore } = useCarsStore();

onMounted(() => {
  getCarsToStore();
})
</script>