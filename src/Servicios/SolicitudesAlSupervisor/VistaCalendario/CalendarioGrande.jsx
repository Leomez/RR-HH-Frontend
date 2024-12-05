import React, { useState } from 'react';
import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import dayjs from 'dayjs';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import styles from './CalendarioGrande.module.css'; 
import { estadoColors } from '../../../Utils/randomColors';
import { eventContent, eventPropGetter } from './utils/utils';
import { Box, Popover, Typography } from '@mui/material';
import { isNumeric } from './utils/util';

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
  
  // const c = (e) => {
  //   const colores = e.map(e => estadoColors[e.estado.toLowerCase()]);
  //   return colores;
  // };

  // const eventPropGetter = (event) => {
  //   const newStyle = {
  //     backgroundColor: event.color,
  //     color: 'black',
  //     borderRadius: '5px',
  //     border: 'none',
  //     display: 'block',
  //     margin: '0px',
  //     padding: '1px 3px',
  //     fontSize: '0.8em',
  //   };

  //   return {
  //     className: '',
  //     style: newStyle,
  //   };
  // };

  // const eventContent = ({ event }) => {
  //   return (
  //     <div className={styles.eventContent}>
  //       <span
  //         className={styles.eventCircle}
  //         style={{
  //           backgroundColor: estadoColors[event.estado.toLowerCase()],
  //         }}
  //       ></span>
  //       <span className={styles.eventTitle}>{event.title}</span>
  //     </div>
  //   );
  // };

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={eventos}
        culture="es"
        startAccessor="start"
        endAccessor="start"
        popup={true}
        defaultView="month"
        className={styles.calendarContainer} // Aplica la clase CSS al contenedor del calendario
        eventPropGetter={eventPropGetter}
        onSelectEvent={(event, e) => handleClick(event, e)}  
        tooltipAccessor={event => null}      
        components={{
          event: event => eventContent(event),
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
            <span className={styles.popoverSpan}><p className={styles.popoverTextItem}>Tipo:</p> <p className={styles.popoverTextDescripcion}> {isNumeric(selectedEvent.type) ? ' Vacaciones' : ` ${selectedEvent.type}`}</p></span>
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
