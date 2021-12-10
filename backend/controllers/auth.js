const User = require("../models/user");

exports.signin = (req, res) => {
  res.send("Signin works");
};

exports.signout = (req, res) => {
  res.send("Sign out works");
};

exports.signup = (req, res) => {
  const user = new User(req.body);
  user.save((error, user) => {
    if (error) {
      return res.status(400).json({
        error: "Not able to save in DB!",
      });
    } else {
      return res.json(user);
    }
  });
};
