const express = require("express");
const ProductController = require("../Controllers/ProductController");
const productRouter = express.Router();
productRouter.post("/addProduct", ProductController.addProduct);

module.exports = productRouter;
