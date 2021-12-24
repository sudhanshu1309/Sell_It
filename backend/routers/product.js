const express = require("express");
const router = express.Router();
const { getProductById, deleteProduct } = require("../controllers/product");



router.param("productId", getProductById);
// router.delete("/product/:productId",deleteProduct);



module.exports = router;