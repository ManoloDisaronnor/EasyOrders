import { Box, Typography, Button, Avatar, Stack, Grid2, TextField, InputAdornment } from "@mui/material";
import { useTema } from "../Componentes/TemaProvider";
import React, { useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AccountCircle from '@mui/icons-material/AccountCircle';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import BadgeIcon from '@mui/icons-material/Badge';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import KeyIcon from '@mui/icons-material/Key';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import TransgenderIcon from '@mui/icons-material/Transgender';
import FolderDeleteIcon from '@mui/icons-material/FolderDelete';

function FormularioAltaCliente() {
    const { colorFondo, colorTexto, colorIcono } = useTema();
    const [image, setImage] = useState("");

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageRemove = () => {
        setImage("");
    };

    return (
        <Box sx={{ backgroundColor: colorFondo, minHeight: "100vh", padding: 5 }}>
            <Typography variant="h2" align="center" sx={{ color: colorTexto, marginBottom: 5 }}>
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
                <Grid2 item size={{ md: 12, lg: 3 }} container direction="column" justifyContent="center" alignItems="center">
                    <Grid2 item>
                        <Avatar
                            src={image}
                            sx={{ width: 300, height: 300 }}
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
                            <input
                                id="delete-image"
                                style={{ display: "none" }}
                                onClick={handleImageRemove}
                            />
                            <label htmlFor="delete-image">
                                <Button
                                    variant="contained"
                                    component="span"
                                    startIcon={<FolderDeleteIcon />}
                                    color="error"
                                >
                                    Borrar Imagen
                                </Button>
                            </label>
                        </Stack>
                    </Grid2>
                </Grid2>
                <Grid2 item size={{ md: 12, lg: 9 }} container direction="column" spacing={7}>
                    <Grid2 item container direction="row" spacing={7}>
                        <Grid2 item size={{ md: 12, lg: 6 }}>
                            <TextField
                                id="input-with-icon-textfield"
                                label="Nombre de usuario"
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
                                color={colorFondo === '#FFFFFF' ? 'success' : 'default'}  // Cambiar el color según el tema
                                focused
                                fullWidth
                                sx={{
                                    '& .MuiInputLabel-root': {
                                        color: colorTexto,
                                    },
                                    '& .MuiInput-underline:before': {
                                        borderBottom: colorFondo === '#FFFFFF' ? '2px solid #24c55e' : '2px solid #ffffff',  // Borde verde en modo claro, blanco en oscuro
                                    },
                                    '& .MuiInput-underline:after': {
                                        borderBottom: colorFondo === '#FFFFFF' ? '2px solid #24c55e' : '2px solid #ffffff',  // Borde verde en modo claro, blanco en oscuro
                                    },
                                }}
                            />
                        </Grid2>
                        <Grid2 item size={{ md: 12, lg: 6 }}>
                            <TextField
                                id="input-with-icon-textfield"
                                label="Correo electrónico"
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
                                color={colorFondo === '#FFFFFF' ? 'success' : 'default'}  // Cambiar el color según el tema
                                focused
                                fullWidth
                                sx={{
                                    '& .MuiInputLabel-root': {
                                        color: colorTexto,
                                    },
                                    '& .MuiInput-underline:before': {
                                        borderBottom: colorFondo === '#FFFFFF' ? '2px solid #24c55e' : '2px solid #ffffff',  // Borde verde en modo claro, blanco en oscuro
                                    },
                                    '& .MuiInput-underline:after': {
                                        borderBottom: colorFondo === '#FFFFFF' ? '2px solid #24c55e' : '2px solid #ffffff',  // Borde verde en modo claro, blanco en oscuro
                                    },
                                }}
                            />
                        </Grid2>
                    </Grid2>
                    <Grid2 item container direction="row" spacing={7}>
                        <Grid2 item size={{ md: 12, lg: 6 }}>
                            <TextField
                                id="input-with-icon-textfield"
                                label="Nombre"
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
                                color={colorFondo === '#FFFFFF' ? 'success' : 'default'}  // Cambiar el color según el tema
                                focused
                                fullWidth
                                sx={{
                                    '& .MuiInputLabel-root': {
                                        color: colorTexto,
                                    },
                                    '& .MuiInput-underline:before': {
                                        borderBottom: colorFondo === '#FFFFFF' ? '2px solid #24c55e' : '2px solid #ffffff',  // Borde verde en modo claro, blanco en oscuro
                                    },
                                    '& .MuiInput-underline:after': {
                                        borderBottom: colorFondo === '#FFFFFF' ? '2px solid #24c55e' : '2px solid #ffffff',  // Borde verde en modo claro, blanco en oscuro
                                    },
                                }}
                            />
                        </Grid2>
                        <Grid2 item size={{ md: 12, lg: 6 }}>
                            <TextField
                                id="input-with-icon-textfield"
                                label="Nombre de usuario"
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
                                color={colorFondo === '#FFFFFF' ? 'success' : 'default'}  // Cambiar el color según el tema
                                focused
                                fullWidth
                                sx={{
                                    '& .MuiInputLabel-root': {
                                        color: colorTexto,
                                    },
                                    '& .MuiInput-underline:before': {
                                        borderBottom: colorFondo === '#FFFFFF' ? '2px solid #24c55e' : '2px solid #ffffff',  // Borde verde en modo claro, blanco en oscuro
                                    },
                                    '& .MuiInput-underline:after': {
                                        borderBottom: colorFondo === '#FFFFFF' ? '2px solid #24c55e' : '2px solid #ffffff',  // Borde verde en modo claro, blanco en oscuro
                                    },
                                }}
                            />
                        </Grid2>
                    </Grid2>
                    <Grid2 item container direction="row" spacing={7}>
                        <Grid2 item size={{ md: 12, lg: 6 }}>
                            <TextField
                                id="input-with-icon-textfield"
                                label="Numero de telefono"
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
                                color={colorFondo === '#FFFFFF' ? 'success' : 'default'}  // Cambiar el color según el tema
                                focused
                                fullWidth
                                sx={{
                                    '& .MuiInputLabel-root': {
                                        color: colorTexto,
                                    },
                                    '& .MuiInput-underline:before': {
                                        borderBottom: colorFondo === '#FFFFFF' ? '2px solid #24c55e' : '2px solid #ffffff',  // Borde verde en modo claro, blanco en oscuro
                                    },
                                    '& .MuiInput-underline:after': {
                                        borderBottom: colorFondo === '#FFFFFF' ? '2px solid #24c55e' : '2px solid #ffffff',  // Borde verde en modo claro, blanco en oscuro
                                    },
                                }}
                            />
                        </Grid2>
                        <Grid2 item size={{ md: 12, lg: 6 }}>
                            <TextField
                                id="input-with-icon-textfield"
                                label="Contraseña"
                                slotProps={{
                                    input: {
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <KeyIcon sx={{ color: colorIcono }} />
                                            </InputAdornment>
                                        ),
                                        sx: { color: colorTexto }
                                    },
                                }}
                                variant="standard"
                                color={colorFondo === '#FFFFFF' ? 'success' : 'default'}  // Cambiar el color según el tema
                                focused
                                fullWidth
                                type="password"
                                sx={{
                                    '& .MuiInputLabel-root': {
                                        color: colorTexto,
                                    },
                                    '& .MuiInput-underline:before': {
                                        borderBottom: colorFondo === '#FFFFFF' ? '2px solid #24c55e' : '2px solid #ffffff',  // Borde verde en modo claro, blanco en oscuro
                                    },
                                    '& .MuiInput-underline:after': {
                                        borderBottom: colorFondo === '#FFFFFF' ? '2px solid #24c55e' : '2px solid #ffffff',  // Borde verde en modo claro, blanco en oscuro
                                    },
                                }}
                            />
                        </Grid2>
                    </Grid2>
                    <Grid2 item container direction="row" spacing={7}>
                        <Grid2 item size={{ md: 12, lg: 6 }}>
                            <TextField
                                id="input-with-icon-textfield"
                                label="Dirección"
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
                                color={colorFondo === '#FFFFFF' ? 'success' : 'default'}  // Cambiar el color según el tema
                                focused
                                fullWidth
                                sx={{
                                    '& .MuiInputLabel-root': {
                                        color: colorTexto,
                                    },
                                    '& .MuiInput-underline:before': {
                                        borderBottom: colorFondo === '#FFFFFF' ? '2px solid #24c55e' : '2px solid #ffffff',  // Borde verde en modo claro, blanco en oscuro
                                    },
                                    '& .MuiInput-underline:after': {
                                        borderBottom: colorFondo === '#FFFFFF' ? '2px solid #24c55e' : '2px solid #ffffff',  // Borde verde en modo claro, blanco en oscuro
                                    },
                                }}
                            />
                        </Grid2>
                        <Grid2 item size={{ md: 12, lg: 6 }}>
                            <TextField
                                id="input-with-icon-textfield"
                                label="Sexo"
                                slotProps={{
                                    input: {
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <TransgenderIcon sx={{ color: colorIcono }} />
                                            </InputAdornment>
                                        ),
                                        sx: { color: colorTexto }
                                    },
                                }}
                                variant="standard"
                                color={colorFondo === '#FFFFFF' ? 'success' : 'default'}  // Cambiar el color según el tema
                                focused
                                fullWidth
                                sx={{
                                    '& .MuiInputLabel-root': {
                                        color: colorTexto,
                                    },
                                    '& .MuiInput-underline:before': {
                                        borderBottom: colorFondo === '#FFFFFF' ? '2px solid #24c55e' : '2px solid #ffffff',  // Borde verde en modo claro, blanco en oscuro
                                    },
                                    '& .MuiInput-underline:after': {
                                        borderBottom: colorFondo === '#FFFFFF' ? '2px solid #24c55e' : '2px solid #ffffff',  // Borde verde en modo claro, blanco en oscuro
                                    },
                                }}
                            />
                        </Grid2>
                    </Grid2>
                </Grid2>
            </Grid2>
            <Box sx={{ display: "flex", justifyContent: "center", marginTop: 5 }}>
                <Button variant="contained" color="success">
                    Guardar
                </Button>
            </Box>
        </Box>
    );
}

export default FormularioAltaCliente;