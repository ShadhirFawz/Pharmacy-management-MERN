const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');

const doctorSchema = new Schema({
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
    required: true,
  },
  DateOfBirth: {
    type: Date,
    required: true
  },
  HourlyRate: {
    type: Number,
    required: true,
  },
  Affiliation: {
    type: String,
    required: true
  },
  EDB: {
    type: String,
    required: true
  },
  PatientsUsernames: [{
    type: String,
    ref: 'Patient', // This should match the model name you defined for Patient
  }],
  Speciality: {
    type: String,
    required: true,
    enum: ["dermatology", "dentistry", "psychiatry", "neurology", "orthopedics", "Dermatology", "Dentistry", "Psychiatry", "Neurology", "Orthopedics"]

  },
  WalletAmount: {
    type: Number,
    default: 0
  },
  IDDocument: {
    data: {
      type: Buffer,
    },
    contentType: {
      type: String,
    },
  },
  MedicalDegreeDocument: {
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
  AvailableTimeSlots: [
    {
      Date: {
        type: Date, // e.g., "Monday", "Tuesday", etc.
      },
      Time: {
        type: Number, // e.g., "09:00 AM"
      },
      Status: {
        type: String, // e.g., "12:00 PM"
        default: "available",
        enum: ["available", "booked"],
        required: false,
      },
    },
  ],





}, { timestamps: true });

const Doctor = mongoose.model('Doctor', doctorSchema);
module.exports = Doctor;