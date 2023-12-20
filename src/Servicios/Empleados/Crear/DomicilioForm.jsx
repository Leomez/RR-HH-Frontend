import React from "react";
import { TextField, Stack } from "@mui/material";
import FormContainer from "../../../Componentes/Containers/FormContainer";


export default function DireccionForm({ domicilio, handleChange }) {
    return (
        <>
            <FormContainer titulo={'Domicilio'}>
                <Stack spacing={3} direction={{ xs: 'column', md: 'row' }} sx={{ marginBottom: 3 }}>
                    <TextField
                        value={domicilio.calle}
                        name="calle"
                        label="Calle"
                        variant="standard"
                        onChange={handleChange}
                        sx={{ width: { xs: '100%', md: '35rem' } }}
                    />
                    <TextField
                        value={domicilio.numero}
                        name="numero"
                        label="Número"
                        variant="standard"
                        onChange={handleChange}
                        sx={{ width: { xs: '100%', md: '10rem' } }}
                    />
                </Stack>
                <Stack spacing={3} direction={{ xs: 'column', md: 'row' }} sx={{ marginBottom: 3 }}>
                    <TextField
                        value={domicilio.ciudad}
                        name="ciudad"
                        label="Ciudad"
                        variant="standard"
                        onChange={handleChange}
                        sx={{ width: { xs: '100%', md: '35rem' } }}
                    />
                    <TextField
                        value={domicilio.cod_postal}
                        name="cod_postal"
                        label="Código Postal"
                        variant="standard"
                        onChange={handleChange}
                        sx={{ width: { xs: '100%', md: '10rem' } }}
                    />
                </Stack>
            </FormContainer>
        </>
    ); 
}