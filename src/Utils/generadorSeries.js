function generarSeries(array) {
    const series = Object.entries(array[0]).map(([key, value]) => {
      if (key !== "total" && key !== "nombre") {
        return {
          name: key,
          data: array.map(obj => obj[key])
          
        };
      }
    }).filter(Boolean);
  
    return series;
  }

  export default generarSeries