import React from "react";

import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { RiShoppingCartFill } from "react-icons/ri";

import styles from "./SignupForm.module.css";

import Input from '../UI/Input/Input';
import Loading from "../UI/Loading/Loading";

import useInput from '../../hooks/useInput';

import { useToastContext } from "../../store/toastContext";

import { httpUsersRequest } from '../../util/http/usersHttp';
import { inputValidator } from '../../util/helpers/validators';

interface AuthResponse {
    message: string;
    data: {
        userId: string
    };
}
  
interface AuthRequest {
    url: string;
    method: "POST";
    data: {
      email: string;
      password: string;
      fullname:string;

    };
    headers?: object;
}

const SignupForm : React.FC = () => {

    const toast = useToastContext();

    const navigate = useNavigate();

    const {
        value: nameValue,
        isValid: nameIsValid,
        isInvalid: nameIsInvalid,
        inputChangeHandler: nameChangeHandler,
        inputBlurHandler: nameBlurHandler,
        inputResetHandler: nameResetHandler
    } = useInput(inputValidator, 1);

    const {
        value: emailValue,
        isValid: emailIsValid,
        isInvalid: emailIsInvalid,
        inputChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
        inputResetHandler: emailResetHandler
    } = useInput(inputValidator, 5);

    const {
        value: passwordValue,
        isValid: passwordIsValid,
        isInvalid: passwordIsInvalid,
        inputChangeHandler: passwordChangeHandler,
        inputBlurHandler: passwordBlurHandler,
        inputResetHandler: passwordResetHandler
    } = useInput(inputValidator, 6);

    const switchToLogin = () => {
        navigate('/login');
    }

    let formIsValid = emailIsValid && passwordIsValid && nameIsValid;

    const { mutate, isPending } = useMutation<AuthResponse, Error, AuthRequest>({
        mutationFn: httpUsersRequest,
        onError:(err) => {
            toast.openToast("FAIL", err.message);
        },
        onSuccess:({message}) => {
            emailResetHandler();
            passwordResetHandler();
            nameResetHandler();
            toast.openToast("SUCCESS", message);
            navigate('/login');
        }
    });

    const signupHandler = (event : React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        let userDetails = {
            email: emailValue.trim().toLowerCase(),
            password: passwordValue.trim(),
            fullname: nameValue.trim()
        }
        mutate({
            url:'/signup',
            method:"POST",
            data: userDetails,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }

    return (
        <>
            {
                isPending && <Loading />
            }
            <motion.div 
                className={styles['signup-container']} 
                initial={{y:"50%", opacity: 0}} 
                animate={{y:"0%", opacity: 1}} 
                transition={{duration: 0.5, type:"tween"}} 
            >
                <h2>Edge Cart <RiShoppingCartFill className={styles['shop-icon']} /> </h2>
                <div className={styles['signup-form']}>
                    <form onSubmit={signupHandler} >
                        <Input 
                            label = "Full Name" 
                            id = "name" 
                            type = "text" 
                            value = {nameValue} 
                            onChange = {nameChangeHandler} 
                            onBlur = {nameBlurHandler} 
                            isInvalid={nameIsInvalid} 
                            placeholder = "Enter your full name" 
                            errorContent={"Name cannot be empty"} 
                        />
                        <Input 
                            label = "Email" 
                            id = "email" 
                            type = "email" 
                            value = {emailValue} 
                            onChange = {emailChangeHandler} 
                            onBlur = {emailBlurHandler} 
                            isInvalid={emailIsInvalid} 
                            placeholder = "Enter your email" 
                            errorContent={"Email is not valid"} 
                        />
                        <Input 
                            label = "Password" 
                            id = "password" 
                            type = "password" 
                            value = {passwordValue} 
                            onChange = {passwordChangeHandler} 
                            onBlur = {passwordBlurHandler} 
                            isInvalid={passwordIsInvalid} 
                            placeholder = "Enter your password" 
                            errorContent={"Password must be atleast 6 characters"}  
                        />
                        <button 
                            type="submit" 
                            className={styles['signup-btn']} 
                            disabled={!formIsValid}

                        >
                            Sign up
                        </button>
                    </form>
                    <div 
                        key={"switch-to-login"} 
                        className={styles['login-text']} 
                    >
                        Already have an account? 
                        <span className={styles['login-link']} onClick={switchToLogin} >
                            Login!
                        </span>
                    </div>
                </div>
            </motion.div>
        </>
    );
}

export default SignupForm;