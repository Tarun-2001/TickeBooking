const mognoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwtwebtoken = require("jsonwebtoken");

const userSchema = new mognoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    minLength: 2,
    maxLength: 50,
  },
  email: {
    type: String,
    required: [true, "Please provide name"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide valid email address",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
  },
  lastName:{
    type:String,
    maxlength:50,
    minlength:3,
    trim:true,
    default:'LastName'
  },
  location:{
    type:String,
    maxlength:50,
    trim:true,
    default:'Hyderabad'
  }
});

userSchema.pre("save", async function () {
  if(!this.isModified('password')) return
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.createJWT = function () {
  return jwtwebtoken.sign({ userId: this._id }, process.env.JWT_SECREAT, {
    expiresIn: "30d",
  });
};

userSchema.methods.comparePassword = async function (password) {
  const comparePassword = await bcrypt.compare(password, this.password);
  return comparePassword;
};
module.exports = mognoose.model("userModel", userSchema);
