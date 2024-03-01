import { CircularProgress } from "@mui/joy";

import { Dialog } from "@mui/material";
import { useSelector } from "react-redux";


export default function LoadingPage() {
    const loading = useSelector(state => state.loading)
    return (
        <Dialog open= {loading} sx={{
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