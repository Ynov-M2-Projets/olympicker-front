import {useContext, useState} from "react";
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
import {UserContext} from "../../../context/userContext/UserContext";
import {Transition} from "../Transition";

export default function RegisterDialog({open, onClose, onConnection}){
    const {register, logining} = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [error, setError] = useState(null);

    const handleRegister = async (e) => {
        e.preventDefault();
        setError(null);
        await register(email, password)
            .then(onClose)
            .catch(error => setError(error.toString()));
    }

    const inputsValid = !!email && !!password && password === passwordConfirm && email.length >=3 && email.includes('@');

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={onClose}
            aria-describedby="alert-dialog-slide-description"
            fullWidth
            maxWidth="xs"
        >
            <form onSubmit={handleRegister}>
                <DialogTitle className="text-center">Inscription</DialogTitle>
                <DialogContent>
                    <div className="d-block">
                        <FormControl variant="standard" fullWidth>
                            <InputLabel htmlFor="email-register">
                                Adresse email
                            </InputLabel>
                            <Input
                                autoFocus
                                id="email-register"
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
                        <FormControl variant="standard" fullWidth>
                            <InputLabel htmlFor="password-register">
                                Mot de passe
                            </InputLabel>
                            <Input
                                id="password-register"
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
                        <FormControl variant="standard" fullWidth>
                            <InputLabel htmlFor="password-confirm-register">
                                Confirmez le mot de passe
                            </InputLabel>
                            <Input
                                id="password-confirm-register"
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
                        D??j?? inscrit ? <a href="#" onClick={onConnection}>Connexion</a>
                    </div>
                    {error && <div className="mt-2 error">{error}</div>}
                </DialogContent>
                <DialogActions>
                    <LoadingButton
                        type="submit"
                        variant="contained"
                        loading={logining}
                        loadingPosition="start"
                        startIcon={<LoginIcon/>}
                        disabled={!inputsValid}
                    >Inscription</LoadingButton>
                    <Button onClick={onClose}>Annuler</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}