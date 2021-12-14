import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import {useContext, useState} from "react";
import {UserContext} from "../../../context/userContext/UserContext";
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import {AccountCircle} from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";
import LoginIcon from "@mui/icons-material/Login";
import {Transition} from "../Transition";

export default function LoginDialog({open, onClose, onRegister}){
    const {login, logining} = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);
        await login(email, password)
            .then(onClose)
            .catch(error => {setError(error.toString())});
    }

    const inputsValid = !!email && !!password && email.length >=3 && email.includes('@');

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={onClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <form onSubmit={handleLogin}>
                <DialogTitle className="text-center">Connexion</DialogTitle>
                <DialogContent>
                    <div className="d-block w-full">
                        <FormControl variant="standard" fullWidth>
                            <InputLabel htmlFor="email-login">
                                Adresse email
                            </InputLabel>
                            <Input
                                autoFocus
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
                    <div className="d-block mt-2 w-full">
                        <FormControl variant="standard" fullWidth>
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
                    <div className="mt-2">
                        Nouveau ? <a href="#" onClick={onRegister}>Inscription</a>
                    </div>
                    {error && <div className="mt-2 error">{error}</div>}
                </DialogContent>
                <DialogActions>
                    <LoadingButton
                        variant="contained"
                        type="submit"
                        loading={logining}
                        loadingPosition="start"
                        startIcon={<LoginIcon/>}
                        disabled={!inputsValid}
                    >Connexion</LoadingButton>
                    <Button onClick={onClose}>Annuler</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}