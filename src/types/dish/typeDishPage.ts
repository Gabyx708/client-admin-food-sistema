import { DishResponse } from "./typeDishResponse";

export interface DishesPage
{
    index:number,
    totalPages:number,
    totalRecords:number,
    items: DishResponse[]
}