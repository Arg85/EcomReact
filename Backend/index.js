const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config({ path: "./Config/.env" });
const { createTunnel } = require("./Helper/tunnel");
const ProductCategory = require("./Models/productCategorySchema");
const cors = require("cors");
const Product = require("./Models/productSchema ");

const app = express();
app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,OPTIONS,PUT,PATCH,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Header",
    "X-Requested-with,content-type,Authorization"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Home");
});
app.post("/AddProductCategory", async (req, res) => {
  if (req.body) {
    const productCategory = await ProductCategory(req.body).save();
    if (productCategory) {
      console.log(productCategory);
      res.send("Category Created");
    }
  }
});
app.post("/AddProduct", async (req, res) => {
  if (req.body) {
    const product = await Product(req.body).save();
    if (product) {
        const productCategory=await ProductCategory.findByIdAndUpdate({_id:req.body.category},{  $push: {
            products: product._id,
          },})
      console.log(productCategory,"----------",product);
      res.send("product Created");
    }
  }
});


app.get("/SPA", (req, res) => {
  res.send("Hi from the other Side Anjali");
});

app.listen(process.env.PORT, () => {
    createTunnel(process.env.PORT);
  mongoose
    .connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("successfully connected to Mongo DB");
    });
  
  console.log(`Server runnning at PORT ${process.env.PORT}`);
});
