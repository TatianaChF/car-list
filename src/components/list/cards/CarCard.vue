<template>
  <v-card-text>year {{ car.year }}</v-card-text>
  <div class="btns-settings">
    <v-card-text class="price">price {{ car.price }}</v-card-text>

    <v-card-actions>
      <v-btn
          color="primary"
          size="small"
          variant="flat"
          @click="emits('edit', car)"
      >
        Edit
      </v-btn>
      <v-btn
          color="error"
          size="small"
          variant="flat"
          @click="deleteCar(car.id)"
      >
        Delete
      </v-btn>
    </v-card-actions>
  </div>
</template>

<script setup lang="ts">
import type { CarData } from "../../../types.ts";
import {useCarsStore} from "../../../store/cars.ts";

defineProps<{
  car: CarData;
}>();

const emits = defineEmits(["edit"]);

const { deleteCar } = useCarsStore();
</script>