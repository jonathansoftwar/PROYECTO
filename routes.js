const express = require('express');
const router = express.Router();
const controller = require('./controller');

//rutas del usuario de la tienda virtual

router.post("/usuarios/login",controller.login)
router.post("/usuarios",controller.createUsuario)

module.exports= router;