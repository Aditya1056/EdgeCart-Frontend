import React, { useContext } from "react";

interface authContextInterface{
    loggedIn: boolean,
    token: string | null,
    userId: string | null,
    userEmail: string | null,
    userName: string | null,
    login:(
        userToken: string, 
        expirationTime: number, 
        id: string, 
        name: string, 
        email: string,
    ) => void,
    logout:() => void,
    isLoading:boolean
}

const AuthContext = React.createContext<authContextInterface>({
    loggedIn:false,
    token:null,
    userId:null,
    userEmail:null,
    userName:null,
    login:() => {},
    logout:() => {},
    isLoading:false
});

export const useAuthContext = () => {
    return useContext(AuthContext);
}

export default AuthContext;