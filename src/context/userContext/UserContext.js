import {createContext, useEffect, useState} from "react";
import {useToken} from "../../utils/token";
import {axios, axiosHeaders} from "../../utils/axios-client";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";

export const UserContext = createContext(undefined);

export default function UserContextProvider({children}){
    const [user, setUser] = useState(null);
    const [logining, setLogining] = useState(false);
    const [openBackdrop,setOpenBackdrop] = useState(false);
    const [token, setToken, removeToken] = useToken();

    useEffect(() => {
        if(token){
            setLogining(true);
            axios.get('/auth/me',{...axiosHeaders()}).then(result => {
                setUser(result.data);
            }).catch(console.error).finally(()=> setLogining(false))
        }
    },[token])

    useEffect(() => {
        setOpenBackdrop(logining);
    }, [logining])

    const login = async (email, password) => {
        setLogining(true);
        return log('/auth/access_token', email, password);
    };

    const logout = () => {
        setUser(null);
        removeToken();
    }

    const register = async (email, password) => {
        setLogining(true);
       return log('/auth/register', email, password);
    };

    const log = (url, email, password) => {
        return axios
            .post(url, {email, password})
            .then((result) => {
                const {data} = result;
                setToken(data.token);
                setUser(data.user);
            })
            .finally(() => setLogining(false))
    }

    const updateUser = (data) => {
        setUser(prev => ({...prev, ...data}));
    }

    return (
        <UserContext.Provider value={{user, updateUser, login, logout, register, logining, token}}>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={openBackdrop}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            {children}
        </UserContext.Provider>
    );
}