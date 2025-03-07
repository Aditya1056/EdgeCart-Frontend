import React from "react";

import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { RiShoppingCartFill } from "react-icons/ri";

import styles from "./LoginForm.module.css";

import Input from '../UI/Input/Input';
import Loading from "../UI/Loading/Loading";

import useInput from '../../hooks/useInput';

import { useToastContext } from "../../store/toastContext";
import { useAuthContext } from "../../store/authContext";

import { httpUsersRequest } from '../../util/http/usersHttp';
import { inputValidator } from '../../util/helpers/validators';

interface AuthResponse {
    message: string;
    data: {
      token: string;
      expires: number;
      userId: string;
      userName: string;
      userEmail: string;
      totalOrder:number
    };
}
  
interface AuthRequest {
    url: string;
    method: "POST";
    data: {
      email: string;
      password: string;
    };
    headers?: object;
}

const LoginForm : React.FC = () => {

    const auth = useAuthContext();
    const toast = useToastContext();

    const navigate = useNavigate();

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

    let formIsValid = emailIsValid && passwordIsValid;

    const switchToSignup = () => {
        navigate('/signup');
    }

    const { mutate, isPending } = useMutation<AuthResponse, Error, AuthRequest>({
        mutationFn: httpUsersRequest,
        onError:(err) => {
            toast.openToast("FAIL", err.message);
        },
        onSuccess:({message, data}) => {

            auth.login(data.token, data.expires, data.userId, data.userName, data.userEmail);

            emailResetHandler();
            passwordResetHandler();
            toast.openToast("SUCCESS", message);
            navigate('/movies');
        }
    });



    const loginHandler = (event : React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        let userDetails = {
            email: emailValue.trim().toLowerCase(),
            password: passwordValue.trim()
        }
        mutate({
            url:'/login',
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
                className={styles['login-container']} 
                initial={{y:"50%", opacity: 0}} 
                animate={{y:"0%", opacity: 1}} 
                transition={{duration: 0.5, type:"tween"}} 

            >
                <h2>Edge Cart <RiShoppingCartFill className={styles['shop-icon']} /> </h2>
                <div className={styles['login-form']}>
                    <form onSubmit={loginHandler} >
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
                            className={styles['login-btn']} 
                            disabled={!formIsValid} 

                        >
                            Login
                        </button>
                    </form>
                    <div 
                        key={"switch-to-signup"} 
                        className={styles['sign-up-text']} 
                    >
                        Don't have an account? 
                        <span className={styles['sign-up-link']} onClick={switchToSignup} >
                            Sign up!
                        </span>
                    </div>
                </div>
            </motion.div>
        </>
    );
}

export default LoginForm;