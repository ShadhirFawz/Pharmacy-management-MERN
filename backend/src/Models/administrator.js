const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');

const administratorSchema = new Schema({
  Username: {
    type: String,
    required: true,
    unique: true
  },  
  Password: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
    unique: true
  }
}, { timestamps: true });

const Administrator = mongoose.model('Administrator', administratorSchema);
module.exports = Administrator;