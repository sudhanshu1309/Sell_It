const express = require("express");
const router = express.Router();
const {signup, signout, signin} = require("../controllers/auth");

router.get("/signout", signout);
router.post("/signin", signin);
router.post("/signup", signup);


module.exports = router;