import TextField from "@mui/material/TextField";

export default function StageFormFields({stage, onChange}){
    return (
        <>
            <TextField
                label="Nom"
                fullWidth
                margin="dense"
                required
                value={stage.name}
                onChange={onChange('name')}
            />
            <TextField
                label="Description"
                fullWidth
                margin="dense"
                required
                multiline
                rows={5}
                value={stage.description}
                onChange={onChange('description')}
            />
            <TextField
                label="Lieu"
                margin="dense"
                fullWidth
                required
                value={stage.location}
                onChange={onChange('location')}
            />
            <div className="d-flex">
                <TextField
                    required
                    label="Date"
                    type="date"
                    margin="dense"
                    value={stage.date ?? ''}
                    onChange={onChange('date')}
                    sx={{ flex:'1',mr:2 }}
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    label="Prix"
                    type="number"
                    margin="dense"
                    value={stage.price}
                    onChange={onChange('price')}
                />
            </div>
        </>
    );
}