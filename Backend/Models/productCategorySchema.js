const mongoose = require("mongoose");
const productCategorySchema = new mongoose.Schema(
  {
    category_name: { type: String,required:true },
    description: {
      type: String,
      required: true,
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  { timestamps: true }
);
const ProductCategory = mongoose.model(
  "ProductCategory",
  productCategorySchema
);

module.exports = ProductCategory;
