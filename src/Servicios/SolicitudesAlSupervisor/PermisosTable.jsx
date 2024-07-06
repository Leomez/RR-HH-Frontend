import { useState } from 'react';
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

const PermisosTable = (props) => {
    const { permisos, onAction } = props;
    // console.log(permisos);   

    return (
        <DashboardCard title={'PERMISOS'}>
            <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
                <Table
                    aria-label="simple table"
                    sx={{
                        whiteSpace: "nowrap",
                        mt: 2
                    }}
                >
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Empleado
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Tipo
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Fecha solicitud
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Motivo
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Fecha solicitada
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Fecha compensatoria
                                </Typography>
                            </TableCell>
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
                        {permisos.map((permiso) => (
                            <TableRow key={permiso.id}>
                                <TableCell>
                                <Typography sx={{ fontSize: "15px", fontWeight: "500"}}>
                                        {permiso.empleado}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography
                                        color="textSecondary"
                                        sx={{
                                            fontSize: "13px",
                                        }}
                                    >
                                        {permiso.nombre_tipo}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                        {permiso.fecha}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                        {permiso.motivo}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                        {permiso.fecha_permiso}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                        {permiso.dia_compensatorio}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        sx={{
                                            px: "4px",
                                            backgroundColor:
                                                permiso.estado === "En proceso" ? "secondary.main" :
                                                    permiso.estado === "Aprobado" ? "success.light" :
                                                        permiso.estado === "Elevado" ? "info.light" :
                                                            "error.main",
                                            color: "#fff",
                                        }}
                                        size="small"
                                        variant='outlined'
                                        label={permiso.estado}
                                        // avatar={<Avatar>{`${permiso.estado === "En proceso" ? "S" : permiso.estado === "Elevado" ? "R" : ""}`}</Avatar>}
                                    ></Chip>
                                </TableCell>
                                {permiso.estado === "En proceso" ? (
                                    <TableCell align="right">
                                        <Button onClick={() => onAction(permiso.id, 'Rechazado')} sx={{
                                            mr: 1,
                                            color: 'error.main',
                                            // border: '1px solid red',
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
                                        <Button onClick={() => onAction(permiso.id, 'Elevado')} sx={{
                                            mr: 1,
                                            color: 'primary.main',
                                            // border: '1px solid blue',
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
                                    </TableCell>) : (
                                    <TableCell align="right">
                                        <Box sx={{
                                            color:
                                                permiso.estado === "Aprobado" ?
                                                    "success.light" : permiso.estado === "Elevado" ?
                                                        "info.main" : 'success.main',
                                            fontSize: 'large',
                                            padding: '5px',
                                            minWidth: '5px',
                                            borderRadius: '50%',
                                        }}>
                                            <GoCheckCircle />
                                        </Box>
                                    </TableCell>)}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </DashboardCard>
    );
};

export default PermisosTable;