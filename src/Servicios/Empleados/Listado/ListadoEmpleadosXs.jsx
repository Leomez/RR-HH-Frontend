import { React, useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { Box, Button, Divider, List, Typography } from '@mui/material'
import { fetchSectores } from '../../../Redux/Features/Sectores/sectoresSlice'
import { sector, encargado } from './utils'
import LoadingPage from '../../../Componentes/Containers/Loading'
import { Error } from '../../../Componentes/Error'
import InfoBox from '../../../Utils/InfoBox'
import PushPinIcon from '@mui/icons-material/PushPin';
import ForwardIcon from '@mui/icons-material/Forward';


export default function ListadoEmpleadosXs() {
    const dispatch = useDispatch()
    const token = useSelector((state) => state.user.token)
    const empleados = useSelector(state => state.empleado.empleados)
    const loadingEmpleados = useSelector(state => state.empleado.loading)
    const sectores = useSelector(state => state.sectores.sectores)
    const supervisores = useSelector(state => state.supervisor.supervisores.data)
    const [listados, setListados] = useState([])

    useEffect(() => {
        dispatch(fetchSectores(token))
    }, [dispatch])

    useEffect(() => {
        setListados(empleados)
    }, [empleados])


    const error = empleados.error ? empleados.error : null;
    if (error) {
        // console.log(error);
        return <Error error={error}/>        
      }
    // const InfoBox = ({ label, value }) => (
    //     <Box sx={{ display: 'flex', padding: 1 }}>
    //         <Typography color="text.primary">
    //             <Typography variant='caption' component={'span'} sx={{ color: 'text.secondary' }}>{label}</Typography> {value}
    //         </Typography>
    //     </Box>
    // );

    return (
        <List sx={{ width: '100%', maxWidth: 360, padding: 0 }}>
            <LoadingPage loading={loadingEmpleados}/>
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
                            <InfoBox label={"Encargado: "} value={encargado(supervisores, e, empleados)} />
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
