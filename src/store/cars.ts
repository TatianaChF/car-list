import {defineStore} from "pinia";
import {ref} from 'vue'

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
    const sortedCars = ref<CarData[]>([]);
    const sortField = ref<string>('no');

    const getCars = async () => {
        const response = await fetch('https://task.tspb.su/test-task/vehicles');
        cars.value = await response.json();
        sortedCars.value = await response.json();
    }

    const addCar = (car: CarData) => {
        cars.value.push(car);
    }

    const sortCars = (field: string) => {
        switch (field) {
            case 'year (asc)':
                cars.value = cars.value.sort((a, b) => a.year! - b.year!);
                sortField.value = field;
                break;
            case 'year (desc)':
                cars.value = cars.value.sort((a, b) => b.year! - a.year!);
                sortField.value = field;
                break;
            case 'price (asc)':
                cars.value = cars.value.sort((a, b) => a.price! - b.price!);
                sortField.value = field;
                break;
            case 'price (desc)':
                cars.value = cars.value.sort((a, b) => b.price! - a.price!);
                sortField.value = field;
                break;
            default:
                return cars.value;
        }
    }

    return {
        cars,
        sortedCars,
        sortField,
        getCars,
        addCar,
        sortCars
    }
})