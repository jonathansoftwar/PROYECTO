const express = require('express');
const router = express.Router();
const controller = require('./controller');

//rutas del usuario de la tienda virtual
router.get("/usuarios",controller.getUsuarios)
router.get("/usuarios/:id",controller.getUsuario)
router.post("/usuarios/login",controller.login)
router.post("/usuarios",controller.createUsuario)
router.delete("/usuarios/:id",controller.eliminarUsuario)
router.patch("/usuarios/:id",controller.updateUsuario)

//rutas del producto de la tienda virtual
router.get("/productos",controller.getProductos)
router.get("/productos/:id",controller.getProducto)
router.post("/productos",controller.createProducto)
router.delete("/productos/:id",controller.eliminarProducto)
router.patch("/productos/:id",controller.updateProducto)

//rutas de la compañia de la tienda virtual
router.get("/companias",controller.getCompanias)
router.get("/companias/:id",controller.getCompania)
router.post("/companias",controller.createCompania)
router.delete("/companias/:id",controller.eliminarCompania)
router.patch("/companias/:id",controller.updateCompania)

module.exports= router;