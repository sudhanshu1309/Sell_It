const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { signup, signout, signin } = require("../controllers/auth");

router.get("/signout", signout);

router.post(
  "/signin",
  body("email").isEmail().withMessage("False email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password  doesn't meet the requirements(min 6 char)"),
  signin
);

router.post(
  "/signup",
  body("firstName")
    .isLength({ min: 1 })
    .withMessage("First Name cannot be blank!"),
  body("email").isEmail().withMessage("False email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password  doesn't meet the requirements(min 6 char)"),
  signup
);

module.exports = router;
