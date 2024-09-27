import { React, useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Box, Divider, Button, Typography } from '@mui/material';
import CardSkeleton from './skeleton/cardSkeleton';
import { fetchSectores } from '../../Redux/Features/Sectores/sectoresSlice';
import { getSupervisores } from '../../Redux/Features/Supervisor/supervisorSlice';
import { fetchEmpleados } from '../../Redux/Features/Empleado/empleadoSlice';
import { Error } from '../../Componentes/Error';
import DetalleSector from '../../Servicios/Sector/DetalleSector';
import CrearSector from '../../Servicios/Sector/CrearSector';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export default function Sectores() {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.user.token);
    const empleados = useSelector(state => state.empleado.empleados);
    const errorEmp = useSelector(state => state.empleado.error);
    const sectores = useSelector(state => state.sectores);
    const supervisor = useSelector(state => state.supervisor);
    const globalLoading = useSelector(state => state.loading);

    const [open, setOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchEmpleados());
        dispatch(fetchSectores(token));
        dispatch(getSupervisores());
    }, [dispatch, token]);

    const loading = globalLoading || supervisor.loading || empleados.loading || sectores.loading;
    const supervisores = !supervisor.loading && supervisor.supervisores;
    const error = sectores.error || errorEmp;

    if (error) {
        return <Error error={error} />;
    }

    const HandlerNuevoSector = () => {
        setOpen(true);
    };
    [1, 2, 3, 4].l

    return (
        <Box>
            <Button onClick={HandlerNuevoSector} variant="outlined" color="secondary" sx={{ fontSize: '0.5rem', border: '1px solid #000' }}>Nuevo Sector</Button>
            <CrearSector open={open} setOpen={setOpen} />
            <Divider />
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
                {loading ? (
                    [1, 2, 3, 4].map((n) => <CardSkeleton className="custom-card" key={n} />)
                ) : (
                    sectores.sectores.length > 0 ? (
                        sectores.sectores.map((s, i) => {                           
                            const encargado = supervisores.data?.length > 0 ? supervisores.data?.find(sup => sup.SectorId === s.id) : 'Sin dato';                            
                            return (
                                <DetalleSector key={i} sector={s} empleados={empleados} encargado={encargado} />
                            );
                        })
                    ) : (
                        <Typography sx={{ fontSize: '1rem', display: 'flex', alignItems: 'center', padding: '1rem' }}>
                            <InfoOutlinedIcon sx={{ marginRight: '0.5rem' }} />
                            <span>{' No hay sectores que mostrar '}</span>
                        </Typography>
                    )
                )}
            </Box>
        </Box>
    );
}
