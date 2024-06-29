const mongoose = require('mongoose');

const SReportSchema = new mongoose.Schema({
  monthlySales: {
    type: [
      {
        Month: {
          type: String,
          required: true,
        },
        totalSales: {
          type: Number,
          required: true,
        },
      },
    ],
    default: [],
  },
  medicineSales: {
    type: [
      {
        medicineName: {
          type: String,
          required: true,
        },
        date: {
          type: Date,
          required: true,
        },
        total: {
          type: Number,
          required: true,
        },
      },
    ],
    default: [],
  },
  medicineReturns: {
    type: [
      {
        medicineName: {
          type: String,
          required: true,
        },
        date: {
          type: Date,
          required: true,
        },
        total: {
          type: Number,
          required: true,
        },
      },
    ],
    default: [],
  },
});

const SReport = mongoose.model('SReport', SReportSchema);

module.exports = SReport;
