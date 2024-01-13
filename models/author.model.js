const mongoose = require("mongoose");

const AuthorSchema = new mongoose.Schema({

  id:{
    type:String,
    required:true,
    unique:true,
  },
  name: {
    type: String,
    required: [true, "name is require"],
  },
  email: {
    type: String,
    required: [true, "email is require"],
  },
  phone_no:{
    type:String,
    required:true
  },
  password: {
    type: String,
    
    default:'123',
  },

});

const AuthorModel = mongoose.model("Author", AuthorSchema);

module.exports = AuthorModel; 