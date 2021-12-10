const mongoose = require("mongoose");
const { Schema } = mongoose;
const { v4: uuidv4 } = require("uuid");
const crypto = require("crypto");

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      maxlength: 20,
      trim: true,
    },
    lastName: {
      type: String,
      required: false,
      trim: true,
      maxlength: 20,
    },
    userInfo: {
      type: String,
      required: false,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: false,
      unique: true,
    },
    role: {
      type: Number,
      default: 0,
    },
    encry_password: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = uuidv4();
    this.encry_password = this.securePassword(password);
  })
  .get(function () {
    return this._password;
  });

userSchema.method({
  authenticate: function (plainpassword) {
    return this.securePassword(plainpassword) === this.encry_password;
  },

  securePassword: function (plainpassword) {
    if (!plainpassword) return "";
    try {
      const hash = crypto
        .createHmac("sha256", this.salt)
        .update(plainpassword)
        .digest("hex");
      return hash;
    } catch (err) {
      console.log(err);
      return "";
    }
  },
});

module.exports = mongoose.model("User", userSchema);
