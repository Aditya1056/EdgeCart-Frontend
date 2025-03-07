import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { useAuthContext } from "../store/authContext";

import Loading from "../components/UI/Loading/Loading";

interface authProtectionProps{
    element: React.ReactElement
}

const AuthProtection : React.FC<authProtectionProps> = (props) => {

    const auth = useAuthContext();
    const navigate = useNavigate();

    const Component = props.element;

    useEffect(() => {
        if(!auth.isLoading && !auth.loggedIn){
            navigate('/login');
        }
    }, [auth.loggedIn, auth.isLoading]);

    return (
        <>
            {
                auth.isLoading && <Loading />
            }
            {
                !auth.isLoading &&  Component
            }
        </>
    );
}

export default AuthProtection;