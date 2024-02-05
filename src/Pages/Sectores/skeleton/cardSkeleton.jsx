import React from 'react'
import { Card, Skeleton } from '@mui/material'
export default function CardSkeleton() {
  return (
    <Card sx={{margin: '0.5rem', padding: '0.5rem', maxWidth: '300px'}}>
      {/* For variant="text", adjust the height via font-size */}
      <Skeleton variant="text" sx={{ fontSize: '1rem', m: 1 }} />
      {/* For other variants, adjust the size with `width` and `height` */}
      <Skeleton variant="circular" width={40} height={40} sx={{m:1}} />
      <Skeleton variant="rectangular" width={200} height={60} sx={{m:1}} />
      <Skeleton variant="rounded" width={200} height={60} sx={{m:1}} />
    </Card>
  )
}
