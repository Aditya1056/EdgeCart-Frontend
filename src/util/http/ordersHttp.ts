import axios, { AxiosResponse } from "axios";

const axiosOrdersService = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL + '/orders'
});

interface getOrdersInterface{
    signal: AbortSignal,
    url: string,
    headers?:object
}

export const getOrdersRequest = async ({signal, url, headers ={}} : getOrdersInterface) : Promise<any> => {

    try{
        const response: AxiosResponse<any> = await axiosOrdersService.get(url, {
            headers,
            signal
        });
    
        return response.data.data;
    }
    catch(err : any){
        throw new Error(err.response.data.message || "Something went wrong!");
    }
}

interface httpOrdersInterface{
    url:string,
    method:string,
    data?:object,
    headers?: object
}

export const httpOrdersRequest = async ({url, method, data, headers} : httpOrdersInterface) : Promise<any> => {

    try{
        const response: AxiosResponse<any>  = await axiosOrdersService({
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