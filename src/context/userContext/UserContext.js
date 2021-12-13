import {createContext, useState} from "react";
import {deleteToken} from "../../utils/token";

export const UserContext = createContext(undefined);

export default function UserContextProvider({children}){
    const [user, setUser] = useState(null);
    const [logining, setLogining] = useState(false);

    const login = async (email, password) => {
        setLogining(true);
        await setTimeout(() => {
            setUser({email});
            setLogining(false);
        }, 2000);
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