import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import {useEffect, useState} from "react";
import {axios, axiosHeaders} from "../../utils/axios-client";

export default function SportsSelect({value, onChange}) {
    const [fetching, setFetching] = useState(false);
    const [sports, setSports] = useState([]);

    useEffect(() => {
        setFetching(true);
        axios.get(`/sports`,{...axiosHeaders()})
            .then(result => {
                setSports(result.data);
            })
            .catch(console.error).finally(() => setFetching(false))
    }, [])

    return (
        <FormControl fullWidth required>
            <InputLabel id="select-sport">Sport</InputLabel>
            <Select
                labelId="select-sport"
                value={value}
                label="Sport"
                onChange={onChange}
            >
                {!fetching && sports.map(sport => <MenuItem key={`sport-${sport.id}`} value={sport.id}>{sport.name}</MenuItem>)}
            </Select>
        </FormControl>
    );
}