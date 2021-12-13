import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import {forwardRef, useContext, useState} from "react";
import Slide from "@mui/material/Slide";
import {UserContext} from "../../context/userContext/UserContext";
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import {AccountCircle} from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";
import LoginIcon from "@mui/icons-material/Login";

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

export default function LoginDialog({open, onClose}){
    const {login, logining} = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleClose = () => {
        onClose();
    }

    const handleLogin = async () => {
        await login(email, password);
        onClose();
    }

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle className="text-center">Connexion</DialogTitle>
            <DialogContent>
                <div className="d-block">
                    <FormControl variant="standard">
                        <InputLabel htmlFor="email-login">
                            Adresse email
                        </InputLabel>
                        <Input
                            id="email-login"
                            type="email"
                            value={email}
                            onChange={(e) => {setEmail(e.target.value)}}
                            fullWidth
                            startAdornment={
                                <InputAdornment position="start">
                                    <AccountCircle />
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                </div>
                <div className="d-block mt-2">
                    <FormControl variant="standard">
                        <InputLabel htmlFor="password-login">
                            Mot de passe
                        </InputLabel>
                        <Input
                            id="password-login"
                            type="password"
                            value={password}
                            onChange={(e) => {setPassword(e.target.value)}}
                            fullWidth
                            startAdornment={
                                <InputAdornment position="start">
                                    <VpnKeyIcon />
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                </div>
            </DialogContent>
            <DialogActions>
                <LoadingButton
                    loading={logining}
                    loadingPosition="start"
                    startIcon={<LoginIcon/>}
                    onClick={handleLogin}
                    disabled={!email || !password || logining}
                >Connexion</LoadingButton>
                <Button onClick={handleClose}>Annuler</Button>
            </DialogActions>
        </Dialog>
    );
}