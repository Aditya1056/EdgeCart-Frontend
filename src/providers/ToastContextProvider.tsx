import React from "react";

import ToastContext from "../store/toastContext";

import useToast from "../hooks/useToast";

interface toastProviderProps{
    children: React.ReactNode
}

const ToastContextProvider : React.FC<toastProviderProps> = (props) => {

    const { status, message, openToast, closeToast } = useToast();

    return (
        <ToastContext.Provider 
            value={{
                status, 
                message,
                openToast,
                closeToast 
            }}
        >
            {props.children}
        </ToastContext.Provider>
    );
}

export default ToastContextProvider;