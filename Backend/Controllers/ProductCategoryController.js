const addProductCategory = async (req, res) => {
  if (req.body) {
    const productCategory = await ProductCategory(req.body).save();
    if (productCategory) {
      console.log(productCategory);
      res.send("Category Created");
    }
  }
};
module.exports = { addProductCategory };
