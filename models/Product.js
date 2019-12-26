const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  image: {
    type: Buffer,
    required: true
  }
});

const Product = mongoose.model("product", ProductSchema);

module.exports = Product;
