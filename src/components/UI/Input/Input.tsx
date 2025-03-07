import React, { useState } from "react";

import { VscEye } from "react-icons/vsc";
import { VscEyeClosed } from "react-icons/vsc";
import { MdErrorOutline } from "react-icons/md";

import styles from "./Input.module.css";

interface inputProps{
    isInvalid: boolean,
    id: string,
    label: string,
    type: string,
    value: string,
    onChange: (event : React.ChangeEvent<HTMLInputElement>) => void
    onBlur: () => void
    placeholder? : string,
    disabled? : boolean,
    errorContent?: string
}


const Input : React.FC<inputProps> = (props) => {

    const [passwordType, setPasswordType] = useState<string>("password");

    const showPassword = () => {
        setPasswordType("text");
    }

    const hidePassword = () => {
        setPasswordType("password");
    }

    let inputClasses = styles['form-item__input'];

    if(props.isInvalid){
        inputClasses += ' ' + styles['error'];
    }

    return (
        <div className={styles['form-item']} >
            <div className={inputClasses}>
                <label htmlFor={props.id}>{props.label} <sup>*</sup></label>
                <div className={styles['form-input']} >
                    <input 
                        type={props.id === "password" ? passwordType : props.type} 
                        value={props.value} 
                        id={props.id} 
                        onChange={props.onChange} 
                        onBlur={props.onBlur} 
                        placeholder={props.placeholder ? props.placeholder : ''} 
                        disabled={props.disabled} 
                    />
                    {
                        (props.id === "password" &&  passwordType === "password" && props.value.length > 0) && 
                        <VscEye 
                            className={styles['toggle-icon']} 
                            title="Show password" 
                            onClick={showPassword} 
                        />
                    }
                    {
                        (props.id === "password" &&  passwordType === "text" && props.value.length > 0) && 
                        <VscEyeClosed 
                            className={styles['toggle-icon']} 
                            title="Hide password" 
                            onClick={hidePassword} 
                        />
                    }
                </div>
            </div>
            {
                props.isInvalid && 
                (
                    <div className={styles['form-item__error']}>
                        <p><MdErrorOutline className={styles['error-icon']} /> {props.errorContent}</p>
                    </div>
                )
            }
        </div>
    );
}

export default Input;