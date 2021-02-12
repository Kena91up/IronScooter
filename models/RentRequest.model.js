const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const RentReqSchema = new Schema({
 user: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User'
 },
 scooter: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Scooter'
 },
  scooterForRent:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Scooter'
  }, 
  date: { 
    type: Date, 
    required: true 
  },
  TimeSlot:{
    type: Number, 
    required: true,
  }
});

const RentInfo = model("RentInfo", RentReqSchema);

module.exports = RentInfo;