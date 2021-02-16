const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const scooterSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  brandName: String, 
  maxSpeed: Number, 
  maxRange: Number, 
  modelYear: Number,
  maxLoadCapacity: Number,
  image: String,
  timeSlot:{
    type: Number, 
   
    isAvailable: Boolean
  },   
  city:{
    type: String, 
   
    isAvailable: String
  },
  rentRequest: {
    type: Boolean,
  }
 });

const Scooter = model("Scooter", scooterSchema);

module.exports = Scooter;