export default function retornarEmpleado(empleados, id) {
    try {
        const e = empleados.filter(e => e.id === id)[0]
        // console.log(e)    
        return `${e.nombre_empleado} ${e.apellido_empleado}`        
    } catch (error) {
        console.error(error)
        return "No se pudo encontrar el empleado"        
    }
}