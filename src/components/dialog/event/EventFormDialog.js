import Dialog from "@mui/material/Dialog";

export default function EventFormDialog({open, onClose, type}) {

    return (
        <Dialog
            open={open}
            keepMounted
            onClose={onClose}
            fullWidth
            maxWidth="sm"
        >
            {type}
        </Dialog>
    );
}