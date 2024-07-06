import React from 'react';
import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { estadoColors } from '../../../Utils/randomColors';
import dayjs from 'dayjs';

const localizer = dayjsLocalizer(dayjs);

function CalendarioGrande({ eventos }) {
    console.log(eventos);
    const c = (e) => {
        const colores = e.map(e => estadoColors[e.estado.toLowerCase()])
        return colores
    }
    console.log(c(eventos));

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
            <div style={{ display: 'block', position: 'relative', alignItems: 'center' }}>
                <span
                    style={{
                        position: 'absolute',
                        left: '0px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        height: '10px',
                        width: '10px',
                        paddingRight: '5px',
                        backgroundColor: estadoColors[event.estado.toLowerCase()],
                        borderRadius: '50%',
                        display: 'inline-block',
                        marginRight: '5px',
                    }}
                ></span>
                <span style={{ display: 'inline-block', paddingLeft: '5px', position: 'relative', left: '10px' }}>{event.title}</span>
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
                style={{ height: '500px' }}
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
