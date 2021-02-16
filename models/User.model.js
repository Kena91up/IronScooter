const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({
  username: {
    type: String,
    unique: true
  },
  email: {
    type: String
  },
  password: String,
  city: String, 
  owner: Boolean, 
  rider: Boolean
});

const User = model("User", userSchema);

module.exports = User;
