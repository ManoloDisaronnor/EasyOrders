import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupIcon from '@mui/icons-material/Group';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { Link, Typography } from '@mui/material';

/**
 * Componente para la barra lateral de navegación.
 * @param {Object} props - Las propiedades del componente.
 * @returns {JSX.Element} El componente de la barra lateral.
 */
export default function AnchorTemporaryDrawer({ state, toggleDrawer, colorFondo, colorTexto, colorIcono }) {

    /**
     * Genera la lista de elementos de la barra lateral.
     * @param {string} anchor - La posición de la barra lateral.
     * @returns {JSX.Element} La lista de elementos de la barra lateral.
     */
    const list = (anchor) => (
        <Box
            sx={{ width: 325, backgroundColor: colorFondo, height: "100vh" }}
            role="presentation"
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                <Typography variant='h6' sx={{ color: colorTexto, padding: 2 }} >Clientes</Typography>
                {['Registrar un cliente', 'Ver todos los clientes', 'Buscar cliente y sus pedidos'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton
                            sx={{ paddingLeft: 5 }}
                            componenet={Link}
                            to={index === 0 ? "/altaCliente" : index === 1 ? "/listaClientes" : "/buscarCliente"}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <ListItemIcon sx={{ color: colorIcono }}>
                                {index === 0 ? <PersonAddIcon /> : index === 1 ? <GroupIcon /> : <PersonSearchIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} sx={{ color: colorTexto }} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <hr className='border-3' style={{ backgroundColor: colorFondo === "#FFFFFF" ? "#24c55e" : "#FFFFFF", border: colorFondo === "#FFFFFF" ? "3px solid #24c55e" : "3px solid #FFFFFF" }} />
            <List>
                <Typography variant='h6' sx={{ color: colorTexto, padding: 2 }} >Pedidos</Typography>
                {['Registrar pedido', 'Listar pedidos', 'Mostrar gráficas de pedidos'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton
                            sx={{ paddingLeft: 5 }}
                            componenet={Link}
                            to={index === 0 ? "/altaPedido" : index === 1 ? "/listaPedidos" : "/graficaPedidos"}
                            onClick={(e) => e.stopPropagation()}>
                            <ListItemIcon sx={{ color: colorIcono }}>
                                {index === 0 ? <AddShoppingCartIcon /> : index === 1 ? <ShoppingCartCheckoutIcon /> : <ShoppingCartCheckoutIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} sx={{ color: colorTexto }} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <div>
            {['left'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <Drawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                    >
                        {list(anchor)}
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
}