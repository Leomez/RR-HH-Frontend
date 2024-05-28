import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Stack, Typography, FormControl, InputLabel, Select, MenuItem, Button, TextField, Box, Checkbox, FormHelperText } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { getTipoSolicitudes } from '../../Redux/Features/Solicitudes/solicitudesSlice';
import TimePickerSelectivo from './utils/TimePickerSelectivo';
import { createSolicitud } from '../../Redux/Features/Solicitudes/solicitudesSlice';
import { quitarGuionBajo, capitalizeWordsWithUnderscore } from '../../Utils/QuitarGuionBajo';
import Confirmacion from './Confirmacion';



const Formulario = ({ close }) => {
  const [diasSolicitados, setDiasSolicitados] = useState(0);
  const initialState = {
    empleado_id: '',
    tipo: '',
    fecha: '',
    categoria: '',
    tipo_solicitud_id: '',
    fechaDesde: '',
    fechaHasta: '',
    fechaPermiso: '',
    fechaCompensatoria: '',
    horaPermiso: '',
    motivo: '',
    diasSolicitados: 0,
  };
  // const [mostrarDiasSolicitados, setMostrarDiasSolicitados] =  useState(false);
  const tipoSolicitud = ['Permiso', 'Licencia'];
  const licencias = [];
  const permisos = [];
  const dispatch = useDispatch();
  const tipoSolicitudes = useSelector((state) => state.solicitudes.tipoSolicitudes);
  const empleado = useSelector((state) => state.empleado.empleadoActual);
  const [formData, setFormData] = useState(initialState);
  const [compensatorio, setCompensatorio] = useState(false);
  const [tipoSolicitudId, setTipoSolicitudId] = useState();
  const [diasRestantes, setDiasRestantes] = useState(0);
  const [open, setOpen] = useState(false);
  // const [closeConfirmacion, setCloseConfirmacion] = useState(false);
  const calcularDiasSolicitados = (fechaDesde, fechaHasta) => {
    const inicio = dayjs(fechaDesde, 'DD-MM-YYYY');
    const fin = dayjs(fechaHasta, 'DD-MM-YYYY').diff(inicio, 'day') + 1; // +1 para incluir el día de inicio
    console.log(fin);
    return fin
  };


  useEffect(() => {
    dispatch(getTipoSolicitudes(empleado.id));
  }, []);

  useEffect(() => {
    setFormData(prevData => (
      {
        ...prevData,
        tipo_solicitud_id: tipoSolicitudId
      }
    ))
    if (formData.tipo === 'Licencia') {
      formData.tipo_solicitud_id !== '' &&
        licencias.length > 0 &&
        setDiasRestantes(licencias.find(licencia => licencia.id === tipoSolicitudId).diasCorrespondientes);
    }
  }, [diasRestantes, tipoSolicitudId])

  useEffect(() => {
    if (formData.tipo === 'Licencia' && formData.fechaDesde && formData.fechaHasta) {
      const dias = calcularDiasSolicitados(formData.fechaDesde, formData.fechaHasta);
      setFormData(prevFormData => ({
        ...prevFormData,
        diasSolicitados: dias
      }));
    }
  }, [formData.fechaDesde, formData.fechaHasta]);

  // acomodo los diferentes tipos de solicitudes en los array de permisos o licencias segun corresponda


  // console.log(tipoSolicitudes.vacaciones);
  tipoSolicitudes.permiso && tipoSolicitudes.permiso.forEach(permiso => {
    permisos.push(permiso)
  })

  tipoSolicitudes.licencia && tipoSolicitudes.licencia.forEach(licencia => {
    licencias.push({
      id: licencia.id,
      categoria: licencia.nombre,
      caracteristicas: licencia.descripcion,
      diasCorrespondientes: licencia.cantDias
    })
  })

  tipoSolicitudes.vacaciones && licencias.push({
    id: tipoSolicitudes.vacaciones.id,
    categoria: 'vacaciones',
    caracteristicas: tipoSolicitudes.vacaciones.descripcion,
    diasCorrespondientes: tipoSolicitudes.vacaciones.cantDias
  });
  
  const handleCompensatorioChange = () => {
    setCompensatorio(!compensatorio);
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    // console.log(tipoSolicitudId);
    setFormData({
      ...formData,
      [name]: value,
      empleado_id: empleado.id,
      fecha: dayjs().format('DD-MM-YYYY'),
      // tipo_solicitud_id: tipoSolicitudId
    });
    // formData.diasSolicitados > 0 ? mostrarDiasSolicitados = true : mostrarDiasSolicitados = false;   
  };

  const handleCancel = () => {
    setFormData(initialState);
    setTipoSolicitudId('');
    close();
  };

  const handleConfirm = () => {
    // console.log(formData);
    dispatch(createSolicitud(formData));
    setFormData(initialState);
    setTipoSolicitudId('');
    close();
  }


  //setea los dias restantes de vacaciones y licencia

  const handleClick = (id) => {
    setTipoSolicitudId(id);
    const licencia = licencias.find(licencia => licencia.id === id);
    if (licencia) {
      setDiasRestantes(licencia.diasCorrespondientes);
    } else {
      setDiasRestantes(0);
    }    // setDiasRestantes(licencias.find(licencia => licencia.id === id).diasCorrespondientes);    
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  return (
    <>
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
                    <MenuItem key={licencia.id} onClick={() => handleClick(licencia.id)} value={`${licencia.categoria}`}>
                      {quitarGuionBajo(licencia.categoria)}
                    </MenuItem>
                  ))}
                </Select>
                {formData.categoria === 'vacaciones' && <FormHelperText>{`Dias restantes: ${diasRestantes}`}</FormHelperText>}
              </FormControl>
              <DatePicker
                label={'Desde'}
                defaultValue={dayjs()}
                name={'fechaDesde'}
                onChange={(newValue) => setFormData({ ...formData, fechaDesde: newValue.format('DD-MM-YYYY') })}
              />
              <DatePicker
                label={'Hasta'}
                defaultValue={
                  formData.fechaDesde ?
                    dayjs(formData.fechaDesde, 'DD-MM-YYYY') :
                    dayjs()
                }
                minDate={dayjs(formData.fechaDesde, 'DD-MM-YYYY')}
                onChange={(newValue) => setFormData({ ...formData, fechaHasta: newValue.format('DD-MM-YYYY') })}
                slotProps={{ sx: { paddingBottom: '3rem' } }}
              />
              {(formData.diasSolicitados > 0) && (
                <FormHelperText>{`Dias solicitados: ${formData.diasSolicitados}`}</FormHelperText>
              )}
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
                    <MenuItem key={permiso.id} onClick={() => handleClick(permiso.id)} value={permiso.nombre}>
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
              {formData.categoria === 'Compensar' ?
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Checkbox
                    label="Definir dia compensador"
                    checked={compensatorio}
                    onChange={handleCompensatorioChange}
                  />
                  <Typography>Definir dia compensador</Typography>
                </Box>
                : null
              }
              {compensatorio &&
                (<DatePicker
                  label="Fecha de compensatorio"
                  defaultValue={dayjs()}
                  onChange={(newValue) => setFormData({ ...formData, fechaCompensatoria: newValue.format('DD-MM-YYYY') })}
                  slotProps={{ sx: { paddingBottom: '3rem' } }}
                  disabled={!compensatorio}
                />)
              }
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
        <Button onClick={handleCancel} sx={{ margin: '1rem 0' }} variant="contained" color="secondary">
          Cancelar
        </Button>
      </Stack>
      <Confirmacion open={open} cancel={handleCancel} confirm={handleConfirm} close={close} formData={formData} />
    </>
  );
};

export default Formulario;

