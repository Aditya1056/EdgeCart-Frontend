import { useState, useCallback, useEffect } from "react";

const useAuth = () => {

    const [token, setToken] = useState<string | null>(null);
    const [expiration, setExpiration] = useState<Date | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [userName, setUserName] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const login = useCallback((
            userToken: string, 
            expirationTime: number, 
            id: string, 
            name: string, 
            email: string,
    ) => {

        const expirationDate = new Date((new Date().getTime()) + expirationTime);

        setToken(userToken);
        setUserId(id);
        setUserEmail(email);
        setUserName(name);
        setExpiration(expirationDate);
        localStorage.setItem('userData', JSON.stringify({
            token:userToken,
            expiration : expirationDate.toISOString(),
            userId:id,
            userEmail:email,
            userName:name,
        }));
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setUserId(null);
        setUserEmail(null);
        setUserName(null);
        setExpiration(null);
        localStorage.removeItem('userData');
    }, []);

    useEffect(() => {
        let userData = undefined;
        const userDataString = localStorage.getItem('userData');
        if(userDataString){
            userData = JSON.parse(userDataString);
        }
        if(userData && userData.token && userData.userId && new Date() < new Date(userData.expiration)){
            const remainingTime = new Date(userData.expiration).getTime() - new Date().getTime();
            login(userData.token, remainingTime, userData.userId, userData.userName, userData.userEmail);
        }
        setIsLoading(false);
    }, [login]);

    useEffect(() => {

        let logoutTimer : number | undefined;

        if(token && expiration){
            const remainingTime = expiration.getTime() - new Date().getTime();
            logoutTimer = setTimeout(logout, remainingTime);
        }
        else{
            clearTimeout(logoutTimer);
        }

        return () => {
            clearTimeout(logoutTimer);
        }
    }, [token, expiration, logout]);

    return {
        token,
        userId,
        userEmail,
        userName,
        login,
        logout,
        isLoading
    };
}

export default useAuth;