import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupIcon from '@mui/icons-material/Group';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { Link, Typography } from '@mui/material';

export default function AnchorTemporaryDrawer({ state, toggleDrawer, colorFondo, colorTexto, colorIcono }) {

    const list = (anchor) => (
        <Box
            sx={{ width: 300, backgroundColor: colorFondo, height: "100vh" }}
            role="presentation"
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                <Typography variant='h6' sx={{ color: colorTexto, padding: 2 }} >Clientes</Typography>
                {['Registrar un cliente', 'Ver todos los clientes'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton
                            sx={{ paddingLeft: 5 }}
                            componenet={Link}
                            to={index % 2 === 0 ? "/altaCliente" : "/listaClientes"}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <ListItemIcon sx={{ color: colorIcono }}>
                                {index % 2 === 0 ? <PersonAddIcon /> : <GroupIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} sx={{ color: colorTexto }} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <hr className='border-3' style={{ backgroundColor: colorFondo === "#FFFFFF" ? "#24c55e" : "#FFFFFF", border: colorFondo === "#FFFFFF" ? "3px solid #24c55e" : "3px solid #FFFFFF" }} />
            <List>
                <Typography variant='h6' sx={{ color: colorTexto, padding: 2 }} >Pedidos</Typography>
                {['Registrar pedido', 'Listar pedidos'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton
                            sx={{ paddingLeft: 5 }}
                            componenet={Link}
                            to={index % 2 === 0 ? "/altaPedido" : "/listaPedidos"}
                            onClick={(e) => e.stopPropagation()}>
                            <ListItemIcon sx={{ color: colorIcono }}>
                                {index % 2 === 0 ? <AddShoppingCartIcon /> : <ShoppingCartCheckoutIcon />}
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