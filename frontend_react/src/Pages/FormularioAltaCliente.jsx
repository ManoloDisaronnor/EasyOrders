import { Box, Typography, Button, Avatar, Stack, Grid2, TextField, InputAdornment, IconButton, MenuItem, Select, InputLabel, ListItemIcon, ListItemText, CircularProgress } from "@mui/material";
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import { motion } from "framer-motion";
import { useTema } from "../Componentes/TemaProvider";
import React, { useEffect, useState } from "react";
import '../assets/style/estiloFuenteNavBar.css'
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AccountCircle from '@mui/icons-material/AccountCircle';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import BadgeIcon from '@mui/icons-material/Badge';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import KeyIcon from '@mui/icons-material/Key';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import TransgenderIcon from '@mui/icons-material/Transgender';
import Male from '@mui/icons-material/Male';
import Female from '@mui/icons-material/Female';
import FolderDeleteIcon from '@mui/icons-material/FolderDelete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import SendIcon from '@mui/icons-material/Send';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import { apiUrl } from "../config";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

/**
 * Componente para el formulario de alta de cliente.
 * @returns {JSX.Element} El componente del formulario de alta de cliente.
 */
function FormularioAltaCliente() {
    const { colorFondo, colorTexto, colorIcono } = useTema();
    const [image, setImage] = useState("");
    const [nombreUsuarioCliente, setNombreUsuarioCliente] = useState("");
    const [correoCliente, setCorreoCliente] = useState("");
    const [nombreCliente, setNombreCliente] = useState("");
    const [apellidosCliente, setApellidosCliente] = useState("");
    const [telefonoCliente, setTelefonoCliente] = useState("");
    const [contrasenyaCliente, setContrasenyaCliente] = useState("");
    const [direccionCliente, setDireccionCliente] = useState("");
    const [sexo, setSexo] = useState("");
    const [showPasswd, setShowPasswd] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
    const [mensajeDialog, setMensajeDialog] = useState("");
    const [guardarCliente, setGuardarCliente] = useState(false);
    const [loadingInsertion, setLoadingInsertion] = useState(false);

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
    };

    /**
     * Inserta un nuevo cliente.
     */
    useEffect(() => {
        async function insertCliente() {
            if (guardarCliente) {
                setLoadingInsertion(true);
                setGuardarCliente(false);
                try {
                    const cliente = {
                        id_cliente: null,
                        usuario: nombreUsuarioCliente,
                        nombre: nombreCliente,
                        apellidos: apellidosCliente,
                        correo: correoCliente,
                        password: contrasenyaCliente,
                        telefono: telefonoCliente,
                        imagen: image,
                        direccion: direccionCliente,
                        sexo: sexo,
                    };
                    const response = await fetch(apiUrl + "/clientes/altacliente", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(cliente),
                    });
                    const data = await response.json();
                    if (response.ok) {
                        setMensajeDialog(data.mensaje);
                        setShowDialog(true);
                        handleBorrarCampos();
                    } else {
                        setMensajeDialog(data.mensaje);
                        setShowDialog(true);
                    }

                } catch (error) {
                    setMensajeDialog("Error al insertar el cliente " + error);
                    setShowDialog(true);
                }
                setLoadingInsertion(false);
            }
        }

        if (guardarCliente) {
            insertCliente();
        }
    }, [guardarCliente]);

    /**
     * Borra los campos del formulario.
     */
    const handleBorrarCampos = () => {
        setImage("");
        setNombreUsuarioCliente("");
        setCorreoCliente("");
        setNombreCliente("");
        setApellidosCliente("");
        setTelefonoCliente("");
        setContrasenyaCliente("");
        setDireccionCliente("");
        setSexo("");
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
                setImage(base64);
            };
            reader.readAsDataURL(file);
        }
    };

    /**
     * Elimina la imagen del cliente.
     */
    const handleImageRemove = () => {
        setImage("");
    };

    /**
     * Maneja el cambio del sexo del cliente.
     * @param {Object} event - El evento de cambio.
     */
    const handleSexoChange = (event) => {
        setSexo(event.target.value);
    };

    return (
        <Box sx={{ p: 5 }}>
            <Typography variant="h2" className="easyOrders" align="center" sx={{ color: colorTexto, marginBottom: 5, fontSize: "3em" }}>
                Formulario de alta de cliente
            </Typography>
            <Grid2 item container direction="row" spacing={5} sx={
                {
                    padding: 5,
                    border: colorFondo === "#FFFFFF" ? "1px solid #24c55e" : "",
                    boxShadow: 3,
                    borderRadius: 2,
                }
            }>
                <Grid2 item size={{ xs: 12, md: 12, lg: 4 }} container direction="column" justifyContent="center" alignItems="center">
                    <Grid2 item>
                        <Avatar
                            src={image ? `data:image/*;base64,${image}` : null}
                            sx={{ objectFit: "contain", minWidth: 200, minHeight: 200 }}
                        />
                    </Grid2>
                    <Grid2 item container justifyContent="center">
                        <Stack direction="row" spacing={2}>
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
                    </Grid2>
                </Grid2>
                <Grid2 item size={{ xs: 12, md: 12, lg: 8 }} container direction="column" spacing={7}>
                    <Grid2 item container direction="row" spacing={7}>
                        <Grid2 item size={{ xs: 12, md: 12, lg: 6 }}>
                            <TextField
                                id="nombreUsuarioCliente"
                                label="Nombre de usuario"
                                value={nombreUsuarioCliente}
                                onChange={(e) => setNombreUsuarioCliente(e.target.value)}
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
                        </Grid2>
                        <Grid2 item size={{ xs: 12, md: 12, lg: 6 }}>
                            <TextField
                                id="correoCliente"
                                label="Correo electrónico"
                                value={correoCliente}
                                onChange={(e) => setCorreoCliente(e.target.value)}
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
                        </Grid2>
                    </Grid2>
                    <Grid2 item container direction="row" spacing={7}>
                        <Grid2 item size={{ xs: 12, md: 12, lg: 6 }}>
                            <TextField
                                id="nombreCliente"
                                label="Nombre"
                                value={nombreCliente}
                                onChange={(e) => setNombreCliente(e.target.value)}
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
                        </Grid2>
                        <Grid2 item size={{ xs: 12, md: 12, lg: 6 }}>
                            <TextField
                                id="apellidosCliente"
                                label="Apellidos"
                                value={apellidosCliente}
                                onChange={(e) => setApellidosCliente(e.target.value)}
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
                        </Grid2>
                    </Grid2>
                    <Grid2 item container direction="row" spacing={7}>
                        <Grid2 item size={{ xs: 12, md: 12, lg: 6 }}>
                            <TextField
                                id="telefonoCliente"
                                label="Numero de telefono"
                                value={telefonoCliente}
                                onChange={(e) => setTelefonoCliente(e.target.value)}
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
                        </Grid2>
                        <Grid2 item size={{ xs: 12, md: 12, lg: 6 }}>
                            <TextField
                                id="contrasenyaCliente"
                                label="Contraseña"
                                value={contrasenyaCliente}
                                onChange={(e) => setContrasenyaCliente(e.target.value)}
                                slotProps={{
                                    input: {
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <KeyIcon sx={{ color: colorIcono }} />
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <motion.div whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.1 }}>
                                                    <IconButton onClick={() => setShowPasswd(!showPasswd)} edge="end" sx={{ color: colorIcono }}>
                                                        {showPasswd ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                                    </IconButton>
                                                </motion.div>
                                            </InputAdornment>
                                        ),
                                        sx: { color: colorTexto }
                                    },
                                }}
                                variant="standard"
                                color={colorFondo === '#FFFFFF' ? 'success' : 'default'}
                                focused
                                fullWidth
                                type={showPasswd ? "text" : "password"}
                                sx={estilosTextField}
                            />
                        </Grid2>
                    </Grid2>
                    <Grid2 item container direction="row" spacing={7}>
                        <Grid2 item size={{ xs: 12, md: 12, lg: 6 }}>
                            <TextField
                                id="direccionCliente"
                                label="Dirección"
                                value={direccionCliente}
                                onChange={(e) => setDireccionCliente(e.target.value)}
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
                        </Grid2>
                        <Grid2 item size={{ xs: 12, md: 12, lg: 6 }}>
                            <InputLabel id="sexoClienteLabel" sx={{ color: colorFondo === "#FFFFFF" ? "#2e7d32" : "#FFFFFF", fontSize: "0.8em" }}>
                                Sexo
                            </InputLabel>
                            <Select
                                labelId="sexoClienteLabel"
                                id="sexoCliente"
                                value={sexo}
                                onChange={handleSexoChange}
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
                        </Grid2>
                    </Grid2>
                </Grid2>
            </Grid2>
            <Stack spacing={5} direction="row" sx={{ display: "flex", justifyContent: "center", marginTop: 5 }}>
                <Button variant="contained" color="success" startIcon={<SendIcon />} onClick={() => setGuardarCliente(true)} disabled={loadingInsertion}>
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
                        {mensajeDialog}
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

export default FormularioAltaCliente;