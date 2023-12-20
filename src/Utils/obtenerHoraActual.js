export default function obtenerHoraActual() {
    const ahora = new Date();
    let horas = ahora.getHours();
    let minutos = ahora.getMinutes();
  
    // Añadir un cero delante si los minutos son menores a 10
    minutos = minutos < 10 ? "0" + minutos : minutos;
  
    const horaActual = horas + ":" + minutos;
    return horaActual;
  }
