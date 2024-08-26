import { React, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Box } from '@mui/material';
import CardSkeleton from './skeleton/cardSkeleton';
import { fetchSectores } from '../../Redux/Features/Sectores/sectoresSlice';
import { getSupervisores } from '../../Redux/Features/Supervisor/supervisorSlice';
import { fetchEmpleados } from '../../Redux/Features/Empleado/empleadoSlice';
import { Error } from '../../Componentes/Error';
import DetalleSector from '../../Servicios/Sector/DetalleSector';

export default function Sectores() {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.user.token);
    const empleados = useSelector(state => state.empleado.empleados);
    const errorEmp = useSelector(state => state.empleado.error);
    const sectores = useSelector(state => state.sectores);
    const supervisores = useSelector(state => state.supervisor.supervisores);
    const globalLoading = useSelector(state => state.loading);

    useEffect(() => {
        dispatch(fetchEmpleados());
        dispatch(fetchSectores(token));
        dispatch(getSupervisores());
    }, [dispatch, token]);

    const loading = globalLoading || supervisores.loading || empleados.loading || sectores.loading;

    const error = sectores.error || errorEmp || supervisores.error;

    if (error) {
        console.log(error, '<--- error en el componente');
        return <Error error={error} />;
    }

    const sectoresData = useMemo(() =>
        sectores.sectores.map((s, i) => {
            const encargado = supervisores.data?.find(sup => sup.SectorId === s.id) || 'Sin dato';
            return (
                <DetalleSector key={i} sector={s} empleados={empleados} encargado={encargado} />
            );
        }), [sectores.sectores, supervisores.data, empleados]
    );

    


    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
            {loading ? (
                [1, 2, 3, 4].map((n) => <CardSkeleton className="custom-card" key={n} />)
            ) : (
                sectoresData
            )}
        </Box>
    );
}
