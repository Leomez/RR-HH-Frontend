import React, { useState, useEffect, useMemo } from 'react';
import { Dialog, DialogTitle, DialogContent, Box, Divider, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import CalendarioGrande from './CalendarioGrande';
import { getTodasSolicetudes } from '../../../Redux/Features/Solicitudes/solicitudesSlice';
import Listado from './Listado';
import FiltroEstados from './FiltroEstados';
import { generateTipoColors, isNumeric } from '../../../Utils/randomColors';

function Calendario() {
    const [openError, setOpenError] = useState(false);
    const [listado, setListado] = useState([]);
    const [estados, setEstados] = useState([]);
    const [estadosSeleccionados, setEstadosSeleccionados] = useState([]);

    const dispatch = useDispatch();
    const { todasSolicitudes, loading, error } = useSelector(state => state.solicitudes);

    useEffect(() => {
        dispatch(getTodasSolicetudes());
    }, [dispatch]);

    useEffect(() => {
        if (error) {
            setOpenError(true);
        }
    }, [error]);

    const tipoColorMap = useMemo(() => !error && generateTipoColors(todasSolicitudes), [todasSolicitudes]);

    const eventos = useMemo(() => {
        if (error) {
            return [];
        }
        console.log(todasSolicitudes);
        return todasSolicitudes.map(solicitud => {
            const estado = solicitud.estado === 'Elevado' || solicitud.estado === 'En proceso' ? 'Pendiente' : solicitud.estado;
            const evento = {
                id: solicitud.id,
                title: solicitud.empleado,
                start: dayjs(solicitud.fecha_desde || solicitud.fecha_permiso, 'DD/MM/YYYY').startOf('day').toDate(),
                end: dayjs(solicitud.fecha_hasta || solicitud.fecha_permiso, 'DD/MM/YYYY').endOf('day').toDate(),
                estado: estado,
                color: tipoColorMap.get(solicitud.nombre_tipo) || '#9065b0'
            };
            setListado(prev => [...prev, { tipo: isNumeric(solicitud.nombre_tipo) ? 'Vacaciones' : solicitud.nombre_tipo, color: evento.color }]);
            setEstados(prev => {
                const set = new Set(prev);
                set.add(estado);
                return [...set];
            });
            return evento;
        });
    }, [todasSolicitudes, error, tipoColorMap]);

    const eventosFiltrados = useMemo(() => {
        if (estadosSeleccionados.length === 0) {
            return eventos;
        }
        return eventos.filter(evento => estadosSeleccionados.includes(evento.estado));
    }, [estadosSeleccionados, eventos]);

    return (
        <Box id="calendario" sx={{ flexGrow: 1, p: 1, flexDirection: 'row', display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
            <Dialog
                open={openError}
                onClose={() => setOpenError(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Error</DialogTitle>
                <DialogContent id="alert-dialog-description">
                    {error && error.message}
                </DialogContent>
            </Dialog>
            <Grid container spacing={2}>
                <Grid sx={{ justifyContent: 'center' }} item xs={12} sm={4} md={3}>
                    <Listado listado={listado} />
                    <br />
                    <FiltroEstados
                        estados={estados}
                        estadosSeleccionados={estadosSeleccionados}
                        onChange={setEstadosSeleccionados}
                    />
                </Grid>
                <Divider sx={{ margin: 1 }} orientation="vertical" flexItem />
                <Grid item xs={12} sm={7} md={8}>
                    <CalendarioGrande eventos={eventosFiltrados} />
                </Grid>
            </Grid>
        </Box>
    );
}

export default Calendario;



// sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}

{/* <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                marginBottom: 'auto',
                position: 'absolute',
                left: '0px',
            }}> */}