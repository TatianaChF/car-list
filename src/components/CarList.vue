<template>
  <div class="list">
    <v-card
        v-for="car in cars"
        :title="car.name"
        :subtitle="car.model"
        variant="tonal"
    >
      <v-card-text>year {{car.year}}</v-card-text>
      <v-card-text class="price">price {{car.price}}</v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useCarsStore } from "../store/cars.ts";
import { storeToRefs } from "pinia";

const { cars } = storeToRefs(useCarsStore());
const { getCars } = useCarsStore();

onMounted(() => {
  getCars();
})
</script>

<style scoped>
.list {
  display: flex;
  flex-direction: column;
  width: 50%;
  gap: 30px;
}

.price {
  font-weight: bold;
  font-size: 20px;
}
</style>
