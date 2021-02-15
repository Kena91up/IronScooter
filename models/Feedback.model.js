const { Schema, model } = require("mongoose");

const FeedbackSchema = new Schema ({
  name: String,
  text: String
})

const FeedbackModel = model('feedback', FeedbackSchema);

module.exports = FeedbackModel;