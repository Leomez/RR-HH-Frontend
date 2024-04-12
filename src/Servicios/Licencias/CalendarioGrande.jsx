import { useState, useCallback, useEffect } from 'react'
import { Calendar, dayjsLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import dayjs from 'dayjs'
import { Button } from '@mui/material'

const localizer = dayjsLocalizer(dayjs)

const CalendarioGrande = ({ marcador }) => {
  const [date, setDate] = useState(marcador)
  const onNavigate = useCallback((newDate) => setDate(newDate), [setDate])
  useEffect(() => {
    setDate(marcador)
  }, [marcador])

  const toolbarStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: '10px',
    backgroundColor: '#f5f5f5',
    '@media (max-width: 768px)': {
      flexDirection: 'column',
    },
  }
  
  

  // console.log(date)
  return (
    <div>
      <Calendar
        localizer={localizer}
        // events={myEventsList}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '500px', }}
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
      />
    </div>
  )
}

export default CalendarioGrande