import React from 'react';
import { Stack, Typography, FormControl, InputLabel, Select, MenuItem, Button, TextField, Box,Checkbox, FormHelperText } from '@mui/material';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers';
import TimePickerSelectivo from './TimePickerSelectivo';
import { quitarGuionBajo } from '../../../Utils/QuitarGuionBajo';
import { fechaMax } from './helpers';

const FormularioVisual = ({
    formData,
    setFormData,
    diasRestantes,
    permisos,
    licencias,
    handleChange,
    // tipoSolicitud,
    // tipoSolicitudes,
    shouldDisableDate,
    handleCambioAnio,
    handleSubmit,
    handleCancel,
    deshabilitarSubmit,
    compensatorio, 
    handleCompensatorioChange, 
    handleClick,
    dayLoading,
    feriados
}) => {
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
                    >
                        <MenuItem value="Licencia">Licencia</MenuItem>
                        <MenuItem value="Permiso">Permiso</MenuItem>
                        {/* {tipoSolicitud.map((tipo) => (
                            <MenuItem key={tipo} value={tipo}>{tipo}</MenuItem>
                        ))} */}
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

                                    // <MenuItem key={licencia.id} onClick={() => handleClick(licencia.id)} value={`${licencia.categoria}`}>
                                    //     {quitarGuionBajo(licencia.categoria)}
                                    // </MenuItem>
                                    <MenuItem key={licencia.id} onClick={() => handleClick(licencia.id)} value={licencia.categoria}>
                                        {quitarGuionBajo(licencia.categoria)}
                                    </MenuItem>
                                ))}
                            </Select>
                            {/* {formData.categoria === 'vacaciones' && <FormHelperText>{`Dias restantes: ${diasRestantes}`}</FormHelperText>} */}
                            <FormHelperText>{`Dias restantes: ${diasRestantes}`}</FormHelperText>
                        </FormControl>
                        <DatePicker
                            label={'Desde'}
                            minDate={dayjs()}
                            defaultValue={dayjs()}
                            shouldDisableDate={shouldDisableDate}                            
                            name={'fechaDesde'}
                            onChange={(newValue) => setFormData({ ...formData, fechaDesde: newValue.format('DD-MM-YYYY') })}
                        />
                        <DatePicker
                            label={'Hasta'}
                            defaultValue={
                                dayjs(formData.fechaDesde, 'DD-MM-YYYY')
                            }
                            loading={dayLoading}
                            shouldDisableDate={shouldDisableDate}
                            onMonthChange={handleCambioAnio}
                            minDate={dayjs(formData.fechaDesde, 'DD-MM-YYYY')}
                            maxDate={fechaMax(formData.fechaDesde, diasRestantes, feriados)}
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
                        {!(formData.categoria === 'Compensar') ?
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
                    fullWidth
                    multiline
                    rows={4}
                />
            </Box>
            <Button onClick={handleSubmit} sx={{ margin: '1rem 0' }} variant="contained" color="primary" disabled={deshabilitarSubmit}>
                Enviar
            </Button>
            <Button onClick={handleCancel} sx={{ margin: '1rem 0' }} variant="contained" color="secondary">
                Cancelar
            </Button>
        </Stack>
    );
};

export default FormularioVisual;
