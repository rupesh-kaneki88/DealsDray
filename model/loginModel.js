const mongoose = require("mongoose");

const newSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
    sno: {
      type: String,
      require: true,
      
    },
    password: {
      type: String,
      required: true,
    },
  });

const User = new mongoose.model("User", newSchema);  
module.exports= User;  
