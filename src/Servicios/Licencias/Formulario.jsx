import React, { useState } from 'react';
import { Stack, Typography, FormControl, InputLabel, Select, MenuItem, Button, TextField } from '@mui/material';

const Formulario = ({ close }) => {
  const tipoSolicitud = ['Permiso', 'Licencia'];
  const licencias = ['anual', 'enfermedad', 'maternidad', 'Cuidado familiar', 'duelo'];
  const permisos = ['Llegar tarde', 'salida médica', 'franco compensatorio', 'retirarme temprano', 'cambio de horario'];

  const initialState = {
    tipo: '',
    categoria: '',
    fechaDesde: '',
    fechaHasta: '',
    fechaPermiso: '',
    horasPermiso: ''
  };

  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
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
                <MenuItem key={licencia} value={licencia}>
                  {licencia}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            id="fecha-desde"
            name="fechaDesde"
            label="Fecha desde"
            type="date"
            value={formData.fechaDesde}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="fecha-hasta"
            name="fechaHasta"
            label="Fecha hasta"
            type="date"
            value={formData.fechaHasta}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
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
                <MenuItem key={permiso} value={permiso}>
                  {permiso}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            id="fecha-permiso"
            name="fechaPermiso"
            label="Fecha del permiso"
            type="date"
            value={formData.fechaPermiso}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
          {(formData.categoria === 'Llegar tarde' || formData.categoria === 'retirarme temprano') && (
            <TextField
              id="horas-permiso"
              name="horasPermiso"
              label="Horas"
              type="number"
              value={formData.horasPermiso}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          )}
        </>
      )}
      <Button onClick={handleSubmit} sx={{ margin: '1rem 0' }} variant="contained" color="primary">
        Enviar
      </Button>
      <Button onClick={() => {setFormData(initialState), close()}} sx={{ margin: '1rem 0' }} variant="contained" color="secondary">
        Cancelar
      </Button>
    </Stack>
  );
};

export default Formulario;

