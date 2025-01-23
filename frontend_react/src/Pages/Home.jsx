import React from 'react';
import { MDBCarousel, MDBCarouselItem, MDBCarouselCaption } from 'mdb-react-ui-kit';
import CarrouselImage from '../assets/img/CarrouselPedidoFacil.jpg';
import CarruselImage2 from '../assets/img/CarrouselEmpresario.jpg';
import CarruselImage3 from '../assets/img/CarruselEmpresarios.jpeg';

function Home() {
    return (
        <>
            <MDBCarousel showControls showIndicators>
                <MDBCarouselItem itemId={1}>
                    <img src={CarrouselImage} className='d-block w-100' alt='...' style={ { maxHeight: "500px", objectFit: "cover" } } />
                    <MDBCarouselCaption>
                        <h5>Pedidos facil a tu alcance</h5>
                        <p>Trabajamos junto con shopify para ofrecer la mejor calidad en la entrega.</p>
                    </MDBCarouselCaption>
                </MDBCarouselItem>
                <MDBCarouselItem itemId={2}>
                    <img src={CarruselImage2} className='d-block w-100' alt='...' style={ { maxHeight: "500px", objectFit: "cover" } } />

                    <MDBCarouselCaption className='bg-black bg-opacity-50 w-25 mx-auto'>
                        <h5>El mejor estudio del mercado</h5>
                        <p>Nuestros expertos han realizado un estudio de mercado para saber que quieren los clientes.</p>
                    </MDBCarouselCaption>
                </MDBCarouselItem>
                <MDBCarouselItem itemId={3}>
                    <img src={CarruselImage3} className='d-block w-100' alt='...' style={ { maxHeight: "500px", objectFit: "cover" } } />
                    <MDBCarouselCaption className='bg-black bg-opacity-50 w-25 mx-auto'>
                        <h5>Third slide label</h5>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </MDBCarouselCaption>
                </MDBCarouselItem>
            </MDBCarousel>
        </>
    );
}

export default Home;