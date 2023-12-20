import { Navigate, Route, Routes} from 'react-router-dom';
import { Home } from '../Pages/Home/Home';
// import { Dashboard } from '../Pages/DashboardAdmin/DashboardAdmin';
import { MisRecibos } from '../Pages/Recibos/MisRecibos';
import { Mensajes } from '../Pages/Mensajes/Mensajes';
// import { FirmaContainer } from '../Componentes/Containers/FirmaContainer';
// import NuevoEmpleado from '../Pages/CrearEmpleadoNuevo/CraerEmpleadoNuevo';

export const RutasComunes = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />            
            <Route path='mensajes' element={<Mensajes />} />
            <Route path='recibos' element={<MisRecibos/>}/>  
            {/* <Route path='firmar' element={<FirmaContainer/>}/>           */}
            <Route path='*' element={<Navigate to='/' replace />} />                        
        </Routes>
    );
};