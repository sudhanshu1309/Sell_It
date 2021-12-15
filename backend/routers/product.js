const express = require("express");
const router = express.Router();
const { getProductById } = require("../controllers/product");



router.param("productId", getProductById);



module.exports = router;