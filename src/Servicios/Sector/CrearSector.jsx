import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, TextField, FormControlLabel, Checkbox, Button, Container } from "@mui/material"
import { crearSector } from "../../Redux/Features/Sectores/sectoresSlice"
import { fetchSectores } from "../../Redux/Features/Sectores/sectoresSlice"

export default function CrearSector({ open, setOpen }) {
    const [inputs, setInputs] = useState({
        nombre_sector: ''        
    })

    const userToken = useSelector((state) => state.user.token)
   
    const dispatch = useDispatch()
    function capitalizeFirstLetter(str) {
        if (typeof str !== 'string') {
          str = String(str);
        }      
        if (str.length === 0) {
          return str;
        }      
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
      }

      function handleChange(e) {
        // const { name, value } = e.target;
        setInputs({
            ...inputs,
            [e.target.name]: capitalizeFirstLetter(e.target.value)
        });        
    }   

    const handleCancel = (event) => {
        event.preventDefault();
        setOpen(false);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(crearSector({inputs, userToken}))
        .then(() => {
            dispatch(fetchSectores(userToken))
        })
        // Aquí puedes realizar la lógica para guardar los datos del sector

        setInputs({
            nombre_sector: ''
        });        
        setOpen(false)
    };

    return (<div>
        <Dialog open={open}>
            <DialogTitle>Nuevo Sector</DialogTitle>
            <DialogContent>
                <Container>
                    <Box>
                        <TextField
                            label="Nombre del sector"
                            name="nombre_sector"
                            value={inputs.nombre_sector}
                            onChange={handleChange}
                            variant= "filled"
                            // fullWidth
                        />
                    </Box>                    
                </Container>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleSubmit}>Crear</Button>
                <Button onClick={handleCancel}>Cancelar</Button>
            </DialogActions>
        </Dialog>
    </div>)

}