import { Dialog, DialogTitle, DialogActions, Button, DialogContent, DialogContentText } from "@mui/material";

interface Props {
    open: boolean;
    title: string;
    text: string;
    onCancel: () => void;
    onConfirm: () => void;
}

export const ConfirmDialog: React.FC<Props> = ({ open, title, text, onCancel, onConfirm }) => (
    <Dialog open={open} onClose={onCancel}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
            <DialogContentText>{text}</DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={onCancel}>Отмена</Button>
            <Button variant="contained" onClick={onConfirm}>
                Ок
            </Button>
        </DialogActions>
    </Dialog>
);
