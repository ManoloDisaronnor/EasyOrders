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

function Home() {
    {/* temaOscuro, tema, colorFondo, colorTexto, colorIcono */ }
    return (
        <div style={{ height: "100vh" }}>
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
            <Typography variant='h3' align='center'  >
                Bienvenido a EasyOrders
            </Typography>
            <hr className='w-25 mx-auto border-5 rounded-5 mt-4 mb-5' style={{ backgroundColor: "#24c55e", border: "5px solid #24c55e" }} />
            <Typography variant='h6' align='center'  >
                EasyOrders es una empresa que se dedica a la entrega de pedidos a domicilio
            </Typography>
            <Typography variant='h4' className="easyOrders my-5" align='center' color='black' >
                Revisa nuestros formularios
            </Typography>
            <Grid2 container spacing={2} direction="row" alignItems="center" justifyContent="center" sx={{ marginTop: 5 }}>
                <Grid2 item xs={12} md={6} sx={ { marginInline: 10 } }>
                    <Card style={ { maxWidth: 400 } }>
                        <CardActionArea
                            sx={{
                                '&[data-active]': {
                                    backgroundColor: 'action.selected',
                                    '&:hover': {
                                        backgroundColor: 'action.selectedHover',
                                    },
                                },
                            }}
                        >
                            <CardContent>
                                <Box display="flex" alignItems="center" mb={3}>
                                    <Box mr={2}>
                                        <Icon as={PersonIcon} />
                                    </Box>
                                    <Typography variant="h5">
                                        Gestión de Clientes
                                    </Typography>
                                </Box>
                                <Typography variant="body2" color="text.secondary">
                                    En EasyOrders, nos enorgullecemos de ofrecer un servicio de gestión de clientes excepcional. Nuestra plataforma está diseñada para facilitar la administración de tus clientes, permitiéndote mantener un registro detallado de sus pedidos, preferencias y datos de contacto. Con nuestra herramienta de gestión de clientes, puedes crear perfiles personalizados, realizar seguimientos de pedidos y obtener información valiosa para mejorar la experiencia del cliente. Ya sea que estés gestionando un pequeño negocio o una gran empresa, nuestra solución te ayudará a mantenerte organizado y a brindar un servicio de alta calidad a tus clientes.
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid2>
                <Grid2 item xs={12} md={6} sx={ { marginInline: 10 } }>
                    <Card style={ { maxWidth: 400 } }>
                    <CardActionArea
                            sx={{
                                '&[data-active]': {
                                    backgroundColor: 'action.selected',
                                    '&:hover': {
                                        backgroundColor: 'action.selectedHover',
                                    },
                                },
                            }}
                        >
                            <CardContent>
                                <Box display="flex" alignItems="center" mb={3}>
                                    <Box mr={2}>
                                        <Icon as={LocalShippingIcon} />
                                    </Box>
                                    <Typography variant="h5">
                                        Gestión de pedidos
                                    </Typography>
                                </Box>
                                <Typography variant="body2" color="text.secondary">
                                    En EasyOrders, nos enorgullecemos de ofrecer un servicio de gestión de clientes excepcional. Nuestra plataforma está diseñada para facilitar la administración de tus clientes, permitiéndote mantener un registro detallado de sus pedidos, preferencias y datos de contacto. Con nuestra herramienta de gestión de clientes, puedes crear perfiles personalizados, realizar seguimientos de pedidos y obtener información valiosa para mejorar la experiencia del cliente. Ya sea que estés gestionando un pequeño negocio o una gran empresa, nuestra solución te ayudará a mantenerte organizado y a brindar un servicio de alta calidad a tus clientes.
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid2>
            </Grid2>
        </div>
    );
}

export default Home;