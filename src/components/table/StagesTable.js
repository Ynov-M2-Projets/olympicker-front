import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import {displayDate} from "../../utils/date";

export default function StagesTable({stages}) {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="table stages">
                <TableHead>
                    <TableRow>
                        <TableCell>Nom</TableCell>
                        <TableCell align="left">Date</TableCell>
                        <TableCell align="left">Lieu</TableCell>
                        <TableCell align="left">Prix (€)</TableCell>
                        <TableCell/>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {stages.map(stage => (
                        <TableRow
                            hover
                            key={`stage-${stage.id}`}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">{stage.name}</TableCell>
                            <TableCell align="left">{displayDate(stage.date)}</TableCell>
                            <TableCell align="left">{stage.location}</TableCell>
                            <TableCell align="left">{stage.price}</TableCell>
                            <TableCell>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {stages.length === 0 && <div className="text-center my-2">Aucune étape</div>}
        </TableContainer>
    );
}