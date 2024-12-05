import React from 'react';
import {
    Typography, Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Chip,
    Button
} from '@mui/material';
import DashboardCard from '../../Componentes/Containers/DashboardCard';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { GoCheckCircle } from "react-icons/go";

const SolicitudTable = ({ title, solicitudes, columns, onAction }) => {
    return (
        <DashboardCard title={title}>
            <Box sx={{ maxHeight: 440, width: { xs: '280px', sm: 'auto' } }}>
                <Table
                    stickyHeader aria-label="sticky table"
                    sx={{
                        whiteSpace: "nowrap",
                        mt: 2
                    }}
                >
                    <TableHead>
                        <TableRow>
                            {columns.map((col) => (
                                <TableCell key={col.label}>
                                    <Typography variant="subtitle2" fontWeight={600}>
                                        {col.label}
                                    </Typography>
                                </TableCell>
                            ))}
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Estado
                                </Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Accion
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {solicitudes.map((solicitud) => (
                            <TableRow key={solicitud.id}>
                                {columns.map((col) => (
                                    <TableCell key={col.field}>
                                        <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                            {solicitud[col.field]}
                                        </Typography>
                                    </TableCell>
                                ))}
                                <TableCell>
                                    <Chip
                                        sx={{
                                            px: "4px",
                                            backgroundColor:
                                                solicitud.estado === "En proceso" ? "secondary.main" :
                                                    solicitud.estado === "Aprobado" ? "success.main" :
                                                        solicitud.estado === "Elevado" ? "info.light" :
                                                            "error.main",
                                            color: "#fff",
                                        }}
                                        size="small"
                                        variant='outlined'
                                        label={solicitud.estado}
                                    ></Chip>
                                </TableCell>
                                {solicitud.estado === "En proceso" ? (
                                    <TableCell align="right">
                                        <Button onClick={() => onAction(solicitud.id, 'Rechazado')} sx={{
                                            mr: 1,
                                            color: 'error.main',
                                            borderRadius: '50%',
                                            padding: '5px',
                                            minWidth: '5px',
                                            backgroundColor: 'error.light',
                                            ':hover': {
                                                backgroundColor: 'error.main',
                                                color: '#fff'
                                            }
                                        }}>
                                            <ThumbDownAltIcon />
                                        </Button>
                                        <Button onClick={() => onAction(solicitud.id, 'Elevado')} sx={{
                                            mr: 1,
                                            color: 'primary.main',
                                            backgroundColor: 'primary.light',
                                            borderRadius: '50%',
                                            padding: '5px',
                                            minWidth: '5px',
                                            ':hover': {
                                                backgroundColor: 'primary.main',
                                                color: '#fff'
                                            }
                                        }}>
                                            <ThumbUpAltIcon />
                                        </Button>
                                    </TableCell>
                                ) : (
                                    <TableCell align="right">
                                        <Box sx={{
                                            color: solicitud.estado === "Aprobado" ? "success.light" : solicitud.estado === "Elevado" ? "info.main" : 'success.main',
                                            fontSize: 'large',
                                            padding: '5px',
                                            minWidth: '5px',
                                            borderRadius: '50%',
                                        }}>
                                            <GoCheckCircle />
                                        </Box>
                                    </TableCell>
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </DashboardCard>
    );
};

export default SolicitudTable;
