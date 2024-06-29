const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');

const creditCardSchema = new Schema({    
    CCNumber:{
        type: String,
        required: true
    },
    PatientUsername:{
        type: String,
        ref: 'Patient',
        required: true
    },
    CardHolderName:{
        type: String,
        required: true
    },
    ExpirationDate:{
        type: Date,
        required: true
    },
    CVV:{
        type: Number,
        required: true
    }
},{ timestamps: true })

creditCardSchema.statics.register = async function (
    CCNumber,
    CardHolderName,
    PatientUsername,
    ExpirationDate,
    CVV
  ) {

    // validation 
    if (!CCNumber ||
      !PatientUsername ||
      !CardHolderName ||
      !ExpirationDate || 
      !CVV ) { 
    throw Error('All fields must be filled.');
}
    const creditCard = await this.create({
      CCNumber,
      CardHolderName,
      PatientUsername,
      ExpirationDate,
      CVV
    });
  
    return creditCard;
  };
  const CreditCard = mongoose.model('CreditCard', creditCardSchema);
  module.exports = CreditCard;