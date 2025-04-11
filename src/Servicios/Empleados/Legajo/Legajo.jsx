import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Card, Box, CardMedia, Grid2 as Grid, TextField, Button, IconButton } from '@mui/material';
import { editarEmpleado } from '../../../Redux/Features/Empleado/empleadoSlice';
import BorderColorTwoToneIcon from '@mui/icons-material/BorderColorTwoTone';
import DriveFileRenameOutlineTwoToneIcon from '@mui/icons-material/DriveFileRenameOutlineTwoTone';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import s from './Legajo.module.css';


function Legajo() {
  const empleado = useSelector(state => state.empleado.legajo);
  const dispatch = useDispatch();
  const placeholder = '/noFoto.png';
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editButton, setEditButton] = useState('Editar');
  const [formData, setFormData] = useState({ ...empleado });
  const [preview, setPreview] = useState(placeholder);

  useEffect(() => {
    setFormData({ ...empleado });
  }, [empleado]);

  useEffect(() => {
    if (empleado.foto) {
      setPreview(empleado.foto);  
    } else {
      setPreview(placeholder);
    }
  }, [empleado.foto]);
  
  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const fileType = file.type.split('/')[0];
  //     const fileSize = file.size / 1024 / 1024;
  
  //     if (fileSize > 2) {
  //       alert('El archivo es demasiado grande. El tamaño máximo permitido es 2 MB.');
  //       return;
  //     }
  
  //     if (fileType !== 'image') {
  //       alert('El archivo no es una imagen. Por favor, selecciona una imagen.');
  //       return;
  //     }
  
  //     const extension = file.name.split('.').pop();
  //     const renamedFile = new File([file], `${formData.id}.${extension}`, {
  //       type: file.type,
  //       lastModified: new Date().getTime(),
  //     });
  
  //     setFormData({ ...formData, foto: renamedFile, tipoSolicitud: 'foto' });
  //     setPreview(URL.createObjectURL(renamedFile));
  //   }
  // };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileType = file.type.split('/')[0];
      const fileSize = file.size / 1024 / 1024;
      if (fileSize > 2) return alert('Archivo muy grande (máx 2 MB).');
      if (fileType !== 'image') return alert('Debe ser una imagen.');
      const extension = file.name.split('.').pop();
      const renamedFile = new File([file], `${formData.id}.${extension}`, {
        type: file.type,
        lastModified: new Date().getTime(),
      });
      setFormData({ ...formData, foto: renamedFile, tipoSolicitud: 'foto' });
      setPreview(URL.createObjectURL(renamedFile));
    }
  };

  const handleSave = async () => {
    setLoading(true);
    const dataToSend = new FormData();
    for (const key in formData) {
      if (key === 'domicilio') dataToSend.append('domicilio', JSON.stringify(formData.domicilio));
      else if (key === 'Sector') dataToSend.append('Sector', JSON.stringify(formData.Sector));
      else dataToSend.append(key, formData[key]);
    }
    await dispatch(editarEmpleado(dataToSend));
    setLoading(false);
    setEdit(false);
  };

  const handleCancel = () => {
    setFormData({ ...empleado });
    setPreview(empleado.foto || placeholder);
    setEdit(false);
  };
  

  // const handleEdit = async () => {
  //   if (edit) {
  //     setLoading(true);
  //     const dataToSend = new FormData();
  //     // console.log(formData, 'formData');
  //     for (const key in formData) {
  //       if (key === 'domicilio') {
  //         dataToSend.append('domicilio', JSON.stringify(formData.domicilio));
  //       }
  //       if (key === 'Sector') {
  //         dataToSend.append('Sector', JSON.stringify(formData.Sector));
  //       }
  //       dataToSend.append(key, formData[key]);
  //     }      
  //     await dispatch(editarEmpleado(dataToSend)) && console.log('dispatch ejecutado');
  //     setLoading(false);
  //     setEditButton('Editar');
  //   } else {
  //     setEditButton('Guardar');
  //   }
  //   setEdit(!edit);
  // }


  useEffect(() => {
    console.log(formData, 'empleado');
  }, [empleado]);


  return (
    <div id='legajo' className={s.container}>
      <Box className={s.header}>
        <Box className={s.containerFoto}>
          {edit &&
            <>
              <input type='file' accept='image/*' id='file' style={{ display: 'none' }} onChange={handleFileChange} />
              <label htmlFor='file'>
                <Button sx={{ minWidth: '1rem', padding: '0.5rem', borderRadius: '50%', position: 'relative', bottom: '80px', zIndex: 10 }} variant='contained' color='primary' component='span'>
                  < DriveFileRenameOutlineTwoToneIcon />
                </Button>
              </label>
            </>
          }
          <CardMedia
            component='img'
            sx={{ width: 150, height: 150 }}
            className={s.photo}
            image={preview}
            alt='Foto de perfil'
          />
        </Box>
        <Box className={s.headerText}>
          <Typography className={s.nombreHeader} variant='h4'>
            {`${empleado.nombre_empleado || 'Nombre'} ${empleado.apellido_empleado || 'Apellido'}`}
          </Typography>
          <Typography variant='subtitle1' className={s.jobTitle}>
            {empleado.cargo || 'Cargo'}
          </Typography>
        </Box>

        <Box className={s.editButtons}>
          {!edit ? (
            <Button variant='contained' color='primary' onClick={() => setEdit(true)}>Editar</Button>
          ) : (
            <>
            <IconButton onClick={handleSave}><CheckIcon className={s.saveIconButton}/></IconButton>
            <IconButton onClick={handleCancel}><CloseIcon className={s.cancelIconButton} /></IconButton>
            </>
          )}          
        </Box>

        {/* <Button variant='contained' color='primary' onClick={handleEdit}>{editButton}</Button> */}
      </Box>

      <Grid container spacing={2} className={s.content}>
        <Grid item xs={12} md={3} className={s.sidebar}>
          <Box className={s.infoContainer}>
            <Grid item xs={6} md={3}><TextField variant='filled' label='Legajo' value={formData.legajo || '00000'} disabled={!edit} onChange={(e) => setFormData({ ...formData, legajo: e.target.value })} /></Grid>
            <Grid item xs={6} md={3}><TextField variant='filled' label='DNI' value={formData.dni || 'XX.XXX.XXX'} disabled={!edit} onChange={(e) => setFormData({ ...formData, dni: e.target.value })} /></Grid>
            <Grid item xs={12} md={6}><TextField variant='filled' label='Correo' value={formData.correo || 'correo@ejemplo.com'} disabled={!edit} onChange={(e) => setFormData({ ...formData, correo: e.target.value })} /></Grid>
            <Grid item xs={6} md={3}><TextField variant='filled' label='Teléfono' value={formData.telefono || '(XX) XXXX-XXXX'} disabled={!edit} onChange={(e) => setFormData({ ...formData, telefono: e.target.value })} /></Grid>
            <Grid item xs={6} md={3}><TextField variant='filled' label='Tel Alternativo' value={formData.tel_alternativo || '(XX) XXXX-XXXX'} disabled={!edit} onChange={(e) => setFormData({ ...formData, tel_alternativo: e.target.value })} /></Grid>
          </Box>
        </Grid>
      </Grid>

      <Grid item xs={12} md={9}>
        <Card className={s.detailsCard}>
          <Typography variant='h6' className={s.sectionTitle}>Domicilio</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} ><TextField label='Calle' value={formData.domicilio.calle || ''} fullWidth disabled={!edit} onChange={(e) => setFormData({ ...formData, domicilio: {...formData.domicilio, calle: e.target.value} })} /></Grid>
            <Grid item xs={6} md={2}><TextField label='Número' value={formData.domicilio.numero || ''} fullWidth disabled={!edit} onChange={(e) => setFormData({ ...formData, domicilio: {...formData.domicilio, numero: e.target.value} })} /></Grid>
            <Grid item xs={6} md={2}><TextField label='Piso' value={formData.domicilio.piso || ''} fullWidth disabled={!edit} onChange={(e) => setFormData({ ...formData, domicilio: {...formData.domicilio, piso: e.target.value} })} /></Grid>
            <Grid item xs={6} md={2}><TextField label='Depto' value={formData.domicilio.depto || ''} fullWidth disabled={!edit} onChange={(e) => setFormData({ ...formData, domicilio: {...formData.domicilio, depto: e.target.value} })} /></Grid>
            <Grid item xs={12} md={6}><TextField label='Ciudad' value={formData.domicilio.ciudad || ''} fullWidth disabled={!edit} onChange={(e) => setFormData({ ...formData, domicilio: {...formData.domicilio, ciudad: e.target.value} })} /></Grid>
            <Grid item xs={12} md={6}><TextField label='Código Postal' value={formData.domicilio.cod_postal || ''} fullWidth disabled={!edit} onChange={(e) => setFormData({ ...formData, domicilio: {...formData.domicilio, cod_postal: e.target.value} })} /></Grid>
          </Grid>
        </Card>

        <Card className={s.detailsCard}>
          <Typography variant='h6' className={s.sectionTitle}>Datos del Puesto</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}><TextField label='Categoría' value={formData.categoria || ''} fullWidth disabled={!edit} onChange={(e) => setFormData({ ...formData, categoria: e.target.value })} /></Grid>
            <Grid item xs={12} md={4}><TextField label='Sector' value={formData.Sector.nombre_sector || ''} fullWidth disabled={!edit} onChange={(e) => setFormData({ ...formData, Sector: {...formData.Sector, nombre_sector: e.target.value} })} /></Grid>
            <Grid item xs={12} md={4}><TextField label='Turno' value={formData.turno || ''} fullWidth disabled={!edit} onChange={(e) => setFormData({ ...formData, turno: e.target.value })} /></Grid>
            <Grid item xs={12} md={6}><TextField label='Permisos' value={formData.permisos || ''} fullWidth disabled={!edit} onChange={(e) => setFormData({ ...formData, permisos: e.target.value })} /></Grid>
            <Grid item xs={12} md={6}><TextField label='Fecha de Ingreso' value={formData.fechaIngreso || ''} fullWidth disabled={!edit} onChange={(e) => setFormData({ ...formData, fechaIngreso: e.target.value })} /></Grid>
            <Grid item xs={12} md={6}><TextField label='Estado' value={formData.estado || ''} fullWidth disabled={!edit} onChange={(e) => setFormData({ ...formData, estado: e.target.value })} /></Grid>
          </Grid>
        </Card>
      </Grid>
    </div>
  );
}


export default Legajo;

