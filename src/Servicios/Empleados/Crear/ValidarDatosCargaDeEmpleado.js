
function validateForm(inputs) {
    let errores = {};
    // Validar campos requeridos
    const requiredFields = ["legajo", "dni", "nombre_empleado", "apellido_empleado", "fecha_nac", "correo", "telefono", "tel_alternativo"];
    for (let field of requiredFields) {
      if (!inputs[field] || inputs[field] === "") {
        errores[field] = `El campo ${field} es requerido.`      
      }
    }
    
    // // Validar formato de fecha de nacimiento
    const fechaNacRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!fechaNacRegex.test(inputs.fecha_nac)) {
      errores.fecha_nac = "El formato de fecha de nacimiento debe ser YYYY-MM-DD."    
    }
    // Validar formato de correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(inputs.correo)) {
      errores.correo = "El correo ingresado no tiene un formato válido."    
    }
  
    return errores;
  }
  
  
  export default validateForm;