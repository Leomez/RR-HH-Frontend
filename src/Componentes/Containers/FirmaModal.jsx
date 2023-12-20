/* eslint-disable react/prop-types */
import { Box, Modal, Typography } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
// import MyPdfSigner from "../../Utils/renderPDF";
import PanelDeFirma from "../../Servicios/Recibos/MostrarRecibos/FirmarRecibo";


export default function FirmaModal({open, handleClose, recibo}) {
    return (
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby={"tituloModal"}
        aria-describedby={"FirmaContainer"}
        sx={{display: "flex", flexDirection: "column"}}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            pt: 2,
            px: 4,
            pb: 3,
            // height: "auto"
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography id={"tituloModal"} variant="h5">
              Firmar Documento
            </Typography>
            <Box onClick={handleClose} sx={{ color: 'coral', ":hover":{color: 'crimson'}}}>
              <CancelIcon />
            </Box>
          </Box>
          <Box
            sx={{
              // padding: '2rem',
              // height: "80vh",
              margin: "1rem",
              border: "solid 1px grey",
              borderRadius: "3px",
            }}
            id={"FirmaContainer"}
          >
            {/* <FirmaContainer recibo={recibo} /> */}
            {/* <MyPdfSigner pdfBase64={recibo} /> */}
            <PanelDeFirma handleClose={handleClose} pdfBase64={recibo}/>
          </Box>
        </Box>
      </Modal>
    )
}