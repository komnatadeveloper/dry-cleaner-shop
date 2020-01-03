const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ServiceSchema = new Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Product"
  },
  productName: {
    type: String,
    required: true,
    // unique: true
  },
  serviceType: {
    type: String,
    required: true
  },
  featured: {
    type: Boolean,
    required: true
  },
  servicePrice: {
    type: Number,
    required: true
  }
});

const Service = mongoose.model("service", ServiceSchema);

module.exports = Service;
