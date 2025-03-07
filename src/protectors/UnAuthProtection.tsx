import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { useAuthContext } from "../store/authContext";

import Loading from "../components/UI/Loading/Loading";

interface unAuthProtectionProps{
    element: React.ReactElement
}

const UnAuthProtection : React.FC<unAuthProtectionProps> = (props) => {

    const auth = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        if(!auth.isLoading && auth.loggedIn){
            navigate("/");
        }
    }, [auth.loggedIn, auth.isLoading]);

    return (
        <>
            {
                auth.isLoading && <Loading />
            }
            {
                !auth.isLoading &&  props.element
            }
        </>
    );
}

export default UnAuthProtection;