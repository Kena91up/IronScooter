const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const scooterSchema = new Schema({
  user: {
    type:mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  email: {
    type: String,
    unique: true
  },
  BrandName: String, 
  maxSpeed: Number, 
  maxRange: Number, 
  modelYear: Number,
  maxLoadCapacity: Number,
  timeSlot:{
    type: Number, 
    required: true,
    isAvailable: Boolean
  },   
  city:{
    type: String, 
    required: true,
    isAvailable: String
  },
  rentRequest: {
    type: Boolean,
  }
 });

const Scooter = model("Scooter", scooterSchema);

module.exports = Scooter;