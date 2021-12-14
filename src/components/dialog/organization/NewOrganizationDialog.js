import {Transition} from "../Transition";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import LoadingButton from "@mui/lab/LoadingButton";
import AddIcon from '@mui/icons-material/Add';
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import {useState} from "react";
import TextField from "@mui/material/TextField";
import {axios, axiosHeaders} from "../../../utils/axios-client";

export default function NewOrganizationDialog({open, onClose, onActionEnd}){
    const [error, setError] = useState(null);
    const [creating, setCreating] = useState(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleCreation = (e) => {
        e.preventDefault();
        setError(null);
        setCreating(true);
        axios.post(`/orgs`,{name,description},{...axiosHeaders})
            .then(result => {
                onActionEnd(result.data);
                resetForm();
                onClose();
            })
            .catch(error => {
                console.error(error);
                setError(e.toString());
            }).finally(() => setCreating(false))
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
                        loading={creating}
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