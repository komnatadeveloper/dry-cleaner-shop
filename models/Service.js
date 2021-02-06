const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ServiceSchema = new Schema({
  serviceName: {
    type: String,
    // required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    // required: true,
    ref: "Category"
  },
  categoryName: {
    type: String,
    // required: true
  },
  featured: {
    type: Boolean,
    required: true
  },
  servicePrice: {
    type: Number,
    required: true
  },
  image: {
    type: Buffer,
    required: true
  }
});

const Service = mongoose.model("service", ServiceSchema);

module.exports = Service;
