import React from 'react';
import SolicitudTable from './SolicitudTable';

const VacacionesTable = ({ vacaciones, onAction }) => {
    const columns = [
        { label: 'Empleado', field: 'empleado' },
        { label: 'Fecha solicitud', field: 'fecha' },
        { label: 'Fecha desde', field: 'fecha_desde' },
        { label: 'Fecha hasta', field: 'fecha_hasta' },
        { label: 'Dias', field: 'dias_solicitados' },
    ];

    return <SolicitudTable title="VACACIONES" solicitudes={vacaciones} columns={columns} onAction={onAction} />;
};

export default VacacionesTable;
