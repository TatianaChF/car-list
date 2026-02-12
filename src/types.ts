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