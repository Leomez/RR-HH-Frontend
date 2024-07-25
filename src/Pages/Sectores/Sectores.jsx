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
    const emp = useSelector(state => state.empleado.empleados)
    const errorEmp = useSelector(state => state.empleado.error)
    const sect = useSelector(state => state.sectores);
    const sup = useSelector(state => state.supervisor)
    // const loading = useSelector(state => state.sectores.loading)
    const globalLoading = useSelector(state => state.loading)
    // const err = sectores.error ? sectores.error : null

    const [empleados, setEmpleados] = useState([]);
    const [sectores, setSectores] = useState([]);
    const [supervisores, setSupervisores] = useState([]);    
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

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

    useEffect(() => {
        setEmpleados(emp);
        setSectores(sect);
        setSupervisores(sup.supervisores);  
        setLoading(sect.loading || sup.loading);       
    }, [emp, sect, sup])
    // console.log(empleados)

    useEffect(() => {
        if (sectores.error) setError(sectores.error) 
        else if (errorEmp) setError(errorEmp)
        else if (sup.error) setError(sup.error)
        else setError(null)
    }, [errorEmp, sup.error, sectores.error])

    if (error) {
        console.log(error, '<--- error en el componente')
        return <Error error={error} />
    }
    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>       
            {loading ? (
                // Muestro Skeletons mientras los datos están cargando
                aux.map((n) => <CardSkeleton className="custom-card" key={String(n)} />)
                ) : (
                // Cuando los datos están cargados, muestro los detalles del sector
                sectores.sectores.map((s, i) => {
                    const encargado = supervisores && supervisores.data.filter(sup => sup.SectorId === s.id);
                    const jefe = encargado ? encargado[0] : 'Sin dato';
                    console.log(encargado);
                    return (
                        <DetalleSector key={i} sector={s} empleados={empleados} encargado={jefe} />
                    );
                })
            )}
        </Box>
    )
}
