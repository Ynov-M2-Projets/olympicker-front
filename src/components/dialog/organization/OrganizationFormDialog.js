import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import LoadingButton from "@mui/lab/LoadingButton";
import AddIcon from '@mui/icons-material/Add';
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import {useContext, useEffect, useState} from "react";
import TextField from "@mui/material/TextField";
import {axios, axiosHeaders} from "../../../utils/axios-client";
import EditIcon from '@mui/icons-material/Edit';
import {SnackbarContext} from "../../../context/snackbarContext/SnackbarContext";

export default function OrganizationFormDialog({open, organization = null, onClose, onActionEnd}){
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(null);
    const [name, setName] = useState(organization ? organization.name ?? '' : '');
    const [description, setDescription] = useState(organization ? organization.description ?? '' : '');
    const {showSnackbar} = useContext(SnackbarContext);

    useEffect(() => {
        if(organization){
            setName(organization.name ?? '');
            setDescription(organization.description ?? '');
        }else{
            setName('');
            setDescription('');
        }
    }, [organization])

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(null);
        setSubmitting(true);
        let request, message;
        if(organization){
            request = axios.put(`/orgs/${organization.id}`,{name,description},{...axiosHeaders()})
            message = 'Organisation modifiée';
        }else{
            request = axios.post(`/orgs`,{name,description},{...axiosHeaders()});
            message = 'Organisation créée avec succès';
        }
        request
            .then(result => {
                resetForm();
                onActionEnd(result.data);
                showSnackbar(message);
                onClose();
            })
            .catch(error => {
                console.error(error);
                setError(e.toString());
            }).finally(() => setSubmitting(false))
    }

    const resetForm = () => {
        setName('');
        setDescription('');
    };

    const isFormValid = !!name && !!description

    return (
        <Dialog
            open={open}
            keepMounted
            onClose={onClose}
            fullWidth
            maxWidth="sm"
        >
            <form onSubmit={handleSubmit}>
                <DialogTitle className="text-center">{organization ? "Modifier l'organisation" : 'Nouvelle organisation'}</DialogTitle>
                <DialogContent>
                    <div className="d-block w-full">
                        <TextField
                            label="Nom"
                            required
                            margin="dense"
                            value={name}
                            onChange={(e) => {setName(e.target.value)}}
                            fullWidth
                        />
                    </div>
                    <div className="d-block mt-2 w-full">
                        <TextField
                            label="Description"
                            multiline
                            rows={5}
                            required
                            margin="dense"
                            value={description}
                            onChange={(e) => {setDescription(e.target.value)}}
                            fullWidth
                        />
                    </div>
                    {error && <div className="mt-2 error">{error}</div>}
                </DialogContent>
                <DialogActions>
                    <LoadingButton
                        variant="contained"
                        type="submit"
                        loading={submitting}
                        loadingPosition="start"
                        startIcon={organization ? <EditIcon/> : <AddIcon/>}
                        disabled={!isFormValid}
                    >{organization ? 'Modifier' : 'Créer'}</LoadingButton>
                    <Button onClick={onClose}>Annuler</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}