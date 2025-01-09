import axios from 'axios';
import dayjs from 'dayjs';
import { loadFeriados } from '../utils/loadFeriados';
// import { UseSelector } from 'react-redux/es/hooks/useSelector';


/**´´FETCH DE DIAS FERIADOS´´**/
export const fetchFeriados = async (anio, setFeriados) => {
  try {
    let response;
    response = await axios.get(`https://api.argentinadatos.com/v1/feriados/${anio}`);
    // if (anio === 2025) {
    //   const feriados2025 = await loadFeriados();
    //   response = { data: feriados2025};
    // } else {
    //   response = await axios.get(`https://api.argentinadatos.com/v1/feriados/${anio}`);      
    // }    
    setFeriados({
      feriados: response.data,
      soloFecha: response.data.map(feriado => feriado.fecha),
    });
  } catch {       
    setFeriados([
      {
        soloFecha: [''],
        feriados: ['']
      }
    ]);
  }
};

/**´´CALCULA LOS DIAS SOLICITADOS DESCONTANDO FERIADOS Y DOMINGOS´´**/
export const calcularDiasSolicitados = (fechaDesde, fechaHasta, feriados) => {
  const inicio = dayjs(fechaDesde, 'DD-MM-YYYY');
  const dias = dayjs(fechaHasta, 'DD-MM-YYYY').diff(inicio, 'day') + 1;
  let diasFeriados = 0;
  // console.log(feriados);

  for (let date = inicio; date.isBefore(dayjs(fechaHasta, 'DD-MM-YYYY')) || date.isSame(dayjs(fechaHasta, 'DD-MM-YYYY')); date = date.add(1, 'day')) {
    if (date.day() === 0 || feriados.soloFecha.includes(date.format('YYYY-MM-DD'))) {
      diasFeriados++;
    }
  }  
  console.log(dias);
  return dias - diasFeriados;
  // return dayjs(fechaHasta, 'DD-MM-YYYY').diff(inicio, 'day') + 1;
};


/**´´DESHABILITA LOS DIAS FERIADOS Y DOMINGOS´´**/
export const shouldDisableDate = (date, feriados) => {
  // console.log(feriados);
  const noEsPuente = feriados.feriados.some(feriado => feriado.fecha === date.format('YYYY-MM-DD') && feriado.tipo !== 'puente');
  if (date.day() === 0 || noEsPuente) {
    return true;
  }
  return false;
};

/**´´FIJA UNA FECHA MAXIMA PARTIENDO DE LA FECHADESDE, CONTANDO LOS RESTANTES MENOS LOS FERIADOS´´**/
export const fechaMax = (fechaDesde, diasRestantes, feriados) => {
  let feriadosYDomingos = 0;
  let date = dayjs(fechaDesde, 'DD-MM-YYYY');
  const today = dayjs();

  // Iteramos hasta que los días hábiles más los días no hábiles sumen los días restantes
  while (diasRestantes - 1 > 0) {
    // Avanzamos la fecha
    date = date.add(1, 'day');

    // Verificamos si es un domingo o un feriado
    if (date.day() === 0 || feriados.soloFecha.includes(date.format('YYYY-MM-DD'))) {
      feriadosYDomingos++;
    } else {
      diasRestantes--; // Solo reducimos los días restantes si es un día hábil
    }
  }
  // console.log(`Días no hábiles encontrados: ${feriadosYDomingos}`);
  return date; // Devolvemos la fecha máxima calculada
};

/**´´REVISA SI YA HAY SOLICITUDES REALIZADAS PARA ESA FECHA´´**/

export const validarFechas = () => {
  

}