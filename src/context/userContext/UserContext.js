import {createContext, useEffect, useState} from "react";
import {deleteToken, getToken, storeToken} from "../../utils/token";
import {axios, axiosHeaders} from "../../utils/axios-client";

export const UserContext = createContext(undefined);

export default function UserContextProvider({children}){
    const [user, setUser] = useState(null);
    const [logining, setLogining] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = getToken();
        if(token){
            axios.get('/auth/me',{...axiosHeaders}).then(result => {
                console.log(result);
            }).catch(console.error)
        }
    },[])

    const login = async (email, password) => {
        setLogining(true);
        setError(null);
        return axios
            .post('/auth/access_token', {email, password})
            .then((result) => {
                const {data} = result;
                console.log(result);
                storeToken(data.token);
                setUser(data.user);
            })
            .finally(() => setLogining(false))
    };

    const logout = () => {
        setUser(null);
        deleteToken();
    }

    const register = async (email, password) => {
        setLogining(true);
        await setTimeout(() => {
            setUser({email});
            setLogining(false);
        }, 2000);
    };

    return (
        <UserContext.Provider value={{user, login, logout, register, logining}}>
            {children}
        </UserContext.Provider>
    );
}