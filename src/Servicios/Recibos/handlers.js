export default Handler = {
    handleLimpiarSeleccion : (empleadoId, sets) => {
        const inputFile = document.getElementById(`fileInput-${empleadoId}`);
        if (inputFile) {
          inputFile.value = null;
        }
        sets.setSelectedFiles((prevFiles) => ({ ...prevFiles, [empleadoId]: null }));
        sets.setSelectedPeriodos((prevPeriodos) => ({ ...prevPeriodos, [empleadoId]: null }));
        sets.setDatos((prevDatos) => prevDatos.filter((empleado) => empleado.id_empleado !== empleadoId));
      }
}