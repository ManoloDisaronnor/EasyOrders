const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

router.get('/', clienteController.getAllClientes);
router.post('/altacliente', clienteController.insertCliente);
router.delete('/eliminarcliente/:idCliente', clienteController.deleteCliente);
router.put('/modificarcliente/:idCliente', clienteController.modCliente);

module.exports = router;