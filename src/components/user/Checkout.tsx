import React from "react";

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import styles from "./Checkout.module.css";

import Loading from "../UI/Loading/Loading";
import Backdrop from "../UI/Backdrop/Backdrop";
import Input from "../UI/Input/Input";

import useInput from "../../hooks/useInput";

import { useAuthContext } from "../../store/authContext";
import { useToastContext } from "../../store/toastContext";

import { httpOrdersRequest } from "../../util/http/ordersHttp";

import { inputValidator } from "../../util/helpers/validators";

import queryClient from "../../util/helpers/queryClient";

interface checkoutProps{
    onClose:() => void
}

const Checkout : React.FC<checkoutProps> = (props) => {

    const auth = useAuthContext();
    const toast = useToastContext();

    const navigate = useNavigate();

    const {
        value: addressValue,
        isValid: addressIsValid,
        isInvalid: addressIsInvalid,
        inputChangeHandler: addressChangeHandler,
        inputBlurHandler: addressBlurHandler,
        inputResetHandler: addressResetHandler
    } = useInput(inputValidator, 1);

    let formIsValid = addressIsValid;

    const { mutate, isPending } = useMutation({
        mutationFn: httpOrdersRequest,
        onError:(err) => {
            toast.openToast("FAIL", err.message);
        },
        onSuccess:({message}) => {
            addressResetHandler();
            toast.openToast("SUCCESS", message);
            queryClient.invalidateQueries({queryKey : ['cart']});
            navigate('/orders');
        }
    });

    const orderHandler = (event : React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        let orderDetails = {
            shippingAddress: addressValue.trim()
        }
        mutate({
            url:'/',
            method:"POST",
            data: orderDetails,
            headers: {
                "Authorization" : "Bearer " + auth.token
            }
        });
    }

    return (
        <>
            {
                isPending && <Loading />
            }
            <Backdrop />
            <div className={styles['checkout-container']} >
                <motion.div 
                    className={styles['checkout']} 
                    initial={{y:"60%", opacity: 0}} 
                    animate={{y:"0%", opacity: 1}} 
                    exit={{y:"60%", opacity: 0}} 
                    transition={{duration: 0.5, type:"tween"}} 

                >
                    <form onSubmit={orderHandler} >
                        <Input 
                            label = "Shipping Address" 
                            id = "address" 
                            type = "text" 
                            value = {addressValue} 
                            onChange = {addressChangeHandler} 
                            onBlur = {addressBlurHandler} 
                            isInvalid={addressIsInvalid} 
                            placeholder = "Enter your shipping address" 
                            errorContent={"address cannot be empty"} 
                        />
                        <button 
                            type="submit" 
                            className={styles['confirm-btn']} 
                            disabled={!formIsValid} 

                        >
                            Confirm
                        </button>
                        <button 
                            type="button" 
                            className={styles['cancel-btn']} 
                            onClick={props.onClose} 
                        >
                            Cancel
                        </button>
                    </form>
                </motion.div>
            </div>
        </>
    );
}

export default Checkout;