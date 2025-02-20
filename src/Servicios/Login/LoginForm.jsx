import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { getAuth, onIdTokenChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Divider, Typography, Modal, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { FcGoogle } from 'react-icons/fc';
import { loginUser, refreshUserToken, logoutUser } from '../../Redux/Features/Login/userSlice';
import { loginConGoogle } from './loginConGoogle';
import loginConUsuYCont from './loginConUsuarioYContrasenia';

// import { startCountdown } from './startCountdown';

function LoginForm({ handleModal }) {  

  const [input, setInput] = useState({ usuario: '', password: '' });
  const [usuario, setUsuario] = useState({});
  const [authError, setAuthError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [countDown, setCountDown] = useState(60);
  const [showPassword, setShowPassword] = useState({ password: false });
  

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onIdTokenChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken();
        const { exp } = JSON.parse(atob(token.split('.')[1]));
        const expirationTime = exp * 1000 - Date.now() - 60000;

        setTimeout(() => {
          setShowModal(true);
          startCountdown();
        }, expirationTime);
      }
    });

    return () => unsubscribe();
  }, []);

  const startCountdown = useCallback(() => {
    const countdownTimer = setInterval(() => {
      setCountDown((prevCount) => {
        if (prevCount <= 1) {
          clearInterval(countdownTimer);
          handleLogout();
        }
        return prevCount - 1;
      });
    }, 1000);
  }, []);

  const handleLogout = useCallback(() => {
    dispatch(logoutUser());
    navigate('/login', { replace: true });
    setShowModal(false);
  }, [dispatch, navigate]);

  const handleRenovarSesion = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      const newToken = await user.getIdToken(true);
      dispatch(refreshUserToken(newToken));
      setShowModal(false);
      setCountDown(60);
    }
  };


  const handleTogglePasswordVisibility = (field) => {
    setShowPassword((prevShowPassword) => ({
      ...prevShowPassword,
      [field]: !prevShowPassword[field]
    }));
  };

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleAlert = useCallback((error) => {
    setAuthError(!error);
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const usuario = await loginConUsuYCont(input);
    setUsuario(usuario);
    handleAlert(usuario.success);

    if (usuario.success) {
      dispatch(loginUser(usuario));
      handleModal({ open: false });
      navigate('/', { replace: true });
    }
    setInput({ usuario: '', password: '' });
  };

  const handleLoginConGoogle = async () => {
    const usuario = await loginConGoogle();
    dispatch(loginUser(usuario));
    navigate('/', { replace: true });
    handleModal({ open: false });
  };

  const handleRegistrarse = (e) => {
    e.preventDefault();
    navigate('/registrarse', { replace: true });
    handleModal({ open: false });
  };
  

  return (
    <Box>
      {/* <Modal open={showModal} onClose={handleLogout}>
        <Box sx={{ p: 2, backgroundColor: 'white', borderRadius: '8px', boxShadow: 24 }}>
          <Typography>Tu sesión expirará en {countDown} segundos</Typography>
          <Button onClick={handleRenovarSesion} variant="contained">Renovar sesión</Button>
          <Button onClick={handleLogout} variant="outlined">Cerrar sesión</Button>
        </Box>
      </Modal> */}
      <Box component="form" onSubmit={handleFormSubmit} sx={{ mt: 2 }}>
        <TextField
          error={authError && (usuario.errorCode === "auth/user-not-found" || usuario.errorCode === "auth/invalid-email")}
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
          type={showPassword.password ? "text" : "password"}
          value={input.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => handleTogglePasswordVisibility('password')}
                  edge="end"
                >
                  {showPassword.password ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        
        <Button sx={{ color: 'red', fontSize: '0.75rem', textAlign: 'center' }} onClick={() => handleModal({open: true, opcion: 'recuperar'})}>
          ¿Olvidaste tu contraseña?
        </Button>

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
