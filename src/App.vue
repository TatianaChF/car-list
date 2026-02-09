<template>
  <div id="app" :class="{ 'blur-background': showForm }">
    <v-btn
        class="btn"
        color="primary"
        variant="flat"
        @click="showForm = true"
    >
      Add car
    </v-btn>

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

const showForm = ref(false);
</script>

<style scoped>
.blur-background {
  filter: blur(4px);
  transition: filter 0.3s ease;
  pointer-events: none;
  user-select: none;
}

.btn {
  margin-bottom: 20px;
}
</style>