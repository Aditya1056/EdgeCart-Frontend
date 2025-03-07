import { useCallback, useEffect, useState } from "react";

const useToast = () => {

    const [status, setStatus] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    const openToast = useCallback((status : string, message : string) => {
        setStatus(status);
        setMessage(message);
    }, []);

    const closeToast = useCallback(() => {
        setStatus(null);
        setMessage(null);
    }, []);

    useEffect(() => {
        let closeToastTimer: number | undefined;

        if(status){
            closeToastTimer = setTimeout(closeToast, 3000);
        }
        else{
            clearTimeout(closeToastTimer);
        }
        
        return () => {
            clearTimeout(closeToastTimer);
        }
    }, [status, closeToast]);

    return {
        status,
        message,
        openToast,
        closeToast
    };
}

export default useToast;