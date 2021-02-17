const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const RentReqSchema = new Schema({
 user: {
  type: Schema.Types.ObjectId,
  ref: 'User'
 },
 scooter: {
  type: Schema.Types.ObjectId,
  ref: 'Scooter'
 },
 city: {
   type: String,
   required: true
 },
  date: { 
    type: Date, 
    required: true 
  },
  timeSlot: {
    type: String, 
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"]
  }
});

const RentInfo = model("RentInfo", RentReqSchema);

module.exports = RentInfo;