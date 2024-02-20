import { React, useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { Box, Card, CardContent, Typography, Container, CardActions, Button, Divider } from '@mui/material'
import CardSkeleton from './skeleton/cardSkeleton'
import { fetchSectores } from '../../Redux/Features/Sectores/sectoresSlice'
import InfoBox from '../../Utils/InfoBox'
import { Info } from '@mui/icons-material'
import SelectEncargados from './SelectEncargados'
import { Error } from '../../Componentes/Error'



export default function Sectores() {
    const dispatch = useDispatch()
    const aux = [1, 2, 3, 4, 5]
    const [maxCardWidth, setMaxCardWidth] = useState(0)
    const [open, setOpen] = useState(false)
    const [encargadoValue, setEncargadoValue] = useState('Sin encargado')
    const token = useSelector((state) => state.user.token)
    useEffect(() => {
        dispatch(fetchSectores(token))
    }, [dispatch])
    const empleados = useSelector(state => state.empleado.empleados)
    const sectores = useSelector(state => state.sectores.sectores);
    const error = sectores.error ? sectores.error : null
    console.log(sectores);
    useEffect(() => {
        const widths = Array.from(document.querySelectorAll('.custom-card')).map(
            card => card.clientWidth
        )
        setMaxCardWidth(Math.max(...widths))
    }, [sectores])

    function handleClick() {
        setOpen(true)
    }

    function handleClose(nuevoEncargado) {
        setOpen(false)
        if (nuevoValor) {
            setEncargadoValue(nuevoEncargado)
        }
    }
    if (error) {
        return <Error error={error}/>
    }

    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
            {sectores ? sectores.map(s => {
                return (
                    <Card
                        className="custom-card"
                        key={s.id}
                        sx={{ minWidth: '255px', margin: '0.5rem', width: `${maxCardWidth + 20}px` }}>
                        <CardContent>
                            <Typography variant='h5'>
                                {s.nombre_sector}
                            </Typography>
                            <Divider variant='insets' />
                            <InfoBox label={"Cantidad de empleados: "} value={empleados.filter(e => e.sector_id === s.id).length} />
                            <InfoBox label={"Encargado del sector: "} value={encargadoValue} />
                            <Box sx={{ display: 'flex', justifyContent: 'center', padding: 1 }}>
                                <Button sx={{ margin: 'auto' }} variant='outlined' onClick={handleClick}>
                                    {encargadoValue === 'Sin encargado' ? "Seleccionar Encargado" : "Cambiar encargado"}
                                </Button>
                            </Box>
                            <SelectEncargados
                                open={open}
                                value={encargadoValue}
                                onClose={handleClose}
                                keepMounted
                                empleados={empleados}
                            />
                        </CardContent>
                    </Card>
                )
            }) : aux.map((n) =>
                <CardSkeleton className="custom-card" key={String(n)} />
            )}
        </Box>
    )
}
