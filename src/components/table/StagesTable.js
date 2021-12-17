import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import {displayDate} from "../../utils/date";
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import {useState} from "react";
import RankingDialog from "../dialog/event/RankingDialog";

export default function StagesTable({stages, type = 'SIMPLE'}) {
    const [stageRanking, setStageRanking] = useState(null);

    const handleSeeRanking = (stage) => (event) => {
        setStageRanking(stage);
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="table stages">
                <TableHead>
                    <TableRow>
                        <TableCell>Nom</TableCell>
                        <TableCell align="left">Date</TableCell>
                        <TableCell align="left">Lieu</TableCell>
                        <TableCell align="left">Prix (€)</TableCell>
                        <TableCell align="center">Classement</TableCell>
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
                            <TableCell align="center">
                                <Tooltip title="Classement" placement="top">
                                    <IconButton
                                        onClick={handleSeeRanking(stage)}
                                        color="primary" aria-label="see ranking" component="span"
                                    >
                                        <MilitaryTechIcon />
                                    </IconButton>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {stages.length === 0 && <div className="text-center my-2">Aucune étape</div>}
            <RankingDialog
                stage={stageRanking}
                type={type}
                onClose={() => setStageRanking(null)}
            />
        </TableContainer>
    );
}