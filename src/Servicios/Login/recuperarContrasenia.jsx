import React, { useState } from "react";
import { Box, Typography, TextField, Button, Alert } from "@mui/material";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

function RecuperarContrasenia({ handleModal }) {
  const auth = getAuth();
  const [email, setEmail] = useState(""); // Inicializar el estado
  const [helperText, setHelperText] = useState(false);
  const [correoEnviado, setCorreoEnviado] = useState(false);

  async function handleRecuperar() {
    if (!email) {
      console.log("El email no puede estar vacío");
      setHelperText("El email no puede estar vacío");
      return;
    }
    if (!email.includes("@")) {
      console.log("El email no es válido");
      setHelperText("El email no es válido");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      console.log("Correo enviado");
      setCorreoEnviado(true);
      setHelperText(false);

    } catch (error) {
      console.log(error);
      setHelperText('Error al enviar el correo: Usuario no encontrado');
    }    
  }

  const handleClose = () => {
    setEmail("");
    setHelperText(false);
    setCorreoEnviado(false);
    handleModal({ open: false, opcion: "login" });
  };

  return (
    <Box zIndex={10}>
      <Typography variant="h4">Recuperar contraseña</Typography>
      {!correoEnviado ?
        <TextField
          id="email"
          name="email"
          label="Email"
          type="email"
          error={helperText}
          helperText={helperText}
          fullWidth
          variant="outlined"
          margin="normal"
          value={email} // Controlado por el estado
          onChange={(e) => setEmail(e.target.value)} // Actualizar el estado
        /> :
        <Alert severity="success">Revisa tu correo para restablecer tu contraseña</Alert>
      }
      <Box textAlign="center">
        {correoEnviado ?
          <Button variant="contained" color="primary" onClick={handleClose}>
            Cerrar
          </Button> :
          <Button variant="contained" color="primary" onClick={handleRecuperar}>
            Recuperar contraseña
          </Button>
        }
      </Box>
    </Box>
  );
}

export default RecuperarContrasenia;
