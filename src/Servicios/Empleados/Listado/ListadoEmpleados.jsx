import { React, useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { Box, Button, Typography, Skeleton } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { fetchSectores } from '../../../Redux/Features/Sectores/sectoresSlice'
import { sector, encargado } from './utils'
import LoadingPage from '../../../Componentes/Containers/Loading'
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Error } from '../../../Componentes/Error'
import { fetchEmpleados } from "../../../Redux/Features/Empleado/empleadoSlice"
import { getSupervisores } from '../../../Redux/Features/Supervisor/supervisorSlice'
import { eliminarEmpleado } from '../../../Redux/Features/Empleado/empleadoSlice'

export default function ListadoEmpleados() {
  try {
    const dispatch = useDispatch()
  const [listado, setListado] = useState([])
  const [loading, setLoading] = useState(true)
  const token = useSelector((state) => state.user.token)
  const empleados = useSelector(state => state.empleado.empleados)
  const loadingEmpleados = useSelector(state => state.empleado.loading)
  const sectores = useSelector(state => state.sectores.sectores)
  const error = useSelector((state) => state.empleado.empleados.error);
  const supervisores = useSelector(state => state.supervisor.supervisores.data)

  useEffect(() => {
    dispatch(fetchEmpleados())
    dispatch(fetchSectores(token))
    if (!supervisores) {
      dispatch(getSupervisores())
    }    
  }, [dispatch, token])

  useEffect(() => {
    setListado(empleados)
  }, [empleados])

  useEffect(() => {
    if (!loadingEmpleados) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [loadingEmpleados]);

  // if (empleados[0]) {
  //   return <Error error={empleados[0]} />
  // } 
  const handleDelete = async (id) => {
    setLoading(true); // Mostrar el estado de carga
    await dispatch(eliminarEmpleado(id)); // Espera que la acción se complete
    await dispatch(fetchEmpleados()); // Actualiza la lista de empleados
    setLoading(false); // Oculta el estado de carga
  };
 

  function suma(a,b) {
    return a + b
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'col1', headerName: 'Nombre', width: 300 },
    { field: 'col2', headerName: 'Legajo', width: 150 },
    { field: 'col3', headerName: 'Puesto', width: 150 },
    { field: 'col4', headerName: 'Sector', width: 150 },
    {
      field: 'col5',
      headerName: 'Encargado', 
      width: 150,
    },
    {field: 'col6', headerName: 'Acciones', width: 300, renderCell: (params) => (
      <>
        <Button size='small' sx={{width: '2rem', height: '2rem'}} variant='text' color='primary' onClick={() => console.log(params.row)}><DriveFileRenameOutlineIcon/></Button>
        <Button size='small' variant='text' color='error' onClick={() => handleDelete(params.row.id)}><DeleteForeverIcon/></Button>
      </>
    )}
  ]
  const rows = /*!loadingEmpleados &&*/ listado && 
  /*empleados[0].name !== 'Error' &&*/ 
  listado.map(e => 
    {
      // console.log(e, 'empleado');
      // console.log(encargado(supervisores, e, listado))
    return {
        id: e.id,
        col1: `${e.nombre_empleado} ${e.apellido_empleado}`,
        col2: e.legajo,
        col3: e.cargo,
        col4: sector(sectores, e.sector_id) /*'sector'*/,
        col5: supervisores && encargado(supervisores, e, empleados) /*'encargado'*/
      }
  })
    console.log(rows, 'rows');

  return (
    <div>
      <Box>
        <LoadingPage loading={loading} />
        <DataGrid
          // localeText={esES.components.MuiDataGrid.defaultProps.localeText}          
          rows={rows}
          columns={columns}
          columnVisibilityModel={{ id: false }}
        />
      </Box>
    </div>
  )
    
  } catch (error) {
    <Error error={error}/>
  }
  
}

