import React from 'react'
import { Box, Typography, Divider } from '@mui/material'
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import styles from './Footer.module.css'
import { green } from '@mui/material/colors';
export function Footer() {
    return (
        <div className={styles.footerContainer}>
            <Divider />
            <Box className={styles.footer}>
                <Typography variant='body1' sx={{fontWeight: 'bold'}}>
                    Centro de Ojos Quilmes. Recursos Humanos.
                </Typography>
                <Typography>
                    <a className={styles.ContactLinks} href="https://wa.me/+5491160595123"><WhatsAppIcon sx={{ color: green[500] }} /> <span>Comunicate por WhatsApp</span></a>
                </Typography>
                <Typography>
                    <a className={styles.ContactLinks} href="mailto:alexia@centrodeojosquilmes.com.ar"> <EmailIcon /> <span>alexia@centrodeojosquilmes.com.ar</span> </a> 
                </Typography>
            </Box>
        </div>
    )
}

// export default Footer