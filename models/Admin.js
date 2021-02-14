const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AdminSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  isEmployee: {
    type: Boolean  // if employee, will have limited authority
  }
});

const Admin = mongoose.model("admin", AdminSchema);

module.exports = Admin;