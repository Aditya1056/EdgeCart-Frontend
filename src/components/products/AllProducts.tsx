import React from "react";

import { useQuery } from "@tanstack/react-query";

import styles from './AllProducts.module.css';

import ProductItem from "./ProductItem";
import Loading from "../UI/Loading/Loading";

import { useAuthContext } from "../../store/authContext";

import { getProductsRequest } from "../../util/http/productsHttp";

interface  productInterface{
    _id: string,
    name: string,
    description: string,
    brand: string,
    availability: boolean,
    price: number,
    images: string[]
}

const AllProducts : React.FC = () => {

    const auth = useAuthContext();

    const { data, error, isLoading, isError } = useQuery({
        queryKey:['products'],
        queryFn:({signal}) => {
            return getProductsRequest({
                signal,
                url:'/',
                headers:{
                    'Authorization':'Bearer ' + auth.token
                }
            });
        },
    });

    return (
        <>
            {
                isLoading && <Loading />
            }
            {
                !isLoading && !isError && data.products.length > 0 &&
                <ul className={styles['all-products']} >
                    {
                        data.products.map((product: productInterface) => {
                            return (
                                <ProductItem 
                                    key={product._id} 
                                    id={product._id} 
                                    name={product.name} 
                                    description={product.description} 
                                    brand={product.brand} 
                                    price={product.price} 
                                    availability={product.availability} 
                                    image={product.images[0]} 
                                />
                            );
                        })
                    }
                </ul>
            }
            {
                !isLoading && !isError && data.products.length === 0 &&
                <div className={styles['fallback-text']} > 
                    <h3>No Products found!</h3>
                </div>
            }
            {
                isError && 
                <div className={styles['error-text']} >
                    <h3>{error.message}</h3>
                </div>
            }
        </>
    );
}

export default AllProducts;