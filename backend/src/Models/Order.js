const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');
const SReport = require('./SReport.js');
const orderSchema = new Schema({    
    PatientUsername:{
        type: String,
        ref: 'Patient',
        required: true
    },
    PaymentMethod: {
        type: String,
        default: "cash",
        enum: ["cash","card","wallet"]
    },
    Status: {
        type: String,
        default: "Pending",
        enum: ["Pending", "Confirmed",  "Delivered", "Cancelled"],
        required: true
    },
    Items: [{
        medicine: {
            type: String, 
            required: true, 
          },
          quantity: {
            type: Number,
            default: 1, 
          },
    }],
    TotalAmount: {
        type: Number,
        default: 0,
    },
    ShippingAddress:{
        type: String
        //required: true
    }
},

{ timestamps: true })

orderSchema.statics.register = async function (
    PaymentMethod,
    PatientUsername,
    ShippingAddress
  ) {

    // validation 
    if (!PatientUsername) { 
    throw Error('All fields must be filled.');
}
if (!PaymentMethod) { 
    throw Error('Payment method must be specified.');
}


    const order = await this.create({
        PatientUsername,
        PaymentMethod,
        ShippingAddress
    });


    





    return order;
}
  const Order = mongoose.model('Order', orderSchema);
  module.exports = Order;