const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.get("/usuarios",controller.getUsuarios)
router.get("/usuarios/:id",controller.getUsuario)
router.post("/usuarios/login",controller.login)
router.post("/usuarios",controller.createUsuario)
router.delete("/usuarios/:id",controller.eliminarUsuario)
router.patch("/usuarios/:id",controller.updateUsuario)

module.exports= router;