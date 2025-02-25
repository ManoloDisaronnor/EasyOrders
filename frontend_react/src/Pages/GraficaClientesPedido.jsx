import { Avatar, Box, Typography, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    LabelList,
    ResponsiveContainer,
} from 'recharts';
import { apiUrl } from '../config';
import { useTema } from '../Componentes/TemaProvider';

export default function GraficaClientesPedido() {
    const theme = useTheme();
    const { colorFondo, colorTexto, colorIcono } = useTema();
    const [clientes, setClientes] = useState([]);

    const renderCustomizedLabel = (props) => {
        const { x, y, width, value } = props;

        return (
            <foreignObject
                x={x + width / 2 - 20}
                y={y - 60}
                width={40}
                height={40}
            >
                <Avatar
                    src={value?.imagen ? `data:image/jpeg;base64,${value.imagen}` : ''}
                    sx={{
                        width: 40,
                        height: 40,
                        border: `2px solid ${colorIcono}`,
                        bgcolor: theme.palette.grey[300],
                    }}
                />
            </foreignObject>
        );
    };

    useEffect(() => {
        async function cargarClientesGrafica() {
            try {
                const response = await fetch(apiUrl + "/pedidos/clientesgrafica");
                const data = await response.json();
                if (response.ok) {
                    setClientes(data.datos);
                } else {
                    alert(data.mensaje);
                }
            } catch (error) {
                alert("Error al recuperar los datos de los clientes para la gráfica " + error);
            }
        }

        cargarClientesGrafica();
    }, []);

    const calculateChartWidth = () => {
        const minWidth = 800;
        const barWidth = 70;
        return Math.max(clientes.length * barWidth, minWidth);
    };

    return (
        <Box sx={{
            p: 5,
            backgroundColor: colorFondo,
        }}>
            <Typography variant="h2" className="easyOrders" align="center" sx={{ color: colorTexto, marginBottom: 5, fontSize: "3em" }}>
                Gráfico de clientes y pedidos
            </Typography>
            <Box
                sx={{
                    pt:3,
                    borderRadius: 4,
                    boxShadow: 3,
                    width: "100%",
                    height: 500,
                    overflowX: 'auto',
                    '&::-webkit-scrollbar': {
                        height: 8,
                        backgroundColor: theme.palette.grey[200],
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: colorIcono,
                        borderRadius: 4,
                        '&:hover': {
                            backgroundColor: theme.palette.primary.dark
                        }
                    },
                }}
            >
                <div style={{
                    width: calculateChartWidth(),
                    height: '100%',
                    minWidth: '100%'
                }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={clientes}
                            margin={{ top: 80, right: 30, left: 50, bottom: 30 }}
                        >
                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke={theme.palette.divider}
                            />

                            <XAxis
                                dataKey="id_cliente_Cliente.usuario"
                                label={{
                                    value: 'Clientes',
                                    position: 'bottom',
                                    fill: colorTexto,
                                    fontSize: 14
                                }}
                                tick={{
                                    fill: colorTexto,
                                    fontSize: 12
                                }}
                                interval={0}
                                angle={-45}
                                textAnchor="end"
                                height={80}
                            />

                            <YAxis
                                label={{
                                    value: 'N° de pedidos',
                                    angle: -90,
                                    position: 'insideLeft',
                                    fill: colorTexto,
                                    fontSize: 14
                                }}
                                tick={{
                                    fill: colorTexto,
                                    fontSize: 12
                                }}
                            />

                            <Tooltip
                                formatter={(value) => [value, 'Pedidos']}
                                contentStyle={{
                                    backgroundColor: colorFondo,
                                    border: `1px solid ${colorIcono}`,
                                    borderRadius: 4,
                                    boxShadow: theme.shadows[3],
                                    color: colorTexto
                                }}
                                itemStyle={{ color: colorTexto }}
                            />

                            <Bar
                                dataKey="num_pedidos"
                                fill={colorIcono}
                                barSize={40}
                                radius={[4, 4, 0, 0]}
                            >
                                <LabelList
                                    dataKey="id_cliente_Cliente"
                                    content={renderCustomizedLabel}
                                    position="top"
                                />
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </Box>
        </Box>
    );
}