import { React, useState, useEffect } from 'react'
import { Box, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, Button, Divider, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { getSolicitudesElevadas } from '../../../Redux/Features/Solicitudes/solicitudesSlice'
import Permisos from './Permisos'
import Licencias from './Licencias'
import Vacaciones from './Vacaciones'
import { autorizarSolicitud } from '../../../Redux/Features/Solicitudes/solicitudesSlice'


function ListadoDeSolicitudes() {

  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [accion, setAccion] = useState("")
  const [selectedSolicitud, setSelectedSolicitud] = useState(null);
  const [refresh, setRefresh] = useState(false);


  useEffect(() => {
    if (refresh) {
      console.log('efecto refresh');
      dispatch(getSolicitudesElevadas())
      setRefresh(false)
    }
  }, [refresh])

  // useEffect(() => {
  //   dispatch(getSolicitudesElevadas())
  // }, [dispatch])

  const handleDialogOpen = (solicitudId, estado) => {
    setSelectedSolicitud({solicitudId, estado})
    setAccion(estado)
    setOpen(true)  
    console.log(accion);  
  }

  const handleDialogClose = () => {
    setSelectedSolicitud(null)
    setAccion("")
    setOpen(false)
  }

  const handleConfirm = () => {
    if (selectedSolicitud) {
      dispatch(autorizarSolicitud(selectedSolicitud)).then(() => {
        // dispatch(getSolicitudesElevadas())
        setRefresh(true)
        handleDialogClose()
      })          
    }
  }

  // const solicitudes = useSelector(state => state.solicitudes.solicitudes)
  // const [solicitudesFiltradas, setSolicitudesFiltradas] = useState([])
  return (
    <Box>
      <Permisos onAction= {handleDialogOpen}/>
      <Divider variant='middle' sx={{ my: 2 }} />
      <Licencias onAction= {handleDialogOpen}/>
      <Divider variant='middle' sx={{ my: 2 }} />
      <Vacaciones onAction={handleDialogOpen} />
      <Dialog open={open} onClose={handleDialogClose}>
                <DialogTitle>Confirmar Acción</DialogTitle>
                <DialogContent>
                    <DialogContentText>                      
                        ¿Estás seguro de que deseas {accion.toLowerCase() === "aprobado" ? "aprobar" : "rechazar"} esta solicitud?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={handleConfirm} color="primary">
                        Confirmar
                    </Button>
                </DialogActions>
            </Dialog>
    </Box>
  )
}

export default ListadoDeSolicitudes