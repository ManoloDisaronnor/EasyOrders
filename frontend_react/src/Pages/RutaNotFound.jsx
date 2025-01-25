import React from 'react';
import { Typography, Box, Grid2, Button, Link } from '@mui/material';
import IlusionOptica from '../assets/img/ilusionOptica.png';
import PequeñaImagen from '../assets/img/NotFound.png';
import ReplyIcon from '@mui/icons-material/Reply';
import { useNavigate } from "react-router";
import { useTema } from '../Componentes/TemaProvider';

function RutaNotFound() {
    const { colorFondo, colorTexto, colorIcono } = useTema();

    const navigate = useNavigate();
    return (
        <>
            <Box sx={{ backgroundColor: colorFondo }}>
                <Grid2 container direction="row" alignItems="center" justifyContent="center">
                    <Grid2 xs={1} item>
                        <Box
                            component="img"
                            src={PequeñaImagen}
                            alt="Imagen no encontrado"
                            sx={{
                                width: 100,
                                height: 200,
                                objectFit: 'cover',
                                marginRight: 2
                            }}
                        />
                    </Grid2>

                    <Grid2 item xs={11} sx={{ paddingInline: 5, marginBottom: 5 }}>
                        <Typography variant="h3" gutterBottom sx={{ color: "#24c55e" }}>
                            Error 404
                        </Typography>
                        <Typography variant="h6" color="textSecondary" sx={ { color: colorTexto } }>
                            Vaya, esa ruta es casi tan confusa como esta imagen
                        </Typography>
                        <Typography variant="h6" color="textSecondary">
                            Por favor, pulsa el siguiente boton para volver
                        </Typography>
                    </Grid2>
                </Grid2>

                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginBottom: 5
                }}>
                    <Button variant="contained" startIcon={<ReplyIcon />} color='success' onClick={() => navigate(-1)}>
                        Volver
                    </Button>
                </Box>

                <Box
                    component="img"
                    src={IlusionOptica}
                    alt="Ilusion Optica"
                    sx={{
                        width: '100%',
                        maxWidth: 999,
                        objectFit: 'cover',
                        display: 'block',
                        margin: '0 auto',
                    }}
                />
            </Box>
        </>
    );
}

export default RutaNotFound;