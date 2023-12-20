/* eslint-disable react/prop-types */
import { useSelector, useDispatch } from "react-redux";
// import { useState, useEffect } from "react";
import { Snackbar, Alert } from "@mui/material";
import { hideAlert, selectAlert } from "../../Redux/Features/Alerta/alertaSlice"

export default function Alerta() {  
  // const [alertOpen, setAlertOpen] = useState(open);  
const { open, type, message } = useSelector(selectAlert)
console.log(open, type, message);
const dispatch = useDispatch()
  // useEffect(() => {
  //   setAlertOpen(open);
  // }, [open]);

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(hideAlert())
    // setAlertOpen(false);
    // onClose(); // Llama a la función de cierre proporcionada por el padre
  };

  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={handleAlertClose}>
      <Alert onClose={handleAlertClose} severity={type} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
