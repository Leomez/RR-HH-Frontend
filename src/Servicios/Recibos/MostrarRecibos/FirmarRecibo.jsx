/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actualizarReciboFirmado } from "../../../Redux/Features/Recibos/recibosDeSueldoSlice";
import {
  Box,
  Button,
  Collapse,
  Typography,
} from "@mui/material";
import insertarFirma from "../../../Utils/InsertarFirma";
import FaFileSignature from "@meronex/icons/fa/FaFileSignature";
import IosArrowUp from "@meronex/icons/ios/IosArrowUp";
import AiFillEdit from "@meronex/icons/ai/AiFillEdit";
import AiFillDelete from "@meronex/icons/ai/AiFillDelete";
import { Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import SignatureCanvas from "react-signature-canvas";

const PanelDeFirma = ({ pdfBase64, handleClose }) => {
  const [firmaLocal, setFirmaLocal] = useState(null);
  const [srcRecibo, setSrcRecibo] = useState(pdfBase64.archivo);
  const [urlRecibo, setUrlRecibo] = useState(null);
  const [mostrarFirma, setMostrarFirma] = useState(false);
  const [recibo, setRecibo] = useState(null);
  const [mostrarCanvaFirma, setMostrarCanvaFirma] = useState(null);
  const [habilitarEnvio, setHabilitarEnvio] = useState(false);
  const userToken = useSelector((state) => state.user.token)
  const firmaRef = useRef();
  const dispatch = useDispatch();
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  useEffect(() => {
    if (pdfBase64.estado === "Sin firmar") {
      setMostrarCanvaFirma(true);
    } else {
      setMostrarCanvaFirma(false);
    }
  }, []);
  console.log(mostrarCanvaFirma);
  const cargarArchivo = async () => {
    if (srcRecibo instanceof Blob) {
      const pdfUrl = URL.createObjectURL(srcRecibo);
      setUrlRecibo(pdfUrl);
      console.log("Firmado ==> " + srcRecibo.type);
      // const archivoBase64 = await blobToBase64(srcRecibo);
      const archivo = new File([srcRecibo], pdfBase64.nombre, {
        type: srcRecibo.type,
      });
      setRecibo({
        id: pdfBase64.id,
        archivo: archivo,
      });
    } else if (typeof srcRecibo === "string") {
      setUrlRecibo(`data:application/pdf;base64,${srcRecibo}`);
      setRecibo(null);
    } else {
      console.error("Formato no compatible para srcRecibo");
    }
  };

  const limpiarFirma = () => {
    const firmaCanvas = firmaRef.current;
    firmaCanvas.clear();
    setFirmaLocal(null);
    setSrcRecibo(pdfBase64.archivo);
    setHabilitarEnvio(false);
  };

  const handleFirmar = async () => {
    setSrcRecibo(await insertarFirma(srcRecibo, firmaLocal));
    setHabilitarEnvio(true);
  };

  const toggleMostrarFirma = () => {
    setMostrarFirma(!mostrarFirma);
  };

  const handlerEnviar = () => {
    // console.log(recibo);
    dispatch(actualizarReciboFirmado({recibo, token: userToken}));
    handleClose()
  };

  useEffect(() => {
    cargarArchivo();
  }, [srcRecibo]);

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Box
        sx={{
          display: !mostrarCanvaFirma ? "none" : "flex",
          margin: "auto",
          width: "100%",
          textAlign: "center",
        }}
      >
        <Button
          variant={!mostrarFirma && "outlined"}
          onClick={toggleMostrarFirma}
          sx={{
            // mt: 1,
            // mb: 1,
            margin: "2px",
            padding: !mostrarFirma ? "6px 10px" : "6px",
            minWidth: 0,
            alignItems: "baseline",
            ":focus": { outline: "none" },
            // ":hover": { border: "1px solid skyblue" }
          }}
        >
          {mostrarFirma ? (
            <IosArrowUp />
          ) : (
            <span style={{ display: "flex", marginInline: "0.5rem" }}>
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "1rem",
                  margin: "auto",
                  paddingInline: "0.5rem",
                }}
              >
                <FaFileSignature />
              </span>
              <Typography variant="body2"> Firmar</Typography>
            </span>
          )}
        </Button>
        <Collapse in={mostrarFirma} sx={{ textAlign: "-webkit-center" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "row",
              maxWidth: "fit-content",
              mt: 1,
              zIndex: 3,
            }}
          >
            <SignatureCanvas
              ref={firmaRef}
              penColor="black"
              minWidth={0.3}
              maxWidth={1.5}
              canvasProps={{
                width: 200,
                height: 100,
                style: { border: "1px solid black", borderRadius: "3px" },
              }}
              onEnd={() => {
                setFirmaLocal(firmaRef.current.toDataURL());
              }}
            />
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Button
                variant="text"
                onClick={handleFirmar}
                sx={{
                  width: "2rem",
                  marginY: "0.2rem",
                  minWidth: "2rem",
                  borderRadius: "50%",
                  outline: "none",
                  ":hover": { backgroundColor: "#eee" },
                  ":focus": { outline: "none" },
                }}
              >
                <AiFillEdit />
              </Button>
              <Button
                variant="text"
                onClick={limpiarFirma}
                sx={{
                  width: "2rem",
                  marginY: "0.2rem",
                  minWidth: "2rem",
                  borderRadius: "50%",
                  ":hover": { backgroundColor: "#eee" },
                  ":focus": { outline: "none" },
                }}
              >
                <AiFillDelete />
              </Button>
            </Box>
          </Box>
          <Button
            disabled={!habilitarEnvio}
            onClick={handlerEnviar}
            sx={{ ":focus": { outline: "none" } }}
          >
            Enviar
          </Button>
        </Collapse>
      </Box>
      <Box
        sx={{
          margin: "auto",
          width: "100%",
          textAlign: "center",
          boxSizing: "border-box",
          borderBottom: "2px solid black",
        }}
      >
        <Box
          id={"visor"}
          sx={{
            display: "flex",
            height: "auto",
            width: "100%",
            overflow: "auto",
            maxHeight: mostrarFirma ? "50vh" : "70vh",
          }}
        >
          {pdfBase64.archivo && urlRecibo && (
            <Viewer
              fileUrl={urlRecibo}
              defaultScale={1}
              plugins={[defaultLayoutPluginInstance]}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default PanelDeFirma;
