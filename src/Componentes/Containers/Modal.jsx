import React, { useState } from "react";
import { Box, Dialog, Modal } from "@mui/material";

export default function ModalCustom({openModal, children}) { 
    // const [open, setOpen] = useState(openModal)  
    const handleClose = () => setOpen(!openModal);
    return (
        <Modal open={openModal}>
            <Box padding={'3rem'}>
                {children}
            </Box>
        </Modal>
    )

}