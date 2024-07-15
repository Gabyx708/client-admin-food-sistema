import { DishRequest } from "../../types/dish/typeDishRequest";
import { DishResponse } from "../../types/dish/typeDishResponse";
import axiosInstance from "../http/axiosInstance";


export const createDish = async(description:string,price:number):Promise<DishResponse> =>
{   
    const newDish:DishRequest = {description: description,price:price};

    const response = await axiosInstance.post('/dish',newDish);

    if(response.status == 201)
    {
        return response.data;
    }

    throw new Error;
}