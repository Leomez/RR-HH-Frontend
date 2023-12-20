import { React, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
// import LoginForm from '../../Servicios/Login/LoginForm';
import { resetConexion } from '../../Redux/Features/Login/userSlice';
import logoPersonalTransp from '../../assets/logoPersonalTransp.png'



// import empresaImage from '../../../assets/logoTransp.png';

function LoginPage() {

useEffect(() => {
    resetConexion()
}, [])
    // 
    return (
        <div id='loginPage'>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '100vh',
                    pl: '4rem'
                }}
            >
                <Box sx={{ textAlign: 'center', mb: 2 }}>
                    <img style={{ minWidth: '30vw' }} src={logoPersonalTransp} alt="Centro de ojos - Recursos Humanos" />
                </Box>
                <Typography variant="body1" sx={{ mb: 2 }}>
                    Por favor, iniciá sesion para acceder a tu cuenta
                </Typography>
                {/* <LoginForm /> */}
            </Box>
        </div>
    );
}

export default LoginPage;