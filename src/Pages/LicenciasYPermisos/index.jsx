import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { getSolicitudesXEmpleado } from "../../Redux/Features/Solicitudes/solicitudesSlice";
import { Typography } from "@mui/joy";
import { Box, Button, Divider, Drawer, Chip, Stack } from "@mui/material";
import CalendarioChico from "../../Servicios/Licencias/CalendarioChico";
import CalendarioGrande from "../../Servicios/Licencias/CalendarioGrande";
import FormularioContainer from "../../Servicios/Licencias/Formulario/FormularioContainer";
import dayjs from "dayjs";


export function LicenciasYPermisos() {
    const [feriados, setFeriados] = useState([]);
    const [anio, setAnio] = useState(dayjs().year());
    const [marcador, setMarcador] = useState(dayjs());
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [slotInfo, setSlotInfo] = useState({ desde: null, hasta: null, tipo: null });
    // const [desde, setDesde] = useState(null);
    // const [hasta, setHasta] = useState(null);
    // const [tipo, setTipo] = useState(null);


    const dispatch = useDispatch();
    const empleadoId = useSelector(state => state.empleado.empleadoActual.id);

    useEffect(() => {
        if (empleadoId) {
            dispatch(getSolicitudesXEmpleado(empleadoId));
        }
    }, [dispatch, empleadoId]);  // Aseguro de que esto solo se ejecute cuando empleadoId cambie

    const ListaDeEventos = useSelector((state) => state.solicitudes.solicitudesXEmpleado);


    // ListaDeEventos && console.log(ListaDeEventos);

    async function fetchFeriados(anio) {
        try {
            setLoading(true);
            const response = await axios.get(`https://api.argentinadatos.com/v1/feriados/${anio}`);
            setFeriados(response.data);
            setLoading(false);
        } catch (error) {
            setFeriados([]);
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchFeriados(anio);
    }, [anio]);

    const handlerMarcador = (e) => {
        setMarcador(e);
    }

    useEffect(() => {
        setMarcador(dayjs());
    }, []);

    const close = () => {
        setSlotInfo({ desde: null, hasta: null, tipo: null });
        // console.log(slotInfo);
        setOpen(false);
    }
    const handlerRefresh = () => {
        window.location.reload();
    }

    const handleOnClickSlot = (info) => {
        // console.log(info);
        setSlotInfo({
            desde: dayjs(info.start).format('DD-MM-YYYY'),
            hasta: dayjs(info.end).format('DD-MM-YYYY') ,
            tipo: info.action === 'select' ? 'Licencia' : null
        })
        // console.log(slotInfo);
        setOpen(true);
    }

    // console.log(ListaDeEventos);

    return (
        <div>
            <Typography px={2} fontWeight={400} lineHeight={2} level="h4">LICENCIAS Y PERMISOS</Typography>
            <Divider />
            <Box
                display={'flex'}
                flexDirection={'row'}
                sx={{
                    '@media (max-width: 600px)': { // Punto de corte para pantallas pequeñas
                        flexDirection: 'column-reverse',
                        alignItems: 'center',
                    }
                }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: 1,
                    justifyContent: 'center',
                    alignSelf: 'baseline',
                }}>
                    <Button onClick={() => setOpen(true)} sx={{ margin: '1rem' }} variant='contained'> Solicitar </Button>
                    <Drawer anchor='right' open={open} onClose={() => setOpen(false)}>
                        {/* <Formulario close={close} reload={handlerRefresh} /> */}
                        <FormularioContainer
                            eventosYaSolicitados={ListaDeEventos}
                            close={close}
                            reload={handlerRefresh} 
                            slotInfo={slotInfo}
                            setSlotInfo={setSlotInfo}
                        />
                    </Drawer>
                    <Divider />
                    <Box id="calendarioChico" sx={{ padding: 1, width: '100%' }}>
                        <CalendarioChico
                            marcador={marcador}
                            feriados={feriados}
                            anio={anio}
                            setAnio={setAnio}
                            loading={loading}
                            handler={handlerMarcador}
                        />
                    </Box>
                    <Divider />
                    <Stack spacing={2} margin={1}>
                        <Chip label={'Aprobados'} sx={{ color: "success", backgroundColor: "success.light", height: '15px', width: '300px' }} />
                        <Chip label={'Rechazados'} sx={{ color: "error", backgroundColor: "error.light", height: '15px', width: '300px' }} />
                        <Chip label={'Pendientes'} sx={{ color: "info", backgroundColor: "info.light", height: '15px', width: '300px' }} />
                        <Chip label={'En proceso'} sx={{ color: "secondary", backgroundColor: "secondary.light", height: '15px', width: '300px' }} />
                    </Stack>
                </Box>
                <Divider orientation="vertical" flexItem />
                <Box id="calendarioGrande" sx={{ padding: 1, width: '100%', height: 'auto' }}>
                    <CalendarioGrande onClickSlot={handleOnClickSlot} eventos={ListaDeEventos} marcador={marcador} />
                </Box>
            </Box>
        </div>
    )
}
