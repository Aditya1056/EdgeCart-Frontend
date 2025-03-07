import React from "react";

import { AnimatePresence } from "framer-motion";
import { Outlet } from "react-router-dom";

import MainNavigation from "../../components/Navigation/MainNavigation/MainNavigation";
import Notification from "../../components/UI/Notification/Notification";

import { useToastContext } from "../../store/toastContext";
import { useAuthContext } from "../../store/authContext";

const Root : React.FC = () => {

    const auth = useAuthContext();
    const toast = useToastContext();

    return (
        <>
            <AnimatePresence key="main-navigation" >
                {
                    auth.loggedIn && <MainNavigation />
                }
            </AnimatePresence>
            <AnimatePresence key="toast-notification" >
                {
                    (toast.status && toast.message) && 
                    <Notification 
                        status={toast.status} 
                        message={toast.message} 
                    />
                }
            </AnimatePresence>
            <Outlet />
        </>
    );
}

export default Root;