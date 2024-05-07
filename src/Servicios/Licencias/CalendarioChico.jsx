import React, { useState, useEffect } from 'react';
import { Box, Badge, Tooltip } from '@mui/material';
import { DateCalendar, DayCalendarSkeleton, PickersDay } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import axios from 'axios';

function CalendarioChico({ handler, marcador, anio, setAnio, feriados, loading }) { 

  //maneja el cambio de fecha y se lo pasa al componente padre para que lo comunique con el calendarioGrande (los vincula)
  function handleChange(value) {
    handler(value);
  }
  //maneja el cambio de año en el calendarioChico para actualizar la llamada a la api de feriados cuando cambia de año
  function handleCambioAnio(e) {
    const newYear = dayjs(e).year();
    setAnio(newYear);    
  }

  //funcion para renderizar los dias feriados en el calendarioChico
  const renderFeriadosBadge = (props) => {
    const { day } = props;
    const formattedDate = dayjs(day).format('YYYY-MM-DD');
    const feriado = feriados.find((feriado) => feriado.fecha === formattedDate);
    // console.log(feriado);
    if (feriado) {
      return (
        <Tooltip title={feriado.nombre} arrow>
          <Badge color="error" variant='dot' overlap="circular">
            <PickersDay {...props}/>
          </Badge>
        </Tooltip>
      );
    } else {
      return <PickersDay {...props} />;
    }
  };


  return (
    <Box padding={1}>
      <DateCalendar            
        date={marcador}
        value={marcador}
        onChange={(newValue) => handleChange(newValue)}
        loading={loading}
        renderLoading={() => <DayCalendarSkeleton />}
        slots={{
          day: renderFeriadosBadge,
        }}          
        onMonthChange={e=> handleCambioAnio(e)}
      />
    </Box>
  );
}

export default CalendarioChico;
