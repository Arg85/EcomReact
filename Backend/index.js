const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config({ path: "./Config/.env" });
const { createTunnel } = require("./Helper/tunnel");
const ProductCategory = require("./Models/productCategorySchema");
const cors = require("cors");
const Product = require("./Models/productSchema ");
const ProductCategoryRoute=require("./Routes/ProductCategoryRoute")
const ProductRoute=require("./Routes/ProductRoute");
const mongooseConnectDB = require("./Config/db");
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
app.use("/",ProductCategoryRoute);
app.use("/",ProductRoute);
// app.get("/SPA", (req, res) => {
//   res.send("Hi from the other Side Anjali");
// });

app.listen(process.env.PORT, () => {
    createTunnel(process.env.PORT);
 mongooseConnectDB(process.env.MONGODB_URL)
  
  console.log(`Server runnning at PORT ${process.env.PORT}`);
});
