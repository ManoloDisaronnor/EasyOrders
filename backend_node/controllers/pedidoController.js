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
            const pedidos = await Pedido.findAll({
                include: [{
                    model: Cliente,
                    as: "id_cliente_Cliente",
                    required: false,
                    attributes: ['id_cliente', 'nombre']
                }]
            });
            return res.status(200).json(Respuesta.exito(pedidos, "Pedidos recuperados correctamente"));
        } catch (error) {
            return res.status(404).json(Respuesta.error(null, "Error al recuperar los pedidos " + error, "PEDIDOS_NO_RECUPERADOS"));
        }
    }

    async insertPedido(req, res) {
        const pedido = req.body;
        try {
            if (pedido.producto === "" || pedido.unidades === 0 || pedido.estado === "" || pedido.id_cliente === "" || pedido.fecha_pedido === null) {
                return res.status(400).json(Respuesta.error(null, "Por favor, rellene todos los campos antes de guardar el pedido", "FALTAN_DATOS"));
            }

            if (pedido.estado === "Procesando" || pedido.estado === "Pedido" || pedido.estado === "Reparto") {
                if (pedido.fecha_entrega !== null) {
                    return res.status(400).json(Respuesta.error(null, "No puede seleccionar una fecha si el producto no ha sido entregado. Por favor, cambie el estado a entregado o quite la fecha de entrega", "ESTADO_INCORRECTO"));
                }
            }

            if (pedido.fecha_pedido >= pedido.fecha_entrega) {
                return res.status(400).json(Respuesta.error(null, "La fecha de pedido no puede ser mayor o igual que la fecha de entrega", "FECHA_INCORRECTA"));
            }

            const idPedido = await Pedido.create(pedido);
            pedido.id_pedido = idPedido;
            return res.status(201).json(Respuesta.exito(pedido, "Pedido creado correctamente"));
        } catch (error) {
            return res.status(500).json(Respuesta.error(null, "Error al crear el pedido " + error, "PEDIDO_NO_INSERTADO"));
        }
    }

    async deletePedido(req, res) {
        const { idPedido } = req.params;
        try {
            const data = await Pedido.destroy(
                {
                    where: {
                        id_pedido: idPedido
                    }
                }
            );
            return res.json(Respuesta.exito(data, "Pedido eliminado correctamente"));
        } catch (error) {
            return res.status(500).json(Respuesta.error(null, "Error al eliminar el el pedido " + idPedido + " " + error, "CLIENTE_NO_ELIMINADO"));
        }
    }
}

module.exports = new PedidoController();