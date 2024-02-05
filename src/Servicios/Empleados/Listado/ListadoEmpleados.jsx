import {React, useEffect} from 'react' 
import { useSelector, useDispatch } from "react-redux"
import { Box } from '@mui/material'
import { DataGrid, esES } from '@mui/x-data-grid'
import { fetchSectores } from '../../../Redux/Features/Sectores/sectoresSlice'
import { sector } from './sector'
import { fetchEmpleados } from "../../../Redux/Features/Empleado/empleadoSlice"


export default function ListadoEmpleados() {
  const dispatch = useDispatch()
  
  const token = useSelector((state) => state.user.token)
  
  useEffect(() => {
    dispatch(fetchEmpleados())
  },[dispatch])
  useEffect(() => {
    dispatch(fetchSectores(token))
  }, [dispatch])

  const empleados = useSelector(state => state.empleado.empleados)
  const sectores = useSelector(state => state.sectores.sectores)  
  
  // console.log(sector('f3095ec8-7a38-432f-b7e1-8d64c9713f72'))
  const columns = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'col1', headerName: 'Nombre', width: 300 },
    { field: 'col2', headerName: 'Legajo', width: 150 },
    { field: 'col3', headerName: 'Puesto', width: 150 },
    { field: 'col4', headerName: 'Sector', width: 150 },
    { field: 'col5', headerName: 'Encargado', width: 150 }
  ]
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

