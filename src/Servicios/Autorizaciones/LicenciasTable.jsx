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



const LicenciasTable = (props) => {

    const { licencias } = props;
    console.log(licencias);

    return (
        <DashboardCard title={'LICENCIAS'}>
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
                                    Fecha desde
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Fecha hasta
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Cantidad de dias
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
                        {licencias.map((lic) => (
                            <TableRow key={lic.id}>
                                <TableCell>
                                    <Typography
                                        sx={{
                                            fontSize: "15px",
                                            fontWeight: "500",
                                        }}
                                    >
                                        {lic.empleado}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography
                                        color="textSecondary"
                                        sx={{
                                            fontSize: "13px",
                                        }}
                                    >
                                        {lic.nombre_tipo}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                        {lic.fecha}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                        {lic.motivo}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                        {lic.fecha_desde}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                        {lic.fecha_hasta}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                        {lic.dias_solicitados}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        sx={{
                                            px: "4px",
                                            backgroundColor: lic.estado === "En proceso" ? "secondary.main" : lic.estado === "Aprobado" ? "success.main" : lic.estado === "Rechazado" ? lic.estado : "error.main",
                                            color: "#fff",
                                        }}
                                        size="small"
                                        label={lic.estado}
                                    ></Chip>
                                </TableCell>
                                <TableCell align="right">
                                    <Button sx={{
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
                                    <Button sx={{
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
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </DashboardCard>
    );
};

export default LicenciasTable;