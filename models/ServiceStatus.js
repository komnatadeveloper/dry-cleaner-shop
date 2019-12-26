const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ServiceStatusSchema = new Schema({
  servStatus: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  description: {
    type: String
  }
});

const ServiceStatus = mongoose.model("servicestatus", ServiceStatusSchema);

module.exports = ServiceStatus;