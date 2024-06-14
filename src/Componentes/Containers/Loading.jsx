import { CircularProgress } from "@mui/joy";
import { Dialog } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";


export default function LoadingPage({loading}) {
    
    const [close, setClose] = useState(false)
    
    const handleCancel = () => {
        setClose(true)
    }
    
    return (
        <Dialog onClose={handleCancel} open= {close ? false : loading} sx={{
            "& .MuiDialog-paper": {
                backgroundColor: "transparent",
                boxShadow: "none" 
            }
        }} >
            <CircularProgress variant="solid"
                sx={{
                    "--CircularProgress-size": "100px",
                    "--CircularProgress-trackThickness": "3px",
                    "--CircularProgress-progressThickness": "3px"
                  }}
            />
        </Dialog>

    )
}