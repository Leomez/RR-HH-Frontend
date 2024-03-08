import React from 'react'
import { Avatar, Box, Card, Skeleton } from '@mui/material'

function PerfilSkeleton() {
    
    return (
        <Box>
            <Card>
                <Box>
                    <Skeleton variant='text' sx={{ position: "relative", top: 0, left: 0, margin: "8px" }} />
                </Box>
                <Box
                    sx={{ padding: "30px", display: "flex", justifyContent: "center" }}
                >
                    <Skeleton variant='circular'>
                        <Avatar
                            sx={{ border: `2px solid #37db34` }}
                        />
                    </Skeleton>
                </Box>
                <Skeleton variant='rectangular' width={210}/>
            </Card>
        </Box>
    )
}

export default PerfilSkeleton