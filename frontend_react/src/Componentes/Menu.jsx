import { useEffect, useState } from "react";
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarToggler,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBDropdown,
    MDBDropdownToggle,
    MDBDropdownMenu,
    MDBDropdownItem,
    MDBCollapse,
} from 'mdb-react-ui-kit';

import logo from '../assets/img/locoEasyOrders.png';
import { Link, Outlet } from 'react-router';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import MenuIcon from '@mui/icons-material/Menu';

import '../assets/style/estiloFuenteNavBar.css'
import { Box, IconButton, Typography } from "@mui/material";

function Menu() {
    const [openBasic, setOpenBasic] = useState(false);
    const [temaOscuro, setTemaOscuro] = useState(false);
    const [tema, setTema] = useState('light');
    const [colorFondo, setColorFondo] = useState('#FFFFFF');
    const [colorTexto, setColorTexto] = useState('#000000');
    const [colorIcono, setColorIcono] = useState('#24c55e');

    // useEffect(() => {
    //     if (temaOscuro) {
    //         setTema('dark');
    //         setColorFondo('#332d2d');
    //         setColorTexto('#FFFFFF');
    //         setColorIcono('#FFFFFF');
    //     } else {
    //         setTema('light');
    //         setColorFondo('#FFFFFF');
    //         setColorTexto('#000000');
    //         setColorIcono('#24c55e');
    //     }
    // }, [temaOscuro]);

    return (
        <>
            <MDBNavbar expand='md' light bgColor={tema} style={{ borderBottom: '4px solid #24c55e' }}>
                <MDBContainer fluid>
                    <MDBNavbarBrand href='/'>
                        <img
                            src={logo}
                            height='70'
                            alt='logo'
                            loading='lazy'
                            className="me-4"
                        />
                        <Typography variant="h3" className="easyOrders" sx={{ color: colorTexto }}>EasyOrders</Typography>
                    </MDBNavbarBrand>

                    <MDBNavbarToggler
                        aria-controls='navbarSupportedContent'
                        aria-expanded='false'
                        aria-label='Toggle navigation'
                        onClick={() => setOpenBasic(!openBasic)}
                    >
                        <MenuIcon sx={{ color: colorIcono }} />
                    </MDBNavbarToggler>

                    <MDBCollapse navbar open={openBasic}>
                        <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
                            <MDBNavbarItem>
                                <MDBDropdown>
                                    <MDBDropdownToggle tag='a' className='nav-link text-black fs-5 mx-lg-3' role='button'>
                                        Clientes
                                    </MDBDropdownToggle>
                                    <MDBDropdownMenu>
                                        <MDBDropdownItem link className='fs-5'><Link to="/altatapa" className='text-black'>Alta tapa</Link></MDBDropdownItem>
                                        <MDBDropdownItem link className='fs-5'><Link to="/listadoplatos" className='text-black'>Listado tapas</Link></MDBDropdownItem>
                                    </MDBDropdownMenu>
                                </MDBDropdown>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <MDBDropdown>
                                    <MDBDropdownToggle tag='a' className='nav-link text-black fs-5' role='button'>
                                        Pedidos
                                    </MDBDropdownToggle>
                                    <MDBDropdownMenu>
                                        <MDBDropdownItem link className='fs-5'><Link to="/altapedido" className='text-black'>Alta pedidos</Link></MDBDropdownItem>
                                        <MDBDropdownItem link className='fs-5'><Link to="/listadopedidos" className='text-black'>Listado pedidos</Link></MDBDropdownItem>
                                    </MDBDropdownMenu>
                                </MDBDropdown>
                            </MDBNavbarItem>
                        </MDBNavbarNav>
                    </MDBCollapse>

                    {/* <Box sx={{ display: 'flex', alignItems: 'center'}}>
                        <IconButton
                            onClick={() => setTemaOscuro(!temaOscuro)}
                            sx={{
                                transition: 'transform 0.5s ease-in-out',
                                marginLeft: 'auto' // Asegura que se mueva completamente a la derecha
                            }}
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
                    </Box> */}

                </MDBContainer>
            </MDBNavbar>
            <Outlet />
        </>
    );
}

export default Menu;