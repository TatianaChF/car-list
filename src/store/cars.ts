import {defineStore} from "pinia";
import { ref } from 'vue'

export type CarData = {
    id: number,
    name: string,
    model: string,
    year: number | null,
    color: string,
    price: number | null,
    latitude?: number,
    longitude?: number
}

export const useCarsStore = defineStore('carsData', () => {
    const cars = ref<CarData[]>([]);

    const getCars = async () => {
        const response = await fetch('https://task.tspb.su/test-task/vehicles');
        cars.value =  await response.json();
    }

    const addCar = (car: CarData) => {
        cars.value.push(car);
    }

    return {cars, getCars, addCar}
})