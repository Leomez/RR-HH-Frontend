import React, { useState } from 'react'
import { Box } from '@mui/material'
import { DateCalendar } from '@mui/x-date-pickers'
import dayjs from 'dayjs'


function CalendarioChico({handler, marcador}) {
  // const [date, setDate] = useState(dayjs())  

  function handleChange(value) {
    // setDate(value)
    handler(value)    
  }

  return (
    <Box padding={1} >
      <DateCalendar value={marcador} onChange={ newValue => handleChange(newValue)} />
    </Box>

  )
}

export default CalendarioChico