import React from "react";
import { useMutation } from "@tanstack/react-query";

import styles from './CartItem.module.css';

import Loading from "../UI/Loading/Loading";

import { useAuthContext } from "../../store/authContext";
import { useToastContext } from "../../store/toastContext";

import { httpUsersRequest } from "../../util/http/usersHttp";

import queryClient from "../../util/helpers/queryClient";

interface cartItemInterface{
    productId: string,
    name:string,
    quantity: number,
    price:number,
    image: string
}

const CartItem : React.FC<cartItemInterface> = (props) => {

    const auth = useAuthContext();
    const toast = useToastContext();

    const { mutate : incrementMutate, isPending: incrementPending } = useMutation({
        mutationFn: httpUsersRequest,
        onError:(err) => {
            toast.openToast("FAIL", err.message);
        },
        onSuccess:() => {
            queryClient.invalidateQueries({queryKey : ['cart']});
        }
    });

    const { mutate : decrementMutate, isPending: decrementPending } = useMutation({
        mutationFn: httpUsersRequest,
        onError:(err) => {
            toast.openToast("FAIL", err.message);
        },
        onSuccess:() => {
            queryClient.invalidateQueries({queryKey : ['cart']});
        }
    });

    const productIncrementHandler = () => {
        incrementMutate({
            url: '/cart/increment',
            method:"PATCH",
            data:{
                productId: props.productId,
            },
            headers:{
                'Authorization':'Bearer ' + auth.token
            }
        })
    }

    const productDecrementHandler = () => {
        decrementMutate({
            url: '/cart/decrement',
            method:"PATCH",
            data:{
                productId: props.productId,
            },
            headers:{
                'Authorization':'Bearer ' + auth.token
            }
        })
    }

    return (
        <>
            {
                (incrementPending || decrementPending) && <Loading />
            }
            <li className={styles['cart-item']} >
                <div className={styles['image-container']}>
                    <img src={props.image} alt={"product image"} />
                </div>  
                <div className={styles['details-container']} >
                    <h4>{props.name}</h4>
                    <p>x {props.quantity}</p>
                </div>
                <div className={styles['price-container']} >
                    <button className={styles['decrease-btn']} onClick={productDecrementHandler}  >-</button>
                    <button className={styles['increase-btn']} onClick={productIncrementHandler} >+</button>
                    <p>₹ {(props.price * props.quantity).toFixed(2)} /-</p>
                </div>
            </li>
        </>
    );
}

export default CartItem;