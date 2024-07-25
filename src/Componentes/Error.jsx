import React from 'react'
import { Box, Typography, Card } from '@mui/material'

export const Error = ({ error }) => {
    console.log(error, 'error el el componente error')
    return (
        <Card >
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '30rem' }}>
                <Box sx={{ margin: 'auto' }}>
                    <Typography variant="h5" >Hubo un error</Typography>
                    <Typography variant="body1" color="#000">
                        <Typography color={'error'}>{error.status}</Typography>
                        <Typography>{error.data.message}</Typography>
                    </Typography>
                </Box>
            </Box>
        </Card>
    );
}
