import TextField from "@mui/material/TextField";
import {useContext, useState} from "react";
import {UserContext} from "../../context/userContext/UserContext";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from '@mui/icons-material/Save';
import {SnackbarContext} from "../../context/snackbarContext/SnackbarContext";
import {axios, axiosHeaders} from "../../utils/axios-client";

export default function ProfileGeneralForm(){
    const {user, setUser} = useContext(UserContext);
    const {showSnackbar} = useContext(SnackbarContext);
    const [newUser, setNewUser] = useState(user);
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitting(true);
        axios.put('/users',newUser,{...axiosHeaders})
            .then(result => {
                console.log(result);
                setUser(result.data);
                showSnackbar('Modifications enregistrées');
            })
            .catch(error => showSnackbar(error.toString(), 'error'))
            .finally(() => setSubmitting(false))
    };

    const formNotValid = !newUser.email || !newUser.lastName || !newUser.firstName;

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Email"
                variant="outlined"
                margin="dense"
                value={newUser.email}
                onChange={(e) => setNewUser(prev => ({...prev, email: e.target.value}))}
            />
            <div className="mt-2 d-flex">
                <div className="mr-2">
                    <TextField
                        label="Nom de famille"
                        variant="outlined"
                        margin="dense"
                        className="mr-2"
                        value={newUser.lastName ?? ''}
                        onChange={(e) => setNewUser(prev => ({...prev, lastName: e.target.value}))}
                    />
                </div>
                <TextField
                    label="Prénom"
                    variant="outlined"
                    margin="dense"
                    value={newUser.firstName ?? ''}
                    onChange={(e) => setNewUser(prev => ({...prev, firstName: e.target.value}))}
                />
            </div>
            <div className="mt-2">
                <LoadingButton
                    type="submit"
                    variant="contained"
                    loadingPosition="start"
                    loading={submitting}
                    startIcon={<SaveIcon/>}
                    disabled={formNotValid}
                >
                    Enregistrer
                </LoadingButton>
            </div>
        </form>
    );
}