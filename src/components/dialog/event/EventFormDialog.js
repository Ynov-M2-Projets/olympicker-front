import Dialog from "@mui/material/Dialog";
import SimpleEventFormFields from "./SimpleEventFormFields";
import StageEventFormFields from "./StageEventFormFields";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import LoadingButton from "@mui/lab/LoadingButton";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import {useCallback, useEffect, useState} from "react";
import {axios, axiosHeaders} from "../../../utils/axios-client";

const INITIAL_EVENT = {
    name: '',
    description: '',
    sportId: '',
    organizationId: '',
    date: '',
    location: '',
    price: ''
};

const formatSimpleFormEvent = (event) => ({
    ...INITIAL_EVENT,
    ...event,
    sportId : event.sport.id,
    organizationId: event.organization.id,
    date: event.stage.date,
    price: event.stage.price
})

const formatStageFormEvent = (event) => ({
    ...INITIAL_EVENT,
    ...event,
    sportId : event.sport.id,
})

export default function EventFormDialog({open, onClose, type, event = null}) {
    const [submitting, setSubmitting] = useState(false);
    const [formEvent, setFormEvent] = useState(INITIAL_EVENT);
    const formatEvent = useCallback((event) => {
        return type === 'stage' ? formatStageFormEvent(event) : formatSimpleFormEvent(event);
    }, [type]);

    useEffect(() => {
        if(event) setFormEvent(formatEvent(event));
        else setFormEvent(INITIAL_EVENT);
    },[event, formatEvent])

    useEffect(() => console.log(formEvent), [formEvent]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitting(true);
    }

    const handleChange = (prop) => (e) => {
        setFormEvent(prev => ({...prev, [prop] : e.target.value}));
    };

    let form = <SimpleEventFormFields event={formEvent} onChange={handleChange}/>;
    if(type === 'stage') form = <StageEventFormFields event={formEvent} onChange={handleChange}/>;

    return (
        <Dialog
            open={open}
            keepMounted
            onClose={onClose}
            fullWidth
            maxWidth="sm"
        >
            <form onSubmit={handleSubmit}>
                <DialogTitle className="text-center">{event ? "Modifier l'évènement" : 'Nouvel évènement'}</DialogTitle>
                <DialogContent>
                    {form}
                </DialogContent>
                <DialogActions>
                    <LoadingButton
                        variant="contained"
                        type="submit"
                        loading={submitting}
                        loadingPosition="start"
                        startIcon={event ? <EditIcon/> : <AddIcon/>}
                        disabled={submitting}
                    >{event ? 'Modifier' : 'Créer'}</LoadingButton>
                    <Button onClick={onClose}>Annuler</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}