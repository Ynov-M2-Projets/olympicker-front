import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import {useEffect, useState} from "react";
import {axios} from "../../../utils/axios-client";
import CircularProgress from "@mui/material/CircularProgress";
import Rankings from "../../table/Rankings";

export default function RankingDialog({onClose, stage, type = 'SIMPLE'}) {
    const [fetching, setFetching] = useState(true);
    const [error, setError] = useState(null);
    const [ranking, setRanking] = useState(null);

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

    return (
        <Dialog
            open={!!stage}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
        >
            {(fetching || !stage) ? <CircularProgress/> : (
                <>
                    <DialogTitle className="text-center">
                        Classement {type === 'SIMPLE' ? "de l'évènement" : "de l'étape"}
                    </DialogTitle>
                    <DialogContent>
                        {error && <div className="error mb-2">{error}</div>}
                        <Rankings ranking={ranking} setRanking={setRanking}/>
                    </DialogContent>
                </>
            )}
        </Dialog>
    );
}