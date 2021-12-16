import TextField from "@mui/material/TextField";

export default function StageEventFormFields({event, sports, setEvent}) {

    const handleChange = (prop) => (e) => {
        setEvent(prev => ({...prev, [prop] : e.target.value}));
    };

    return (
        <div>
            <TextField
                label="Nom"
                fullWidth
                margin="dense"
                required
                value={event.name}
                onChange={handleChange('name')}
            />
            <TextField
                label="Description"
                fullWidth
                margin="dense"
                required
                multiline
                rows={5}
                value={event.description}
                onChange={handleChange('description')}
            />
        </div>
    );
}