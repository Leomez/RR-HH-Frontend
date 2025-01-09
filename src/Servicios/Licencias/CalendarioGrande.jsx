import React, { useState, useCallback, useEffect } from 'react'
import { Calendar, dayjsLocalizer } from 'react-big-calendar'
import { Typography, Box, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import dayjs from 'dayjs'
import "./Calendario.css"

const localizer = dayjsLocalizer(dayjs)
// console.log(localizer);

const EventComponent = ({ event }) => {
  return (
    <Box sx={{ backgroundColor: event.color, padding: '1px 3px', borderRadius: '5px', border: '1px solid #ccc' }}>
      <Typography variant='body2' color={'InfoText'} >{`${event.title}`}</Typography>
    </Box>
  )
}

const CalendarioGrande = ({ marcador, eventos, onClickSlot }) => {
  // const { marcador, eventos } = props 

  const setEventos = eventos && eventos.map((evento) => {
    const isNumeric = (str) => !isNaN(str) && !isNaN(parseFloat(str));
    return {
      title: (isNumeric(evento.nombre_tipo) ? "Vacaciones" : evento.nombre_tipo),
      start: dayjs(evento.fecha_desde ? evento.fecha_desde : evento.fecha_permiso, "DD/MM/YYYY").startOf('day').toDate(),
      end: dayjs(evento.fecha_hasta ? evento.fecha_hasta : evento.fecha_permiso, "DD/MM/YYYY").endOf('day').toDate(),
      color: evento.estado === 'Aprobado' ? 'success.light' : evento.estado === 'Rechazado' ? 'error.light' : evento.estado === 'En proceso' ? 'secondary.light' :  'info.light',
      id: evento.id,
      estado: evento.estado
    }
  })

  const [date, setDate] = useState(marcador)
  const [myEventsList, setMyEventsList] = useState(setEventos)
  const [selectedEvent, setSelectedEvent] = useState(null)

  const onNavigate = useCallback((newDate) => setDate(newDate), [setDate])
  const handleClose = () => setSelectedEvent(null)

  useEffect(() => {
    setDate(marcador)
    setMyEventsList(setEventos)
  }, [marcador, eventos])

  return (
    <div >
      <Calendar
        localizer={localizer}
        events={myEventsList}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '500px' }}
        date={date}
        messages={{
          today: 'Hoy',
          next: '>',
          previous: '<',
          month: 'Mes',
          week: 'Semana',
          day: 'Día',
          agenda: 'Agenda',
        }}
        culture='es'
        onNavigate={onNavigate}
        onSelectEvent={event => setSelectedEvent(event)}  
        onSelectSlot={slotInfo => onClickSlot(slotInfo)}
        selectable={true}      
        components={{
          event: EventComponent
        }}
      />
      <Dialog open={Boolean(selectedEvent)} onClose={handleClose}>
        <DialogTitle>Detalles del Evento</DialogTitle>
        {selectedEvent && (
          <DialogContent>
            <DialogContentText>
              <strong>Título:</strong> {selectedEvent.title}
            </DialogContentText>
            <DialogContentText>
              <strong>Estado:</strong> {selectedEvent.estado}
            </DialogContentText>
            <DialogContentText>
              <strong>Inicio:</strong> {dayjs(selectedEvent.start).format('LLL')}
            </DialogContentText>
            <DialogContentText>
              <strong>Fin:</strong> {dayjs(selectedEvent.end).format('LLL')}
            </DialogContentText>
          </DialogContent>
        )}
        <DialogActions>
          <Button onClick={handleClose}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default CalendarioGrande






// const toolbarStyles = {
//   display: 'flex',
//   justifyContent: 'space-between',
//   alignItems: 'center',
//   width: '100%',
//   padding: '10px',
//   backgroundColor: '#f5f5f5',
//   '@media (max-width: 768px)': {
//     flexDirection: 'column',
//   },
// } 
