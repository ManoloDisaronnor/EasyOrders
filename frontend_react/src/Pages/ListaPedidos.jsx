import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid2, InputAdornment, InputLabel, ListItemIcon, ListItemText, MenuItem, Select, Tab, TextField, Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTema } from "../Componentes/TemaProvider";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { esES } from "@mui/x-date-pickers/locales";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ScreenSearchDesktopIcon from '@mui/icons-material/ScreenSearchDesktop';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import SellIcon from '@mui/icons-material/Sell';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import MarkunreadMailboxIcon from '@mui/icons-material/MarkunreadMailbox';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from 'dayjs';
import { apiUrl } from "../config";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import ReactPDF from '@react-pdf/renderer'
import generatePDF from "../utils/GeneratePdf";

/**
 * Componente para listar los pedidos.
 * @returns {JSX.Element} El componente de la lista de pedidos.
 */
function ListaPedidos() {
    const { colorFondo, colorTexto, colorIcono } = useTema();
    const [loading, setLoading] = useState(true);
    const [recargar, setRecargar] = useState(false);
    const [error, setError] = useState("");
    const [pedidos, setPedidos] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [abrirDialogoInformacion, setAbrirDialogoInformacion] = useState(false);
    const [abrirDialogoBorrar, setAbrirDialogoBorrar] = useState(false);
    const [abrirDialogoModificar, setAbrirDialogoModificar] = useState(false);
    const [mensajeDialogoInformacion, setMensajeDialogoInformacion] = useState("");
    const [pedidoSeleccionado, setPedidoSeleccionado] = useState({});
    const [listoParaEliminar, setListoParaEliminar] = useState(false);
    const [listoParaModificar, setListoParaModificar] = useState(false);
    const [clientes, setClientes] = useState([]);
    const doc = new jsPDF({
        orientation: "landscape",
        unit: "in",
        format: [4, 2]
    });

    /**
     * Estilos personalizados para los TextField.
     */
    const estilosTextField = {
        '& .MuiInputLabel-root': {
            color: colorTexto,
        },
        '& .MuiInput-underline:before': {
            borderBottom: colorFondo === '#FFFFFF' ? '2px solid #24c55e' : '2px solid #ffffff',
        },
        '& .MuiInput-underline:after': {
            borderBottom: colorFondo === '#FFFFFF' ? '2px solid #24c55e' : '2px solid #ffffff',
        },
        marginBottom: 2
    };

    /**
     * Componente para las acciones de paginación de la tabla.
     * @param {Object} props - Las propiedades del componente.
     * @returns {JSX.Element} El componente de acciones de paginación.
     */
    function TablePaginationActions(props) {
        const theme = useTheme();
        const { count, page, rowsPerPage, onPageChange } = props;

        const handleFirstPageButtonClick = (event) => {
            onPageChange(event, 0);
        };

        const handleBackButtonClick = (event) => {
            onPageChange(event, page - 1);
        };

        const handleNextButtonClick = (event) => {
            onPageChange(event, page + 1);
        };

        const handleLastPageButtonClick = (event) => {
            onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
        };

        return (
            <Box sx={{ flexShrink: 0, ml: 2.5 }}>
                <IconButton
                    onClick={handleFirstPageButtonClick}
                    disabled={page === 0}
                    aria-label="first page"
                >
                    {theme.direction === 'rtl' ? <LastPageIcon sx={{ color: colorIcono }} /> : <FirstPageIcon sx={{ color: colorIcono }} />}
                </IconButton>
                <IconButton
                    onClick={handleBackButtonClick}
                    disabled={page === 0}
                    aria-label="previous page"
                >
                    {theme.direction === 'rtl' ? <KeyboardArrowRight sx={{ color: colorIcono }} /> : <KeyboardArrowLeft sx={{ color: colorIcono }} />}
                </IconButton>
                <IconButton
                    onClick={handleNextButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="next page"
                >
                    {theme.direction === 'rtl' ? <KeyboardArrowLeft sx={{ color: colorIcono }} /> : <KeyboardArrowRight sx={{ color: colorIcono }} />}
                </IconButton>
                <IconButton
                    onClick={handleLastPageButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="last page"
                >
                    {theme.direction === 'rtl' ? <FirstPageIcon sx={{ color: colorIcono }} /> : <LastPageIcon sx={{ color: colorIcono }} />}
                </IconButton>
            </Box>
        );
    }

    TablePaginationActions.propTypes = {
        count: PropTypes.number.isRequired,
        onPageChange: PropTypes.func.isRequired,
        page: PropTypes.number.isRequired,
        rowsPerPage: PropTypes.number.isRequired,
    };

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - pedidos.length) : 0;

    /**
     * Maneja el cambio de página en la tabla.
     * @param {Object} event - El evento de cambio de página.
     * @param {number} newPage - La nueva página seleccionada.
     */
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    /**
     * Maneja el cambio de filas por página en la tabla.
     * @param {Object} event - El evento de cambio de filas por página.
     */
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    /**
     * Maneja la eliminación de un pedido.
     */
    const handleProcesarEliminacion = () => {
        setListoParaEliminar(true);
        setAbrirDialogoBorrar(false);
    };

    const handleMostrarDialogoBorrar = (pedido) => {
        setPedidoSeleccionado(pedido);
        setAbrirDialogoBorrar(true);
    };

    const handleMostrarDialogoModificar = (pedido) => {
        setPedidoSeleccionado(pedido);
        cargarClientesParaPedido();
        setAbrirDialogoModificar(true);
    };

    const handleFechaPedidoChange = (nuevaFecha) => {
        setPedidoSeleccionado({ ...pedidoSeleccionado, fecha_pedido: nuevaFecha });
    };

    const handleFechaEntregaChange = (nuevaFecha) => {
        setPedidoSeleccionado({ ...pedidoSeleccionado, fecha_entrega: nuevaFecha });
    }

    /**
     * Maneja la modificación de un pedido.
     */
    const handleProcesarModificacion = () => {
        setListoParaModificar(true);
        setAbrirDialogoModificar(false);
    };

    useEffect(() => {
        async function cargarPedidos() {
            setLoading(true);
            try {
                const response = await fetch(apiUrl + "/pedidos/");
                const data = await response.json();
                if (response.ok) {
                    setPedidos(data.datos);
                } else {
                    setError(data.mensaje);
                }
            } catch (error) {
                setError("Error al cargar los pedidos " + error);
            }
            setLoading(false);
        }
        cargarPedidos();
    }, [recargar]);

    useEffect(() => {
        async function eliminarPedido() {
            try {
                const respuesta = await fetch(apiUrl + `/pedidos/eliminarpedido/${pedidoSeleccionado.id_pedido}`, {
                    method: "DELETE"
                });
                if (respuesta.ok) {
                    setMensajeDialogoInformacion("El pedido " + pedidoSeleccionado.id_pedido + " asociado al cliente " + pedidoSeleccionado.id_cliente_Cliente.nombre + " ha sido eliminado correctamente");
                } else {
                    setMensajeDialogoInformacion("Error al eliminar el pedido " + pedidoSeleccionado.id_pedido + " asociado al cliente " + pedidoSeleccionado.id_cliente_Cliente.nombre);
                }
            } catch (error) {
                setMensajeDialogoInformacion("Error al eliminar el pedido " + pedidoSeleccionado.id_pedido + " asociado al cliente " + pedidoSeleccionado.id_cliente_Cliente.nombre + " " + error);
            }
            setListoParaEliminar(false);
            setAbrirDialogoInformacion(true);
            setRecargar(!recargar);
        }

        if (listoParaEliminar) {
            eliminarPedido();
        }

    }, [listoParaEliminar, pedidoSeleccionado]);

    /**
     * Carga los clientes para los pedidos.
     */
    async function cargarClientesParaPedido() {
        try {
            const respuesta = await fetch(apiUrl + "/clientes/clientespedido");
            const datos = await respuesta.json();
            if (respuesta.ok) {
                setClientes(datos.datos);
            } else {
                setError(datos.mensaje);
            }
        } catch (error) {
            setMensajeDialogoInformacion("Error al cargar los clientes " + error);
            setAbrirDialogoInformacion(true);
        }
    }

    useEffect(() => {
        async function modPedido() {
            try {
                const response = await fetch(apiUrl + '/pedidos/modificarpedido/' + pedidoSeleccionado.id_pedido, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        producto: pedidoSeleccionado.producto,
                        fecha_pedido: pedidoSeleccionado.fecha_pedido ? dayjs(pedidoSeleccionado.fecha_pedido).format("YYYY-MM-DD") : null,
                        fecha_entrega: pedidoSeleccionado.fecha_entrega ? dayjs(pedidoSeleccionado.fecha_entrega).format("YYYY-MM-DD") : null,
                        precio: pedidoSeleccionado.precio,
                        unidades: pedidoSeleccionado.unidades,
                        estado: pedidoSeleccionado.estado,
                        id_cliente: pedidoSeleccionado.id_cliente_Cliente.id_cliente,
                    })
                });
                const data = await response.json();
                if (response.ok) {
                    setMensajeDialogoInformacion("El pedido " + pedidoSeleccionado.id_pedido + " asociado a " + pedidoSeleccionado.id_cliente_Cliente.nombre + " ha sido modificado correctamente");
                } else {
                    setMensajeDialogoInformacion(data.mensaje);
                }
            } catch (error) {
                setMensajeDialogoInformacion("Error al modificar el pedido " + pedidoSeleccionado.id_pedido + " asociado a " + pedidoSeleccionado.id_cliente_Cliente.nombre + " " + error);
            }

            setListoParaModificar(false);
            setAbrirDialogoInformacion(true);
            setRecargar(!recargar);
        }

        if (listoParaModificar) {
            modPedido();
        }
    }, [listoParaModificar, pedidoSeleccionado]);

    const styles = StyleSheet.create({
        page: { padding: 20 },
        title: {
            fontSize: 16,
            marginBottom: 10,
            textAlign: "center",
            fontWeight: "bold",
        },
        table: {
            display: "table",
            width: "auto",
            borderStyle: "solid",
            borderWidth: 1,
            marginBottom: 10,
        },
        tableRow: { flexDirection: "row" },
        tableColHeader: {
            width: "16%",
            borderStyle: "solid",
            borderWidth: 1,
            backgroundColor: "#ddd",
            padding: 5,
            fontWeight: "bold",
        },
        tableCol: { width: "16%", borderStyle: "solid", borderWidth: 1, padding: 5 },
    });

    /**
     * Componente para generar el PDF de la lista de pedidos.
     * @param {Object} props - Las propiedades del componente.
     * @returns {JSX.Element} El componente del PDF de la lista de pedidos.
     */
    const ListadoPedidosPDF = ({ data }) => (
        <Document>
            <Page size="A4" style={styles.page}>
                <Text style={styles.title}>Listado de pedidos</Text>
                <View style={styles.table}>
                    {/* Encabezado */}
                    <View style={styles.tableRow}>
                        <Text style={styles.tableColHeader}>ID Pedido</Text>
                        <Text style={styles.tableColHeader}>Producto</Text>
                        <Text style={styles.tableColHeader}>Precio</Text>
                        <Text style={styles.tableColHeader}>Unidades</Text>
                        <Text style={styles.tableColHeader}>Estado</Text>
                        <Text style={styles.tableColHeader}>Fecha de pedido</Text>
                        <Text style={styles.tableColHeader}>Fecha de entrega</Text>
                        <Text style={styles.tableColHeader}>Cliente asociado</Text>
                    </View>
                    {/* Filas de datos */}
                    {data.map((row) => (
                        <View style={styles.tableRow} key={row.id}>
                            <Text style={styles.tableCol}>{row.id_pedido}</Text>
                            <Text style={styles.tableCol}>{row.producto}</Text>
                            <Text style={styles.tableCol}>
                                {" "}
                                {row.precio + " €"}
                            </Text>
                            <Text style={styles.tableCol}>
                                {(row.precio * row.unidades).toFixed(2) + " €"}
                            </Text>
                            <Text style={styles.tableCol}>{row.unidades}</Text>
                            <Text style={styles.tableCol}>{row.estado}</Text>
                            <Text style={styles.tableCol}>{row.fecha_pedido}</Text>
                            <Text style={styles.tableCol}>
                                {row.fecha_entrega ? row.fecha_entrega : "Sin entrega prevista"}
                            </Text>
                            <Text style={styles.tableCol}>{row.id_cliente_Cliente.nombre}</Text>
                        </View>
                    ))}
                </View>
            </Page>
        </Document>
    );

    return (
        <Box sx={{ p: 5 }}>
            {
                loading ?

                    <CircularProgress color={colorFondo === "#FFFFFF" ? "success" : "white"} size={65} sx={{ display: "block", margin: "auto" }} />
                    :
                    error ?
                        <Typography variant="h2" align="center" sx={{ color: colorFondo === "#FFFFFF" ? "#fa0202" : "#FFFFFF", marginBottom: 5, fontSize: "3em" }}>
                            {error}
                        </Typography>
                        :
                        <>
                            <Typography variant="h2" className="easyOrders" align="center" sx={{ color: colorTexto, marginBottom: 5, fontSize: "3em" }}>
                                Tabla de todos los pedidos
                            </Typography>
                            <Grid2 container direction="row" spacing={3} justifyContent="center" alignItems="center" sx={{ marginBottom: 5 }}>
                                <Button variant="contained" onClick={() => window.print()} color="success">
                                    Imprimir listado (navegador)
                                </Button>
                                <Button variant="contained" onClick={generatePDF} color="success">
                                    Imprimir listado (jsPDF + html2canvas)
                                </Button>
                                <Button variant="contained" color="success" sx={{ textDecoration: "none" }}>
                                    <PDFDownloadLink
                                        document={<ListadoPedidosPDF data={pedidos} />}
                                        fileName="tabla.pdf"
                                        style={{
                                            textDecoration: "none",
                                            color: "white",
                                        }}
                                    >
                                        Imprimir listado (react-pdf)
                                    </PDFDownloadLink>
                                </Button>
                            </Grid2>
                            <TableContainer sx={{
                                backgroundColor: colorFondo,
                                border: colorFondo === "#FFFFFF" ? "1px solid #24c55e" : "1px solid #FFFFFF",
                                boxShadow: 3,
                                borderRadius: 2,
                            }} id="pdf-content">
                                <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                                    <TableBody>
                                        <TableRow>
                                            <TableCell component="th" className="easyOrders" sx={{ color: colorTexto, fontSize: "1.1em", minWidth: 50 }}>ID Pedido</TableCell>
                                            <TableCell align="center" className="easyOrders" sx={{ color: colorTexto, fontSize: "1.1em", minWidth: 90 }}>Producto</TableCell>
                                            <TableCell align="center" className="easyOrders" sx={{ color: colorTexto, fontSize: "1.1em" }}>Precio</TableCell>
                                            <TableCell align="center" className="easyOrders" sx={{ color: colorTexto, fontSize: "1.1em" }}>Unidades</TableCell>
                                            <TableCell align="center" className="easyOrders" sx={{ color: colorTexto, fontSize: "1.1em" }}>Estado</TableCell>
                                            <TableCell align="center" className="easyOrders" sx={{ color: colorTexto, fontSize: "1.1em", minWidth: 110 }}>Fecha de pedido</TableCell>
                                            <TableCell align="center" className="easyOrders" sx={{ color: colorTexto, fontSize: "1.1em", minWidth: 110 }}>Fecha de entrega</TableCell>
                                            <TableCell align="center" className="easyOrders" sx={{ color: colorTexto, fontSize: "1.1em" }}>Cliente asociado</TableCell>
                                            <TableCell align="center" className="easyOrders" sx={{ color: colorTexto, fontSize: "1.1em", minWidth: 112 }}>Acciones</TableCell>
                                        </TableRow>
                                        {(rowsPerPage > 0
                                            ? pedidos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            : pedidos
                                        ).map((pedido) => (
                                            <TableRow key={pedido.id_pedido}>
                                                <TableCell component="th" sx={{ color: colorTexto, minWidth: 50, fontWeight: "bold" }}>
                                                    {pedido.id_pedido}
                                                </TableCell>
                                                <TableCell align="center" sx={{ color: colorTexto }}>
                                                    {pedido.producto}
                                                </TableCell>
                                                <TableCell align="center" sx={{ color: colorTexto, minWidth: 90 }}>
                                                    {pedido.precio} €
                                                </TableCell>
                                                <TableCell align="center" sx={{ color: colorTexto }}>
                                                    {pedido.unidades}
                                                </TableCell>
                                                <TableCell align="center" sx={{ color: colorTexto }}>
                                                    {pedido.estado}
                                                </TableCell>
                                                <TableCell align="center" sx={{ color: colorTexto, minWidth: 110 }}>
                                                    {pedido.fecha_pedido}
                                                </TableCell>
                                                <TableCell align="center" sx={{ color: colorTexto, minWidth: 110 }}>
                                                    {pedido.fecha_entrega ? pedido.fecha_entrega : "Sin entrega prevista"}
                                                </TableCell>
                                                <TableCell align="center" sx={{ color: colorTexto }}>
                                                    {pedido.id_cliente_Cliente.nombre}
                                                </TableCell>
                                                <TableCell align="center" sx={{ color: colorTexto, minWidth: 112 }}>
                                                    <Tooltip title="Editar pedido" placement="top">
                                                        <IconButton aria-label="editar" onClick={() => handleMostrarDialogoModificar(pedido)}>
                                                            <EditIcon sx={{ color: "#24c55e" }} />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="Eliminar pedido" placement="top">
                                                        <IconButton aria-label="eliminar" onClick={() => handleMostrarDialogoBorrar(pedido)}>
                                                            <DeleteIcon sx={{ color: "#fa0202" }} />
                                                        </IconButton>
                                                    </Tooltip>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                        {emptyRows > 0 && (
                                            <TableRow style={{ height: 53 * emptyRows }}>
                                                <TableCell colSpan={9} />
                                            </TableRow>
                                        )}
                                    </TableBody>
                                    <TableFooter>
                                        <TableRow>
                                            <TablePagination
                                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                                colSpan={9}
                                                count={pedidos.length}
                                                rowsPerPage={rowsPerPage}
                                                page={page}
                                                sx={{
                                                    color: colorTexto,
                                                    '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
                                                        marginTop: '1rem',
                                                    }
                                                }}
                                                onPageChange={handleChangePage}
                                                onRowsPerPageChange={handleChangeRowsPerPage}
                                                ActionsComponent={TablePaginationActions}
                                                labelRowsPerPage="Registros por página"
                                                labelDisplayedRows={({ from, to, count, page }) => {
                                                    return `${from}-${to} de ${count !== -1 ? count : `más de ${to}`}`;
                                                }}
                                            />
                                        </TableRow>
                                    </TableFooter>
                                </Table>
                            </TableContainer>
                            <Dialog
                                open={abrirDialogoModificar}
                                onClose={() => setAbrirDialogoModificar(false)}
                                fullWidth={true}
                                maxWidth="md"
                            >
                                <DialogTitle sx={{ backgroundColor: colorFondo }}>
                                    <Typography variant="h4" align="center" sx={{ color: colorTexto }}>
                                        MODIFICAR PEDIDO {pedidoSeleccionado.id_pedido}
                                    </Typography>
                                </DialogTitle>
                                <DialogContent sx={{ backgroundColor: colorFondo, p: 5 }}>
                                    {pedidoSeleccionado.estado === "Entregado"
                                        ?
                                        <Typography variant="body1" align="center" color="error" sx={{ marginBottom: 3, fontSize: "1.3em" }}>
                                            No debe de modificar un pedido que ya ha sido entregado
                                        </Typography>
                                        :
                                        ""
                                    }
                                    <Grid2 container direction="row" justifyContent="center" alignItems="center" spacing={2} sx={{ marginBottom: 3 }}>
                                        <LocalizationProvider
                                            dateAdapter={AdapterDayjs}
                                            adapterLocale="es" // Asegura el formato español (DD/MM/YYYY)
                                            localeText={esES.components.MuiLocalizationProvider.defaultProps.localeText} // Traducir el texto del picker
                                        >
                                            <Grid2 item size={{ xs: 12, md: 6, lg: 6 }}>
                                                <DemoContainer components={["DatePicker"]}>
                                                    <DatePicker
                                                        label="Fecha de recogida"
                                                        format="DD/MM/YYYY" // Cambia el orden a Día/Mes/Año
                                                        sx={estilosTextField}
                                                        readOnly={pedidoSeleccionado.estado === "Entregado"}
                                                        value={dayjs(pedidoSeleccionado.fecha_pedido)}
                                                        onChange={(nuevaFecha) => handleFechaPedidoChange(nuevaFecha)}
                                                        slotProps={{
                                                            textField: {
                                                                variant: 'standard',
                                                                color: colorFondo === '#FFFFFF' ? 'success' : 'default',
                                                                focused: true,
                                                                fullWidth: true,
                                                                required: true,
                                                                InputProps: {
                                                                    startAdornment: (
                                                                        <InputAdornment position="start">
                                                                            <CalendarMonthIcon sx={{ color: colorIcono }} />
                                                                        </InputAdornment>
                                                                    ),
                                                                    sx: { color: colorTexto }
                                                                },
                                                            },
                                                            inputAdornment: {
                                                                position: 'start',
                                                            },
                                                        }}
                                                    />
                                                </DemoContainer>
                                            </Grid2>
                                            <Grid2 item size={{ xs: 12, md: 6, lg: 6 }}>
                                                <DemoContainer components={["DatePicker"]}>
                                                    <DatePicker
                                                        label="Fecha de entrega"
                                                        format="DD/MM/YYYY" // Cambia el orden a Día/Mes/Año
                                                        sx={estilosTextField}
                                                        value={pedidoSeleccionado.fecha_entrega ? dayjs(pedidoSeleccionado.fecha_entrega) : null}
                                                        onChange={(nuevaFecha) => handleFechaEntregaChange(nuevaFecha)}
                                                        readOnly={pedidoSeleccionado.estado === "Entregado"}
                                                        slotProps={{
                                                            textField: {
                                                                variant: 'standard',
                                                                color: colorFondo === '#FFFFFF' ? 'success' : 'default',
                                                                focused: true,
                                                                fullWidth: true,
                                                                InputProps: {
                                                                    startAdornment: (
                                                                        <InputAdornment position="start">
                                                                            <CalendarMonthIcon sx={{ color: colorIcono }} />
                                                                        </InputAdornment>
                                                                    ),
                                                                    sx: { color: colorTexto }
                                                                },
                                                            },
                                                            inputAdornment: {
                                                                position: 'start',
                                                            },
                                                        }}
                                                    />
                                                </DemoContainer>
                                            </Grid2>
                                        </LocalizationProvider>
                                    </Grid2>

                                    <TextField
                                        id="idPedido"
                                        label="Id Pedido"
                                        value={pedidoSeleccionado.id_pedido}
                                        slotProps={{
                                            input: {
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <ScreenSearchDesktopIcon sx={{ color: colorIcono }} />
                                                    </InputAdornment>
                                                ),
                                                sx: { color: colorTexto, marginBottom: 2 }
                                            },
                                        }}
                                        variant="standard"
                                        color={colorFondo === '#FFFFFF' ? 'success' : 'default'}
                                        focused
                                        fullWidth
                                        aria-readonly
                                        sx={estilosTextField}
                                    />
                                    <TextField
                                        id="productoPedido"
                                        label="Producto pedido"
                                        value={pedidoSeleccionado.producto}
                                        onChange={(e) => setPedidoSeleccionado({ ...pedidoSeleccionado, producto: e.target.value })}
                                        required
                                        slotProps={{
                                            input: {
                                                readOnly: pedidoSeleccionado.estado === "Entregado",
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <SellIcon sx={{ color: colorIcono, marginBottom: 2 }} />
                                                    </InputAdornment>
                                                ),
                                                sx: { color: colorTexto }
                                            },
                                        }}
                                        variant="standard"
                                        color={colorFondo === '#FFFFFF' ? 'success' : 'default'}
                                        focused
                                        fullWidth
                                        sx={estilosTextField}
                                    />
                                    <InputLabel id="clientePedidoLabel" sx={{ color: colorFondo === "#FFFFFF" ? "#2e7d32" : "#FFFFFF", fontSize: "0.8em" }}>
                                        Cliente *
                                    </InputLabel>
                                    <Select
                                        labelId="clientePedidoLabel"
                                        id="clientePedido"
                                        value={pedidoSeleccionado.id_cliente_Cliente ? pedidoSeleccionado.id_cliente_Cliente.id_cliente : ""}
                                        onChange={(e) => setPedidoSeleccionado({ ...pedidoSeleccionado, id_cliente_Cliente: { id_cliente: e.target.value } })}
                                        variant="standard"
                                        color={colorFondo === '#FFFFFF' ? 'success' : 'default'}
                                        fullWidth
                                        required
                                        readOnly={pedidoSeleccionado.estado === "Entregado"}
                                        displayEmpty={true}
                                        sx={{
                                            color: colorTexto,
                                            '& .MuiSelect-icon': {
                                                color: `${colorTexto} !important`,
                                            },
                                            borderBottom: colorFondo === '#FFFFFF' ? '2px solid #24c55e' : '2px solid #ffffff',
                                            marginBottom: 2
                                        }}
                                        MenuProps={{
                                            PaperProps: {
                                                sx: {
                                                    backgroundColor: colorFondo,
                                                    color: colorTexto,
                                                    '& .MuiMenuItem-root': {
                                                        color: colorTexto,
                                                        '&:hover': {
                                                            backgroundColor: colorFondo === '#FFFFFF' ? '#f5f5f5' : '#333333',
                                                        },
                                                        '&.Mui-selected': {
                                                            backgroundColor: colorFondo === '#FFFFFF' ? '#e0e0e0' : '#444444',
                                                        },
                                                        '&.Mui-selected:hover': {
                                                            backgroundColor: colorFondo === '#FFFFFF' ? '#e0e0e0' : '#444444',
                                                        },
                                                    },
                                                },
                                            },
                                        }}
                                    >
                                        <MenuItem disabled value="">
                                            <em>Seleccione un cliente</em>
                                        </MenuItem>
                                        {clientes.map((cliente) => (
                                            <MenuItem key={cliente.id_cliente} value={cliente.id_cliente}>
                                                <em>{cliente.nombre}</em>
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    <TextField
                                        id="precioProducto"
                                        label="Precio de producto"
                                        value={pedidoSeleccionado.precio}
                                        onChange={(e) => setPedidoSeleccionado({ ...pedidoSeleccionado, precio: e.target.value })}
                                        type="number"
                                        slotProps={{
                                            input: {
                                                readOnly: pedidoSeleccionado.estado === "Entregado",
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <LocalAtmIcon sx={{ color: colorIcono }} />
                                                    </InputAdornment>
                                                ),
                                                sx: { color: colorTexto, marginBottom: 2 }
                                            },
                                        }}
                                        variant="standard"
                                        color={colorFondo === '#FFFFFF' ? 'success' : 'default'}
                                        focused
                                        fullWidth
                                        sx={estilosTextField}
                                    />
                                    <TextField
                                        id="unidadesProducto"
                                        label="Unidades de producto"
                                        value={pedidoSeleccionado.unidades}
                                        onChange={(e) => setPedidoSeleccionado({ ...pedidoSeleccionado, unidades: e.target.value })}
                                        type="number"
                                        slotProps={{
                                            input: {
                                                readOnly: pedidoSeleccionado.estado === "Entregado",
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <AddShoppingCartIcon sx={{ color: colorIcono }} />
                                                    </InputAdornment>
                                                ),
                                                sx: { color: colorTexto, marginBottom: 2 }
                                            },
                                        }}
                                        variant="standard"
                                        color={colorFondo === '#FFFFFF' ? 'success' : 'default'}
                                        focused
                                        fullWidth
                                        sx={estilosTextField}
                                    />
                                    <InputLabel id="estadoProductoLabel" sx={{ color: colorFondo === "#FFFFFF" ? "#2e7d32" : "#FFFFFF", fontSize: "0.8em" }}>
                                        Estado del pedido *
                                    </InputLabel>
                                    <Select
                                        labelId="estadoProductoLabel"
                                        id="estadoProducto"
                                        value={pedidoSeleccionado.estado}
                                        onChange={(e) => setPedidoSeleccionado({ ...pedidoSeleccionado, estado: e.target.value })}
                                        variant="standard"
                                        color={colorFondo === '#FFFFFF' ? 'success' : 'default'}
                                        fullWidth
                                        required
                                        displayEmpty={true}
                                        renderValue={(selected) => {
                                            switch (selected) {
                                                case 'Procesando':
                                                    return 'Pedido en proceso';
                                                case 'Pedido':
                                                    return 'Pedido procesado';
                                                case 'Reparto':
                                                    return 'En reparto';
                                                case 'Entregado':
                                                    return 'Entregado';
                                                default:
                                                    return 'Seleccione el estado del pedido';
                                            }
                                        }}
                                        sx={{
                                            color: colorTexto,
                                            '& .MuiSelect-icon': {
                                                color: `${colorTexto} !important`,
                                            },
                                            borderBottom: colorFondo === '#FFFFFF' ? '2px solid #24c55e' : '2px solid #ffffff',
                                            marginBottom: 2
                                        }}
                                        MenuProps={{
                                            PaperProps: {
                                                sx: {
                                                    backgroundColor: colorFondo,
                                                    color: colorTexto,
                                                    '& .MuiMenuItem-root': {
                                                        color: colorTexto,
                                                        '&:hover': {
                                                            backgroundColor: colorFondo === '#FFFFFF' ? '#f5f5f5' : '#333333',
                                                        },
                                                        '&.Mui-selected': {
                                                            backgroundColor: colorFondo === '#FFFFFF' ? '#e0e0e0' : '#444444',
                                                        },
                                                        '&.Mui-selected:hover': {
                                                            backgroundColor: colorFondo === '#FFFFFF' ? '#e0e0e0' : '#444444',
                                                        },
                                                    },
                                                },
                                            },
                                        }}
                                    >
                                        <MenuItem disabled value="">
                                            <em style={{ color: colorTexto }}>Seleccione el estado del pedido</em>
                                        </MenuItem>
                                        <MenuItem value="Procesando">
                                            <ListItemIcon>
                                                <HourglassBottomIcon sx={{ color: "#fa7107" }} />
                                            </ListItemIcon>
                                            <ListItemText sx={{ color: colorTexto }}>Pedido en proceso</ListItemText>
                                        </MenuItem>
                                        <MenuItem value="Pedido">
                                            <ListItemIcon>
                                                <FactCheckIcon sx={{ color: "#ffee00" }} />
                                            </ListItemIcon>
                                            <ListItemText sx={{ color: colorTexto }}>Pedido procesado</ListItemText>
                                        </MenuItem>
                                        <MenuItem value="Reparto">
                                            <ListItemIcon>
                                                <LocalShippingIcon sx={{ color: "#002fff" }} />
                                            </ListItemIcon>
                                            <ListItemText sx={{ color: colorTexto }}>En reparto</ListItemText>
                                        </MenuItem>
                                        <MenuItem value="Entregado">
                                            <ListItemIcon>
                                                <MarkunreadMailboxIcon sx={{ color: "#24c55e" }} />
                                            </ListItemIcon>
                                            <ListItemText sx={{ color: colorTexto }}>Entregado</ListItemText>
                                        </MenuItem>
                                    </Select>
                                    <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", width: "100%", mt: 3 }}>
                                        <Typography variant="body1" className="easyOrders" align="right" sx={{ color: colorTexto, textDecoration: "underline", fontSize: "1.1em" }}>
                                            Total del pedido: {pedidoSeleccionado.unidades * pedidoSeleccionado.precio} €
                                        </Typography>
                                    </Box>
                                </DialogContent>
                                <DialogActions sx={{ backgroundColor: colorFondo }}>
                                    <Button onClick={() => setAbrirDialogoModificar(false)}>Cancelar</Button>
                                    <Button color="success" onClick={handleProcesarModificacion}>Modificar</Button>
                                </DialogActions>
                            </Dialog>
                            <Dialog
                                open={abrirDialogoBorrar}
                                onClose={() => setAbrirDialogoBorrar(false)}
                                aria-labelledby="dialogoBorrarPedidoTitulo"
                                aria-describedby="dialogoBorrarPedidoDescripcion"
                            >
                                <DialogTitle id="dialogoBorrarPedidoTitulo" sx={{ color: colorTexto, backgroundColor: colorFondo }}>
                                    {"Eliminar el pedido"}
                                </DialogTitle>
                                <DialogContent sx={{ backgroundColor: colorFondo }}>
                                    <DialogContentText id="dialogoBorrarPedidoDescripcion" sx={{ color: colorTexto }}>
                                        {`Estas seguro de que quieres eliminar el pedido numero "${pedidoSeleccionado.id_pedido}" asociado al cliente ${pedidoSeleccionado.id_cliente_Cliente ? pedidoSeleccionado.id_cliente_Cliente.nombre : ""}?`}
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions sx={{ backgroundColor: colorFondo }}>
                                    <Button onClick={() => setAbrirDialogoBorrar(false)} autoFocus>Cancelar</Button>
                                    <Button onClick={() => handleProcesarEliminacion()} color='error'>Aceptar</Button>
                                </DialogActions>
                            </Dialog>
                            <Dialog
                                open={abrirDialogoInformacion}
                                onClose={() => setAbrirDialogoInformacion(false)}
                                aria-labelledby="dialogoInformacionClienteTitulo"
                                aria-describedby="dialogoInformacionClienteDescripcion"
                            >
                                <DialogTitle id="dialogoInformacionClienteTitulo" sx={{ color: colorTexto, backgroundColor: colorFondo }}>
                                    {"INFORMACION"}
                                </DialogTitle>
                                <DialogContent sx={{ backgroundColor: colorFondo }}>
                                    <DialogContentText id="dialogoInformacionClienteDescripcion" sx={{ color: colorTexto }}>
                                        {mensajeDialogoInformacion}
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions sx={{ color: colorTexto, backgroundColor: colorFondo }}>
                                    <Button onClick={() => setAbrirDialogoInformacion(false)} autoFocus>Aceptar</Button>
                                </DialogActions>
                            </Dialog>
                        </>
            }
        </Box>
    );
}

export default ListaPedidos;