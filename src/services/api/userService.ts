import { CreateUserRequest } from "../../types/user/typeForCreateUser";
import { UserCreatedResponse } from "../../types/user/typeForCreateUserResponse";
import axiosInstance from "../http/axiosInstance";

export const createUser = async(user:CreateUserRequest)=>
{
    const response = axiosInstance.post<UserCreatedResponse>('/user',user);
    return response;
}