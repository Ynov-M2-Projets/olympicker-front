import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from '@mui/icons-material/Menu';
import Button from "@mui/material/Button";
import {useContext, useState} from "react";
import {UserContext} from "../../../context/userContext/UserContext";
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginDialog from "../../dialog/auth/LoginDialog";
import LoadingButton from '@mui/lab/LoadingButton';
import RegisterDialog from "../../dialog/auth/RegisterDialog";
import MenuDrawer from "../../menuDrawer/MenuDrawer";

export default function Header(){
    const {user, logining, logout} = useContext(UserContext);
    const [open, setOpen] = useState(null);
    const [openMenuDrawer, setOpenMenuDrawer] = useState(false);

    const handleConnection = () => {
        setOpen('connection');
    };
    const handleRegister = () => {
        setOpen('register');
    }

    const handleCloseDialogs = () => {
        setOpen(null);
    };

    const toggleMenuDrawer = (value = null) => {
        setOpenMenuDrawer(prev => ((value !== null) ? value : !prev));
    }

    return (
        <AppBar position="sticky">
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                    onClick={toggleMenuDrawer}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Olympicker
                </Typography>
                {user ? (
                    <Button startIcon={<LogoutIcon/>} onClick={logout} color="inherit">Se déconnecter</Button>
                ) : (
                    <>
                        <LoadingButton
                            loading={logining}
                            disabled={logining}
                            loadingPosition="start"
                            startIcon={<LoginIcon/>}
                            color="inherit"
                            variant={logining ? 'outlined' : 'text'}
                            onClick={handleConnection}
                        >
                            {logining ? 'Connexion...' : 'Se connecter'}
                        </LoadingButton>
                        {!logining && (
                            <Button
                                color="inherit"
                                onClick={handleRegister}
                            >
                                Inscription
                            </Button>
                        )}
                    </>
                )}
            </Toolbar>
            {!user && (
                <>
                    <LoginDialog open={open === 'connection'} onClose={handleCloseDialogs} onRegister={() => setOpen('register')}/>
                    <RegisterDialog open={open === 'register'} onClose={handleCloseDialogs} onConnection={() => setOpen('connection')}/>
                </>
            )}
            <MenuDrawer open={openMenuDrawer} toggleCallback={toggleMenuDrawer}/>
        </AppBar>
    );
}