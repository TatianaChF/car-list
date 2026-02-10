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

      <sorting />
    </div>

    <car-list/>

    <Teleport to="body">
      <add-car-form
          v-if="showForm"
          @close="showForm = false"
      />
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import CarList from './components/CarList.vue';
import AddCarForm from './components/AddCarForm.vue';
import { ref } from "vue";
import Sorting from "./components/Sorting.vue";

const showForm = ref(false);
</script>