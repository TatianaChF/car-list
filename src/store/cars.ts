import {defineStore} from "pinia";
import { ref } from 'vue'

export type CarData = {
    id: number,
    name: string,
    model: string,
    year: number,
    color: string,
    price: number,
    latitude: number,
    longitude: number
}

export const useCarsStore = defineStore('carsData', () => {
    const cars = ref<CarData[]>([]);

    const getCars = async () => {
        const response = await fetch('https://task.tspb.su/test-task/vehicles');
        cars.value =  await response.json();
        console.log(cars.value);
    }

    return {cars, getCars}
})