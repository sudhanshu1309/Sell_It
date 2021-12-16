const Product = require("../models/product");

exports.getProductById = (req, res, next, id) => {
  Product.findById(id).exec((error, product) => {
    if (error || !product) {
      return res.status(400).json({
        error: "Product not found!",
      });
    }
    req.product = product;
    // return res.json(product);
  });

  next();
};


//this is comment