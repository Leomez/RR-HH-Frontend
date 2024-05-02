import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Stack, Typography, FormControl, InputLabel, Select, MenuItem, Button, TextField, Box } from '@mui/material';
import { TimePicker, DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { getTipoSolicitudes } from '../../Redux/Features/Solicitudes/solicitudesSlice';
import TimePickerSelectivo from './utils/TimePickerSelectivo';
import ListadoEmpleados from '../Empleados/Listado/ListadoEmpleados';
import { formats } from 'dayjs/locale/es';

const Formulario = ({ close }) => {
  const tipoSolicitud = ['Permiso', 'Licencia'];
  const licencias = [];
  const permisos = [];
  const eventos = []
  const dispatch = useDispatch();
  const tipoSolicitudes = useSelector((state) => state.solicitudes.tipoSolicitudes);


  useEffect(() => {
    dispatch(getTipoSolicitudes());
  }, [dispatch]);

  tipoSolicitudes.forEach(tipo => {
    if (tipo.canti_dias) {
      licencias.push(tipo)
    } else {
      permisos.push(tipo)
    }
  })
  console.log()

  const initialState = {
    tipo: '',
    categoria: '',
    fechaDesde: '',
    fechaHasta: '',
    fechaPermiso: '',
    horaPermiso: '',
    motivo: ''
  };

  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    console.log(e);
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // close();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes hacer lo que necesites con formData
    console.log(formData);
    setFormData(initialState);
    close();
  };

  return (
    <Stack sx={{ height: '100%', padding: '1rem', margin: '5rem 1rem' }} spacing={1}>
      <Stack spacing={1}>
        <Typography variant="h5">Formulario de solicitud</Typography>
        <FormControl fullWidth>
          <InputLabel id="tipo-solicitud-label">Tipo de solicitud</InputLabel>
          <Select
            labelId="tipo-solicitud-label"
            id="tipo-solicitud-select"
            name="tipo"
            value={formData.tipo}
            onChange={handleChange}
            label="Tipo de solicitud"
          >
            {tipoSolicitud.map((tipo) => (
              <MenuItem key={tipo} value={tipo}>
                {tipo}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {formData.tipo === 'Licencia' && (
          <>
            <FormControl fullWidth>
              <InputLabel id="categoria-label">Categoría de licencia</InputLabel>
              <Select
                labelId="categoria-label"
                id="categoria-select"
                name="categoria"
                value={formData.categoria}
                onChange={handleChange}
                label="Categoría de licencia"
              >
                {licencias.map((licencia) => (
                  <MenuItem key={licencia.id} value={licencia.nombre}>
                    {licencia.caracteristicas ? `${licencia.nombre} ${licencia.caracteristicas}` : licencia.nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <DatePicker
              label={'Desde'}
              defaultValue={dayjs()}
              onChange={(newValue) => setFormData({ ...formData, fechaDesde: newValue.format('DD-MM-YYYY') })}
            // onChange={handleChange}
            />
            <DatePicker
              label={'Hasta'}
              name={'fechaHasta'}
              defaultValue={
                formData.fechaDesde ?
                  dayjs(formData.fechaDesde, 'DD-MM-YYYY') :
                  dayjs()
              }
              minDate={dayjs(formData.fechaDesde, 'DD-MM-YYYY').add(1, 'day')}
              onChange={(newValue) => setFormData({ ...formData, fechaHasta: newValue.format('DD-MM-YYYY') })}
              slotProps={{sx: {paddingBottom: '3rem'}}}
            />
          </>
        )}
        {formData.tipo === 'Permiso' && (
          <>
            <FormControl fullWidth>
              <InputLabel id="permiso-label">Tipo de permiso</InputLabel>
              <Select
                labelId="permiso-label"
                id="permiso-select"
                name="categoria"
                value={formData.categoria}
                onChange={handleChange}
                label="Tipo de permiso"
              >
                {permisos.map((permiso) => (
                  <MenuItem key={permiso.id} value={permiso.nombre}>
                    {permiso.caracteristicas ? `${permiso.nombre} ${permiso.caracteristicas}` : permiso.nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <DatePicker
              label="Fecha del permiso"
              defaultValue={dayjs()}
              onChange={(newValue) => setFormData({ ...formData, fechaPermiso: newValue.format('DD-MM-YYYY') })}
            />
            {!(formData.categoria === 'Franco compensatorio') ?
              <TimePickerSelectivo
                categoria={formData.categoria}
                setFormData={setFormData}
                formData={formData} /> : null
            }
          </>
        )}
      </Stack>
      <Box>
        <TextField
          label="Motivo"
          name="motivo"
          value={formData.motivo}
          onChange={handleChange}
          variant="outlined"
          type='text'
          fullWidth 
          multiline
          rows={4} 
          placeholder="Escribe el motivo de tu solicitud" 
       />
      </Box>
      <Button onClick={handleSubmit} sx={{ margin: '1rem 0' }} variant="contained" color="primary">
        Enviar
      </Button>
      <Button onClick={() => { setFormData(initialState), close() }} sx={{ margin: '1rem 0' }} variant="contained" color="secondary">
        Cancelar
      </Button>
    </Stack>
  );
};

export default Formulario;

