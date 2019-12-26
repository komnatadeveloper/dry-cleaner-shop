const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  serviceList: [
    {
      service: {
        type: Schema.Types.ObjectId,
        ref: "service",
        required: true
      },
      quantity: {
        type: Number,
        required: true
      },
      unitPrice: {
        type: Number,
        required: true
      },
      unitServiceStatus: {
        type: String,
        required: true
      },
      unitTotalPrice: {
        type: Number,
        required: true
      }
    }
  ],
  orderStatus: {
    type: String,
    required: true
  },
  orderTotalPrice: {
    type: Number,
    required: true
  }
});

const Order = mongoose.model("order", OrderSchema);

module.exports = Order;
