<template>
  <v-card-text>
    <v-text-field
        v-model="form.name"
        label="Name"
        density="compact"
        :rules="[v => !!v || 'Name is required']"
        required
    />
    <v-text-field
        v-model="form.price"
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
        @click="emits('save', car)"
    >
      Save
    </v-btn>
    <v-btn
        color="error"
        size="small"
        variant="flat"
        @click="emits('cancel')"
    >
      Cancel
    </v-btn>
  </v-card-actions>
</template>

<script setup lang="ts">
import type { CarData } from "../../../types.ts";
import { computed } from "vue";

const props = defineProps<{
  car: CarData;
  form: Partial<CarData>;
}>();

const emits = defineEmits(["save", "cancel"]);

const editFormValid = computed(() => {
  return props.form.name && props.form.price;
})
</script>