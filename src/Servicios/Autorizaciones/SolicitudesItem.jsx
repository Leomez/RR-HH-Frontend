import React from 'react';
import { Stack, Box, Typography, Chip } from '@mui/material';
import styles from './styles';
import BeachAccessOutlinedIcon from '@mui/icons-material/BeachAccessOutlined';
import UpdateOutlinedIcon from '@mui/icons-material/UpdateOutlined';
import LocalHospitalOutlinedIcon from '@mui/icons-material/LocalHospitalOutlined';

const icons = {
    vacaciones: <BeachAccessOutlinedIcon sx={styles.icon} />,
    reloj: <UpdateOutlinedIcon sx={styles.icon} />,
    medico: <LocalHospitalOutlinedIcon sx={styles.icon} />,
};

const SolicitudItem = ({ solicitud }) => {
    return (
        <Stack direction={{ xs: "column", md: "row" }} spacing={2} alignItems="self-start">
            {Object.entries(solicitud).map(([atributo, valor]) => {
                if (atributo !== "id" && valor) {
                    return (
                        <Box key={atributo} sx={atributo != "icono" && styles.box}>
                            {atributo === "estado" ? (
                                <Chip
                                    key={atributo}
                                    label={valor}
                                    variant="outlined"
                                    color={valor === "En proceso" ? "warning" : valor === "Aprobado" ? "success" : "error"}
                                    sx={styles.chip}
                                />
                            ) : (
                                <>
                                    {atributo === 'icono' ? (
                                        <Box sx={styles.iconBox} >
                                            {icons[valor]}
                                        </Box>
                                    ) : (
                                        <>
                                            <Typography
                                                variant="h6"
                                                fontSize={{ sm: 18, xs: 16 }}
                                                component="div">
                                                    {atributo}:
                                            </Typography>
                                            {valor}
                                        </>
                                    )}
                                </>

                            )}
                        </Box>
                    );
                }
                return null;
            })}
        </Stack>
    );
};

export default SolicitudItem;

