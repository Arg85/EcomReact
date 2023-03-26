const express = require("express");
const ProductCategoryController = require("../Controllers/ProductCategoryController");
const productCategoryRouter = express.Router();
productCategoryRouter.post(
  "/addProductCategory",
  ProductCategoryController.addProductCategory
);

module.exports = productCategoryRouter;
