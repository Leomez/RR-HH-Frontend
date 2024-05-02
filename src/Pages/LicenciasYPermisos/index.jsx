import { useState, useEffect } from "react"
import axios from "axios"
import { Typography } from "@mui/joy"
import { Box, Button, Divider, Drawer } from "@mui/material"
import CalendarioChico from "../../Servicios/Licencias/CalendarioChico"
import CalendarioGrande from "../../Servicios/Licencias/CalendarioGrande"
import Formulario from "../../Servicios/Licencias/Formulario"
import dayjs from "dayjs"
// import { Typography } from "@mui/material"

Typography

export function LicenciasYPermisos() {
    const [feriados, setFeriados] = useState([])
    const [anio, setAnio] = useState(dayjs().year())
    const [marcador, setMarcador] = useState(dayjs())
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    async function fetchFeriados(anio) {
        try {
            setLoading(true)
            const response = await axios.get(`https://api.argentinadatos.com/v1/feriados/${anio}`)
            setFeriados(response.data)
            setLoading(false)
        } catch (error) {
            setFeriados([])
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchFeriados(anio)
    }, [anio])

    const handlerMarcador = (e) => {
        setMarcador(e)
        // setAnio(e.year())
    }

    // console.log(feriados);

    useEffect(() => {
        setMarcador(dayjs())
    }, [])

    const close = () => {
        setOpen(false)
    }

    return (
        <div>
            <Typography px={2} fontWeight={400} lineHeight={2} level="h4">LICENCIAS Y PERMISOS</Typography>
            <Divider />
            <Box display={'flex'} flexDirection={'row'}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: 1,
                    justifyContent: 'center',
                    alignSelf: 'baseline',
                    '@media (max-width: 1024px)': { // Punto de corte para pantallas pequeñas
                        display: 'none'
                    }
                }}>
                    <Button onClick={() => setOpen(true)} sx={{ margin: '1rem' }} variant='contained'> Solicitar </Button>
                    <Drawer anchor='right' open={open} onClose={() => setOpen(false)}>
                        <Formulario close={close}
                        />
                    </Drawer>
                    <Divider />
                    <CalendarioChico
                        marcador={marcador}
                        feriados={feriados}
                        anio={anio}
                        setAnio={setAnio}
                        loading={loading}
                        handler={handlerMarcador}
                    />
                </Box>
                <Divider orientation="vertical" flexItem />
                <Box sx={{ padding: 1, width: '100%' }}>
                    <CalendarioGrande marcador={marcador} />
                </Box>
            </Box>
        </div>
    )
}

