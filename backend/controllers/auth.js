const User = require("../models/user");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

exports.signin = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  User.findOne({ email }, (error, user) => {
    if (error || !user) {
      return res.status(400).json({
        error: "Email doesn't exist!",
      });
    }

    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and Password doesn't match!",
      });
    }

    //creating token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);

    //putting token
    res.cookie("token", token, {
      expire: new Date() + 1 * 24 * 60 * 60 * 1000,
    });

    //sending response to the front end

    const { _id, firstName, email, role } = user;
    return res.json({ token, user: { _id, firstName, email, role } });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "User signout successfully!",
  });
};

exports.signup = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const user = new User(req.body);
  user.save((error, user) => {
    if (error) {
      return res.status(400).json({
        error:
          "Not able to save in DB! There may be already user with same email.",
      });
    } else {
      return res.json(user);
    }
  });
};
