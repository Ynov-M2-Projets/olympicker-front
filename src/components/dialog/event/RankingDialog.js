import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Rankings from "../../table/Rankings";

export default function RankingDialog({onClose, stage, type = 'SIMPLE'}) {
    return (
        <Dialog
            open={!!stage}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle className="text-center">
                Classement {type === 'SIMPLE' ? "de l'évènement" : "de l'étape"}
            </DialogTitle>
            <DialogContent>
                <Rankings stage={stage}/>
            </DialogContent>
        </Dialog>
    );
}