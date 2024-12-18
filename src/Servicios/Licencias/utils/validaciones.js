import dayjs from 'dayjs';


/**
 * Función para validar si las fechas de una nueva solicitud de licencia son válidas.
 * @param {string} nuevaFechaDesde - Fecha de inicio de la nueva solicitud en formato "DD/MM/YYYY".
 * @param {string} nuevaFechaHasta - Fecha de fin de la nueva solicitud en formato "DD/MM/YYYY".
 * @param {Array} solicitudesPrevias - Array de objetos de solicitudes previas.
 * @returns {boolean} - Retorna true si las fechas se superponen, false si son válidas.
 */
function validarFechasLicencia(nuevaFechaDesde, nuevaFechaHasta, solicitudesPrevias, setErrorFecha) {
  // Convertir las fechas de la nueva solicitud a objetos Date
  
  const nuevaDesde = convertirFecha(nuevaFechaDesde);
  const nuevaHasta = convertirFecha(nuevaFechaHasta); 
  // Filtrar solicitudes previas para excluir las rechazadas
  const solicitudesFiltradas = solicitudesPrevias.filter(solicitud => solicitud.estado !== "Rechazado");

  // Verificar si las fechas se superponen
  for (const solicitud of solicitudesFiltradas) {
      const fechaDesde = convertirFecha(solicitud.fecha_desde);
      const fechaHasta = convertirFecha(solicitud.fecha_hasta);
      const fechaPermiso = solicitud.fecha_permiso ? convertirFecha(solicitud.fecha_permiso) : null;
      const fechaCompensatoria = solicitud.dia_compensatorio ? convertirFecha(solicitud.dia_compensatorio) : null;

      if (
        seSuperponen(nuevaDesde, nuevaHasta, fechaDesde, fechaHasta, fechaPermiso, fechaCompensatoria) ||
        (fechaPermiso && seSuperponen(nuevaDesde, nuevaHasta, fechaPermiso, fechaPermiso)) ||
        (fechaCompensatoria && seSuperponen(nuevaDesde, nuevaHasta, fechaCompensatoria, fechaCompensatoria))
      ){        
          setErrorFecha({estado: true, mensaje: 'Las fechas se superponen con una solicitud previa. Elegi otra fecha.'})
          return true; // Hay superposición
      }
  }
  
  return false; // No hay superposición
}

/**
 * Función para convertir una fecha en formato "DD/MM/YYYY" o "DD-MM-YYYY" a un objeto Date.
 * @param {string} fecha - Fecha en formato "DD/MM/YYYY" o "DD-MM-YYYY".
 * @returns {Date} - Objeto Date correspondiente.
 */
function convertirFecha(fecha) {
  // Reemplazar "/" por "-" para manejar ambos formatos
  const fechaNormalizada = fecha.replace(/\//g, '-');
  const [dia, mes, año] = fechaNormalizada.split('-');
  return new Date(`${año}-${mes}-${dia}`);
}

/**
 * Función para verificar si dos rangos de fechas se superponen.
 * @param {Date} inicio1 - Fecha de inicio del primer rango.
 * @param {Date} fin1 - Fecha de fin del primer rango.
 * @param {Date} inicio2 - Fecha de inicio del segundo rango.
 * @param {Date} fin2 - Fecha de fin del segundo rango.
 * @param {Date} [permiso] - Fecha de permiso.
 * @param {Date} [compensatoria] - Fecha de compensatoria.
 * @returns {boolean} - Retorna true si los rangos se superponen, false en caso contrario.
 */
function seSuperponen(inicio1, fin1, inicio2, fin2, permiso, compensatoria) {
  
  return (inicio1 <= fin2 && fin1 >= inicio2) ||
         ( inicio1 >= inicio2 && inicio1 <= fin2) ||
        //  (fin1 >= inicio2 && fin1 <= fin2 ) ||
         (permiso && (permiso >= inicio1 && permiso <= fin1)) ||
         (compensatoria && (compensatoria >= inicio1 && compensatoria <= fin1));
}

export { validarFechasLicencia };


export const calcularDiasSolicitados = (fechaDesde, fechaHasta) => {
  const inicio = dayjs(fechaDesde, 'DD-MM-YYYY');
  const fin = dayjs(fechaHasta, 'DD-MM-YYYY').diff(inicio, 'day') + 1;
  return fin;
};

export const shouldDisableDate = (date, feriados) => {
  if (date.day() === 0 || feriados.includes(date.format('YYYY-MM-DD'))) {
    return true;
  }
  return false;
};

// ver si puedo implementar esto la puta medre que me pario!!!!!
export const validateForm = (formData) => {
  const errors = {};

  if (!formData.tipo) {
    errors.tipo = 'Tipo de solicitud es requerido';
  }

  if (!formData.categoria) {
    errors.categoria = 'Categoría es requerida';
  }

  if (!formData.motivo) {
    errors.motivo = 'Motivo es requerido';
  }

  if (formData.tipo === 'Licencia') {
    if (formData.fechaDesde === '') {
      errors.fechaDesde = 'Fecha de inicio es requerida';
    }

    if (formData.fechaHasta === '') {
      errors.fechaHasta = 'Fecha de finalización es requerida';
    }
    if (!formData.diasSolicitados){
      errors.diasSolicitados = 'No se pudo establecer la cantidad de días solicitados';
    }
  }

  if (formData.tipo === 'Permiso') {
    if (!formData.fechaPermiso) {
      errors.fechaPermiso = 'Fecha de permiso es requerida';
    }
  }

  return errors;
};