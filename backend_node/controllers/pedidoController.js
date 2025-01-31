const Respuesta = require("../utils/respuesta.js");
// Recuperar función de inicialización de modelos
const initModels = require("../models/init-models.js").initModels;
// Crear la instancia de sequelize con la conexión a la base de datos
const sequelize = require("../config/sequelize.js");

const models = initModels(sequelize);
const Pedido = models.pedido;
const Cliente = models.cliente;

class PedidoController {
    async getAllPedidos(req, res) {
        try {
            const pedidos = await Pedido.findAll();
            return Respuesta.ok(res, pedidos);
        } catch (error) {
            return Respuesta.error(res, error);
        }
    }
}

module.exports = new PedidoController();