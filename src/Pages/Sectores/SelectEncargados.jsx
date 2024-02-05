import { React, useEffect, useState, useRef } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, RadioGroup, FormControlLabel, Radio } from '@mui/material';


function SelectEncargados(props) {
    const { onClose, value: valueProp, open, empleados, ...other } = props;
    const [value, setValue] = useState(valueProp);
    const radioGroupRef = useRef(null);

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
        onClose(value);
    };

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const sinEncargado = {
        id: 0,
        nombre_empleado: 'Sin encargado',
        apellido_empleado: ''
    }

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
    )
}

export default SelectEncargados