
export const sector = (sectores, id) => {
  const sector = sectores.find(s => s.id === id)
  if (sector) {
    return sector.nombre_sector
  } else return 'sector no encontrado'
}

// Encargado.js

export const encargado = (supervisores, empleado, empleados) => {
  // Buscar el ID del supervisor correspondiente al sector del empleado
  const supervisor = supervisores.find(sup => sup.SectorId === empleado.sector_id);
  // console.log(supervisor)  

  if (!supervisor) {
    return 'encargado no encontrado';
  }
  
  const supId = supervisor.empleadoId;

  // Buscar los datos del supervisor en la lista de empleados
  const enc = empleados.find(e => e.id === supId);
 
  if (!enc) {
    return 'encargado no encontrado';
  }
  
  const nombre = `${enc.nombre_empleado} ${enc.apellido_empleado}`;
  // console.log(nombre);
  return nombre;
};

  