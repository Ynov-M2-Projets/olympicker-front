import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

export default function SimpleEventFormFields({event, sports, setEvent}) {

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
            <FormControl fullWidth>
                <InputLabel id="select-sport">Sport</InputLabel>
                <Select
                    labelId="select-sport"
                    value={event.sportId}
                    label="Sport"
                    onChange={handleChange('sportId')}
                >
                    {sports.map(sport => <MenuItem key={`sport-${sport.id}`} value={sport.id}>{sport.name}</MenuItem>)}
                </Select>
            </FormControl>
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