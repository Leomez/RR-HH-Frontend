import React from 'react';
import SolicitudTable from './SolicitudTable';

const PermisosTable = ({ permisos, onAction }) => {
    const columns = [
        { label: 'Empleado', field: 'empleado' },
        { label: 'Tipo', field: 'nombre_tipo' },
        { label: 'Fecha solicitud', field: 'fecha' },
        { label: 'Motivo', field: 'motivo' },
        { label: 'Fecha solicitada', field: 'fecha_permiso' },
        { label: 'Fecha compensatoria', field: 'dia_compensatorio' },
    ];

    return <SolicitudTable title="PERMISOS" solicitudes={permisos} columns={columns} onAction={onAction} />;
};

export default PermisosTable;
