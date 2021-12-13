import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from '@mui/icons-material/Menu';
import Button from "@mui/material/Button";
import {useContext, useState} from "react";
import {UserContext} from "../../context/userContext/UserContext";
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginDialog from "../login/LoginDialog";
import LoadingButton from '@mui/lab/LoadingButton';

export default function Header(){
    const {user, logining, logout} = useContext(UserContext);
    const [open, setOpen] = useState(false);

    const handleConnection = () => {
        setOpen(true);
    };

    const handleCloseConnection = () => {
        setOpen(false);
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Olympicker
                </Typography>
                {user ? (
                    <Button startIcon={<LogoutIcon/>} onClick={logout} color="inherit">Se déconnecter</Button>
                ) : (
                    <LoadingButton
                        loading={logining}
                        disabled={logining}
                        loadingPosition="start"
                        startIcon={<LoginIcon/>}
                        color="inherit"
                        onClick={handleConnection}
                    >
                        {logining ? 'Connexion...' : 'Se connecter'}
                    </LoadingButton>
                )}
            </Toolbar>
            {!user && <LoginDialog open={open} onClose={handleCloseConnection}/>}
        </AppBar>
    );
}