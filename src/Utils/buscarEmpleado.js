export default function retornarEmpleado(empleados, id) {
    const e = empleados.filter(e => e.id === id)[0]
    // console.log(e)    
    return `${e.nombre_empleado} ${e.apellido_empleado}`
}