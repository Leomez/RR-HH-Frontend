import { Box, Card } from "@mui/material";
import React from "react";
import Header from "./Header";

export default function CardComponent({ titulo, link, children, footer }) {
    return (
        <Box sx={{ height: 'inherit' }}>
            <Card sx={{ height: 'inherit', borderTop: '#1976d2 3px solid' }}>
                <Box
                    display={"flex"}
                    flexDirection={'column'}
                    position="absolutate"
                >
                    <Box>
                        <Header titulo={titulo} link={link} />
                    </Box>
                    <Box minHeight={'10rem'}>
                        {children}
                    </Box>
                    <Box
                        position={'relative'}
                        maxHeight={'3rem'}
                        top={0}
                        >
                        <hr />
                        {footer}
                    </Box>
                </Box>
            </Card>
        </Box>
    )
}