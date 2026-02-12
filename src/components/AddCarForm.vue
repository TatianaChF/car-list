<template>
  <div
      class="form-overlay"
      @click.self="handleClose"
  >
    <v-sheet
        class="modal-form"
        width="400"
        elevation="10"
    >
      <v-form
          fast-fail
          @submit.prevent="handleSubmit"
      >
        <v-card-title class="form-content">
          <span>Add New Car</span>
        </v-card-title>

        <v-card-text>
          <v-text-field
              v-model="newCar.name"
              label="Car name"
              density="compact"
              class="mb-3"
              :rules="[v => !!v || 'Name is required']"
          />
          <v-text-field
              v-model="newCar.model"
              label="Car model"
              density="compact"
              class="mb-3"
              :rules="[v => !!v || 'Model is required']"
          />
          <v-text-field
              v-model.number="newCar.year"
              label="Car year"
              type="number"
              density="compact"
              class="mb-3"
              :rules="[v => !!v || 'Year is required']"
          />
          <v-text-field
              v-model="newCar.color"
              label="Car color"
              density="compact"
              class="mb-3"
              :rules="[v => !!v || 'Color is required']"
          />
          <v-text-field
              v-model.number="newCar.price"
              label="Car price"
              type="number"
              density="compact"
              class="mb-3"
              :rules="[v => !!v || 'Price is required']"
          />
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn
              color="error"
              size="small"
              variant="flat"
              @click="handleClose"
          >
            Cancel
          </v-btn>
          <v-btn
              type="submit"
              color="primary"
              variant="flat"
              size="small"
              :disabled="!isFormValid"
          >
            Add
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-sheet>
  </div>
</template>

<script lang="ts" setup>
import { reactive, computed } from "vue";
import { useCarsStore } from "../store/cars.ts";
import type {CarData} from "../types.ts";

const emit = defineEmits(['close']);

const newCar = reactive<CarData>({
  id: Date.now(),
  name: '',
  model: '',
  year: null,
  color: '',
  price: null
});

const isFormValid = computed(() => {
  return newCar.name &&
      newCar.model &&
      newCar.year &&
      newCar.color &&
      newCar.price;
});

const { addCar } = useCarsStore();

const handleSubmit = () => {
  if (isFormValid.value) {
    addCar(newCar);
    handleClose();
  }
};

const handleClose = () => {
  emit('close');
};
</script>
