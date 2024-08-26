import { Backdrop, Box, Button, Typography, Card, CardContent, CardActions } from "@mui/material";
import Loading from "../../Componentes/Loading";
import React from "react";


const Confirmacion = ({ open, close, formData, cancel, confirm }) => {    
    const BoxChico = (props) => {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' }}>
                {props.children}
            </Box>
        )
    }
    // console.log(formData);
    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
        >
            <Card sx={{ width: '30rem', margin: 'auto', marginTop: '10rem' }}>
                
                <CardContent>
                    <Typography variant="h5" sx={{ textAlign: 'center' }}>
                        Vas a enviar la siguiente solicitud
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                        <Typography variant="body1">Tipo de solicitud:</Typography>
                        <Typography variant="body1">{formData.tipo}</Typography>
                    </Box>
                    <BoxChico>
                        <Typography variant="body1">Categoría:</Typography>
                        <Typography variant="body1">{formData.categoria}</Typography>
                    </BoxChico>
                    {formData.fechaPermiso && <BoxChico>
                        <Typography variant="body1">Fecha:</Typography>
                        <Typography variant="body1">{formData.fechaPermiso}</Typography>
                    </BoxChico>}
                    {formData.horaPermiso && <BoxChico>
                        <Typography variant="body1">Hora:</Typography>
                        <Typography variant="body1">{formData.horaPermiso}</Typography>
                    </BoxChico>}
                    {formData.fechaCompensatoria && <BoxChico>
                        <Typography variant="body1" >Fecha en que compensa:</Typography>
                        <Typography variant="body1">{formData.fechaCompensatoria}</Typography>
                    </BoxChico>}
                    {formData.diasSolicitados != 0 && <BoxChico>
                        <Typography variant="body1">Cantidad de días solicitados:</Typography>
                        <Typography variant="body1">{formData.diasSolicitados}</Typography>
                    </BoxChico>}
                    {formData.fechaDesde && <BoxChico>
                        <Typography variant="body1">Desde:</Typography>
                        <Typography variant="body1">{formData.fechaDesde}</Typography>
                    </BoxChico>}
                    {formData.fechaHasta && <BoxChico>
                        <Typography variant="body1">Hasta:</Typography>
                        <Typography variant="body1">{formData.fechaHasta}</Typography>
                    </BoxChico>}
                    {formData.motivo && <BoxChico>
                        <Typography variant="body1">Motivo:</Typography>
                        <Typography variant="body1">{formData.motivo}</Typography>
                    </BoxChico>}
                </CardContent>
                <CardActions sx={{ display: 'flex', justifyContent: 'space-between', padding: '1rem' }}>
                    <Button onClick={cancel} variant="contained" color="secondary">
                        Cancelar
                    </Button>
                    <Button onClick={confirm} variant="contained" color="primary">
                        Confirmar
                    </Button>
                </CardActions>
            </Card>
        </Backdrop>
    );
};

export default Confirmacion;
