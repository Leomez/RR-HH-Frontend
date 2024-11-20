/* eslint-disable react/prop-types */
import { DataGrid } from "@mui/x-data-grid";
import { esES } from "@mui/x-data-grid/locales";
import { Select, MenuItem, ButtonGroup, Typography, Icon } from "@mui/material";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import DeleteForeverTwoToneIcon from "@mui/icons-material/DeleteForeverTwoTone";
import { mesesDelAnio } from "./utils/meses";

export default function RecibosDataGrid({
  empleados,
  selectedPeriodos,
  handleSelectedPeriodos,
  handleFileChange,
  selectedFiles,
  handleLimpiarSeleccion,
}) {
     
  // console.log( selectedFiles );
  const columns = [
    { field: "id", headerName: "ID", width: 150 },
    { field: "col1", headerName: "Legajo", width: 150 },
    { field: "col2", headerName: "Apellido y nombre", width: 150 },

    {
      field: "col3",
      headerName: "Periodo",
      width: 150,
      renderCell: (params) => (
        <Select
          sx={{ width: 150 }}
          value={selectedPeriodos[params.row.id] || ""}
          onChange={(e) => handleSelectedPeriodos(e, params)}
        >
          {mesesDelAnio.map((mes, index) => (
            <MenuItem key={index} value={mes}>
              {mes === "" ? <em>None</em> : mes}
            </MenuItem>
          ))}
        </Select>
      ),
    },
    {
      field: "col4",
      headerName: "Recibos",
      width: 120,
      renderCell: (params) => (
        <>
          <input
            type="file"
            accept=".pdf"
            id={`fileInput-${params.row.id}`} //es importante que esto cambie en cada fila y que coincida con el htmlfor para que asigne un archivo a cada id de empleado.
            onChange={(e) => handleFileChange(e, params.row.id)}
            style={{ display: "none" }}
            required
          />
          <label htmlFor={`fileInput-${params.row.id}`}>
            <ButtonGroup variant="text">
              {selectedFiles[params.row.id] ? (
                <>
                  <Typography variant="body2">
                    {selectedFiles[params.row.id]}
                  </Typography>
                </>
              ) : (
                <Icon
                  sx={{
                    borderRadius: "50%",
                    padding: "0.3rem",
                    ":hover": {
                      backgroundColor: "#00000021",
                      cursor: "pointer",
                    },
                    margin: "auto",
                  }}
                  variant="contained"
                  color="primary"
                >
                  <ZoomInIcon />
                </Icon>
              )}
            </ButtonGroup>
            {/* Necesito poner aca el nombre del archivo si fue seleccionado un archivo */}
          </label>
          {selectedFiles[params.row.id] && (
            <DeleteForeverTwoToneIcon
              sx={{ padding: "0 1rem" }}
              color="success"
              onClick={() => handleLimpiarSeleccion(params.row.id)}
            />
          )}
        </>
      ),
    },
  ];

  // defino filas
  const rows =
    empleados &&
    empleados.map((empleado) => {
      return {
        id: empleado.id,
        col1: empleado.legajo,
        col2: `${empleado.apellido_empleado} ${empleado.nombre_empleado}`,        
      };
    });  

  return (
    <DataGrid
      localeText={esES.components.MuiDataGrid.defaultProps.localeText}
      rows={rows}
      columns={columns}
      columnVisibilityModel={{id: false}}
    />
  );
}
