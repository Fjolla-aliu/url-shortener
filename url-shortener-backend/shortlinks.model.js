const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let ShortLinks = new Schema({
  originalUrl: { type: String },
  shortCode: { type: String },
  expirationTime: { type: Date },
});

module.exports = mongoose.model("ShortLinks", ShortLinks);
