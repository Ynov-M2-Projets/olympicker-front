import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Tooltip from "@mui/material/Tooltip";
import {useNavigate} from "react-router-dom";

export default function EventsTable({events}){
    const navigate = useNavigate();

    const onViewEvent = (event) => {
        navigate(`/events/${event.id}`);
    };

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Nom</TableCell>
                        <TableCell align="left">Sport</TableCell>
                        <TableCell align="left">Slots</TableCell>
                        <TableCell/>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {events.map(event => (
                        <TableRow
                            hover
                            key={`event-${event.id}`}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">{event.name}</TableCell>
                            <TableCell align="left">{event.sport.name ?? ''}</TableCell>
                            <TableCell>{event.slots}</TableCell>
                            <TableCell>
                                <Tooltip title="Voir" placement="top">
                                    <IconButton
                                        onClick={() => onViewEvent(event)}
                                        color="primary" aria-label="see event" component="span"
                                    >
                                        <VisibilityIcon />
                                    </IconButton>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {events.length === 0 && <div className="text-center my-2">Aucun évènement</div>}
        </TableContainer>
    );
}