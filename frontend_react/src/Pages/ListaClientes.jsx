import { Avatar, Box, CircularProgress, Grid2, InputAdornment, InputLabel, ListItemIcon, ListItemText, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import * as React from 'react';
import Button from '@mui/material/Button';
import { useTema } from "../Componentes/TemaProvider";
import { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import ModeIcon from '@mui/icons-material/Mode';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import TransgenderIcon from '@mui/icons-material/Transgender';
import Male from '@mui/icons-material/Male';
import Female from '@mui/icons-material/Female';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import FolderDeleteIcon from '@mui/icons-material/FolderDelete';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import BadgeIcon from '@mui/icons-material/Badge';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import FmdGoodIcon from '@mui/icons-material/FmdGood';

function ListaClientes() {
    const { colorFondo, colorTexto, colorIcono } = useTema();
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [clientes, setClientes] = useState([]);
    const [recargarClientes, setRecargarClientes] = useState(false);
    const [clienteSeleccionado, setClienteSeleccionado] = useState({});
    const [abrirDialogoModificar, setAbrirDialogoModificar] = useState(false);
    const [listoParaModificar, setListoParaModificar] = useState(false);
    const [nombreClienteSeleccionado, setNombreClienteSeleccionado] = useState("");
    const [abrirDialogoBorrar, setAbrirDialogoBorrar] = useState(false);
    const [listoParaEliminar, setListoParaEliminar] = useState(false);
    const [abrirDialogoInformacion, setAbrirDialogoInformacion] = useState(false);
    const [mensajeDialogoInformacion, setMensajeDialogoInformacion] = useState("");

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
            setCargando(false);
        }

        cargarClientes();
    }, [recargarClientes]);

    useEffect(() => {
        async function eliminarCliente() {
            try {
                const respuesta = await fetch(`http://localhost:3000/api/clientes/eliminarcliente/${clienteSeleccionado.id_cliente}`, {
                    method: "DELETE"
                });
                if (respuesta.ok) {
                    setMensajeDialogoInformacion("El cliente " + clienteSeleccionado.nombre + " ha sido eliminado correctamente");
                } else {
                    setMensajeDialogoInformacion("Error al eliminar el cliente " + clienteSeleccionado.nombre);
                }
            } catch (error) {
                setMensajeDialogoInformacion("Error al eliminar el cliente " + clienteSeleccionado.nombre + " " + error);
            }

            setListoParaEliminar(false);
            setAbrirDialogoInformacion(true);
            setRecargarClientes(!recargarClientes);
        }

        if (listoParaEliminar) {
            eliminarCliente();
        }

    }, [listoParaEliminar, clienteSeleccionado]);

    useEffect(() => {
        async function modificarCliente() {
            try {
                const response = await fetch('http://localhost:3000/api/clientes/modificarcliente/' + clienteSeleccionado.id_cliente, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        usuario: clienteSeleccionado.usuario,
                        nombre: clienteSeleccionado.nombre,
                        apellidos: clienteSeleccionado.apellidos,
                        correo: clienteSeleccionado.correo,
                        telefono: clienteSeleccionado.telefono,
                        imagen: clienteSeleccionado.imagen,
                        direccion: clienteSeleccionado.direccion,
                        sexo: clienteSeleccionado.sexo
                    })
                });
                if (response.ok) {
                    setMensajeDialogoInformacion("El cliente " + clienteSeleccionado.nombre + " ha sido modificado correctamente");
                } else {
                    setMensajeDialogoInformacion("Error al modificar el cliente " + clienteSeleccionado.nombre);
                }
            } catch (error) {
                setMensajeDialogoInformacion("Error al modificar el cliente " + clienteSeleccionado.nombre + " " + error);
            }

            setListoParaModificar(false);
            setAbrirDialogoInformacion(true);
            setRecargarClientes(!recargarClientes);
        }
        if (listoParaModificar) {
            modificarCliente();
        }

    }, [listoParaModificar, clienteSeleccionado]);

    const handleMostrarDialogoModificar = (cliente) => {
        setClienteSeleccionado(cliente);
        setNombreClienteSeleccionado(cliente.nombre);
        setAbrirDialogoModificar(true);
    };

    const handleProcesarModificacion = () => {
        setListoParaModificar(true);
        setAbrirDialogoModificar(false);
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const dataUrl = reader.result;
                const base64 = dataUrl.split(',')[1];
                setClienteSeleccionado({ ...clienteSeleccionado, imagen: base64 });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageRemove = () => {
        setClienteSeleccionado({ ...clienteSeleccionado, imagen: "" });
    };

    const handleMostrarDialogoBorrar = (cliente) => {
        setClienteSeleccionado(cliente);
        setAbrirDialogoBorrar(true);
    };

    const handleProcesarEliminacion = () => {
        setListoParaEliminar(true);
        setAbrirDialogoBorrar(false);
    };

    return (
        <Box sx={{ backgroundColor: colorFondo, minHeight: "100vh", padding: 5 }}>
            {cargando ?
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <CircularProgress color={colorFondo === "#FFFFFF" ? "success" : "white"} />
                </Box>
                :
                !error ?
                    <>
                        <Grid2 container spacing={5} sx={{ height: "100%", width: "100%" }}>
                            {clientes.map((cliente) => {
                                const getIcono = () => {
                                    switch (cliente.sexo) {
                                        case "H": return <Male sx={{ color: "#006bf7" }} />;
                                        case "M": return <Female sx={{ color: "#f70067" }} />;
                                        default: return <TransgenderIcon sx={{ color: "#a500f7" }} />;
                                    }
                                };
                                return (
                                    <Grid2 item key={cliente.id_cliente} size={{ xs: 12, md: 6, lg: 4 }}>
                                        {/* Las propiedades del card son para hacer que el boton siempre se muestre abajo */}
                                        <Card sx={{ minHeight: 560, display: "flex", flexDirection: "column", justifyContent: "space-between", backgroundColor: colorFondo }}>
                                            <Box sx={{ flexGrow: 1 }}>
                                                <CardMedia
                                                    component="img"
                                                    alt={cliente.nombre}
                                                    height="350"
                                                    image={cliente.imagen ? `data:image/png;base64,${cliente.imagen}` : "/static/images/ImagenPerfilPorDefecto.png"}
                                                />
                                                <CardContent>
                                                    <Typography gutterBottom variant="h5" component="div" sx={{ color: colorTexto, marginBottom: 1 }}>
                                                        {cliente.nombre + " " + cliente.apellidos} {getIcono()}
                                                    </Typography>
                                                    <Typography variant="body2" sx={{ color: colorTexto, marginBottom: 1 }}>
                                                        Nombre de usuario: {cliente.usuario}
                                                    </Typography>
                                                    <Typography variant="body2" sx={{ color: colorTexto, marginBottom: 1 }}>
                                                        Correo: {cliente.correo}
                                                    </Typography>
                                                    <Typography variant="body2" sx={{ color: colorTexto, marginBottom: 1 }}>
                                                        Numero de telefono: {cliente.telefono}
                                                    </Typography>
                                                    <Typography variant="body2" sx={{ color: colorTexto, marginBottom: 1 }}>
                                                        Direccion: {cliente.direccion ? cliente.direccion : "No especificada"}
                                                    </Typography>
                                                </CardContent>
                                            </Box>
                                            <CardActions sx={{ mt: "auto", p: 2, display: "flex", justifyContent: "space-between" }}>
                                                <Button variant="contained" size="small" color="success" startIcon={<ModeIcon />} onClick={() => handleMostrarDialogoModificar(cliente)}>MODIFICAR</Button>
                                                <Button variant="contained" size="small" color="error" endIcon={<PersonRemoveIcon />} onClick={() => handleMostrarDialogoBorrar(cliente)}>ELIMINAR</Button>
                                            </CardActions>
                                        </Card>
                                    </Grid2>
                                );
                            })}
                        </Grid2>
                        <Dialog
                            open={abrirDialogoModificar}
                            onClose={() => setAbrirDialogoModificar(false)}
                            fullWidth={true}
                        >
                            <DialogTitle sx={{ backgroundColor: colorFondo }}>
                                <Typography variant="h4" align="center" sx={{ color: colorTexto }}>
                                    MODIFICAR CLIENTE {nombreClienteSeleccionado.toUpperCase()}
                                </Typography>
                            </DialogTitle>
                            <DialogContent sx={{ backgroundColor: colorFondo, display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <Avatar
                                    src={clienteSeleccionado.imagen ? `data:image/*;base64,${clienteSeleccionado.imagen}` : null}
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
                                    value={clienteSeleccionado.id_cliente}
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
                                    value={clienteSeleccionado.usuario}
                                    onChange={(e) => setClienteSeleccionado({ ...clienteSeleccionado, usuario: e.target.value })}
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
                                    value={clienteSeleccionado.correo}
                                    onChange={(e) => setClienteSeleccionado({ ...clienteSeleccionado, correo: e.target.value })}
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
                                    value={clienteSeleccionado.nombre}
                                    onChange={(e) => setClienteSeleccionado({ ...clienteSeleccionado, nombre: e.target.value })}
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
                                    value={clienteSeleccionado.apellidos}
                                    onChange={(e) => setClienteSeleccionado({ ...clienteSeleccionado, apellidos: e.target.value })}
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
                                    value={clienteSeleccionado.telefono}
                                    onChange={(e) => setClienteSeleccionado({ ...clienteSeleccionado, telefono: e.target.value })}
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
                                    value={clienteSeleccionado.direccion}
                                    onChange={(e) => setClienteSeleccionado({ ...clienteSeleccionado, direccion: e.target.value })}
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
                                    value={clienteSeleccionado.sexo}
                                    onChange={(e) => setClienteSeleccionado({ ...clienteSeleccionado, sexo: e.target.value })}
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
                                    {`Estas seguro de que quieres eliminar al cliente "${clienteSeleccionado.nombre}"?`}
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
                    <Typography variant="h2" color="error" align="center">
                        {error}
                    </Typography>
            }
        </Box>
    );
}

export default ListaClientes;