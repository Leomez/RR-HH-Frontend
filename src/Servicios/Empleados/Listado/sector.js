
export const sector = (sectores, id) => {
    const sector = sectores.find(s => s.id === id)
    if (sector) {
      return sector.nombre_sector
    } else return 'sector no encontrado'
  }