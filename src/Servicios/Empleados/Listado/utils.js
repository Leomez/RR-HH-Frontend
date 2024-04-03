
export const sector = (sectores, id) => {
  const sector = sectores.find(s => s.id === id)
  if (sector) {
    return sector.nombre_sector
  } else return 'sector no encontrado'
}

export const encargado = (supervisores, empleado, empleados) => {
  const supId = supervisores.find(sup => sup.SectorId === empleado.sector_id).EmpleadoId;
  const enc = empleados.find(e => e.id === supId)
  const nombre = `${enc.nombre_empleado} ${enc.apellido_empleado}`
  return nombre
}
  