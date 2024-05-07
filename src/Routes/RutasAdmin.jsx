import { Navigate, Route, Routes } from 'react-router-dom';
import { Empleados } from '../Pages/PanelDeEmpleados/PanelDeEmpleados';
import CargarRecibos from '../Pages/CargarRecibos/CargarRecibos';
import Solicitudes from '../Pages/Solicitudes/Solicitudes';
import NuevoEmpleado from '../Pages/CrearEmpleadoNuevo/CraerEmpleadoNuevo';
import  Sectores from '../Pages/Sectores/Sectores';
import { RutasComunes } from './RutasComunes';

export const RutasAdmin = () => {
    return (
        <Routes>            
            <Route path='/*' element={<RutasComunes />} />
            <Route path='empleados' element={<Empleados />} />
            <Route path='sectores' element={<Sectores />} />
            <Route path='cargarRecibos' element={<CargarRecibos />}/> 
            <Route path='solicitudes' element={<Solicitudes />} />
            <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
    );
};