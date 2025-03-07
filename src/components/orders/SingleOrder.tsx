import React from "react";

import { useQuery } from "@tanstack/react-query";

import styles from './SingleOrder.module.css';

import Loading from "../UI/Loading/Loading";

import { useAuthContext } from "../../store/authContext";

import { getOrdersRequest } from "../../util/http/ordersHttp";

interface orderItemInterface{
    product:{
        _id: string,
        name: string,
        description: string,
        brand: string,
        availability: boolean,
        price: number,
        images: string[]

    },
    quantity: number
}

interface singleOrderprops{
    id: string
}

const SingleOrder : React.FC<singleOrderprops> = (props) => {

    const auth = useAuthContext();

    const {data, isLoading, isError, error} = useQuery({
        queryKey:['order', props.id],
        queryFn:({signal}) => {
            return getOrdersRequest({
                signal,
                url:'/' + props.id,
                headers:{
                    'Authorization':'Bearer ' + auth.token
                }
            });
        }
    });

    return (
        <>
            {
                isLoading && <Loading />
            }
            {
                isError && 
                <div className={styles['error-text']} >
                    <h3>{error.message}</h3>
                </div>
            }
            {
                !isLoading && !isError && data && 
                <div className={styles['order-container']} >
                    <ul className={styles['order-items']} >
                        {
                            data.order.products.map((item : orderItemInterface) => {
                                return (
                                        <li className={styles['order-item']} >
                                        <div className={styles['image-container']}>
                                            <img src={item.product.images[0]} alt={"product image"} />
                                        </div>  
                                        <div className={styles['details-container']} >
                                            <h4>{item.product.name}</h4>
                                            <p>x {item.quantity}</p>
                                        </div>
                                        <div className={styles['price-container']} >
                                            <p>₹ {(item.product.price * item.quantity).toFixed(2)} /-</p>
                                        </div>
                                    </li>
                                );
                            })
                        }
                    </ul>
                    <div className={styles['total-cost-container']} >
                        <span className={styles['total-cost']} >
                            Total Cost : ₹ {data.order.totalPrice} /-
                        </span>
                    </div>
                    <div className={styles['payment-status-container']} >
                        <span className={styles['payment-status']} >
                            Payment : {data.order.paymentStatus}
                        </span>
                    </div>
                    <div className={styles['order-status-container']} >
                        <span className={styles['order-status']} >
                            Delivery : {data.order.orderStatus}
                        </span>
                    </div>
                </div>
            }
        </>
    );
}

export default SingleOrder;