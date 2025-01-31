const Respuesta = require("../utils/respuesta.js");
// Recuperar función de inicialización de modelos
const initModels = require("../models/init-models.js").initModels;
// Crear la instancia de sequelize con la conexión a la base de datos
const sequelize = require("../config/sequelize.js");
// Importar bcrypt para hashear la contraseña del cliente antes de insertar en la base de datos
const bcrypt = require("bcrypt");

const models = initModels(sequelize);
const Cliente = models.cliente;
const Pedido = models.pedido;

class ClienteController {
    async getAllClientes(req, res) {
        try {
            const clientes = await Cliente.findAll();
            return res.json(Respuesta.exito(clientes, "Clientes recuperados correctamente"));
        } catch (error) {
            return res.json(Respuesta.error(null, "Error al recuperar los clientes " + error, "CLIENTES_NO_RECUPERADOS"));
        }
    }

    async insertCliente(req, res) {
        const cliente = req.body;
        try {
            if (cliente.usuario === "" || cliente.nombre === "" || cliente.correo === "" || cliente.password === "" || cliente.sexo === "") {
                return res.status(400).json(Respuesta.error(null, "Por favor, rellene al menos los campos nombre, nombre de usuario, correo, contraseña y sexo", "FALTAN_DATOS"));
            } else {
                let clienteExistente = await Cliente.findOne({ where: { correo: cliente.correo } });
                if (clienteExistente) {
                    return res.status(409).json(Respuesta.error(null, "Ya existe ese correo vinculado a un cliente", "CORREO_EXISTENTE"));
                }
                clienteExistente = await Cliente.findOne({ where: { usuario: cliente.usuario } });
                if (clienteExistente) {
                    return res.status(409).json(Respuesta.error(null, "Ya existe un cliente con ese nombre de usuario", "USUARIO_EXISTENTE"));
                }
                clienteExistente = await Cliente.findOne({ where: { telefono: cliente.telefono } });
                if (clienteExistente) {
                    return res.status(409).json(Respuesta.error(null, "Ya existe ese teléfono vinculado a un cliente", "TELEFONO_EXISTENTE"));
                }

                const password = cliente.password;
                cliente.password = await bcrypt.hash(password, 10);
                const idCliente = await Cliente.create(cliente);
                cliente.idCliente = idCliente;
                return res.status(201).json(Respuesta.exito(cliente, "Cliente insertado correctamente"));
            }
        } catch (error) {
            return res.status(500).json(Respuesta.error(null, "Error al insertar el cliente " + error, "CLIENTE_NO_INSERTADO"));
        }
    }
}

module.exports = new ClienteController();