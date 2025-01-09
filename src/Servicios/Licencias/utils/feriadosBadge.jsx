import dayjs from "dayjs";
import { Badge, Tooltip } from "@mui/material";
import { PickersDay } from "@mui/x-date-pickers"; 
 
 /**Funcion para renderizar los dias feriados en el calendarioChico.
  * @param {Date} day - Fecha del día a renderizar.
  * @param {Array} feriados - Array de feriados.
 */
 export const renderFeriadosBadge = (props) => {
    const { day, feriados } = props;
  const formattedDate = dayjs(day.day).format('YYYY-MM-DD');
  const feriado = feriados.find((feriado) => feriado.fecha === formattedDate);
  // console.log(feriado);
  if (feriado) {
    return (
      <Tooltip title={feriado.nombre} arrow>
        <Badge color="error" variant='dot' overlap="circular">
          <PickersDay {...props.day}/>
        </Badge>
      </Tooltip>
    );
  } else {
    return <PickersDay {...props.day} />;
  }
};