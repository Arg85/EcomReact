const addProduct = async (req, res) => {
  if (req.body) {
    const product = await Product(req.body).save();
    if (product) {
      const productCategory = await ProductCategory.findByIdAndUpdate(
        { _id: req.body.category },
        {
          $push: {
            products: product._id,
          },
        }
      );
      console.log(productCategory, "----------", product);
      res.send("product Created");
    }
  }
};
module.exports = { addProduct };
