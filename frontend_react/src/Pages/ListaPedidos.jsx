import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Tab, Typography } from "@mui/material";
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
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTema } from "../Componentes/TemaProvider";

function ListaPedidos() {
    const { colorFondo, colorTexto, colorIcono } = useTema();
    const [loading, setLoading] = useState(true);
    const [recargar, setRecargar] = useState(false);
    const [error, setError] = useState("");
    const [pedidos, setPedidos] = useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [abrirDialogoInformacion, setAbrirDialogoInformacion] = useState(false);
    const [abrirDialogoBorrar, setAbrirDialogoBorrar] = useState(false);
    const [mensajeDialogoInformacion, setMensajeDialogoInformacion] = useState("");
    const [pedidoSeleccionado, setPedidoSeleccionado] = useState({});
    const [listoParaEliminar, setListoParaEliminar] = useState(false);
    const [listoParaModificar, setListoParaModificar] = useState(false);

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

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleProcesarEliminacion = () => {
        setListoParaEliminar(true);
        setAbrirDialogoBorrar(false);
    };

    const handleMostrarDialogoBorrar = (pedido) => {
        setPedidoSeleccionado(pedido);
        setAbrirDialogoBorrar(true);
    };

    useEffect(() => {
        async function cargarPedidos() {
            setLoading(true);
            try {
                const response = await fetch("http://localhost:3000/api/pedidos/");
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
                const respuesta = await fetch(`http://localhost:3000/api/pedidos/eliminarpedido/${pedidoSeleccionado.id_pedido}`, {
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

    useEffect(() => {
        async function modPedido() {
            
        }

        if (listoParaModificar) {
            modPedido();
        }
    }, [listoParaModificar]);

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
                            <TableContainer sx={{
                                backgroundColor: colorFondo,
                                border: colorFondo === "#FFFFFF" ? "1px solid #24c55e" : "1px solid #FFFFFF",
                                boxShadow: 3,
                                borderRadius: 2,
                            }}>
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
                                        ).map((pedido) => (console.log(pedido),
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
                                                    <IconButton aria-label="editar" onClick={() => console.log("Editar pedido")}>
                                                        <EditIcon sx={{ color: "#24c55e" }} />
                                                    </IconButton>
                                                    <IconButton aria-label="eliminar" onClick={() => handleMostrarDialogoBorrar(pedido)}>
                                                        <DeleteIcon sx={{ color: "#fa0202" }} />
                                                    </IconButton>
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
                                                sx={{ color: colorTexto }}
                                                onPageChange={handleChangePage}
                                                onRowsPerPageChange={handleChangeRowsPerPage}
                                                ActionsComponent={TablePaginationActions}
                                            />
                                        </TableRow>
                                    </TableFooter>
                                </Table>
                            </TableContainer>
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