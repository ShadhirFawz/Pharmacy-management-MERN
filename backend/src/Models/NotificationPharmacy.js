const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const notificationSchema = new mongoose.Schema({
    type: {
    type: String,
    required: true
  },
  username:{
    type: String,
    required: true
  },
  
  MedicineName: {
    type: String,
    required: true
  }, 
  message: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Notification = mongoose.model('NotificationPharmacy', notificationSchema);
module.exports = Notification;
