import { Navigate, Route, Routes} from 'react-router-dom';
import { Home } from '../Pages/Home/Home';
// import { Dashboard } from '../Pages/DashboardAdmin/DashboardAdmin';
import { MisRecibos } from '../Pages/Recibos/MisRecibos';
import { Mensajes } from '../Pages/Mensajes/Mensajes';
import { LicenciasYPermisos } from '../Pages/LicenciasYPermisos';
// import { FirmaContainer } from '../Componentes/Containers/FirmaContainer';
// import NuevoEmpleado from '../Pages/CrearEmpleadoNuevo/CraerEmpleadoNuevo';

export const RutasComunes = () => {
    return (
        <Routes>
            {console.log('estoy en rutas comunes..')}
            <Route path='/' element={<Home />} />            
            <Route path='mensajes' element={<Mensajes />} />
            <Route path='recibos' element={<MisRecibos/>}/>  
            <Route path='licencias' element={<LicenciasYPermisos/>}/> 
            {/* <Route path='firmar' element={<FirmaContainer/>}/>           */}
            <Route path='*' element={<Navigate to='/' replace />} />                        
        </Routes>
    );
};