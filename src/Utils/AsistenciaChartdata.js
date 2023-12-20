import generarSeries from "./generadorSeries.js"
const puestos = [

    {
        nombre: "Recepcion",
        total: 18,
        presentes: 16,
        licencia: 0,
        enfermos: 2,
        ausentes: 0
    },
    {
        nombre: "Presupuestos",
        total: 4,
        presentes: 4,
        licencia: 0,
        enfermos: 0,
        ausentes: 0
    },
    {
        nombre: "Facturacion",
        total: 5,
        presentes: 4,
        licencia: 0,
        enfermos: 1,
        ausentes: 0
    },
    {
        nombre: "Quirofano",
        total: 8,
        presentes: 6,
        licencia: 0,
        enfermos: 2,
        ausentes: 0
    },
    {
        nombre: "Administracion",
        total: 5,
        presentes: 4,
        licencia: 5,
        enfermos: 1,
        ausentes: 3
    },
    {
        nombre: "Recursos Humanos",
        total: 1,
        presentes: 1,
        licencia: 0,
        enfermos: 0,
        ausentes: 0
    },
    {
        nombre: "Sistemas",
        total: 2,
        presentes: 2,
        licencia: 0,
        enfermos: 0,
        ausentes: 0
    }
]


const chartData = {
    series: generarSeries(puestos),
    height: 480,
    type: "bar",
    options: {
        chart: {
            id: 'chart-bar',
            stacked: true,
            toolbar: {
                show: true
            },
            zoom: {
                enabled: true
            }
        },
        responsive: [
            {
                breackpoint: 480,
                options: {
                    legend: {
                        position: 'bottom',
                        offsetX: -10,
                        offsetY: 5
                    }
                }
            }
        ],
        plotOptions: {
            bar: {
                horizontal: false,
                borderRadius: 3,
                dataLabels: {
                    total: {
                        enabled: true,
                        style: {
                            fontSize: '13px',
                            fontWeight: 900
                        }
                    }
                }
            },
        },
        xaxis: {
            categories: puestos.map(puesto => puesto.nombre),
        },
        legend: {
            position: 'top',
            offsetY: 20
        },
        fill: {
            opacity: 1
        }
    }
}

export default chartData
