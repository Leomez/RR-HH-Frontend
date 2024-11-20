import React, { useState, useEffect } from "react"
import { DataGrid } from "@mui/x-data-grid"
import { esES } from "@mui/x-data-grid/locales"
import { Button, Skeleton } from "@mui/material"
import { isNumeric } from "../../../Utils/randomColors"
import styles from "./Tabla.module.css"

const crearFilas = (solicitudes) => {
    console.log(solicitudes);
    const filas = solicitudes.map(solicitud => {
        return {
            id: solicitud.id,
            nombre: solicitud.empleado,
            // apellido: solicitud.apellido,
            fecha: solicitud.fecha,
            tipo: solicitud.nombre_tipo,
            puesto: solicitud.sector,            
        }
    })
    return filas
}

function TablaPermisos({ onAction, solicitudes, loading, error }) {

    const [rows, setRows] = useState([])
    const [refresh, setRefresh] = useState(false)


    useEffect(() => {
        setRows(crearFilas(solicitudes))
    }, [solicitudes])

    console.log(rows);
    useEffect(() => {
        if (refresh) {
            setRows(crearFilas(solicitudes))
            setRefresh(false)
        }
    }, [refresh])

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'nombre', headerName: 'Nombre', width: 130 },
        { field: 'fecha', headerName: 'Fecha', width: 100 },
        { field: 'tipo', headerName: 'Tipo', width: 130 },
        { field: 'puesto', headerName: 'Puesto', width: 130 },        
        {
            field: 'acciones', headerName: 'Acciones', width: 200, renderCell: (params) => (
                <>
                    <Button onClick={() => onAction(params.row.id, 'Aprobado')} sx={{ margin: '0 0.5rem', fontSize: '0.5rem' }} variant='outlined' color="primary">Aprobar</Button>
                    <Button onClick={() => onAction(params.row.id, 'Rechazado')} sx={{ margin: '0 0.5rem', fontSize: '0.5rem' }} variant='outlined' color="error">Rechazar</Button>
                </>
            )
        }
    ]

    
    return (
        <DataGrid            
            loading={loading}
            localeText={esES.components.MuiDataGrid.defaultProps.localeText}
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            columnVisibilityModel={{ id: false }}
            sx={{
                '& .MuiDataGrid-filler': {                       
                    background: '#1976d2'
                }
            }}
            classes={{
                columnHeader: styles.columnHeaders, // Aplica la clase CSS al encabezado                           
              }}
            getRowClassName={(params) =>
                params.indexRelativeToCurrentPage % 2 === 0 ? styles.evenRow : styles.oddRow
            }         
        />
    )
}

export default TablaPermisos