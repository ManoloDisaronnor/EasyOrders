// Importar libreria para manejo de ficheros de configuración
require("dotenv").config();
// Importar fichero de configuración con variables de entorno
const config = require("./config/config");
// Importar librería express --> web server
const express = require("express");
// Importar libreria CORS
const cors = require("cors");
// Importar gestores de rutas
const clienteRoutes = require("./routes/clienteRoutes");
const pedidoRoutes = require("./routes/pedidoRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/clientes", clienteRoutes);
app.use("/api/pedidos", pedidoRoutes);

app.listen(config.port, () => {
    console.log(`Servidor escuchando en el puerto ${config.port}`);
});