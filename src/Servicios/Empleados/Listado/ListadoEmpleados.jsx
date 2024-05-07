import { React, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { Box, Typography, Skeleton } from '@mui/material'
import { DataGrid, esES } from '@mui/x-data-grid'
import { fetchSectores } from '../../../Redux/Features/Sectores/sectoresSlice'
import { sector, encargado } from './utils'
import LoadingPage from '../../../Componentes/Containers/Loading'
import { Error } from '../../../Componentes/Error'
import { fetchEmpleados } from "../../../Redux/Features/Empleado/empleadoSlice"
import { getSupervisores } from '../../../Redux/Features/Supervisor/supervisorSlice'

export default function ListadoEmpleados() {
  try {
    const dispatch = useDispatch()
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

  // if (empleados[0]) {
  //   return <Error error={empleados[0]} />
  // } 

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
    }
  ]
  const rows = /*!loadingEmpleados &&*/
  empleados[0].name !== 'Error' && 
  empleados.map(e => {
    {console.log(encargado(supervisores, e, empleados))}
    return {
        id: e.id,
        col1: `${e.nombre_empleado} ${e.apellido_empleado}`,
        col2: e.legajo,
        col3: e.cargo,
        col4: sector(sectores, e.sector_id),
        col5: supervisores && encargado(supervisores, e, empleados) /*'encargado'*/
      }
    })

  return (
    <div>
      <Box>
        <LoadingPage loading={loadingEmpleados} />
        <DataGrid
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
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

