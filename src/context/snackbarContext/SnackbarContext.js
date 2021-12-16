import {createContext, useEffect, useState} from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import ProgressLinear from "../../components/progress/ProgressLinear";

export const SnackbarContext = createContext(undefined);

export default function SnackbarContextProvider({children}){
    const [open, setOpen] = useState(false);
    const [snackPack, setSnackPack] = useState([]);
    const [messageInfo, setMessageInfo] = useState(undefined);
    const [type, setType] = useState('success');
    const timeout = 3000;

    useEffect(() => {
        if (snackPack.length && !messageInfo) {
            // Set a new snack when we don't have an active one
            setMessageInfo({ ...snackPack[0] });
            setSnackPack(prev => prev.slice(1));
            setOpen(true);
        } else if (snackPack.length && messageInfo && open) {
            // Close an active snack when a new one is added
            setOpen(false);
        }
    }, [snackPack, messageInfo, open]);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const handleExited = () => {
        setMessageInfo(undefined);
    };

    const showSnackbar = (newMessage = '', newType = 'success') => {
        setSnackPack((prev) => [...prev, { message: newMessage, key: new Date().getTime() }]);
        setType(newType);
    }

    return (
        <SnackbarContext.Provider value={{showSnackbar}}>
            {children}
            <Snackbar
                key={messageInfo ? messageInfo.key : undefined}
                TransitionProps={{ onExited: handleExited }}
                open={open}
                autoHideDuration={timeout + 100}
                onClose={handleClose}
            >
                <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
                    {messageInfo ? messageInfo.message : undefined}
                    <ProgressLinear timeout={timeout}/>
                </Alert>
            </Snackbar>
        </SnackbarContext.Provider>
    );
}