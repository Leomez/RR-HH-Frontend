import React, { useState } from 'react'
import { Typography, Box, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material'

function ModalEvent(selectedEvent) {
    const [open, setOpen] = useState(Boolean(selectedEvent))
    // const [selectedEvent, setSelectedEvent] = useState(event)
    const handleClose = () => setOpen(null)

    return (
        <>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Detalles del Evento</DialogTitle>
                {selectedEvent && (
                    <DialogContent>
                        <DialogContentText>
                            <strong>Título:</strong> {selectedEvent.title}
                        </DialogContentText>
                        <DialogContentText>
                            <strong>Estado:</strong> {selectedEvent.estado}
                        </DialogContentText>
                        <DialogContentText>
                            <strong>Inicio:</strong> {dayjs(selectedEvent.start).format('LLL')}
                        </DialogContentText>
                        <DialogContentText>
                            <strong>Fin:</strong> {dayjs(selectedEvent.end).format('LLL')}
                        </DialogContentText>
                    </DialogContent>
                )}
                <DialogActions>
                    <Button onClick={handleClose}>Cerrar</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ModalEvent

