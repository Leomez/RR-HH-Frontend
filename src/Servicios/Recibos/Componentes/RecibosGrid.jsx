// RecibosGrid.js
import React from 'react';
import { useState } from 'react';
import { DataGrid } from "@mui/x-data-grid";
import { selectorPeriodo, selectorArchivo } from "./renderCell";

function RecibosGrid({ empleados, mesSeleccionado, setMesSeleccionado }) {

    const [archivoSeleccionado, setArchivoSeleccionado] = useState({})
    const [datos, setDatos] = useState([]);
    
    // console.log('estoy en el dataGrid');
    // console.log(mesSeleccionado);

    const handleSelectedPeriodos = (event, params) => {
        // Aquí puedes manejar el cambio del período seleccionado
        // console.log('Periodo seleccionado:', event.target.value, 'para la fila:', params.row.id);
        const periodosActualizados = { ...mesSeleccionado };
        periodosActualizados[params.row.id] = event.target.value;
        setMesSeleccionado(periodosActualizados);

    };

    const handleLimpiarSeleccion = (empleadoId) => {
        const inputFile = document.getElementById(`fileInput-${empleadoId}`);
        if (inputFile) {
            inputFile.value = null;
        }
        setArchivoSeleccionado({
            ...archivoSeleccionado,
            [empleadoId]: null,
        });
        setMesSeleccionado({
            ...mesSeleccionado,
            [empleadoId]: null,
        });
        setDatos((prevDatos) => {
            const updatedDatos = prevDatos.filter(
                (empleado) => empleado.id_empleado !== empleadoId
            );
            return updatedDatos;
        });
    }

    const handleFileChange = (e, empleadoId) => {
      const file = e.target.files[0]  
      const mes = mesSeleccionado[empleadoId]
      console.log(archivoSeleccionado);
      setArchivoSeleccionado({
        ...archivoSeleccionado,
        [empleadoId]: file.name,
      });
      
    //   console.log('archivo -> ',file);
    //   console.log('mes', mes);
      setDatos((prevDatos) => [
        ...prevDatos,
        {
          recibo: file,
          id_empleado: empleadoId,
          periodo: mes,
        },
      ]);
    }

    const rows = empleados && empleados.map((e) => {
        return {
            id: e.id,
            col1: e.legajo,
            col2: `${e.nombre_empleado} ${e.apellido_empleado}`
        };
    });

    const columns = [
        { field: 'col1', headerName: 'Legajo', width: 150 },
        { field: 'col2', headerName: 'Nombre y apellido', width: 150 },
        {
            field: 'col3',
            headerName: 'Mes',
            width: 160,
            renderCell: params => selectorPeriodo({ handleSelectedPeriodos, mesSeleccionado, params })
        },
        {
            field: 'col4',
            headerName: 'Archivo',
            width: 150,
            renderCell: params => selectorArchivo({ params, handleFileChange, handleLimpiarSeleccion, archivoSeleccionado })
            // renderCell: /*aca va un botón para buscar un archivo local o el nombre del archivo que se subió*/
        }
    ];

    return (
        <DataGrid
            sx={{
                width: 'auto',
                // height: '100%',
                overflow: 'auto',
                border: '1px solid grey',
                boxShadow: 2,
                borderRadius: 2,
                backgroundColor: '#ffffff55',
            }}
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
        />
    );
}

export default RecibosGrid;
