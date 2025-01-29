import React, { useState } from 'react';
import { Outlet } from 'react-router';
import { Box, IconButton, Typography } from "@mui/material";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../assets/img/locoEasyOrders.png';

import '../assets/style/estiloFuenteNavBar.css'
import AnchorTemporaryDrawer from './SideBar';
import { useTema } from './TemaProvider';
import { MDBNavbarBrand } from 'mdb-react-ui-kit';

function MenuApp() {
    const { temaOscuro, colorFondo, colorTexto, colorIcono, toggleTema } = useTema();
    const [state, setState] = useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
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
            <AnchorTemporaryDrawer state={state} toggleDrawer={toggleDrawer} colorFondo={colorFondo} colorTexto={colorTexto} colorIcono={colorIcono} />
            <Outlet />
        </Box>
    );
}

export default function App() {
    return (
        <MenuApp />
    );
}