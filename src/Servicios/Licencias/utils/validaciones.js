import dayjs from 'dayjs';

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
    if (!formData.fechaDesde) {
      errors.fechaDesde = 'Fecha de inicio es requerida';
    }

    if (!formData.fechaHasta) {
      errors.fechaHasta = 'Fecha de finalización es requerida';
    }
  }

  if (formData.tipo === 'Permiso') {
    if (!formData.fechaPermiso) {
      errors.fechaPermiso = 'Fecha de permiso es requerida';
    }
  }

  return errors;
};