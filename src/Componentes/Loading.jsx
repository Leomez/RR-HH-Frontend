import React from 'react'
import { CircularProgress, Card } from '@mui/material'

function Loading() {
    return (
        <Card sx={{
            width: '100px',
            height: '100px', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            backgroundColor: 'transparent'
        }}>
            <CircularProgress variant='indeterminante' />
        </Card>
    )

}

export default Loading