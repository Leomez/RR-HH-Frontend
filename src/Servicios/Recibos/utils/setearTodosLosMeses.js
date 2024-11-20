const setAllPeriodos = (mes, empleados, setMesSeleccionado) => {
    const updatedPeriodos = {};
    empleados.forEach((empleado) => {
      updatedPeriodos[empleado.id] = mes;
    });
    setMesSeleccionado(updatedPeriodos);
};

export default setAllPeriodos;