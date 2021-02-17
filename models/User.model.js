const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({
  username: {
    type: String
  },
  email: {
    type: String
  },
  password: String,
  city: String, 
  role: String
});

const User = model("User", userSchema);

module.exports = User;
