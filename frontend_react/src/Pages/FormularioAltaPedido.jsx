import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Grid2, IconButton, InputAdornment, InputLabel, ListItemIcon, ListItemText, MenuItem, Select, Stack, styled, TextField, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { esES } from "@mui/x-date-pickers/locales";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { useTema } from "../Componentes/TemaProvider";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useEffect, useState } from "react";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import SellIcon from '@mui/icons-material/Sell';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import MarkunreadMailboxIcon from '@mui/icons-material/MarkunreadMailbox';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import SendIcon from '@mui/icons-material/Send';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import CloseIcon from '@mui/icons-material/Close';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

function FormularioAltaPedido() {
    const { colorFondo, colorTexto, colorIcono } = useTema();
    const [fechaPedido, setFechaPedido] = useState(null);
    const [fechaEntrega, setFechaEntrega] = useState(null);
    const [productoPedido, setProductoPedido] = useState("");
    const [precioProducto, setPrecioProducto] = useState(0);
    const [unidadesProducto, setUnidadesProducto] = useState(0);
    const [estadoProducto, setEstadoProducto] = useState("");
    const [clientePedido, setClientePedido] = useState("");
    const [clientes, setClientes] = useState([]);
    const [error, setError] = useState("");
    const [loadingInsertion, setLoadingInsertion] = useState(false);
    const [guardarPedido, setGuardarPedido] = useState(false);
    const [showDialog, setShowDialog] = useState(false);

    useEffect(() => {
        async function cargarClientes() {
            try {
                const respuesta = await fetch("http://localhost:3000/api/clientes/");
                const datos = await respuesta.json();
                if (respuesta.ok) {
                    setClientes(datos.datos);
                } else {
                    setError(datos.mensaje);
                }
            } catch (error) {
                setError("Error al recuperar los clientes " + error);
            }
        }

        cargarClientes();
    }, []);

    useEffect(() => {
        async function insertarPedido() {
            setLoadingInsertion(true);
            setGuardarPedido(false);
            try {
                const pedido = {
                    id_pedido: null,
                    producto: productoPedido,
                    fecha_pedido: fechaPedido ? fechaPedido.$y + "-" + (fechaPedido.$M + 1) + "-" + fechaPedido.$D : null, // Formato YYYY-MM-DD (formato para la bbdd)
                    fecha_entrega: fechaEntrega ? fechaEntrega.$y + "-" + (fechaEntrega.$M + 1) + "-" + fechaEntrega.$D : null, // Formato YYYY-MM-DD (formato para la bbdd)
                    precio: precioProducto,
                    unidades: unidadesProducto,
                    estado: estadoProducto,
                    id_cliente: clientePedido
                }
                const respuesta = await fetch("http://localhost:3000/api/pedidos/altapedido", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(pedido),
                });
                const data = await respuesta.json();
                setError(data.mensaje);
                setShowDialog(true);

                if (respuesta.ok) {
                    handleBorrarCampos();
                }
                setLoadingInsertion(false);

            } catch (error) {
                setError("Error al insertar el pedido " + error);
            }
        }

        if (guardarPedido) {
            insertarPedido();
        }
    }, [guardarPedido]);

    const handleFechaPedidoChange = (nuevaFecha) => {
        setFechaPedido(nuevaFecha);
    };

    const handleFechaEntregaChange = (nuevaFecha) => {
        setFechaEntrega(nuevaFecha);
    }

    const handleClientePedidoChange = (e) => {
        setClientePedido(e.target.value);
    }

    const handleEstadoProductoChange = (e) => {
        setEstadoProducto(e.target.value);
    }

    const handleBorrarCampos = () => {
        setProductoPedido("");
        setFechaPedido(null);
        setFechaEntrega(null);
        setPrecioProducto(0);
        setUnidadesProducto(0);
        setEstadoProducto("");
        setClientePedido("");
    };

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
    };

    return (
        <Box sx={{ p: 5 }}>
            <Typography variant="h2" className="easyOrders" align="center" sx={{ color: colorTexto, marginBottom: 5, fontSize: "3em" }}>
                Formulario de alta de pedido
            </Typography>
            <Grid2 container spacing={7} sx={{
                padding: 5,
                border: colorFondo === "#FFFFFF" ? "1px solid #24c55e" : "",
                boxShadow: 3,
                borderRadius: 2,
            }}>
                <Grid2 container spacing={7} item size={{ xs: 12, md: 12, lg: 4 }} sx={{ px: 5, alignItems: "center" }}>
                    <LocalizationProvider
                        dateAdapter={AdapterDayjs}
                        adapterLocale="es" // Asegura el formato español (DD/MM/YYYY)
                        localeText={esES.components.MuiLocalizationProvider.defaultProps.localeText} // Traducir el texto del picker
                    >
                        <Grid2 item size={{ xs: 12, md: 6, lg: 12 }}>
                            <DemoContainer components={["DatePicker"]}>
                                <DatePicker
                                    label="Fecha de recogida"
                                    format="DD/MM/YYYY" // Cambia el orden a Día/Mes/Año
                                    sx={estilosTextField}
                                    value={fechaPedido}
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
                        <Grid2 item size={{ xs: 12, md: 6, lg: 12 }}>
                            <DemoContainer components={["DatePicker"]}>
                                <DatePicker
                                    label="Fecha de entrega"
                                    format="DD/MM/YYYY" // Cambia el orden a Día/Mes/Año
                                    sx={estilosTextField}
                                    value={fechaEntrega}
                                    onChange={(nuevaFecha) => handleFechaEntregaChange(nuevaFecha)}
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
                <Grid2 container spacing={7} item size={{ xs: 12, md: 12, lg: 8 }} sx={{ px: 5 }}>
                    <Grid2 item container spacing={7} size={{ xs: 12, md: 12, lg: 12 }}>
                        <Grid2 item size={{ xs: 12, md: 12, lg: 6 }}>
                            <TextField
                                id="productoPedido"
                                label="Producto pedido"
                                value={productoPedido}
                                onChange={(e) => setProductoPedido(e.target.value)}
                                required
                                slotProps={{
                                    input: {
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SellIcon sx={{ color: colorIcono }} />
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
                        </Grid2>
                        <Grid2 item size={{ xs: 12, md: 12, lg: 6 }}>
                            <InputLabel id="clientePedidoLabel" sx={{ color: colorFondo === "#FFFFFF" ? "#2e7d32" : "#FFFFFF", fontSize: "0.8em" }}>
                                Cliente *
                            </InputLabel>
                            <Select
                                labelId="clientePedidoLabel"
                                id="clientePedido"
                                value={clientePedido}
                                onChange={handleClientePedidoChange}
                                variant="standard"
                                color={colorFondo === '#FFFFFF' ? 'success' : 'default'}
                                fullWidth
                                required
                                displayEmpty={true}
                                sx={{
                                    color: colorTexto,
                                    '& .MuiSelect-icon': {
                                        color: `${colorTexto} !important`,
                                    },
                                    borderBottom: colorFondo === '#FFFFFF' ? '2px solid #24c55e' : '2px solid #ffffff',
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
                        </Grid2>
                    </Grid2>
                    <Grid2 item container spacing={7} size={{ xs: 12, md: 12, lg: 12 }}>
                        <Grid2 item size={{ xs: 12, md: 12, lg: 6 }}>
                            <TextField
                                id="precioProducto"
                                label="Precio de producto"
                                value={precioProducto}
                                onChange={(e) => setPrecioProducto(e.target.value)}
                                type="number"
                                slotProps={{
                                    input: {
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LocalAtmIcon sx={{ color: colorIcono }} />
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
                        </Grid2>
                        <Grid2 item size={{ xs: 12, md: 12, lg: 6 }}>
                            <TextField
                                id="unidadesProducto"
                                label="Unidades de producto"
                                value={unidadesProducto}
                                onChange={(e) => setUnidadesProducto(e.target.value)}
                                type="number"
                                slotProps={{
                                    input: {
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <AddShoppingCartIcon sx={{ color: colorIcono }} />
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
                        </Grid2>
                    </Grid2>
                    <Grid2 item spacing={7} size={{ xs: 12, md: 12, lg: 12 }}>
                        <InputLabel id="estadoProductoLabel" sx={{ color: colorFondo === "#FFFFFF" ? "#2e7d32" : "#FFFFFF", fontSize: "0.8em" }}>
                            Estado del pedido *
                        </InputLabel>
                        <Select
                            labelId="estadoProductoLabel"
                            id="estadoProducto"
                            value={estadoProducto}
                            onChange={handleEstadoProductoChange}
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
                    </Grid2>
                </Grid2>
                <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", width: "100%", px: 5 }}>
                    <Typography variant="body2" className="easyOrders" align="right" sx={{ color: colorTexto, textDecoration: "underline" }}>
                        Total del pedido: {precioProducto * unidadesProducto} €
                    </Typography>
                </Box>
            </Grid2>
            <Stack spacing={5} direction="row" sx={{ display: "flex", justifyContent: "center", marginTop: 5 }}>
                <Button variant="contained" color="success" startIcon={<SendIcon />} onClick={() => setGuardarPedido(true)} disabled={loadingInsertion}>
                    {loadingInsertion ? <CircularProgress size="25px" color="white" thickness="5" /> : "Dar de alta"}
                </Button>
                <Button variant="contained" color="error" startIcon={<CleaningServicesIcon />} onClick={handleBorrarCampos}>
                    Borrar campos
                </Button>
            </Stack>
            <BootstrapDialog
                onClose={() => setShowDialog(false)}
                aria-labelledby="tituloDialogo"
                open={showDialog}
            >
                <DialogTitle sx={{ m: 0, p: 2, backgroundColor: colorFondo, color: colorTexto }} id="tituloDialogo">
                    INFORMACIÓN DE LA OPERACIÓN
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={() => setShowDialog(false)}
                    sx={(theme) => ({
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: theme.palette.grey[500],
                    })}
                >
                    <CloseIcon sx={{ color: colorIcono }} />
                </IconButton>
                <DialogContent sx={{ backgroundColor: colorFondo }} dividers>
                    <Typography gutterBottom sx={{ color: colorTexto }} >
                        {error}
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ backgroundColor: colorFondo }}>
                    <Button autoFocus onClick={() => setShowDialog(false)} color="success" >
                        Aceptar
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </Box>
    );
}

export default FormularioAltaPedido;