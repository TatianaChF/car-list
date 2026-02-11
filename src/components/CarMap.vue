<template>
    <div id="map" style="height:90vh;"></div>
</template>

<script lang="ts" setup>
import {ref, onMounted, watch} from 'vue';
import "leaflet/dist/leaflet.css";
import * as L from 'leaflet';
import {storeToRefs} from "pinia";
import {type CarData, useCarsStore} from "../store/cars.ts";
import {type LatLngExpression, LayerGroup, type Map as LeafletMap} from "leaflet";

const initialMap = ref<LeafletMap | LayerGroup>();
const markersLayer = ref<LayerGroup>();
const zoom = ref<number>(14);
const mapCenter = ref<LatLngExpression>([58.751244, 32.618423]);

const { cars } = storeToRefs(useCarsStore());

onMounted(() => {
  initialMap.value = L.map('map').setView(mapCenter.value, 6);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: zoom.value,
  }).addTo(initialMap.value);
  markersLayer.value = L.layerGroup().addTo(initialMap.value);
});

watch(cars, (newCars: CarData[]) => {
  if (!markersLayer.value || !newCars.length) return;

  markersLayer.value.clearLayers();

  newCars.forEach((car) => {
    if (car.latitude && car.longitude) {
      const marker = L.marker([car.latitude, car.longitude]);
      marker.bindPopup(`
        <div style="text-align: center;">
          <b style="color: #1976D2;">${car.name} ${car.model}</b><br>
          <span>Year: ${car.year}</span><br>
          <span style="font-weight: bold;">Price: ${car.price}</span>
        </div>
      `);

      markersLayer.value?.addLayer(marker);
    }
  });
}, {
  deep: true,
  immediate: true
});
</script>