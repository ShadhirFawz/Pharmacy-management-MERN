const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');

const cartItemSchema = new Schema({
  medicine: {
    type: String, 
    required: true, 
  },
  quantity: {
    type: Number,
    default: 1, 
  },
});

const cartSchema = new Schema({
  items: [cartItemSchema], 
  totalAmount: {
    type: Number,
    default: 0,
  },
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
