import React from "react";

import AuthContext from "../store/authContext";

import useAuth from "../hooks/useAuth";

interface authProviderProps{
    children: React.ReactNode
}

const AuthContextProvider : React.FC<authProviderProps> = (props) => {

    const { token, userName, userEmail, userId, login, logout, isLoading } = useAuth();

    return (
        <AuthContext.Provider 
            value={{
                loggedIn: !!token,
                token, 
                userName, 
                userEmail, 
                userId,
                isLoading,
                login,
                logout
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;