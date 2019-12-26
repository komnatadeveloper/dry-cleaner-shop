const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserActivitySchema = new Schema({
  customerId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  orderId: {
    type: Schema.Types.ObjectId,
    ref: "Order"
  },
  activityType: {
    type: String, // "payment" or "order"
    required: true
  },
  amount: {
    type: Number, // Minus if Payment
    required: true
  }
});

const UserActivity = mongoose.model("useractivity", UserActivitySchema);

module.exports = UserActivity;
