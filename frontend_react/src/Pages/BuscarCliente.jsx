import { Avatar, Box, Button, Card, CardContent, CardMedia, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid2, IconButton, InputAdornment, InputBase, InputLabel, ListItemIcon, ListItemText, MenuItem, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableFooter, TablePagination, TableRow, TextField, Tooltip, Typography, useTheme } from "@mui/material";
import { useTema } from "../Componentes/TemaProvider";
import { motion } from "framer-motion";
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TransgenderIcon from '@mui/icons-material/Transgender';
import Male from '@mui/icons-material/Male';
import Female from '@mui/icons-material/Female';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import FolderDeleteIcon from '@mui/icons-material/FolderDelete';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import BadgeIcon from '@mui/icons-material/Badge';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import CloseIcon from '@mui/icons-material/Close';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { apiUrl } from "../config";

/**
 * Componente para buscar un cliente por nombre de usuario.
 * @returns {JSX.Element} El componente de búsqueda de cliente.
 */
function BuscarCliente() {
    const { colorFondo, colorTexto, colorIcono } = useTema();
    const [searchText, setSearchText] = useState("");
    const [clienteBusqueda, setClienteBusqueda] = useState(null);
    const [clienteModificar, setClienteModificar] = useState(null);
    const [mensajeDialogoInformacion, setMensajeDialogoInformacion] = useState("");
    const [openDialogoInformacion, setOpenDialogoInformacion] = useState(false);
    const [loadingSearch, setLoadingSearch] = useState(false);
    const [abrirDialogoModificar, setAbrirDialogoModificar] = useState(false);
    const [listoParaModificar, setListoParaModificar] = useState(false);
    const [nombreCliente, setNombreCliente] = useState("");
    const [abrirDialogoInformacion, setAbrirDialogoInformacion] = useState(false);
    const [abrirDialogoBorrar, setAbrirDialogoBorrar] = useState(false);
    const [listoParaEliminar, setListoParaEliminar] = useState(false);
    const [abrirDialogoPedidos, setAbrirDialogoPedidos] = useState(false);
    const [pedidosCliente, setPedidosCliente] = useState(null);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);

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
     * Componente para mostrar la imagen con botones de acción al hacer hover.
     * @returns {JSX.Element} El componente de imagen con botones de acción.
     */
    const HoverImage = () => {
        return (
            <Box
                sx={{
                    position: 'relative',
                    // Al hacer hover en este contenedor, los botones (que tienen clase "hover-buttons") se muestran
                    '&:hover .hover-buttons': { opacity: 1 },
                }}
            >
                <CardMedia
                    component="img"
                    alt={clienteBusqueda.nombre}
                    height="400"
                    image={
                        clienteBusqueda.imagen
                            ? `data:image/png;base64,${clienteBusqueda.imagen}`
                            : "/static/images/ImagenPerfilPorDefecto.png"
                    }
                />
                <Box
                    className="hover-buttons"
                    sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                        opacity: 0,
                        transition: 'opacity 0.3s',
                    }}
                >
                    <Tooltip title="Editar cliente" placement="left">
                        <IconButton sx={{ backgroundColor: colorFondo }} onClick={handleMostrarDialogoModificar}>
                            <EditIcon sx={{ color: colorIcono }} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Eliminar cliente" placement="left" onClick={handleMostrarDialogoBorrar}>
                        <IconButton sx={{ backgroundColor: colorFondo }}>
                            <DeleteIcon sx={{ color: colorIcono }} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Ver pedidos asociados" placement="left" onClick={handleMostrarDialogoPedidos}>
                        <IconButton sx={{ backgroundColor: colorFondo }}>
                            <ShoppingCartCheckoutIcon sx={{ color: colorIcono }} />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Box>
        );
    };

    /**
     * Variantes de animación para los elementos.
     */
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    /**
     * Obtiene el ícono correspondiente al sexo del cliente.
     * @returns {JSX.Element} El ícono del sexo del cliente.
     */
    const getIcono = () => {
        switch (clienteBusqueda.sexo) {
            case "H": return <Male sx={{ color: "#006bf7" }} />;
            case "M": return <Female sx={{ color: "#f70067" }} />;
            default: return <TransgenderIcon sx={{ color: "#a500f7" }} />;
        }
    };

    /**
     * Muestra el diálogo para modificar un cliente.
     */
    const handleMostrarDialogoModificar = () => {
        setClienteModificar(clienteBusqueda);
        setNombreCliente(clienteBusqueda.nombre);
        setAbrirDialogoModificar(true);
    };

    /**
     * Procesa la modificación de un cliente.
     */
    const handleProcesarModificacion = () => {
        setListoParaModificar(true);
        setAbrirDialogoModificar(false);
    };

    /**
     * Maneja el cambio de imagen del cliente.
     * @param {Object} event - El evento de cambio de imagen.
     */
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const dataUrl = reader.result;
                const base64 = dataUrl.split(',')[1];
                setClienteModificar({ ...clienteModificar, imagen: base64 });
            };
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        if (clienteBusqueda) {
            console.log("Cliente encontrado:", clienteBusqueda);
            setClienteModificar(clienteBusqueda);
        }
    }, [clienteBusqueda]);

    /**
     * Elimina la imagen del cliente.
     */
    const handleImageRemove = () => {
        setClienteModificar({ ...clienteModificar, imagen: "" });
    };

    /**
     * Muestra el diálogo para eliminar un cliente.
     */
    const handleMostrarDialogoBorrar = () => {
        setAbrirDialogoBorrar(true);
    };

    /**
     * Procesa la eliminación de un cliente.
     */
    const handleProcesarEliminacion = () => {
        setListoParaEliminar(true);
        setAbrirDialogoBorrar(false);
    };

    /**
     * Maneja la búsqueda de un cliente.
     * @param {Object} e - El evento de búsqueda.
     */
    const handleSearch = (e) => {
        e.preventDefault();
        realizarBusqueda(searchText);
    }

    /**
     * Muestra el diálogo de pedidos del cliente.
     */
    const handleMostrarDialogoPedidos = async () => {
        await buscarPedidosCliente();
        setAbrirDialogoPedidos(true);
    }

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

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - pedidosCliente.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    /**
     * Modifica un cliente.
     */
    useEffect(() => {
        async function modificarCliente() {
            try {
                console.log("clienteModificar: ", clienteModificar);
                const response = await fetch(apiUrl + '/clientes/modificarcliente/' + clienteModificar.id_cliente, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },

                    body: JSON.stringify({
                        usuario: clienteModificar.usuario,
                        nombre: clienteModificar.nombre,
                        apellidos: clienteModificar.apellidos,
                        correo: clienteModificar.correo,
                        telefono: clienteModificar.telefono,
                        imagen: clienteModificar.imagen,
                        direccion: clienteModificar.direccion,
                        sexo: clienteModificar.sexo
                    })
                });
                const data = await response.json();
                if (response.ok) {
                    setMensajeDialogoInformacion("El cliente " + clienteBusqueda.nombre + " ha sido modificado correctamente");
                } else {
                    setMensajeDialogoInformacion(data.mensaje);
                }
            } catch (error) {
                setMensajeDialogoInformacion("Error al modificar el cliente " + clienteBusqueda.nombre + " " + error);
            }

            setListoParaModificar(false);
            setAbrirDialogoInformacion(true);
            setClienteBusqueda(clienteModificar);

        }
        if (listoParaModificar) {
            modificarCliente();
        }

    }, [listoParaModificar]);

    /**
     * Elimina un cliente.
     */
    useEffect(() => {
        async function eliminarCliente() {
            try {
                const respuesta = await fetch(apiUrl + `/clientes/eliminarcliente/${clienteBusqueda.id_cliente}`, {
                    method: "DELETE"
                });
                if (respuesta.ok) {
                    setMensajeDialogoInformacion("El cliente " + clienteBusqueda.nombre + " ha sido eliminado correctamente");
                } else {
                    setMensajeDialogoInformacion("Error al eliminar el cliente " + clienteBusqueda.nombre);
                }
            } catch (error) {
                setMensajeDialogoInformacion("Error al eliminar el cliente " + clienteBusqueda.nombre + " " + error);
            }

            setClienteBusqueda(null);
            setClienteModificar(null);
            setSearchText("");
            setListoParaEliminar(false);
            setAbrirDialogoInformacion(true);
        }

        if (listoParaEliminar) {
            eliminarCliente();
        }

    }, [listoParaEliminar]);

    /**
     * Realiza la búsqueda de un cliente por nombre de usuario.
     * @param {string} nombreUsuario - El nombre de usuario del cliente.
     */
    async function realizarBusqueda(nombreUsuario) {
        setLoadingSearch(true);
        try {
            if (nombreUsuario === "") {
                setMensajeDialogoInformacion("El nombre de usuario no puede estar vacio");
                setOpenDialogoInformacion(true);
            } else {
                const response = await fetch(apiUrl + `/clientes/buscarcliente/${nombreUsuario}`, {
                    method: 'POST',
                });
                const data = await response.json();
                if (response.ok) {
                    setClienteBusqueda(data.datos);
                    console.log("UseEffect busqueda " + clienteBusqueda);
                } else {
                    setMensajeDialogoInformacion(data.mensaje);
                    setOpenDialogoInformacion(true);
                }
            }
        } catch (error) {
            setMensajeDialogoInformacion("Error al buscar el cliente " + error);
            setOpenDialogoInformacion(true);
        }
        setLoadingSearch(false);

    }

    /**
     * Busca los pedidos asociados a un cliente.
     */
    async function buscarPedidosCliente() {
        try {
            const response = await fetch(apiUrl + `/pedidos/pedidoscliente/${clienteBusqueda.id_cliente}`, {
                method: 'POST',
            });
            const data = await response.json();
            if (response.ok) {
                if (data.datos.length > 0) {
                    setPedidosCliente(data.datos);
                } else {
                    setPedidosCliente(null);
                }
            } else {
                setPedidosCliente(null);
                setMensajeDialogoInformacion(data.mensaje);
                setOpenDialogoInformacion(true);
            }
        } catch (error) {
            setPedidosCliente(null);
            setMensajeDialogoInformacion("Error al buscar los pedidos del cliente " + clienteBusqueda.nombre + " " + error);
            setOpenDialogoInformacion(true);
        }
    }

    return (
        <Box sx={{ p: 5 }}>
            <Typography variant="h2" className="easyOrders" align="center" sx={{ color: colorTexto, marginBottom: 5, fontSize: "3em" }}>
                Buscar un cliente por nombre de usuario
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Paper
                    component="form"
                    sx={{
                        p: '2px 4px',
                        display: 'flex',
                        width: 750,
                        minWidth: 150,
                        maxWidth: '100%',
                        backgroundColor: colorFondo,
                        borderRadius: 30,
                        border: colorFondo === "#FFFFFF" ? "1px solid #24c55e" : "1px solid #FFFFFF"
                    }}
                    onSubmit={handleSearch}
                >
                    <InputBase
                        sx={{ ml: 1, flex: 1, color: colorTexto }}
                        placeholder="Nombre de usuario del cliente"
                        inputProps={{ 'aria-label': 'buscarCliente' }}
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <IconButton type="button" sx={{ p: '10px' }} aria-label="buscar" onClick={handleSearch}>
                        <SearchIcon sx={{ color: colorIcono }} />
                    </IconButton>
                </Paper>
            </Box>
            {
                clienteBusqueda !== null ?
                    loadingSearch ?
                        <CircularProgress color={colorFondo === "#FFFFFF" ? "success" : "white"} size={65} sx={{ display: "block", margin: "auto" }} />
                        :
                        <>
                            <Grid2 container spacing={2} sx={{ marginTop: 10, borderLeft: "5px solid #24c55e" }}>
                                <Grid2 item size={{ xs: 12, sm: 12, md: 5, lg: 4 }}>
                                    <HoverImage />
                                </Grid2>
                                <Grid2 item size={{ xs: 12, sm: 12, md: 5, lg: 4 }} sx={{ pl: 3 }}>
                                    <motion.div initial="hidden" animate="visible" variants={itemVariants}>
                                        <Typography
                                            gutterBottom
                                            variant="h4"
                                            component="div"
                                            sx={{ color: colorTexto, marginBottom: 3, fontSize: "2.7em" }}
                                        >
                                            {clienteBusqueda.nombre + " " + clienteBusqueda.apellidos} {getIcono()}
                                        </Typography>
                                    </motion.div>
                                    {[
                                        { icon: <PersonIcon sx={{ color: colorIcono }} />, label: "Nombre de usuario", value: clienteBusqueda.usuario },
                                        { icon: <EmailIcon sx={{ color: colorIcono }} />, label: "Correo", value: clienteBusqueda.correo },
                                        { icon: <PhoneIcon sx={{ color: colorIcono }} />, label: "Número de teléfono", value: clienteBusqueda.telefono },
                                        { icon: <HomeIcon sx={{ color: colorIcono }} />, label: "Dirección", value: clienteBusqueda.direccion || "No especificada" }
                                    ].map((item, index) => (
                                        <motion.div key={index} initial="hidden" animate="visible" variants={itemVariants}>
                                            <Typography variant="body1" sx={{ color: colorTexto, mb: 2, display: "flex", alignItems: "center" }}>
                                                {item.icon}
                                                <strong style={{ marginLeft: 5, marginRight: 5 }}>{item.label}:</strong> {item.value}
                                            </Typography>
                                        </motion.div>
                                    ))}
                                </Grid2>
                            </Grid2>
                            <Dialog
                                open={abrirDialogoModificar}
                                onClose={() => setAbrirDialogoModificar(false)}
                                fullWidth={true}
                            >
                                <DialogTitle sx={{ backgroundColor: colorFondo }}>
                                    <Typography variant="h4" align="center" sx={{ color: colorTexto }}>
                                        MODIFICAR CLIENTE {nombreCliente.toUpperCase()}
                                    </Typography>
                                </DialogTitle>
                                <DialogContent sx={{ backgroundColor: colorFondo, display: "flex", flexDirection: "column", alignItems: "center" }}>
                                    <Avatar
                                        src={clienteModificar ? `data:image/*;base64,${clienteModificar.imagen}` : null}
                                        sx={{ width: 140, height: 140 }}
                                    />
                                    <Stack direction="row" spacing={2} sx={{ marginBottom: 5, marginTop: 2 }}>
                                        <input
                                            accept="image/*"
                                            id="upload-image"
                                            type="file"
                                            style={{ display: "none" }}
                                            onChange={handleImageChange}
                                        />
                                        <label htmlFor="upload-image">
                                            <Button
                                                variant="contained"
                                                component="span"
                                                startIcon={<CloudUploadIcon />}
                                                color="success"
                                            >
                                                Subir Imagen
                                            </Button>
                                        </label>
                                        <Button
                                            variant="contained"
                                            startIcon={<FolderDeleteIcon />}
                                            color="error"
                                            onClick={handleImageRemove}
                                        >
                                            Borrar Imagen
                                        </Button>
                                    </Stack>
                                    <TextField
                                        id="idCliente"
                                        label="Id Cliente"
                                        value={clienteBusqueda.id_cliente}
                                        slotProps={{
                                            input: {
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <AccountCircle sx={{ color: colorIcono }} />
                                                    </InputAdornment>
                                                ),
                                                sx: { color: colorTexto }
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
                                        id="nombreUsuarioCliente"
                                        label="Nombre de usuario"
                                        value={clienteModificar ? clienteModificar.usuario : ""}
                                        onChange={(e) => setClienteModificar({ ...clienteModificar, usuario: e.target.value })}
                                        slotProps={{
                                            input: {
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <AccountCircle sx={{ color: colorIcono }} />
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
                                    <TextField
                                        id="correoCliente"
                                        label="Correo electrónico"
                                        value={clienteModificar ? clienteModificar.correo : ""}
                                        onChange={(e) => setClienteModificar({ ...clienteModificar, correo: e.target.value })}
                                        slotProps={{
                                            input: {
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <ContactMailIcon sx={{ color: colorIcono }} />
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
                                    <TextField
                                        id="nombreCliente"
                                        label="Nombre"
                                        value={clienteModificar ? clienteModificar.nombre : ""}
                                        onChange={(e) => setClienteModificar({ ...clienteModificar, nombre: e.target.value })}
                                        slotProps={{
                                            input: {
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <BadgeIcon sx={{ color: colorIcono }} />
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
                                    <TextField
                                        id="apellidosCliente"
                                        label="Apellidos"
                                        value={clienteModificar ? clienteModificar.apellidos : ""}
                                        onChange={(e) => setClienteModificar({ ...clienteModificar, apellidos: e.target.value })}
                                        slotProps={{
                                            input: {
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <AssignmentIndIcon sx={{ color: colorIcono }} />
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
                                    <TextField
                                        id="telefonoCliente"
                                        label="Numero de telefono"
                                        value={clienteModificar ? clienteModificar.telefono : ""}
                                        onChange={(e) => setClienteModificar({ ...clienteModificar, telefono: e.target.value })}
                                        slotProps={{
                                            input: {
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <ContactPhoneIcon sx={{ color: colorIcono }} />
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
                                    <TextField
                                        id="direccionCliente"
                                        label="Dirección"
                                        value={clienteModificar ? clienteModificar.direccion : ""}
                                        onChange={(e) => setClienteModificar({ ...clienteModificar, direccion: e.target.value })}
                                        slotProps={{
                                            input: {
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <FmdGoodIcon sx={{ color: colorIcono }} />
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
                                    <InputLabel id="sexoClienteLabel" sx={{ color: colorFondo === "#FFFFFF" ? "#2e7d32" : "#FFFFFF", fontSize: "0.8em" }}>
                                        Sexo
                                    </InputLabel>
                                    <Select
                                        labelId="sexoClienteLabel"
                                        id="sexoCliente"
                                        value={clienteModificar ? clienteModificar.sexo : ""}
                                        onChange={(e) => setClienteModificar({ ...clienteModificar, sexo: e.target.value })}
                                        variant="standard"
                                        color={colorFondo === '#FFFFFF' ? 'success' : 'default'}
                                        fullWidth
                                        displayEmpty={true}
                                        renderValue={(selected) => {
                                            switch (selected) {
                                                case 'H':
                                                    return 'Hombre';
                                                case 'M':
                                                    return 'Mujer';
                                                case 'N':
                                                    return 'No especificar';
                                                default:
                                                    return 'Seleccione su género';
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
                                            <em style={{ color: colorTexto }}>Seleccione su género</em>
                                        </MenuItem>
                                        <MenuItem value="H">
                                            <ListItemIcon>
                                                <Male sx={{ color: "#006bf7" }} />
                                            </ListItemIcon>
                                            <ListItemText>Hombre</ListItemText>
                                        </MenuItem>
                                        <MenuItem value="M">
                                            <ListItemIcon>
                                                <Female sx={{ color: "#f70067" }} />
                                            </ListItemIcon>
                                            <ListItemText>Mujer</ListItemText>
                                        </MenuItem>
                                        <MenuItem value="N">
                                            <ListItemIcon>
                                                <TransgenderIcon sx={{ color: "#a500f7" }} />
                                            </ListItemIcon>
                                            <ListItemText>No especificar</ListItemText>
                                        </MenuItem>
                                    </Select>
                                </DialogContent>
                                <DialogActions sx={{ backgroundColor: colorFondo }}>
                                    <Button onClick={() => setAbrirDialogoModificar(false)}>Cancelar</Button>
                                    <Button onClick={() => handleProcesarModificacion()}>Modificar</Button>
                                </DialogActions>
                            </Dialog>
                            <Dialog
                                open={abrirDialogoPedidos}
                                onClose={() => setAbrirDialogoPedidos(false)}
                                aria-labelledby="dialogoPedidosClienteTitulo"
                                aria-describedby="dialogoPedidosClienteDescripcion"
                                fullWidth={true}
                                maxWidth="xl"
                            >
                                <DialogTitle sx={{ m: 0, p: 2, color: colorTexto, backgroundColor: colorFondo, fontSize: "1.5em" }} id="dialogoPedidosClienteTitulo">
                                    {"Pedidos de " + clienteBusqueda.nombre + " " + clienteBusqueda.apellidos}
                                </DialogTitle>
                                <IconButton
                                    aria-label="close"
                                    onClick={() => setAbrirDialogoPedidos(false)}
                                    sx={(theme) => ({
                                        position: 'absolute',
                                        right: 8,
                                        top: 8,
                                        color: theme.palette.grey[500],
                                    })}
                                >
                                    <CloseIcon sx={{ color: colorIcono }} />
                                </IconButton>
                                <DialogContent dividers sx={{ backgroundColor: colorFondo }}>
                                    {pedidosCliente === null ?
                                        <Typography variant="h4" align="center" sx={{ color: "#fa0202", m: 5 }}>
                                            No hay pedidos asociados a este cliente
                                        </Typography>
                                        :
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
                                                    </TableRow>
                                                    {(rowsPerPage > 0
                                                        ? pedidosCliente.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                        : pedidosCliente
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
                                                                {clienteBusqueda.nombre}
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                    {emptyRows > 0 && (
                                                        <TableRow style={{ height: 53 * emptyRows }}>
                                                            <TableCell colSpan={8} />
                                                        </TableRow>
                                                    )}
                                                </TableBody>
                                                <TableFooter>
                                                    <TableRow>
                                                        <TablePagination
                                                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                                            colSpan={9}
                                                            count={pedidosCliente.length}
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
                                    }
                                </DialogContent>
                            </Dialog>
                            <Dialog
                                open={abrirDialogoBorrar}
                                onClose={() => setAbrirDialogoBorrar(false)}
                                aria-labelledby="dialogoBorrarClienteTitulo"
                                aria-describedby="dialogoBorrarClienteDescripcion"
                            >
                                <DialogTitle id="dialogoBorrarClienteTitulo" sx={{ color: colorTexto, backgroundColor: colorFondo }}>
                                    {"Eliminar cliente"}
                                </DialogTitle>
                                <DialogContent sx={{ backgroundColor: colorFondo }}>
                                    <DialogContentText id="dialogoBorrarClienteDescripcion" sx={{ color: colorTexto }}>
                                        {`Estas seguro de que quieres eliminar al cliente "${clienteBusqueda.nombre} ${clienteBusqueda.apellidos} y todos sus pedidos asociados"?`}
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
                    :
                    <>
                        {/* Cuando no se haya buscado nada todavia entonces no se mostrará nada en la interfaz */}
                    </>
            }
            <Dialog
                open={openDialogoInformacion}
                onClose={() => setOpenDialogoInformacion(false)}
                aria-labelledby="dialogoInformacionClienteTitulo"
                aria-describedby="dialogoInformacionClienteDescripcion"
            >
                <DialogTitle id="dialogoInformacionClienteTitulo" sx={{ color: colorTexto, backgroundColor: colorFondo }}>
                    {"INFORMACION DE LA BUSQUEDA"}
                </DialogTitle>
                <DialogContent sx={{ backgroundColor: colorFondo }}>
                    <DialogContentText id="dialogoInformacionClienteDescripcion" sx={{ color: colorTexto }}>
                        {mensajeDialogoInformacion}
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ color: colorTexto, backgroundColor: colorFondo }}>
                    <Button onClick={() => setOpenDialogoInformacion(false)} autoFocus>Aceptar</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default BuscarCliente;