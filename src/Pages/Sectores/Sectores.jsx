import { React, useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { Box, } from '@mui/material'
import CardSkeleton from './skeleton/cardSkeleton'
import { fetchSectores } from '../../Redux/Features/Sectores/sectoresSlice'
import { getSupervisores } from '../../Redux/Features/Supervisor/supervisorSlice'
import { fetchEmpleados } from '../../Redux/Features/Empleado/empleadoSlice'
import { setLoading } from '../../Redux/Features/Loading/loadingSlice'
import { Error } from '../../Componentes/Error'
import DetalleSector from '../../Servicios/Sector/DetalleSector'

export default function Sectores() {
    const dispatch = useDispatch()
    const aux = [1, 2, 3, 4]
    const token = useSelector((state) => state.user.token)
    const empleados = useSelector(state => state.empleado.empleados)
    const sectores = useSelector(state => state.sectores.sectores);
    const supervisores = useSelector(state => state.supervisor.supervisores.data)
    const loading = useSelector(state => state.sectores.loading)
    const globalLoading = useSelector(state => state.loading)
    const error = sectores.error ? sectores.error : null
    // const [loading, setLoading] = useState(true);

    // useEffect(() => {        
    //     setTimeout(() => {
    //         setLoading(false); 
    //     }, 3000);
    // }, []);

    useEffect(() => {
        if (empleados[0] === undefined || empleados[0].name !== 'Error') {
            dispatch(fetchEmpleados())            
        }
        dispatch(fetchSectores(token))
        dispatch(getSupervisores())        
    }, [dispatch])

    if (error) {
        return <Error error={error} />
    }
    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>         

            {loading ? (
                // Muestro Skeletons mientras los datos están cargando
                aux.map((n) => <CardSkeleton className="custom-card" key={String(n)} />)
            ) : (
                // Cuando los datos están cargados, muestro los detalles del sector
                sectores.map((s, i) => {
                    const encargado = supervisores && supervisores.filter(sup => sup.SectorId === s.id)[0];
                    return (
                        <DetalleSector key={i} sector={s} empleados={empleados} encargado={encargado} />
                    );
                })
            )}
        </Box>
    )
}
