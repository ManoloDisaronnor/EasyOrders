import React, { useState } from 'react';
import { Outlet } from 'react-router';
import { Box, IconButton, Typography } from "@mui/material";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../assets/img/locoEasyOrders.png';

import '../assets/style/estiloFuenteNavBar.css';
import AnchorTemporaryDrawer from './SideBar';
import { useTema } from './TemaProvider';
import { MDBNavbarBrand } from 'mdb-react-ui-kit';

/**
 * Main menu component for the application.
 * @returns {JSX.Element} The rendered component.
 */
function MenuApp() {
    const { temaOscuro, colorFondo, colorTexto, colorIcono, toggleTema } = useTema(); // Custom theme context
    const [state, setState] = useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    /**
     * Toggles the state of the drawer.
     * @param {string} anchor - The position of the drawer.
     * @param {boolean} open - Whether the drawer is open or closed.
     * @returns {function} Event handler function.
     */
    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    return (
        <>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh" // Aplica el 100vh aquí en el contenedor padre
            }}>
                <Box sx={{ flexShrink: 0 }}> {/* Contenedor del AppBar (no crecerá) */}
                    <AppBar position="static" sx={{ backgroundColor: colorFondo, padding: 2, borderBottom: '4px solid #24c55e' }}>
                        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <div>
                                    <IconButton
                                        size="large"
                                        edge="start"
                                        color="inherit"
                                        aria-label="menu"
                                        sx={{ mr: 2 }}
                                        onClick={toggleDrawer("left", true)}
                                    >
                                        <MenuIcon sx={{ color: colorIcono }} />
                                    </IconButton>
                                </div>
                                <MDBNavbarBrand href='/' className="ms-3">
                                    <img
                                        src={logo}
                                        height='70'
                                        alt='logo'
                                        loading='lazy'
                                        className="me-4"
                                    />
                                    <Typography variant="h3" className="easyOrders fs-2" sx={{ color: colorTexto }}>
                                        EasyOrders
                                    </Typography>
                                </MDBNavbarBrand>
                            </Box>
                            <IconButton
                                onClick={toggleTema}
                                size="large"
                                sx={{ transition: 'transform 0.5s ease-in-out' }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        transition: 'transform 0.3s ease-in-out',
                                        transform: temaOscuro ? 'rotate(360deg)' : 'rotate(0deg)',
                                    }}
                                >
                                    {temaOscuro ? (
                                        <DarkModeIcon sx={{ color: '#FFFFFF', fontSize: 28 }} />
                                    ) : (
                                        <LightModeIcon sx={{ color: '#24c55e', fontSize: 28 }} />
                                    )}
                                </Box>
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                </Box>
                <AnchorTemporaryDrawer state={state} toggleDrawer={toggleDrawer} colorFondo={colorFondo} colorTexto={colorTexto} colorIcono={colorIcono} />
                <Box sx={{
                    backgroundColor: colorFondo,
                    flex: 1,
                    boxSizing: "border-box"
                }}>
                    <Outlet /> {/* Contenido de la ruta */}
                </Box>
                <footer>
                    <Box sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: 2,
                        backgroundColor: colorFondo,
                        color: colorTexto,
                        borderTop: '4px solid #24c55e'
                    }}>
                        <Typography variant="body1">
                            &copy; 2025 EasyOrders. Todos los derechos reservados.
                        </Typography>
                    </Box>
                </footer>
            </Box>
        </>
    );
}

export default function App() {
    return (
        <MenuApp />
    );
}