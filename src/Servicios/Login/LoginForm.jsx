import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Divider, Typography } from '@mui/material';
import { FcGoogle } from 'react-icons/fc'
import { loginUser } from '../../Redux/Features/Login/userSlice';
import { loginConGoogle } from './loginConGoogle';
import loginConUsuYCont from './loginConUsuarioYContrasenia';


function LoginForm(props) {
  // eslint-disable-next-line react/prop-types
  const { handleModal } = props
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [input, setInput] = useState({
    usuario: '',
    password: ''
  })
  const [usuario, setUsuario] = useState({})
  const [authError, setAuthError] = useState(false);

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  };

  const handleAlert = (error) => {
    setAuthError(!error);
  };

  // const f = new FormData

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const usuario = await loginConUsuYCont(input)
    setUsuario(usuario)
    handleAlert(usuario.success)

    if (usuario.success) {
      dispatch(loginUser(usuario))
      handleModal()
      navigate('/', { replace: true })
    }
    setInput({
      usuario: '',
      password: ''
    })
  };

  const handleLoginConGoogle = async () => {
    const usuario = await loginConGoogle()
    dispatch(loginUser(usuario))
    handleModal()
    navigate('/', { replace: true })
  };

  const handleRegistrarse = (e) => {
    e.preventDefault()
    navigate('/registrarse', { replace: true })
    handleModal()
  }

  return (
    <Box>
      <Box component="form" onSubmit={handleFormSubmit} sx={{ mt: 2 }}>
        <TextField
          error={(authError && usuario.errorCode === "auth/user-not-found") || (authError && usuario.errorCode === "auth/invalid-email")}
          helperText={authError && usuario.errorCode === "auth/user-not-found" ? "Usuario no encontrado" : authError && usuario.errorCode === "auth/invalid-email" ? "Correo incorrecto" : ''}
          name='usuario'
          label="Usuario"
          value={input.usuario}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <TextField
          error={authError && usuario.errorCode === "auth/wrong-password"}
          helperText={authError && usuario.errorCode === "auth/wrong-password" ? "Contraseña incorrecta" : ''}
          name='password'
          label="Contraseña"
          type="password"
          value={input.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Box sx={{ display: 'flex', padding: '1.5rem 0.5rem', justifyContent: 'space-between' }}>
          <Button sx={{ width: '9rem' }} type="submit" variant="contained" fullWidth>
            Iniciar sesión
          </Button>
          <Button onClick={handleRegistrarse} sx={{ width: '9rem' }} type="submit" variant='outlined' fullWidth>
            Registrarse
          </Button>
        </Box>

        <Divider> O ingresa con </Divider>

        <Box sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-evenly',
          alignContent: 'center',
          marginBottom: '1rem',
          padding: '2rem 0'
        }}>
          <Button
            onClick={handleLoginConGoogle}
            sx={{
              border: '1px solid rgb(180,180,255)',
              width: { xs: '100%', md: '70%' },
              display: 'flex',
              justifyContent: 'space-around'
            }}
            id='google'
          >
            <FcGoogle style={{
              width: '2rem',
              height: '2rem',
              justifySelf: 'flex-start'
            }} />
            <Typography sx={{
              fontSize: '0.75rem',
              letterSpacing: '2px',
            }}>
              Ingresar con Google
            </Typography>
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default LoginForm;
