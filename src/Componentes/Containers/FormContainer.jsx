import { React, useState } from "react";
import { Box, Container, Typography, Button } from "@mui/material";
import ExpandMoreSharpIcon from '@mui/icons-material/ExpandMoreSharp';

function FormContainer({ titulo, children }) {

    const [expanded, setExpanded] = useState(true)
    const handleExpand = () => {
        setExpanded(!expanded)
    }

    return (
        <div id="FormContainer">
            <Container sx={{ mb: '2rem' }}>
                <Box position={"relative"} display={"flex"} alignItems="center" >
                    <Typography
                        variant="button"
                        sx={{
                            fontSize: { xs: "0.7rem" },
                            position: "absolute",
                            top: "-10px",
                            left: "0.5rem",
                            zIndex: 1,
                            bgcolor: "#ffffff",
                            px: "4px",
                            // paddingRight: "0.5rem"
                        }}
                    >
                        {titulo}
                        <Button onClick={handleExpand} sx={{
                            minWidth: '25px',
                            maxWidth: '25px',
                            "&:focus": {
                                outline: "none",
                            },
                        }}>
                            <ExpandMoreSharpIcon sx={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                        </Button>
                    </Typography>
                </Box>
                {expanded &&
                    <Box
                        padding={"2rem"}
                        sx={{
                            border: "2px groove rgba(0,2,3,0.35)",
                            borderRadius: "5px",
                            position: "relative"
                        }}
                    >
                        {children}
                    </Box>
                }
            </Container>
        </div>
    )
}

export default FormContainer;