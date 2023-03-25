const express = require("express");
const ProductCategoryController = require("../Controllers/ProductController");
const productCategoryRouter = express.Router();
productCategoryRouter.post(
  "/addProductCategory",
  ProductCategoryController.addProduct
);

module.exports = productCategoryRouter;
