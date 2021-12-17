import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import LoadingButton from "@mui/lab/LoadingButton";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import StageFormFields from "./StageFormFields";
import {useState} from "react";
import {axios, axiosHeaders} from "../../../utils/axios-client";

export default function StageFormDialog({open, onClose, eventId, onSuccess}) {
    const [submitting, setSubmitting] = useState(false);
    const [stage, setStage] = useState({});
    const [error, setError] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);
        axios.post(`/events/${eventId}/add-stage`, stage,{...axiosHeaders()})
            .then(({data}) => {
                onSuccess(data.event);
                onClose();
            })
            .catch(error => setError(error.toString()))
            .finally(() => setSubmitting(false))
    }

    const handleChange = (prop) => (e) => {
        setStage(prev => ({...prev, [prop] : e.target.value}));
    };

    return (
        <Dialog
            open={open}
            keepMounted
            onClose={onClose}
            fullWidth
            maxWidth="sm"
        >
            <form onSubmit={handleSubmit}>
                <DialogTitle className="text-center">Nouvelle étape</DialogTitle>
                <DialogContent>
                    <StageFormFields stage={stage} onChange={handleChange} />
                    {error && <div className="error">{error}</div>}
                </DialogContent>
                <DialogActions>
                    <LoadingButton
                        variant="contained"
                        type="submit"
                        loading={submitting}
                        loadingPosition="start"
                        startIcon={<AddIcon/>}
                        disabled={submitting}
                    >Ajouter</LoadingButton>
                    <Button onClick={onClose}>Annuler</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}