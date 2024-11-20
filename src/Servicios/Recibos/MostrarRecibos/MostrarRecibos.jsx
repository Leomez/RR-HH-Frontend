import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import PictureAsPdfRoundedIcon from "@mui/icons-material/PictureAsPdfRounded";
import { getRecibos } from "../../../Redux/Features/Recibos/recibosDeSueldoSlice";
import CustomNoRowsOverlay from "../../../Utils/NoRows";
import FirmaModal from "../../../Componentes/Containers/FirmaModal";

export default function MostrarRecibos() {
  const dispatch = useDispatch();
  const userToken = useSelector((state) => state.user.token)
  const empleadoActual = useSelector((state) => state.empleado.empleadoActual);
  const recibos = useSelector((state) => state.recibos.recibos);
  const [open, setOpen] = useState(false);
  const [recibo, setRecibo] = useState({});

  useEffect(() => {
    empleadoActual && dispatch(getRecibos({id: empleadoActual.id, token: userToken}));
  }, [dispatch, empleadoActual]);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {    
    setOpen(false);
    window.location.reload();
  };

  async function handleRowClick(params) {
    console.log(params.row.id);

    try {
      const archivoBase64 = recibos.filter(
        (recibo) => recibo.id === params.row.id
      )[0];
      // console.log(archivoBase64);
      setRecibo({
        id: params.row.id,
        archivo: archivoBase64.archivo,
        nombre: archivoBase64.url_archivo,
        estado: archivoBase64.estado
      });
      handleOpen();
    } catch (error) {
      console.error("Error al cargar el PDF:", error);
    }
  }

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "fecha", headerName: "Fecha", width: 80 },
    {
      field: "nombre",
      headerName: "Nombre",
      width: 250,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <PictureAsPdfRoundedIcon
            style={{ marginRight: "5px" }}
            color="primary"
          />
          {params.value}
        </div>
      ),
    },
    { field: "monto", headerName: "Monto", width: 100 },
    { field: "estado", headerName: "Estado", width: 100 },
    { field: "fecha_de_firma", headerName: "Fecha de Firma", width: 100 },
  ];

  const rows = recibos
    ? recibos.map((recibo) => ({
        id: recibo.id,
        fecha: recibo.periodo,
        nombre: recibo.nombre_archivo,
        monto: recibo.monto || "N/D",
        estado: recibo.estado,
        fecha_de_firma: recibo.fecha_firma || "N/D",
      }))
    : [];

  return (
    <Box>
      <DataGrid
        autoHeight
        sx={{ "--DataGrid-overlayHeight": "300px" }}
        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        rows={rows}
        columns={columns}
        pageSize={5}
        columnVisibilityModel={{ id: false }}
        slots={{ noRowsOverlay: CustomNoRowsOverlay }}
        onRowClick={(params) => {
          handleRowClick(params);
        }}
      />
      <FirmaModal open={open} handleClose={handleClose} recibo={recibo} />
    </Box>
  );
}
