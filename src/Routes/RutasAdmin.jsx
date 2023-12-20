import { Navigate, Route, Routes } from 'react-router-dom';
import { Dashboard } from '../Pages/DashboardAdmin/DashboardAdmin';
import CargarRecibos from '../Pages/CargarRecibos/CargarRecibos';
import NuevoEmpleado from '../Pages/CrearEmpleadoNuevo/CraerEmpleadoNuevo';
import { RutasComunes } from './RutasComunes';

export const RutasAdmin = () => {
    return (
        <Routes>            
            <Route path='/*' element={<RutasComunes />} />
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='crear-empleado' element={<NuevoEmpleado />} />
            <Route path='cargarRecibos' element={<CargarRecibos />}/>            
            <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
    );
};