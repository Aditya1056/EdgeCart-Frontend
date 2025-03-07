import React, { useState } from "react";

import { AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";

import styles from './CartItems.module.css';

import CartItem from "./CartItem";
import Checkout from "./Checkout";
import Loading from "../UI/Loading/Loading";

import { useAuthContext } from "../../store/authContext";

import { getUsersRequest } from "../../util/http/usersHttp";

interface cartItemInterface{
    _id:string,
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

const CartItems : React.FC = () => {

    const auth = useAuthContext();

    const [showCheckout, setShowCheckout] = useState<boolean>(false);

    const openCheckoutHandler = () => {
        setShowCheckout(true);
    }

    const closeCheckoutHandler = () => {
        setShowCheckout(false);
    }

    const {data, isLoading, isError, error} = useQuery({
        queryKey:['cart'],
        queryFn:({signal}) => {
            return getUsersRequest({
                signal,
                url:'/cart',
                headers:{
                    'Authorization':'Bearer ' + auth.token
                }
            });
        }
    });

    return (
        <>
            <AnimatePresence>
                {
                    showCheckout && <Checkout onClose={closeCheckoutHandler} />
                }
            </AnimatePresence>
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
                !isLoading && !isError && data.cart.length > 0 && 
                <div className={styles['cart-container']} >
                    <ul className={styles['cart-items']} >
                        {
                            data.cart.map((item : cartItemInterface) => {
                                return (
                                    <CartItem 
                                        key={item._id} 
                                        productId={item.product._id} 
                                        name={item.product.name} 
                                        quantity={item.quantity} 
                                        price={item.product.price} 
                                        image={item.product.images[0]} 
                                    />
                                );
                            })
                        }
                    </ul>
                    <div className={styles['total-cost-container']} >
                        <span className={styles['total-cost']} >
                            Total Cost : ₹ {data.totalCost} /-
                        </span>
                    </div>
                    <button className={styles['order-btn']} onClick={openCheckoutHandler} >
                        Order Now
                    </button>
                </div>
            }
            {
                !isLoading && !isError && data.cart.length === 0 && 
                <div className={styles['fallback-text']} > 
                    <h3>Your Cart is empty!</h3>
                </div>
            }
        </>
    );
}

export default CartItems;