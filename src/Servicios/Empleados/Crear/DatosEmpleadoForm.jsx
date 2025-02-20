/* eslint-disable react/prop-types */

import { Box, TextField, Stack } from "@mui/material";
import FormContainer from "../../../Componentes/Containers/FormContainer";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

// eslint-disable-next-line react/prop-types
export default function DatosEmpleadoForm({ inputs, handleChange, errores }) {
    function handleFechaNacimientoChange(date) {
        const formattedDate = dayjs(date).format("YYYY-MM-DD");  
        const e = {
            target: {
                name: "fecha_nac",
                value: formattedDate
            },
        };        
        handleChange(e);        
    }

    return (
        <>
            <FormContainer titulo={'Datos del Empleado'}>
                <Box position={'relative'} display={"flex"} >
                    <TextField                        
                        value={inputs.legajo}
                        name='legajo'
                        label='Legajo'
                        variant={'standard'}
                        color={errores.legajo ? 'error' : 'success'}
                        error={errores.legajo ? true : false}
                        helperText={errores.legajo ? errores.legajo : ''}
                        onChange={e => handleChange(e)}
                        sx={{ mb: 3, width: '16rem' }}
                    />
                </Box>
                <Stack spacing={3} direction={{ xs: 'column', md: 'row' }} sx={{ marginBottom: 3 }}>
                    <TextField
                        value={inputs.nombre_empleado}
                        name='nombre_empleado'
                        label='Nombre'
                        variant={'standard'}
                        color={errores.nombre ? 'error' : 'success'}
                        error={errores.nombre ? true : false}
                        helperText={errores.nombre ? errores.nombre : ''}
                        onChange={e => handleChange(e)}
                        sx={{ width: { xs: '100%', md: '16rem' } }}
                    />
                    <TextField
                        value={inputs.apellido_empleado}
                        name='apellido_empleado'
                        label='Apellido'
                        variant={'standard'}
                        color={errores.apellido ? 'error' : 'success'}
                        error={errores.apellido ? true : false}
                        helperText={errores.apellido ? errores.apellido : ''}
                        onChange={e => handleChange(e)}
                        sx={{ width: { xs: '100%', md: '16rem' } }}
                    />
                </Stack>
                <Stack spacing={3} direction={{ xs: 'column', md: 'row' }} sx={{ marginBottom: 3 }}>
                    
                    <DatePicker
                        label='Fecha de nacimiento'             
                        format="DD-MM-YYYY"                                  
                        onChange={e => handleFechaNacimientoChange(e)}
                        // defaultValue={null} 
                        // value = {fechaNac} 
                        // onAccept = {setFechaNac(null)}                      
                        sx={{ width: { xs: '100%', md: '16rem' } }}
                    />
                    <TextField
                        value={inputs.dni}
                        name='dni'
                        label='Dni'
                        variant={'standard'}
                        color={errores.dni ? 'error' : 'success'}
                        error={errores.dni ? true : false}
                        helperText={errores.dni ? errores.dni : ''}
                        onChange={e => handleChange(e)}
                        sx={{ width: { xs: '100%', md: '16rem' } }}
                    />
                </Stack>
                <Stack spacing={3} direction={{ xs: 'column', md: 'row' }} sx={{ marginBottom: 3 }}>
                    <TextField
                        value={inputs.correo}
                        name='correo'
                        label='Correo'
                        variant={'standard'}
                        color={errores.correo ? 'error' : 'success'}
                        error={errores.correo ? true : false}
                        helperText={errores.correo ? errores.correo : ''}
                        onChange={e => handleChange(e)}
                        sx={{ width: { xs: '100%', md: '35rem' } }}
                    />
                    <TextField
                        value={inputs.telefono}
                        name='telefono'
                        label='Telefono'
                        variant={'standard'}
                        color={errores.telefono ? 'error' : 'success'}
                        error={errores.telefono ? true : false}
                        helperText={errores.telefono ? errores.telefono : ''}
                        onChange={e => handleChange(e)}
                        sx={{ width: { xs: '100%', md: '10rem' } }}
                    />
                    <TextField
                        value={inputs.celular}
                        name='tel_alternativo'
                        label='Telefono Alternativo'
                        variant={'standard'}
                        color={errores.tel_alternativo ? 'error' : 'success'}
                        error={errores.tel_alternativo ? true : false}
                        helperText={errores.tel_alternativo ? 'Campo requerido' : ''}
                        onChange={e => handleChange(e)}
                        sx={{ width: { xs: '100%', md: '10rem' } }}
                    />     
                </Stack>
            </FormContainer>
        </>
    );
}