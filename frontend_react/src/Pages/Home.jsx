import React from 'react';
import { MDBCarousel, MDBCarouselItem, MDBCarouselCaption } from 'mdb-react-ui-kit';
import CarrouselImage from '../assets/img/CarrouselPedidoFacil.jpg';
import CarruselImage2 from '../assets/img/CarrouselEmpresario.jpg';
import CarruselImage3 from '../assets/img/CarruselEmpresarios.jpeg';
import { Box, Grid2, Icon, Typography } from '@mui/material';
import CardActionArea from '@mui/material/CardActionArea';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import PersonIcon from '@mui/icons-material/Person';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { useTema } from '../Componentes/TemaProvider';
import { Link } from 'react-router';

// import { apiUrl } from '../config';

function Home() {
    const { colorFondo, colorTexto, colorIcono } = useTema();

    return (
        <Box style={{ backgroundColor: colorFondo }}>
            <MDBCarousel showControls showIndicators className='mb-5'>
                <MDBCarouselItem itemId={1}>
                    <img src={CarrouselImage} className='d-block w-100' alt='...' style={{ maxHeight: "600px", objectFit: "cover" }} />
                    <MDBCarouselCaption className='bg-black bg-opacity-50 w-25 mx-auto'>
                        <h5>Pedidos facil a tu alcance</h5>
                        <p>Trabajamos junto con shopify para ofrecer la mejor calidad en la entrega.</p>
                    </MDBCarouselCaption>
                </MDBCarouselItem>
                <MDBCarouselItem itemId={2}>
                    <img src={CarruselImage2} className='d-block w-100' alt='...' style={{ maxHeight: "600px", objectFit: "cover" }} />

                    <MDBCarouselCaption className='bg-black bg-opacity-50 w-25 mx-auto'>
                        <h5>El mejor estudio del mercado</h5>
                        <p>Nuestros expertos han realizado un estudio de mercado para saber que quieren los clientes.</p>
                    </MDBCarouselCaption>
                </MDBCarouselItem>
                <MDBCarouselItem itemId={3}>
                    <img src={CarruselImage3} className='d-block w-100' alt='...' style={{ maxHeight: "600px", objectFit: "cover" }} />
                    <MDBCarouselCaption className='bg-black bg-opacity-50 w-25 mx-auto'>
                        <h5>Trabajo en equipo</h5>
                        <p>Equipo formado por profesionales en un entorno de trabajo muy favorable para brindar mejor experiencia.</p>
                    </MDBCarouselCaption>
                </MDBCarouselItem>
            </MDBCarousel>
            <Typography variant='h3' align='center' sx={{ color: colorTexto }} >
                Bienvenido a EasyOrders
            </Typography>
            <hr className='w-25 mx-auto border-5 rounded-5 mt-4 mb-4' style={{ backgroundColor: "#24c55e", border: "5px solid #24c55e" }} />
            <Typography variant='h6' align='center' className='mb-4' sx={{ color: colorTexto }} >
                EasyOrders es una empresa que se dedica a la entrega de pedidos a domicilio
            </Typography>
            <Typography variant='h4' className="easyOrders" align='center' color='black' sx={{ color: colorTexto }} >
                Revisa nuestros formularios
            </Typography>
            <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
                <Grid2 container spacing={5} direction="row" sx={{ marginTop: 5, backgroundColor: colorFondo, mb: 5, px: 2 }}>
                    <Grid2 item size={{ xs: 12, md: 6 }} sx={{ backgroundColor: colorFondo, display: 'flex', justifyContent: 'center' }}>
                        <Link to="/altacliente" style={{ textDecoration: 'none' }}>
                            <Card style={{ maxWidth: 435, backgroundColor: colorFondo }}>
                                <CardActionArea
                                    sx={{
                                        '&[data-active]': {
                                            backgroundColor: colorFondo,
                                            '&:hover': {
                                                backgroundColor: 'action.selectedHover',
                                            },
                                        },
                                    }}
                                >
                                    <CardContent sx={{ backgroundColor: colorFondo }}>
                                        <Box display="flex" alignItems="center" mb={3}>
                                            <Box mr={2}>
                                                <Icon as={PersonIcon} sx={{ color: colorIcono }} />
                                            </Box>
                                            <Typography variant="h5" sx={{ color: colorTexto }}>
                                                Gestión de Clientes
                                            </Typography>
                                        </Box>
                                        <Typography variant="body2" sx={{ color: colorTexto }}>
                                            En EasyOrders, nos enorgullecemos de ofrecer un servicio de gestión de clientes excepcional. Nuestra plataforma está diseñada para facilitar la administración de tus clientes, permitiéndote mantener un registro detallado de sus pedidos, preferencias y datos de contacto. Con nuestra herramienta de gestión de clientes, puedes crear perfiles personalizados, realizar seguimientos de pedidos y obtener información valiosa para mejorar la experiencia del cliente. Ya sea que estés gestionando un pequeño negocio o una gran empresa, nuestra solución te ayudará a mantenerte organizado y a brindar un servicio de alta calidad a tus clientes.
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Link>
                    </Grid2>
                    <Grid2 item size={{ xs: 12, md: 6 }} sx={{ backgroundColor: colorFondo, display: 'flex', justifyContent: 'center' }}>
                        <Link to="/altapedido" style={{ textDecoration: 'none' }}>
                            <Card style={{ maxWidth: 435 }}>
                                <CardActionArea
                                    sx={{
                                        '&[data-active]': {
                                            backgroundColor: colorFondo,
                                            '&:hover': {
                                                backgroundColor: 'action.selectedHover',
                                            },
                                        },
                                    }}
                                >
                                    <CardContent sx={{ backgroundColor: colorFondo }}>
                                        <Box display="flex" alignItems="center" mb={3}>
                                            <Box mr={2}>
                                                <Icon as={LocalShippingIcon} sx={{ color: colorIcono }} />
                                            </Box>
                                            <Typography variant="h5" sx={{ color: colorTexto }} >
                                                Gestión de pedidos
                                            </Typography>
                                        </Box>
                                        <Typography variant="body2" sx={{ color: colorTexto }} >
                                            En EasyOrders, nos enorgullecemos de ofrecer un servicio de gestión de clientes excepcional. Nuestra plataforma está diseñada para facilitar la administración de tus clientes, permitiéndote mantener un registro detallado de sus pedidos, preferencias y datos de contacto. Con nuestra herramienta de gestión de clientes, puedes crear perfiles personalizados, realizar seguimientos de pedidos y obtener información valiosa para mejorar la experiencia del cliente. Ya sea que estés gestionando un pequeño negocio o una gran empresa, nuestra solución te ayudará a mantenerte organizado y a brindar un servicio de alta calidad a tus clientes.
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Link>
                    </Grid2>
                </Grid2>
            </Box>
        </Box>
    );
}

export default Home;