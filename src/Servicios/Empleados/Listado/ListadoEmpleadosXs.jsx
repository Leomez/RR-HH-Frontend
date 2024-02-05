import { React, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { Box, Button, Divider, List, Typography } from '@mui/material'
import { fetchSectores } from '../../../Redux/Features/Sectores/sectoresSlice'
import { sector } from './sector'
import InfoBox from '../../../Utils/InfoBox'
import PushPinIcon from '@mui/icons-material/PushPin';
import ForwardIcon from '@mui/icons-material/Forward';


export default function ListadoEmpleadosXs() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchSectores())
    }, [dispatch])

    const empleados = useSelector(state => state.empleado.empleados)
    const sectores = useSelector(state => state.sectores.sectores)
    // const InfoBox = ({ label, value }) => (
    //     <Box sx={{ display: 'flex', padding: 1 }}>
    //         <Typography color="text.primary">
    //             <Typography variant='caption' component={'span'} sx={{ color: 'text.secondary' }}>{label}</Typography> {value}
    //         </Typography>
    //     </Box>
    // );

    return (
        <List sx={{ width: '100%', maxWidth: 360, padding: 0 }}>
            {empleados.map(e => (

                <Box key={e.id} >
                    <Box sx={{ justifyContent: 'flex-start', alignItems: 'flex-start', padding: '0.5rem' }}>
                        <Box width={'100%'}>
                            <Typography color={'text.primary'} sx={{ display: 'inline' }} component={'span'} variant='h5'>{`${e.nombre_empleado} ${e.apellido_empleado}`}</Typography>
                        </Box>
                        <Box component={'span'}>
                            <InfoBox label={"Legajo: "} value={e.legajo} />
                            <InfoBox label={"Puesto: "} value={e.cargo} />
                            <InfoBox label={"Sector: "} value={sector(sectores, e.sector_id)} />
                            <InfoBox label={"Encargado: "} value={"Fulanito"} />
                        </Box>
                    </Box>
                    <Button variant='outlined' sx={{alignSelf: 'center', marginBottom: '1rem'}}>
                        <ForwardIcon />
                    </Button>
                    <Divider />
                </Box>
            ))}
        </List>
    )
}
