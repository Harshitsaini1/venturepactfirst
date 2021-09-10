var mongoose = require("mongoose");


const ngData = mongoose.Schema(
  {
    firstname: {
      type: String,
      required:true,
    },
    userName: {
      type: String,
      unique: true,
      required:true,
    },
    email: {
      type: String,
      required:true,
      unique: true,
    },
    password: {
      type: String,
      required:true,
      unique: true,
      
    },
    confirmpassword: {
      type: String,
      required:true,
    },
  },
);

const register = new mongoose.model("register", ngData);
    module.exports= register;
