const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PublicSchema = new Schema({
  image: {
    type: Buffer,
    required: true
  },
  name: {
    type: String,
    required: true,
    unique: true
  }
});

const Public = mongoose.model("public", PublicSchema);

module.exports = Public;