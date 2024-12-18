import { Alert, IconButton, Collapse } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

export const Alerta = ({ errorFecha, severity, setOpen }) => {

    return (
        <Collapse in={errorFecha.estado}>
            <Alert
                action={<IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                        setOpen({
                            estado: false,
                            mensaje: ''
                        });
                    }}
                >
                    <CloseIcon fontSize="inherit" />
                </IconButton>}
                severity={severity}>
                {errorFecha.mensaje}
            </Alert>
        </Collapse>
    )
}