import React from "react";

import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import styles from './AllOrders.module.css';

import Loading from "../UI/Loading/Loading";

import { useAuthContext } from "../../store/authContext";

import { getOrdersRequest } from "../../util/http/ordersHttp";

interface orderItemInterface{
    _id:string,
    products:[
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
    ],
    totalPrice: number,
    shippingAddress: string,
    paymentStatus:string,
    orderStatus:string,
    createdAt: Date,
    updatedAt: Date
}

const AllOrders : React.FC = () => {

    const auth = useAuthContext();

    const navigate = useNavigate();

    const { data, error, isLoading, isError } = useQuery({
        queryKey:['orders'],
        queryFn:({signal}) => {
            return getOrdersRequest({
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
                !isLoading && !isError && data.orders.length > 0 &&
                <div className={styles['order-container']} >
                    {
                        data.orders.map((item: orderItemInterface) => {
                            return (
                                <div key={item._id} className={styles['order-item']} onClick={() => {navigate(`/orders/${item._id}`)}} >
                                    <h2>Order - {item._id}</h2>
                                    <p>ordered on {moment(new Date(item.createdAt)).format('DD MMM YY')}</p>
                                    <p>Total Items - {item.products.length}</p>
                                    <p>Total Cost - ₹ {item.totalPrice} /-</p>
                                    <p>Payment: {item.paymentStatus}</p>
                                    <p>Delivery: {item.orderStatus}</p>
                                </div>
                            );
                        })
                    }
                </div>
            }
            {
                !isLoading && !isError && data.orders.length === 0 &&
                <div className={styles['fallback-text']} > 
                    <h3>No Orders found!</h3>
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

export default AllOrders;