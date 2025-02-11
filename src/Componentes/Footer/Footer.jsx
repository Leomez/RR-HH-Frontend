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
                    <a className={styles.ContactLinks} href="https://wa.me/+5491156592447"><WhatsAppIcon sx={{ color: green[500] }} /> <span>Comunicate por WhatsApp</span></a>
                </Typography>
                <Typography>
                    <a className={styles.ContactLinks} href="mailto:leoariel17@gmail.com"> <EmailIcon /> <span>leoariel17@gmail.com</span> </a> 
                </Typography>
            </Box>
        </div>
    )
}

// export default Footer