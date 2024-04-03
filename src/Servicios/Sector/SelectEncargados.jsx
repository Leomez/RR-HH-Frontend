import React, { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { crearSupervisor } from '../../Redux/Features/Supervisor/supervisorSlice';

function SelectEncargados(props) {
    const { onClose, value: valueProp, open, empleados, sector, ...other } = props;
    const [value, setValue] = useState({id: null, nombre: valueProp});
    const radioGroupRef = useRef(null);
    const dispatch = useDispatch()
    const sinEncargado = {
        id: 0,
        nombre_empleado: 'Sin encargado',
        apellido_empleado: ''
    }
    
    useEffect(() => {
        if (!open) {
            setValue(valueProp);
        }
    }, [valueProp, open]);
    
    const handleEntering = () => {
        if (radioGroupRef.current != null) {
            radioGroupRef.current.focus();            
        }
    };

    const handleCancel = () => {
        onClose();
    };

    const handleOk = () => {
        if (value.nombre.includes('Sin encargado')) {
            console.log('no seleccione encargado');
            onClose(value.nombre);
        } else {
            dispatch(crearSupervisor({empleadoId: value.id, sectorId: sector.id}))
            onClose(value.nombre);
        }
    };

    const handleChange = (event) => {
        // console.log(event.target.value);
        const e = empleados.filter(e => e.id === event.target.value)[0] || sinEncargado
        // console.log(e);
        setValue({id: e.id, nombre: `${e.nombre_empleado} ${e.apellido_empleado}`});               
    };    

    return (
        <Dialog
            maxWidth="xs"
            TransitionProps={{ onEntering: handleEntering }}
            open={open}
            {...other}
        >
            <DialogTitle>
                Seleccionar encargado:
            </DialogTitle>
            <DialogContent dividers>
                <RadioGroup
                    ref={radioGroupRef}
                    name="empleado"
                    value={value} 
                    onChange={handleChange}
                >
                    {
                        [sinEncargado,...empleados].map(e => (
                            <FormControlLabel
                                value={e.id} 
                                key={e.id}
                                control={<Radio />}
                                label={`${e.nombre_empleado} ${e.apellido_empleado}`}
                                checked={value.id === e.id}
                            />
                        ))
                    }
                </RadioGroup>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleCancel}>
                    Cancelar
                </Button>
                <Button onClick={handleOk}>
                    Seleccionar
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default SelectEncargados;
