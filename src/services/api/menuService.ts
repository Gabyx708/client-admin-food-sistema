import { MenuRequest } from "../../types/menu/typeMenuRequest";
import { MenuResume, PageMenuResume } from "../../types/menu/typePageMenuResume";
import axiosInstance from "../http/axiosInstance";

export const getNextMenuAvailable = async () => {
  const response = await axiosInstance.get<Menu>("menu/next-available");
  return response;
};


export const getFuturesMenues = async (startDate:string):Promise<MenuResume[]> => {
    const response = await axiosInstance.get<PageMenuResume>(`/menu?initialDate=${startDate}`)
    return response.data.items;
}

export const getMenuById = async (idMenu:string):Promise<Menu> => {

    const response = await axiosInstance.get<Menu>(`/menu/${idMenu}`);
    return response.data;
}

export const createMenu = async (menuData: MenuRequest) => {
  const response = await axiosInstance.post('/menu', menuData);
  return response.data;
};

export const getMenuWithOrders = async (id:string):Promise<MenuResponse> => 
{
  const response = await axiosInstance.get(`/menu/${id}/orders`);
  return response.data;
}