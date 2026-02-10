import {defineStore} from "pinia";
import {ref} from 'vue'
import {getCars} from "../api/methods.ts";

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
    const sortField = ref<string>('no');

    const getCarsToStore = async () => {
        try {
            cars.value = await getCars();
        } catch (error) {
            console.log(error);
        }
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

    const updateCar = (updatedCar: CarData) => {
        const index = cars.value.findIndex(car => car.id === updatedCar.id);

        if (index !== -1) {
            cars.value[index] = { ...cars.value[index], ...updatedCar };
        }
    }

    const deleteCar = (id: number) => {
        cars.value = cars.value.filter((car) => car.id !== id);
    }

    return {
        cars,
        sortField,
        getCarsToStore,
        addCar,
        sortCars,
        updateCar,
        deleteCar
    }
})