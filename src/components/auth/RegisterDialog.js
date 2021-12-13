import {forwardRef, useContext, useState} from "react";
import Slide from "@mui/material/Slide";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import {AccountCircle} from "@mui/icons-material";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import DialogActions from "@mui/material/DialogActions";
import LoadingButton from "@mui/lab/LoadingButton";
import LoginIcon from "@mui/icons-material/Login";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import {UserContext} from "../../context/userContext/UserContext";

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

export default function RegisterDialog({open, onClose, onConnection}){
    const {register, logining} = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const handleClose = () => {
        onClose();
    }

    const handleRegister = async () => {
        await register(email);
        onClose();
    }

    const inputsValid = !!email && !!password && password === passwordConfirm && email.length >=3 && email.includes('@');

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle className="text-center">Inscription</DialogTitle>
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
                <div className="d-block mt-2">
                    <FormControl variant="standard">
                        <InputLabel htmlFor="password-confirm-login">
                            Confirmez le mot de passe
                        </InputLabel>
                        <Input
                            id="password-confirm-login"
                            type="password"
                            value={passwordConfirm}
                            onChange={(e) => {setPasswordConfirm(e.target.value)}}
                            fullWidth
                            startAdornment={
                                <InputAdornment position="start">
                                    <VpnKeyIcon />
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                </div>
                <div className="mt-2">
                    Déjà inscrit ? <a href="#" onClick={onConnection}>Connexion</a>
                </div>
            </DialogContent>
            <DialogActions>
                <LoadingButton
                    loading={logining}
                    loadingPosition="start"
                    startIcon={<LoginIcon/>}
                    onClick={handleRegister}
                    disabled={!inputsValid}
                >Inscription</LoadingButton>
                <Button onClick={handleClose}>Annuler</Button>
            </DialogActions>
        </Dialog>
    );
}