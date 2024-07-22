import { Box, TextField, Button, Typography, Modal, Card } from "@mui/material";
import { validarEmail, validarPassword } from "./Validaciones";
import { useSelector, useDispatch } from "react-redux";
import { registrarUser } from "../../Redux/Features/Login/userSlice";
import { useState } from "react";
import { ModalDeRespuesta } from "./ModalDeRespuesta";


const textFildStyle = {
    marginBottom: '1rem'
}

function Registrarse() {
    const dispatch = useDispatch()    
    const nuevoUsuario = useSelector(state => state.user.nuevoUsuario)
    const cargando = useSelector(state => state.loading)
    const [open, setOpen] = useState(false)
    const [input, setInput] = useState({
        email: '',
        password: '',
        confPassword: ''
    });

    const [errors, setErrors] = useState({
        email: false,
        password: false,
        confPassword: false
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setInput((prevInput) => ({
            ...prevInput,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const emailValid = validarEmail(input.email);
        const passwordValid = validarPassword(input.password);

        setErrors({
            email: !emailValid,
            password: !passwordValid,
            confPassword: input.password !== input.confPassword
        });

        if (emailValid && passwordValid && input.password === input.confPassword) {
            // Realizar el registro o mostrar mensajes de éxito aquí
            console.log(input);
            dispatch(registrarUser(input))
            setInput({
                email: '',
                password: '',
                confPassword: ''
            })
            setOpen(!open)
        }
    };

    return (
        <>
            <Box
                position={'relative'}
                right='1rem'
            >
                <Box textAlign={'center'} margin={'2rem'} >
                    <Typography variant="h4">
                        Registrase
                    </Typography>
                </Box>
                <Box

                    border={'ActiveBorder 1px solid'}
                    borderRadius='10px'
                    padding={3}
                >
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{ width: { md: '50%', sx: '90%' }, margin: 'auto', paddingTop: '2rem' }}
                    >
                        <TextField
                            sx={textFildStyle}
                            helperText={errors.usuario ? 'Ingresa un email válido' : 'Ingresa el email que proporcionaste en recursos humanos. Si no lo recuerdas, puedes pedírselo a tu encargado'}
                            variant='filled'
                            name="email"
                            label="Email"
                            value={input.email}
                            onChange={handleInputChange}
                            fullWidth
                            color={errors.email ? "error" : "primary"}
                            error={errors.email}
                        />

                        <TextField
                            sx={textFildStyle}
                            helperText={errors.password ? 'La contraseña debe tener al menos 6 caracteres' : 'Debe tener al menos 6 caracteres'}
                            variant='filled'
                            name="password"
                            label="Contraseña"
                            type="password"
                            value={input.password}
                            onChange={handleInputChange}
                            fullWidth
                            color={errors.password ? "error" : "primary"}
                            error={errors.password}
                        />

                        <TextField
                            sx={textFildStyle}
                            helperText={errors.confPassword ? 'Las contraseñas no coinciden' : null}
                            variant='filled'
                            name="confPassword"
                            label="Confirmar Contraseña"
                            type="password"
                            value={input.confPassword}
                            onChange={handleInputChange}
                            fullWidth
                            color={errors.confPassword ? "error" : "primary"}
                            error={errors.confPassword}
                        />
                        <Box textAlign={"center"} margin={'2rem'} >
                            <Button type="submit" variant="contained" color="primary">
                                Registrarse
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
            {nuevoUsuario !== null && <ModalDeRespuesta open={open}/>}
        </>
    );
}

export default Registrarse;
