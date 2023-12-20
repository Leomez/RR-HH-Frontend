import {React, useEffect} from "react";
import { Box, Grid, Paper, Typography, useTheme } from "@mui/material";
import Chart from "react-apexcharts"
import ApexCharts from "apexcharts";
import chartData from "../../Utils/AsistenciaChartdata";
import CardComponent from "../../Componentes/Containers/CardComponent";

export default function ChartPresentismo() {
    const t = useTheme();
    const { primary } = t.palette.text;
    const darkLight = t.palette.primary.light;
    const grey200 = t.palette.grey[200];
    const grey500 = t.palette.grey[500];
    const primary200 = t.palette.primary[200];
    const primaryDark = t.palette.primary.dark;
    const secondaryMain = t.palette.secondary.main;
    const secondaryLight = t.palette.secondary.light;
    const isLoading = false

    useEffect(() => {
        const newChartData = {
            ...chartData.options,
            colors: [primary200, primaryDark, secondaryMain, secondaryLight],
            xaxis: {
                labels: {
                    style: {
                        colors: [primary, primary, primary, primary, primary, primary, primary, primary, primary, primary, primary, primary]
                    }
                }
            },
            yaxis: {
                labels: {
                    style: {
                        colors: [primary]
                    }
                }
            },
            grid: {
                borderColor: grey200
            },
            tooltip: {
                theme: 'light'
            },
            legend: {
                labels: {
                    colors: grey500
                }
            }
        };

        // do not load chart when loading
        if (!isLoading) {
            ApexCharts.exec(`bar-chart`, 'updateOptions', newChartData);
        }
    }, [primary200, primaryDark, secondaryMain, secondaryLight, primary, darkLight, grey200, isLoading, grey500]);

    return (
        <CardComponent
            titulo={'Asistencias'}
            link={'VER MAS...'}
            footer={'un footer...'}
        >
            <Box display={"flex"} justifyContent={'space-around'} paddingY={3}>
                <Chart {...chartData}/>
                <Grid container spacing={2}>
                    <Grid item xs={12} >
                        <Paper>
                            <Box>
                                <Box>
                                    <Typography variant='subtitle1'>
                                        Total Presente
                                    </Typography>
                                    <Typography variant="h3">
                                        39
                                    </Typography>
                                    <Box display={'inline'}>
                                        <Typography color={'green'}>95% </Typography><Typography> de presentismo</Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                    <Paper>
                            <Box>
                                <Box>
                                    <Typography variant='subtitle1'>
                                        Total Ausentes
                                    </Typography>
                                    <Typography variant="h3">
                                        6
                                    </Typography>
                                    <Box display={'inline'}>
                                        <Box display={"inline"}>
                                            <Typography color={'red'}>2</Typography><Typography> enfermo</Typography>
                                        </Box>
                                        <Box display={"inline"}>
                                            <Typography color={'red'}>4 </Typography><Typography> licencias</Typography>
                                        </Box>

                                    </Box>
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>

        </CardComponent>
    )
}
