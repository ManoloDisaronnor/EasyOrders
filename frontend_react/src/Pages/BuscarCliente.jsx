import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, InputBase, Paper, Typography } from "@mui/material";
import { useTema } from "../Componentes/TemaProvider";
import SearchIcon from '@mui/icons-material/Search';
import { useState } from "react";

function BuscarCliente() {
    const { colorFondo, colorTexto, colorIcono } = useTema();
    const [searchText, setSearchText] = useState("");
    const [clienteBusqueda, setClienteBusqueda] = useState({});
    const [mensajeDialogoInformacion, setMensajeDialogoInformacion] = useState("");
    const [openDialogoInformacion, setOpenDialogoInformacion] = useState(false);
    const [loadingSearch, setLoadingSearch] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        realizarBusqueda(searchText);
    }

    async function realizarBusqueda(nombreUsuario) {
        setLoadingSearch(true);
        try {
            const response = await fetch(`http://localhost:3000/api/clientes/buscarcliente/${nombreUsuario}`, {
                method: 'POST',
            });
            const data = await response.json();
            if (response.ok) {
                setClienteBusqueda(data.datos);
                console.log(clienteBusqueda);
            } else {
                setMensajeDialogoInformacion(data.mensaje);
                setOpenDialogoInformacion(true);
            }
        } catch (error) {
            setMensajeDialogoInformacion("Error al buscar el cliente " + error);
            setOpenDialogoInformacion(true);
        }
        setLoadingSearch(false);
    }

    return (
        <Box sx={{ p: 5 }}>
            <Typography variant="h2" className="easyOrders" align="center" sx={{ color: colorTexto, marginBottom: 5, fontSize: "3em" }}>
                Buscar un cliente por nombre de usuario
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Paper
                    component="form"
                    sx={{
                        p: '2px 4px',
                        display: 'flex',
                        width: 750,
                        minWidth: 150,
                        maxWidth: '100%',
                        backgroundColor: colorFondo,
                        borderRadius: 30,
                        border: colorFondo === "#FFFFFF" ? "1px solid #24c55e" : "1px solid #FFFFFF"
                    }}
                    onSubmit={handleSearch}
                >
                    <InputBase
                        sx={{ ml: 1, flex: 1, color: colorTexto }}
                        placeholder="Nombre de usuario del cliente"
                        inputProps={{ 'aria-label': 'buscarCliente' }}
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <IconButton type="button" sx={{ p: '10px' }} aria-label="buscar" onClick={handleSearch}>
                        <SearchIcon sx={{ color: colorIcono }} />
                    </IconButton>
                </Paper>
            </Box>
            {
                clienteBusqueda ?
                    loadingSearch ?
                        <CircularProgress color={colorFondo === "#FFFFFF" ? "success" : "white"} size={65} sx={{ display: "block", margin: "auto" }} />
                        :
                        <>
                            {/* //TODO AQUI SE TIENE QUE MOSTRAR EL CLIENTE QUIERO FOTO A LA IZQUIERDA EN LG Y MD Y ARRIBA EN SM Y XS QUIERO MOSTRAR LOS DATOS Y EN LA FOTO UNOS BOTONES PARA MODIFICAR ELIMINAR Y QUIERO UN BOTON PARA MOSTRAR LAS COMPRAS DEL CLIENTE*/}
                        </>
                    :
                    <>

                    </>
            }
            <Dialog
                open={openDialogoInformacion}
                onClose={() => setOpenDialogoInformacion(false)}
                aria-labelledby="dialogoInformacionClienteTitulo"
                aria-describedby="dialogoInformacionClienteDescripcion"
            >
                <DialogTitle id="dialogoInformacionClienteTitulo" sx={{ color: colorTexto, backgroundColor: colorFondo }}>
                    {"INFORMACION DE LA BUSQUEDA"}
                </DialogTitle>
                <DialogContent sx={{ backgroundColor: colorFondo }}>
                    <DialogContentText id="dialogoInformacionClienteDescripcion" sx={{ color: colorTexto }}>
                        {mensajeDialogoInformacion}
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ color: colorTexto, backgroundColor: colorFondo }}>
                    <Button onClick={() => setOpenDialogoInformacion(false)} autoFocus>Aceptar</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default BuscarCliente;