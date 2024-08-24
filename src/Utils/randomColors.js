const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

const colorPalette = [
    "#2566e8", "#e82566", "#66e825", "#e8b525", "#25e8b5", "#e825e8",
    "#25e8e8", "#e86625", "#b525e8", "#25e8b5", "#e8e825", "#66b5e8",
    "#b5e825", "#e825b5", "#25b5e8", "#b5e8e8", "#e8b525", "#b52566",
    "#b566e8", "#66e8b5"
];


const isNumeric = (str) => !isNaN(str) && !isNaN(parseFloat(str));
const generateTipoColors = (solicitudes) => {
    const tipoColorMap = new Map(); //crea un array mapeable
    let colorIndex = 0;
    solicitudes && solicitudes.forEach(solicitud => {
        const tipo = isNumeric(solicitud.nombre_tipo) ? "Vacaciones" : solicitud.nombre_tipo; //define como "Vacaciones a los nombre_tipo numericos"
        if (!tipoColorMap.has(tipo)) { //busca que no haya un tipo igual en el array para no repetir 
            tipoColorMap.set(tipo, colorPalette[colorIndex % colorPalette.length]); //setea el tipo y color como clave valor respectivamente asegurandose que el indice no se vaya de rango           
            colorIndex++;
        }
    });
    return tipoColorMap;
};

const estadoColors = {
    aprobado: "#4caf50",
    "pendiente en rr hh": "#ff9800",
    "pendiente en el sector": "#03a9f4",
    rechazado: "#ef5350",
}



export { generateTipoColors, isNumeric, getRandomColor, estadoColors };