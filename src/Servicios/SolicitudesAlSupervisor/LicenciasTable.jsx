import React from 'react';
import SolicitudTable from './SolicitudTable';

const LicenciasTable = ({ licencias, onAction }) => {
    const columns = [
        { label: 'Empleado', field: 'empleado' },
        { label: 'Tipo', field: 'nombre_tipo' },
        { label: 'Fecha solicitud', field: 'fecha' },
        { label: 'Motivo', field: 'motivo' },
        { label: 'Fecha desde', field: 'fecha_desde' },
        { label: 'Fecha hasta', field: 'fecha_hasta' },
        { label: 'Dias', field: 'dias_solicitados' },
    ];

    return <SolicitudTable title="LICENCIAS" solicitudes={licencias} columns={columns} onAction={onAction} />;
};

export default LicenciasTable;
