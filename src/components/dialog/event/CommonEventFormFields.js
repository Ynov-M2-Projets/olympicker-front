import TextField from "@mui/material/TextField";

export default function CommonEventFormFields({event, onChange}) {
    return (
        <>
            <TextField
                label="Nom"
                fullWidth
                margin="dense"
                required
                value={event.name ?? ''}
                onChange={onChange('name')}
            />
            <TextField
                label="Description"
                fullWidth
                margin="dense"
                required
                multiline
                rows={5}
                value={event.description ?? ''}
                onChange={onChange('description')}
            />
        </>
    );
}