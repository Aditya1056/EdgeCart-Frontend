import React, { useContext } from "react";

interface toastContextInterface{
    status: string | null,
    message: string | null,
    openToast : (status: string, message : string) => void,
    closeToast : () => void,
}

const ToastContext = React.createContext<toastContextInterface>({
    status:null,
    message:null,
    openToast:() => {},
    closeToast:() => {}
});

export const useToastContext = () => {
    return useContext(ToastContext);
}

export default ToastContext;