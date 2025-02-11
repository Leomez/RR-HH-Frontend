import React from "react";
import { TextField, Stack } from "@mui/material";
import FormContainer from "../../../Componentes/Containers/FormContainer";

/*funcion para validar inputs de domicilio*/



export default function DireccionForm({ domicilio, handleChange, errores }) {

    console.log(domicilio);
    return (
        <>
            <FormContainer titulo={'Domicilio'}>
                <Stack spacing={3} direction={{ xs: 'column', md: 'row' }} sx={{ marginBottom: 3 }}>
                    <TextField
                        value={domicilio.calle}
                        name="calle"
                        label="Calle"
                        color={errores?.calle ? 'error' : 'success'}
                        error={errores?.calle ? true : false}
                        helperText={errores?.calle ? errores.calle : ''}
                        variant="standard"
                        onChange={handleChange}
                        sx={{ width: { xs: '100%', md: '35rem' } }}
                    />
                    <TextField
                        value={domicilio.numero}
                        name="numero"
                        label="Número"
                        color={errores?.numero ? 'error' : 'success'}
                        error={errores?.numero ? true : false}
                        helperText={errores?.numero ? errores.numero : ''}
                        variant="standard"
                        onChange={handleChange}
                        sx={{ width: { xs: '100%', md: '10rem' } }}
                    />
                    <TextField
                        value={domicilio.piso}
                        name="piso"
                        label="Piso"
                        variant="standard"
                        onChange={handleChange}
                        sx={{ width: { xs: '100%', md: '10rem' } }}
                    />
                    <TextField
                        value={domicilio.depto}
                        name="depto"
                        label="Depto"
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
                        color={errores?.ciudad ? 'error' : 'success'}
                        error={errores?.ciudad ? true : false}
                        helperText={errores?.ciudad ? errores.ciudad : ''}
                        variant="standard"
                        onChange={handleChange}
                        sx={{ width: { xs: '100%', md: '35rem' } }}
                    />
                    <TextField
                        value={domicilio.cod_postal}
                        name="cod_postal"
                        label="Código Postal"
                        color={errores?.cod_postal ? 'error' : 'success'}
                        error={errores?.cod_postal ? true : false}
                        helperText={errores?.cod_postal ? errores.cod_postal : ''}
                        variant="standard"
                        onChange={handleChange}
                        sx={{ width: { xs: '100%', md: '10rem' } }}
                    />
                </Stack>
            </FormContainer>
        </>
    ); 
}