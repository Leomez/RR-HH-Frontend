import { React } from 'react';
import { Box, Typography } from '@mui/material';
// import LoginForm from '../../Servicios/Login/LoginForm';
import logoPersonalTransp from '../../assets/logoPersonalTransp.png';
import computerDead from '../../assets/computer-dead.png'



// import empresaImage from '../../../assets/logoTransp.png';

function NotFound() {

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
                    Error 404 - Sitio no encontrado
                </Typography>

                <Box>
                    <img src={computerDead} alt='Error 404 - Página no encontrada' />
                </Box>
                {/* <LoginForm /> */}
            </Box>
        </div>
    );
}

export default NotFound;