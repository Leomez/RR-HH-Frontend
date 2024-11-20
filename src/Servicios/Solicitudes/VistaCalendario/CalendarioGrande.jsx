import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import { useState } from 'react';
import { estadoColors, isNumeric } from '../../../Utils/randomColors';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import styles from './CalendarioGrande.module.css';
import React from 'react';
import dayjs from 'dayjs';
import { eventContent, eventPropGetter } from './utils/utils';
import { Typography, Popover, Box, Tooltip } from '@mui/material';

const localizer = dayjsLocalizer(dayjs);

function CalendarioGrande({ eventos }) {

  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedEvent, setSelectedEvent] = useState(null);



  const handleClick = (event, e) => {
    setAnchorEl(e.currentTarget);    
    setSelectedEvent(event);
  };

  const handleClose = () => {
    setAnchorEl(null)
    setSelectedEvent(null)
  }

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={eventos} // Usamos los eventos transformados aquí
        culture="es"
        startAccessor="start"
        endAccessor="start"
        popup={true}
        className={styles.calendarContainer} // Aplica la clase CSS al contenedor del calendario
        eventPropGetter={eventPropGetter}
        onSelectEvent={(event, e) => handleClick(event, e)}  
        tooltipAccessor={event => null}      
        components={{
          event: event => eventContent(event),
          // toolbar: () => null,
        }}
        messages={{
          today: 'Hoy',
          next: '>',
          previous: '<',
          month: 'Mes',
          week: 'Semana',
          day: 'Día',
          agenda: 'Agenda',
        }}
      />
      {selectedEvent && (
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <Box className={styles.popover}>            
            <Typography sx={{pb:1}} variant='h6' >{selectedEvent.title}</Typography>
            <span className={styles.popoverSpan}><p className={styles.popoverTextItem}>Tipo:</p> <p className={styles.popoverTextDescripcion}> {isNumeric(selectedEvent.type) ? ' Vacaciones' : selectedEvent.type}</p></span>
            <span className={styles.popoverSpan}><p className={styles.popoverTextItem} >Estado:</p><Box className={styles.estadoSpan} sx={{backgroundColor: estadoColors[selectedEvent.estado.toLowerCase()]}}></Box><Typography className={styles.popoverTextDescripcion}>{selectedEvent.estado}</Typography></span>
            <Typography sx={{pt:1}} className={styles.popoverTextItem} >Fecha Solicitada:</Typography>
            <span className={styles.popoverSpan}><p className={styles.popoverTextItem} >Desde: </p><Typography className={styles.popoverTextDescripcion}>{dayjs(selectedEvent.start).format('DD/MM/YYYY')}</Typography></span>
            <span className={styles.popoverSpan}><p className={styles.popoverTextItem} >Hasta: </p><Typography className={styles.popoverTextDescripcion}>{dayjs(selectedEvent.end).format('DD/MM/YYYY')}</Typography></span>            
          </Box>
        </Popover>
      )}
    </div>
  );
}

export default CalendarioGrande;
