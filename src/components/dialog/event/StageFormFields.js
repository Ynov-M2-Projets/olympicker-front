import TextField from "@mui/material/TextField";
import CommonEventFormFields from "./CommonEventFormFields";

export default function StageFormFields({stage, onChange}){
    return (
        <>
            <CommonEventFormFields event={stage} onChange={onChange}/>
            <TextField
                label="Lieu"
                margin="dense"
                fullWidth
                required
                value={stage.location ?? ''}
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
                    value={stage.price ?? ''}
                    onChange={onChange('price')}
                />
            </div>
        </>
    );
}