// renderCell.js
import React from 'react';
import { Select, MenuItem, Button, Typography } from "@mui/material";
import { mesesDelAnio } from "../utils/meses";
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import { ButtonGroup, Icon } from '@mui/material';
import style from './renderCell.module.css'



const selectorPeriodo = (props) => {
    const { handleSelectedPeriodos, mesSeleccionado, params } = props;
    return (
        <Select
            // sx={{ width: 150, border: "GrayText 1px solid", backgroundColor: "white" }}
            variant='standard'
            className={style.selectPeriodo}
            value={mesSeleccionado[params.id] || 'none'}
            onChange={(e) => handleSelectedPeriodos(e, params)}
        >
            <MenuItem value="">
                <em>sin dato</em>
            </MenuItem>
            {mesesDelAnio.map((mes, index) => (
                <MenuItem key={index} value={mes}>
                    {mes}
                </MenuItem>
            ))}
        </Select>
    );
};



const selectorArchivo = (props) => {
    const { 
        params, 
        handleFileChange, 
        handleLimpiarSeleccion, 
        archivoSeleccionado 
    } = props;

    // console.log(params);
    const handleButtonClick = (params) => {        
        document.getElementById(`fileInput-${params.row.id}`).click();
    };
    return (
        <>
            <input
                type="file"
                accept=".pdf"
                id={`fileInput-${params.row.id}`} //es importante que esto cambie en cada fila y que coincida con el htmlfor para que asigne un archivo a cada id de empleado.
                onChange={(e) => handleFileChange(e, params.row.id)}
                // style={{ display: "none" }}
                className={style.inputArchivo}
                required
            />            
            {archivoSeleccionado[params.row.id] ? 
                <ButtonGroup variant="text">
                    <Typography variant="body2">
                        {archivoSeleccionado[params.row.id]}
                    </Typography>
                    <DeleteForeverTwoToneIcon
                        // sx={{ padding: "0 .5rem", ':hover': {cursor: 'pointer'},  }}
                        className={style.deleteButton}
                        color="success"
                        onClick={() => handleLimpiarSeleccion(params.row.id)}
                    />
                </ButtonGroup> : <label htmlFor={`fileInput-${params.row.id}`}>
                <Button onClick={handleButtonClick}>cargar</Button>
            </label>
            }
        </>
    )
}

export { selectorPeriodo, selectorArchivo };
