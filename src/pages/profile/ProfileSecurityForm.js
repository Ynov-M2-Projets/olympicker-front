import {useContext, useState} from "react";
import {SnackbarContext} from "../../context/snackbarContext/SnackbarContext";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";

export default function ProfileSecurityForm() {
    const {showSnackbar} = useContext(SnackbarContext);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitting(true);
        showSnackbar('Modifications enregistrées');
    };

    const formValid = !!oldPassword && !!newPassword && !!newPasswordConfirm && newPassword === newPasswordConfirm;

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <TextField
                    type="password"
                    label="Ancien mot de passe"
                    variant="outlined"
                    margin="dense"
                    required
                    style={{width: '20rem'}}
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                />
            </div>
            <div>
                <TextField
                    type="password"
                    label="Nouveau mot de passe"
                    variant="outlined"
                    margin="dense"
                    required
                    style={{width: '20rem'}}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
            </div>
            <div>
                <TextField
                    type="password"
                    label="Confirmez le nouveau mot de passe"
                    variant="outlined"
                    margin="dense"
                    required
                    style={{width: '20rem'}}
                    value={newPasswordConfirm}
                    onChange={(e) => setNewPasswordConfirm(e.target.value)}
                />
            </div>
            <div className="mt-2">
                <LoadingButton
                    type="submit"
                    variant="contained"
                    loadingPosition="start"
                    loading={submitting}
                    startIcon={<SaveIcon/>}
                    disabled={!formValid}
                >
                    Modifier le mot de passe
                </LoadingButton>
            </div>
        </form>
    );
}