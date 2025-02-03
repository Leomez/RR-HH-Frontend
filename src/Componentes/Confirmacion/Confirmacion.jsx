import { Backdrop, Box, Button, Typography, Card, CardContent, CardActions } from "@mui/material";
// import Loading from "../../Componentes/Loading";
import React from "react";


const Confirmacion = ({ open, empleado, cancel, confirm }) => {       

    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
        >
            <Card sx={{ width: '30rem', margin: 'auto', marginTop: '10rem' }}>
                
                <CardContent>
                    <Typography variant="h5" sx={{ textAlign: 'center' }}>
                        Vas a eliminar al siguiente empleado:
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>                        
                        <Typography textAlign="center" margin="auto" variant="h4">{empleado}</Typography>
                    </Box>                    
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