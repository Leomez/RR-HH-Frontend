import React, { useState, useEffect, useMemo } from 'react';
import { Dialog, DialogTitle, DialogContent, Box, Divider } from '@mui/material';
import Grid from '@mui/material/Grid2';
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
    const [tiposSeleccionados, setTiposSeleccionados] = useState([])
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

    useEffect(() => {
        if (estados.length > 0) {
            setEstadosSeleccionados(estados);
        }
    }, [estados])

    const tipoColorMap = useMemo(() => !error && generateTipoColors(todasSolicitudes), [todasSolicitudes]);

    const eventos = useMemo(() => {
        if (error) {
            return [];
        }
        // console.log(todasSolicitudes);
        const clasificadorEstados = (estado) => {
            if (estado === 'Elevado') return 'Pendiente en RR HH';
            else if (estado === 'En proceso') return 'Pendiente en el sector';
            else if (estado === 'Rechazado') return 'Rechazado'
            else if (estado === 'Aprobado') return 'Aprobado'

        }
        return todasSolicitudes.map(solicitud => {
            const estado = clasificadorEstados(solicitud.estado);
            const evento = {
                id: solicitud.id,
                title: solicitud.empleado,
                type: solicitud.nombre_tipo,
                start: dayjs(solicitud.fecha_desde || solicitud.fecha_permiso, 'DD/MM/YYYY').startOf('day').toDate(),
                end: dayjs(solicitud.fecha_hasta || solicitud.fecha_permiso, 'DD/MM/YYYY').endOf('day').toDate(),
                estado: estado,
                color: tipoColorMap.get(solicitud.nombre_tipo) || '#9065b0'
            };
            setListado(prev => [...prev, { tipo: isNumeric(solicitud.nombre_tipo) ? 'Vacaciones' : solicitud.nombre_tipo, color: evento.color }]);
            setEstados(prev => {
                const set = new Set(prev);
                set.add(estado);
                console.log(set);
                return [...set];
            });
            return evento;
        });
    }, [todasSolicitudes, error, tipoColorMap]);

    // console.log(tiposSeleccionados);
    const eventosFiltrados = useMemo(() => {
        let filteredEventos = eventos;

        if (tiposSeleccionados.length > 0) {
            console.log(tiposSeleccionados);
            console.log(filteredEventos);
            filteredEventos = filteredEventos.filter(evento => tiposSeleccionados.includes(isNumeric(evento.type) ? 'Vacaciones' : evento.type));
        }

        if (estadosSeleccionados.length > 0) {
            filteredEventos = filteredEventos.filter(evento => estadosSeleccionados.includes(evento.estado));
        }

        return filteredEventos;
    }, [tiposSeleccionados, estadosSeleccionados, eventos]);
    // console.log(estadosSeleccionados && estadosSeleccionados);

    return (
        <Box display={'flex'}>
            <Box id="calendario" sx={{ flexGrow: 1, p: 1, flexDirection: 'row', display: 'flex', justifyContent: 'flex-start' }}>
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
                    <Grid item xs={3} >
                        <Listado listado={listado} tiposSeleccionados={tiposSeleccionados} setTiposSeleccionados={setTiposSeleccionados} />
                        <br />
                        <FiltroEstados
                            estados={estados}
                            estadosSeleccionados={estadosSeleccionados}
                            onChange={setEstadosSeleccionados}
                        />
                    </Grid>
                    <Divider sx={{ margin: 1 }} orientation="vertical" flexItem />
                    <Grid item xs={9}>
                        <CalendarioGrande eventos={eventosFiltrados} />
                    </Grid>
                </Grid>
            </Box>
        </Box>

    );
}

export default Calendario;



