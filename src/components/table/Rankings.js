import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import AddIcon from "@mui/icons-material/Add";
import {useEffect, useState} from "react";
import {axios, axiosHeaders} from "../../utils/axios-client";
import CircularProgress from "@mui/material/CircularProgress";

export default function Rankings({stage}){
    const [fetching, setFetching] = useState(true);
    const [ranking, setRanking] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [userId, setUserId] = useState('');
    const [position, setPosition] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        if(stage){
            setError(null);
            axios.get(`/stages/${stage.id}/ranking`)
                .then(result => {
                    console.log(result.data);
                    setRanking(result.data);
                })
                .catch(error => setError(error.toString()))
                .finally(() => setFetching(false))
        }
    }, [stage])

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);
        if(!!ranking.find(rank => rank.user.id === parseInt(userId))){
            setError("L'utilisateur est déjà classé");
            return;
        }
        axios.post(`/stages/${stage.id}/ranking`,{userId, position}, {...axiosHeaders()})
            .then(({data}) => {
                setRanking(prev => [...prev, data])
            })
            .catch(error => setError(error.toString()))
            .finally(() => setSubmitting(false))
    };

    if(fetching) return <CircularProgress/>;

    return (
        <>
            {error && <div className="error mb-2">{error}</div>}
            <form onSubmit={handleSubmit} className="d-flex">
                <TextField
                    sx={{mr:1}}
                    required
                    label="Participant"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                />
                <TextField
                    sx={{mr:1}}
                    required
                    label="Position"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                />
                <div className="my-auto">
                    <LoadingButton
                        type="submit"
                        variant="contained"
                        loading={submitting}
                        disabled={submitting || (!position || !userId)}
                        startIcon={<AddIcon/>}
                    >Ajouter</LoadingButton>
                </div>
            </form>
            <TableContainer className="mt-2" component={Paper}>
                <Table aria-label="table stages">
                    <TableHead>
                        <TableRow>
                            <TableCell><span className="font-bold">Nom</span></TableCell>
                            <TableCell align="left"><span className="font-bold">Place</span></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {ranking.sort((rank1, rank2) => {
                            return rank1.position - rank2.position;
                        }).map(rank => (
                            <TableRow
                                hover
                                key={`stage-${rank.id}`}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">{rank.user.email}</TableCell>
                                <TableCell align="left">{rank.position}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {ranking.length === 0 && <div className="text-center my-2">Aucun classement</div>}
            </TableContainer>
        </>
    );
}