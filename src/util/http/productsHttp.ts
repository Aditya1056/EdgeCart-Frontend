import axios, { AxiosResponse } from "axios";

const axiosProductsService = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL + '/products'
});

interface getProductsInterface{
    signal: AbortSignal,
    url: string,
    headers?:object
}

export const getProductsRequest = async ({signal, url, headers ={}} : getProductsInterface) : Promise<any> => {

    try{
        const response: AxiosResponse<any> = await axiosProductsService.get(url, {
            headers,
            signal
        });
    
        return response.data.data;
    }
    catch(err : any){
        throw new Error(err.response.data.message || "Something went wrong!");
    }
}

interface httpProductsInterface{
    url:string,
    method:string,
    data?:object,
    headers?: object
}

export const httpProductsRequest = async ({url, method, data, headers} : httpProductsInterface) : Promise<any> => {

    try{
        const response: AxiosResponse<any>  = await axiosProductsService({
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