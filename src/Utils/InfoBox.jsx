import React from 'react'
import { Box, Typography } from '@mui/material'

export default function InfoBox({ label, value }) {
  return (
    <Box sx={{ display: 'flex', padding: 1 }}>
        <Typography color="text.primary">
            <Typography variant='caption' component={'span'} sx={{ color: 'text.secondary' }}>{label}</Typography> {value}
        </Typography>
    </Box>
  )
}
