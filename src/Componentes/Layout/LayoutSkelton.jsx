import { Box, Skeleton, Grid } from '@mui/material'
import React from 'react'

export default function LayoutSkelton() {
    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={12} md={3}>
                    <Box boxShadow={3} sx={{ height: '100%' }}>
                        <Skeleton variant="rectangular" width={'100%'} height={'100%'} />
                    </Box>
                </Grid>
                <Grid item xs={12} md={9}>
                    <Box boxShadow={3} sx={{ height: '100%' }}>
                        <Skeleton variant="rectangular" width={'100%'} height={'100%'} />
                    </Box>
                </Grid>
                <Grid item xs={12} sm={4} md={4}>
                    <Box boxShadow={3} sx={{ height: '100%' }}>
                        <Skeleton variant="rectangular" width={'100%'} height={'100%'} />
                    </Box>
                </Grid>
                <Grid item xs={12} sm={4} md={4}>
                    <Box boxShadow={3} sx={{ height: '100%' }}>
                        <Skeleton variant="rectangular" width={'100%'} height={'100%'} />
                    </Box>
                </Grid>
                <Grid item xs={12} sm={4} md={4}>
                    <Box boxShadow={3} sx={{ height: '100%' }}>
                        <Skeleton variant="rectangular" width={'100%'} height={'100%'} />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}
