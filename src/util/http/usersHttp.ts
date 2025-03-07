import axios, { AxiosResponse } from "axios";

const axiosUsersService = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL + '/users'
});

interface getUsersInterface{
    signal: AbortSignal,
    url: string,
    headers?:object
}

export const getUsersRequest = async ({signal, url, headers ={}} : getUsersInterface) : Promise<any> => {

    try{
        const response: AxiosResponse<any> = await axiosUsersService.get(url, {
            headers,
            signal
        });
    
        return response.data.data;
    }
    catch(err : any){
        throw new Error(err.response.data.message || "Something went wrong!");
    }
}

interface httpUsersInterface{
    url:string,
    method:string,
    data?:object,
    headers?: object
}

export const httpUsersRequest = async ({url, method, data, headers} : httpUsersInterface) : Promise<any> => {

    try{
        const response: AxiosResponse<any>  = await axiosUsersService({
            url,
            method,
            data,
            headers
        });
        
        return response.data;
    }
    catch(err : any){
        throw new Error(err.response.data.message || "Something went wrong!");
    }
}