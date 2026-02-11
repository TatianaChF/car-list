<template>
  <div id="map" style="height:90vh;"></div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch, onUnmounted } from 'vue';
import "leaflet/dist/leaflet.css";
import * as L from 'leaflet';
import { storeToRefs } from "pinia";
import { type CarData, useCarsStore } from "../store/cars.ts";
import type { Map as LeafletMap, LayerGroup } from "leaflet";

const map = ref<LeafletMap | null>(null);
const markersLayer = ref<LayerGroup | null>(null);
const zoom = ref<number>(14);
const mapCenter = ref<L.LatLngExpression>([58.751244, 32.618423]);

const { cars } = storeToRefs(useCarsStore());

onMounted(() => {
  const mapInstance = L.map('map').setView(mapCenter.value, 6);
  map.value = mapInstance;

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: zoom.value,
    attribution: '© OpenStreetMap contributors'
  }).addTo(mapInstance);

  markersLayer.value = L.layerGroup().addTo(mapInstance);
});

const createMarker = (car: CarData) => {
  if (!car.latitude || !car.longitude) return null;

  const marker = L.marker([car.latitude, car.longitude]);

  marker.bindPopup(`
    <div style="text-align: center; min-width: 180px;">
      <b style="color: #1976D2; font-size: 16px;">${car.name} ${car.model}</b><br>
      <span>Year: ${car.year}</span><br>
      <span style="font-weight: bold; color: #2E7D32;">Price: ${car.price} ₽</span>
    </div>
  `);

  return marker;
};

const clearMarkers = () => {
  if (markersLayer.value) {
    markersLayer.value.clearLayers();
  }
};

const updateMarkers = () => {
  if (!map.value || !markersLayer.value) return;

  clearMarkers();

  cars.value.forEach((car) => {
    const marker = createMarker(car);
    if (marker) {
      marker.addTo(markersLayer.value);
    }
  });
};

watch(cars, () => {
  updateMarkers();
}, {
  deep: true,
  immediate: true
});

onUnmounted(() => {
  if (markersLayer.value) {
    markersLayer.value.remove();
    markersLayer.value = null;
  }

  if (map.value) {
    map.value.remove();
    map.value = null;
  }
});
</script>