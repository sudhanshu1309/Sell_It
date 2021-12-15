const User = require("../models/user");

exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((error, user) => {
    if (error || !user) {
      return res.status(400).json({
        error: "User not found!",
      });
    }
    req.profile = user;
    next();
  });
};

exports.getUser = (req, res) => {
  req.profile.salt = undefined;
  req.profile.encry_password = undefined;
  return res.json({
    name: `${req.profile.firstName} ${req.profile.lastName}`,
    email: req.profile.email,
    role: req.profile.role ? "Admin" : "User",
  });
};

exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (error, user) => {
      if (error || !user) {
        return res.status(400).json({
          error: "Updation of user failed!",
        });
      }
      res.json({
        Name: `${req.profile.firstName} ${req.profile.lastName}`,
        email: req.profile.email,
        role: req.profile.role ? "Admin" : "User",
      });
    }
  );
};
