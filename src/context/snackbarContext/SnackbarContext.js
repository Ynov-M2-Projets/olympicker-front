import {createContext, useState} from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import ProgressLinear from "../../components/progress/ProgressLinear";

export const SnackbarContext = createContext(undefined);

export default function SnackbarContextProvider({children}){
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('Succès !');
    const [type, setType] = useState('success');
    const timeout = 3000;

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const showSnackbar = (newMessage = '', newType = 'success') => {
        setMessage(newMessage);
        setType(newType);
        setOpen(true);
    }

    return (
        <SnackbarContext.Provider value={{showSnackbar}}>
            {children}
            <Snackbar open={open} autoHideDuration={timeout + 100} onClose={handleClose}>
                <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
                    {message}
                    <ProgressLinear timeout={timeout}/>
                </Alert>
            </Snackbar>
        </SnackbarContext.Provider>
    );
}