import {Transition} from "../Transition";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import LoadingButton from "@mui/lab/LoadingButton";
import AddIcon from '@mui/icons-material/Add';
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import {useEffect, useState} from "react";
import TextField from "@mui/material/TextField";
import {axios, axiosHeaders} from "../../../utils/axios-client";

export default function OrganizationFormDialog({open, organization = null, onClose, onActionEnd}){
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(null);
    const [name, setName] = useState(organization ? organization.name ?? '' : '');
    const [description, setDescription] = useState(organization ? organization.description ?? '' : '');

    useEffect(() => {
        if(organization){
            setName(organization.name ?? '');
            setDescription(organization.description ?? '');
        }
    }, [organization])

    const handleCreation = (e) => {
        e.preventDefault();
        setError(null);
        setSubmitting(true);
        let request = axios.post(`/orgs`,{name,description},{...axiosHeaders});
        if(organization){
            request = axios.put(`/orgs/${organization.id}`,{name,description},{...axiosHeaders})
        }
        request
            .then(result => {
                onActionEnd(result.data);
                resetForm();
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
            TransitionComponent={Transition}
            keepMounted
            onClose={onClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <form onSubmit={handleCreation}>
                <DialogTitle className="text-center">Nouvelle organisation</DialogTitle>
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
                        startIcon={<AddIcon/>}
                        disabled={!isFormValid}
                    >Créer</LoadingButton>
                    <Button onClick={onClose}>Annuler</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}