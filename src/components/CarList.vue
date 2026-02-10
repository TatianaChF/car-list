<template>
  <div class="list">
    <v-card
        v-for="car in cars"
        :title="car.name"
        :subtitle="car.model"
        variant="tonal"
    >
      <template v-if="editingCarId === car.id">
        <v-card-text>
          <v-text-field
              v-model="editForm.name"
              label="Name"
              density="compact"
              :rules="[v => !!v || 'Name is required']"
              required
          />
          <v-text-field
              v-model="editForm.price"
              label="Price"
              type="number"
              density="compact"
              :rules="[v => !!v || 'Price is required']"
              required
          />
        </v-card-text>

        <v-card-actions class="btns-edit">
          <v-btn
              color="success"
              size="small"
              variant="flat"
              :disabled="!editFormValid"
              @click="saveEdit(car)"
          >
            Save
          </v-btn>
          <v-btn
              color="error"
              size="small"
              variant="flat"
              @click="cancelEdit"
          >
            Cancel
          </v-btn>
        </v-card-actions>
      </template>

      <template v-else>
        <v-card-text>year {{ car.year }}</v-card-text>
        <div class="btns-settings">
          <v-card-text class="price">price {{ car.price }}</v-card-text>

          <v-card-actions>
            <v-btn
                color="primary"
                size="small"
                variant="flat"
                @click="startEdit(car)"
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
    </v-card>
  </div>
</template>

<script setup lang="ts">
import {computed, onMounted, reactive, ref} from "vue";
import {type CarData, useCarsStore} from "../store/cars.ts";
import { storeToRefs } from "pinia";

const editingCarId = ref<number | null>(null);
const editForm = reactive<Partial<CarData>>({
  name: '',
  price: 0
});

const editFormValid = computed(() => {
  return editForm.name && editForm.price;
})

const { cars } = storeToRefs(useCarsStore());
const { getCarsToStore, updateCar, deleteCar } = useCarsStore();

onMounted(() => {
  getCarsToStore();
})

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
