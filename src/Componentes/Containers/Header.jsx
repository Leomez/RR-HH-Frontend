import { Box, Typography } from "@mui/material";
import {React} from "react";


export default function Header(props){
    const {titulo, link} = props;

    return(
        <Box sx={{display: "flex", padding: '0.5rem', justifyContent: "space-between", borderBottom: "1px inset grey"}}>
            <Typography variant="caption">{titulo}</Typography>
            <Typography variant="caption">{link}</Typography>
        </Box>
    )

}