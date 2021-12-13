import {createContext, useState} from "react";

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
    }

    return (
        <UserContext.Provider value={{user, login, logout, logining}}>
            {children}
        </UserContext.Provider>
    );
}