const { default: mongoose } = require('mongoose');
const Patient = require('../Models/patient.js');
const PharmacistRequest = require("../Models/pharmacistRequest.js")
const { isUsernameUnique, isEmailUnique, validatePassword } = require('../utils');
const validator = require('validator');
const upload = require('../Routes/multer-config');
const Cart = require('../Models/Cart.js');
const stripe = require('stripe')(process.env.STRIPE_KEY);

//Function for Stripe
async function createStripeCustomer({ Email, Name, Phone }) {
  return new Promise(async (resolve, reject) => {
    try {
      const Customer = await stripe.customers.create({
        name: Name,
        email: Email,
        phone: Phone
      });

      resolve(Customer);
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
}

// Task 1 : register as a patient
const registerPatient = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Credentials', true);

  const {
    Username,
    Name,
    NationalID,
    Email,
    Password,
    DateOfBirth,
    Gender,
    MobileNumber,
    EmergencyContactName,
    EmergencyContactMobile,
    EmergencyContactRelation,
    address,
  } = req.body;

  try {
    if (!(await isUsernameUnique(Username))) {
      throw new Error('Username is already taken.');
    }

    if (!(await isEmailUnique(Email))) {
      throw new Error('Email is already in use.');
    }

    if (!(await validatePassword(Password))) {
      return res.status(400).json("Password must contain at least one uppercase letter, one lowercase letter, one number, and be at least 8 characters long");
    }

    const patientExists = await Patient.findOne({ Email: Email });

    if (patientExists) {
      return res.status(404).send("You already registered.");
    }

    const newCart = await Cart.create({
      items: [],
      totalAmount: 0,
    });

    // const customer = await createStripeCustomer({ Email, Name, MobileNumber });

    const patient = new Patient({
      Username,
      Name,
      NationalID,
      Email,
      Password,
      DateOfBirth,
      Gender,
      MobileNumber,
      EmergencyContactName,
      EmergencyContactMobile,
      EmergencyContactRelation,
      addresses: [address],  // Add the address to the addresses array
      StripeCustomerId: 0,
      cart: newCart
    });

    await patient.save();

    res.status(200).json({ patient });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Tasks 1 and 9 : register as a pharmacist
const submitRequestToBePharmacist = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Credentials', true);

  const {
    Username,
    Name,
    Email,
    Password,
    DateOfBirth,
    HourlyRate,
    Affiliation,
    EducationalBackground,
  } = req.body;

  try {
    if (!req.files || !req.files['IDDocument'] || !req.files['PharmacyDegreeDocument'] || !req.files['WorkingLicenseDocument']) {
      return res.status(400).json('Missing file(s)');
    }

    if (!(await isUsernameUnique(Username))) {
      return res.status(400).json('Username is already taken.');
    }

    if (!(await isEmailUnique(Email))) {
      return res.status(400).json('Email is already in use.');
    }

    if (!(await validatePassword(Password))) {
      return res.status(400).json("Password must contain at least one uppercase letter, one lowercase letter, one number, and be at least 8 characters long");
    }

    const request = new PharmacistRequest({
      Username,
      Name,
      Email,
      Password,
      DateOfBirth,
      HourlyRate,
      Affiliation,
      EducationalBackground,
      IDDocument: {
        data: req.files['IDDocument'][0].buffer,
        contentType: req.files['IDDocument'][0].mimetype,
      },
      PharmacyDegreeDocument: {
        data: req.files['PharmacyDegreeDocument'][0].buffer,
        contentType: req.files['PharmacyDegreeDocument'][0].mimetype,
      },
      WorkingLicenseDocument: {
        data: req.files['WorkingLicenseDocument'][0].buffer,
        contentType: req.files['WorkingLicenseDocument'][0].mimetype,
      },
    });

    await request.save();

    return res.status(200).json({ message: 'Request submitted successfully' });

  } catch (error) {
    console.error('Error:', error.message);
    return res.status(400).json({ error: error.message });
  }
};


module.exports = {
  registerPatient,
  submitRequestToBePharmacist
};