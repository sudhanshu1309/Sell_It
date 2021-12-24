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


//delete controllers
// exports.deleteProduct = (req, res) => {
//   let product = req.product;
//   product.deleteOne((err, deletedProduct) => {
//     if (err) {
//       return res.status(400).json({
//         error: `Failed to delete ${deletedProduct}!`,
//       });
//     }
//     res.json({
//       message: `${deletedProduct} successfully deleted!`,
//     });
//   });
// };

// exports.updateProduct = (req, res, id) => {
//   Product.findByIdAndUpdate(id, {}, )
// }