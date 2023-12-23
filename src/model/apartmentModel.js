const mongoose = require("mongoose");
const schema = mongoose.Schema({
  name: String,
  location: String,
  rooms: Number,
  full: Boolean
})

module.exports = mongoose.model("Apartment", schema)
