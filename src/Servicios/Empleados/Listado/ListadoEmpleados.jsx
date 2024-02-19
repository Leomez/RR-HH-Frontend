import {React, useEffect} from 'react' 
import { useSelector, useDispatch } from "react-redux"
import { Box, Typography } from '@mui/material'
import { DataGrid, esES } from '@mui/x-data-grid'
import { fetchSectores } from '../../../Redux/Features/Sectores/sectoresSlice'
import { sector } from './sector'
import { Error } from '../../../Componentes/Error'
import { fetchEmpleados } from "../../../Redux/Features/Empleado/empleadoSlice"


export default function ListadoEmpleados() {
  const dispatch = useDispatch()  
  const token = useSelector((state) => state.user.token)
  const empleados = useSelector(state => state.empleado.empleados)
  const sectores = useSelector(state => state.sectores.sectores)
  const error = useSelector((state) => state.empleado.empleados.error);
  
  useEffect(() => {
    dispatch(fetchEmpleados())
    dispatch(fetchSectores(token))
  },[dispatch, token])
  // useEffect(() => {
  // }, [dispatch])  
  // const empleadosOk = empleados ? empleados : null  
  // console.log(sector('f3095ec8-7a38-432f-b7e1-8d64c9713f72'))
  if (error) {
    // console.log(error);
    return <Error error={error}/>
    
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'col1', headerName: 'Nombre', width: 300 },
    { field: 'col2', headerName: 'Legajo', width: 150 },
    { field: 'col3', headerName: 'Puesto', width: 150 },
    { field: 'col4', headerName: 'Sector', width: 150 },
    { field: 'col5', headerName: 'Encargado', width: 150 }
  ]
  // console.log(empleados);
  const rows = empleados && empleados.map(e => {
    
    return {
      id: e.id,
      col1: `${e.nombre_empleado} ${e.apellido_empleado}`,
      col2: e.legajo,
      col3: e.cargo,
      col4: sector(sectores, e.sector_id),
      col5: 'encargado'
    }
  })

  return (
    <div>
      <Box>
        <DataGrid
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          rows={rows}
          columns={columns}
          columnVisibilityModel={{ id: false }}
        />
      </Box>
    </div>
  )
}

