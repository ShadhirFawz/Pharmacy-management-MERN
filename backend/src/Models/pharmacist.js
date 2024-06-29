const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pharmacistSchema = new Schema({
  Username: {
    type: String,
    required: true,
    unique: true
  },
  Name: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    required: true,
    unique: true
  },
  Password: {
    type: String,
    required: true
  },
  DateOfBirth: {
    type: Date,
    required: true
  },
  HourlyRate: {
    type: Number,
    required: true
  },
  Affiliation: {
    type: String,
    required: true
  },
  EducationalBackground: {
    type: String,
    required: true
  },
  IDDocument: {
    data: {
      type: Buffer,
    },
    contentType: {
      type: String,
    },
  },
  PharmacyDegreeDocument: {
    data: {
      type: Buffer,
    },
    contentType: {
      type: String,
    },
  },
  WorkingLicenseDocument: {
    data: {
      type: Buffer,
    },
    contentType: {
      type: String,
    },
  },

  WalletAmount: {
    type: Number,
    default: 0
  },
}, { timestamps: true });

const Pharmacist = mongoose.model('Pharmacist', pharmacistSchema);
module.exports = Pharmacist;