import {useEffect, useState} from "react";

export const storeToken = (token) => {
    localStorage.setItem("jwt-auth", token);
};

export const getToken = () => {
    return localStorage.getItem("jwt-auth") ?? null;
};

export const deleteToken = () => {
    localStorage.removeItem("jwt-auth");
};

export const useToken = () => {
    const [token, setToken] = useState(getToken());

    useEffect(() => {
        if(token) storeToken(token);
    },[token])

    const removeToken = deleteToken;

    return [token, setToken, removeToken];
}