import React from 'react';
import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import dayjs from 'dayjs';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import styles from './CalendarioGrande.module.css'; 
import { estadoColors } from '../../../Utils/randomColors';

const localizer = dayjsLocalizer(dayjs);

function CalendarioGrande({ eventos }) {
  const c = (e) => {
    const colores = e.map(e => estadoColors[e.estado.toLowerCase()]);
    return colores;
  };

  const eventPropGetter = (event) => {
    const newStyle = {
      backgroundColor: event.color,
      color: 'black',
      borderRadius: '5px',
      border: 'none',
      display: 'block',
      margin: '0px',
      padding: '1px 3px',
      fontSize: '0.8em',
    };

    return {
      className: '',
      style: newStyle,
    };
  };

  const eventContent = ({ event }) => {
    return (
      <div className={styles.eventContent}>
        <span
          className={styles.eventCircle}
          style={{
            backgroundColor: estadoColors[event.estado.toLowerCase()],
          }}
        ></span>
        <span className={styles.eventTitle}>{event.title}</span>
      </div>
    );
  };

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={eventos}
        culture="es"
        startAccessor="start"
        endAccessor="end"
        className={styles.calendarContainer} // Aplica la clase CSS al contenedor del calendario
        eventPropGetter={eventPropGetter}
        components={{
          event: eventContent,
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
    </div>
  );
}

export default CalendarioGrande;
