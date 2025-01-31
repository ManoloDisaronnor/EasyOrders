const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');

router.get('/', pedidoController.getAllPedidos);
// router.post('/altapedido', pedidoController.insertPedido);

module.exports = router;