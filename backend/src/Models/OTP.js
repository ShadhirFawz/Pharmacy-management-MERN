const mongoose = require('mongoose');

const OTPSchema = new mongoose.Schema({
  Email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  // Additional fields if needed
});

const OTP = mongoose.model('OTP', OTPSchema);

module.exports = OTP;
