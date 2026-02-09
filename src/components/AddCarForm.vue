<template>
  <div class="form-overlay" @click.self="handleClose">
    <v-sheet class="modal-form" width="400" elevation="10">
      <v-form fast-fail @submit.prevent="handleSubmit">
        <v-card-title class="d-flex justify-space-between align-center">
          <span>Add New Car</span>
        </v-card-title>

        <v-card-text>
          <v-text-field
              v-model="newCar.name"
              label="Car name"
              density="compact"
              class="mb-3"
              required
          />
          <v-text-field
              v-model="newCar.model"
              label="Car model"
              density="compact"
              class="mb-3"
              required
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
              required
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
              variant="text"
              @click="handleClose"
          >
            Cancel
          </v-btn>
          <v-btn
              type="submit"
              color="primary"
              variant="flat"
              :disabled="!isFormValid"
          >
            Add Car
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-sheet>
  </div>
</template>

<script lang="ts" setup>
import { reactive, computed } from "vue";
import { useCarsStore } from "../store/cars.ts";

const emit = defineEmits(['close']);

interface CarForm {
  id: number;
  name: string;
  model: string;
  year: number | null;
  color: string;
  price: number | null;
}

const newCar = reactive<CarForm>({
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
    console.log(newCar);
    addCar(newCar);
    handleClose();
  }
};

const handleClose = () => {
  emit('close');
};
</script>

<style scoped>
.form-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  animation: fadeIn 0.3s ease;
}

.modal-form {
  border-radius: 12px;
  background: white;
  animation: slideUp 0.3s ease;
  max-height: 90vh;
  overflow-y: auto;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-form::-webkit-scrollbar {
  width: 6px;
}

.modal-form::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 3px;
}
</style>
