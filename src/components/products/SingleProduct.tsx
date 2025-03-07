import React, { useState } from "react";

import { useQuery, useMutation } from "@tanstack/react-query";

import { MdArrowBackIos } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";

import styles from './SingleProduct.module.css';

import Loading from "../UI/Loading/Loading";

import { useAuthContext } from "../../store/authContext";
import { useToastContext } from "../../store/toastContext";

import { getProductsRequest } from "../../util/http/productsHttp";

import { httpUsersRequest } from "../../util/http/usersHttp";
import queryClient from "../../util/helpers/queryClient";

interface singleProductProps{
    id: string
}

const SingleProduct : React.FC<singleProductProps> = (props) => {

        const auth = useAuthContext();
        const toast = useToastContext();

        const [index, setIndex] = useState<number>(0);
    
        const { data, error, isLoading, isError } = useQuery({
            queryKey:['product', props.id],
            queryFn:({signal}) => {
                return getProductsRequest({
                    signal,
                    url:'/' + props.id,
                    headers:{
                        'Authorization':'Bearer ' + auth.token
                    }
                });
            },
        });

        const updateIndex = (num : number) => {
            setIndex((prev) => {
                return prev + num;
            });
        }

    const { mutate, isPending } = useMutation({
        mutationFn: httpUsersRequest,
        onError:(err) => {
            toast.openToast("FAIL", err.message);
        },
        onSuccess:({message}) => {
            queryClient.invalidateQueries({queryKey : ['product', props.id]});
            toast.openToast("SUCCESS", message);
        }
    });

    const addProductToCart = () => {

        const data = {
            productId: props.id
        }

        mutate({
            url:'/cart',
            data,
            method:"PATCH",
            headers:{
                'Authorization':'Bearer ' + auth.token
            }
        });
    }

    return (
        <>
            {
                (isLoading || isPending) && <Loading />
            }
            {
                !isLoading && !isError && data && 
                <div className={styles['single-product']} >
                    <div className={styles['product-container']} >
                        <div className={styles['image-container']} >
                            <img src={data.product.images[index]} />
                            {
                                index > 0 && 
                                <MdArrowBackIos 
                                    className={styles['backward']} 
                                    onClick={() => {updateIndex(-1)}} 
                                />
                            }
                            {
                                index < (data.product.images.length - 1) && 
                                <MdArrowForwardIos 
                                    className={styles['forward']} 
                                    onClick={() => {updateIndex(1)}}
                                />
                            }
                        </div>
                        <div className={styles['product-details']} >
                            <h2>{data.product.name}</h2>
                            <h3>{data.product.brand}</h3>
                            <p>{data.product.description}</p>
                            <h4>₹ {data.product.price} /-</h4>
                        </div>
                    </div>
                    <button 
                        className={styles['add-btn']} 
                        disabled={data.added || !data.product.availability} 
                        onClick={addProductToCart}
                    >
                        {
                            !data.product.availability && 'Out of Stock'
                        }
                        {
                            data.product.availability && data.added && 'Added to Cart'
                        }
                        {
                            !data.added && data.product.availability && 'Add to Cart'
                        }
                    </button>
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

export default SingleProduct;