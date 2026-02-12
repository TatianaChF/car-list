<template>
  <div class="list">
    <v-card
        v-for="car in cars"
        :title="car.name"
        :subtitle="car.model"
        variant="tonal"
    >
      <car-edit-card
          v-if="editingCarId === car.id"
          :car="car"
          :form="editForm"
          @save="saveEdit"
          @cancel="cancelEdit"
      />

      <car-card
          v-else
          :car="car"
          @edit="startEdit"
      />
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { useCarsStore } from "../../store/cars.ts";
import { storeToRefs } from "pinia";
import type { CarData } from "../../types.ts";
import CarEditCard from "./cards/CarEditCard.vue";
import CarCard from "./cards/CarCard.vue";

const editingCarId = ref<number | null>(null);
const editForm = reactive<Partial<CarData>>({
  name: '',
  price: 0
});

const { cars } = storeToRefs(useCarsStore());
const { updateCar } = useCarsStore();

const startEdit = (car: CarData) => {
  editingCarId.value = car.id;
  editForm.name = car.name || '';
  editForm.price = car.price || 0;
};

const cancelEdit = () => {
  editingCarId.value = null;
}

const saveEdit = (car: CarData) => {
  if (editForm.name?.trim() && editForm.price !== undefined) {
    const updatedCar = {
      id: car.id,
      name: editForm.name,
      model: car.model,
      price: editForm.price,
      year: car.year,
      color: car.color,
      latitude: car.latitude,
      longitude: car.longitude,
    }
    updateCar(updatedCar);
    editingCarId.value = null;
    editForm.name = '';
    editForm.price = 0;
  }
};
</script>
