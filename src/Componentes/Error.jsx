import React from 'react'
import { Box, Typography } from '@mui/material'

export const Error = ({error}) => {
    
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '30rem' }}>
            <Typography variant="body1" color="#000">
                Hubo un error: {<Typography color={'error'}>{error.message ? error.message : error }</Typography>}
            </Typography>
        </Box>
    );
}
