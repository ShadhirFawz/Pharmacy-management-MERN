const { default: mongoose } = require('mongoose');
const Administrator = require('../Models/administrator');
const Patient = require('../Models/patient');
const Pharmacist = require('../Models/pharmacist');
const PharmacistRequest = require('../Models/pharmacistRequest');
const Medicine = require('../Models/medicine');
const { isUsernameUnique, isEmailUnique, validatePassword } = require('../utils');

// Task 5 : Add an admin
const addAdmin = async (req, res) => {
    const { 
        Username,
        Password,
        Email 
    } = req.body;

    const { username } = req.params;

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', true);
    if (!(req.user.Username === username)) {
        res.status(403).json("You are not logged in!");
    }else{
        try {
            const admin = await Administrator.findOne({Username: username});
            if (!admin){
                return res.status(404).json({error : "This admin doesn't exist!"})
            }
            if (!(await isUsernameUnique(Username))) {
                throw new Error('Username is already taken.');
              }
              if (!(await isEmailUnique(Email))) {
                throw new Error("Email is already taken.");
              }

              if(!(await validatePassword(Password))){
                return res.status(400).json("Password must contain at least one uppercase letter, one lowercase letter, one number, and be at least 8 characters long");
              }
    
              if (!Username || !Password || !Email) { 
                throw Error('All fields must be filled.');
            }            

            const administrator = await Administrator.create({
              Username,
              Password,
              Email
            });
            await administrator.save();
            res.status(200).json({administrator})
        } catch(error) {
            res.status(400).json({ error: error.message})
        }
    }
}

// Task 6 : Remove a patient or a pharmacist from database
const removePatientOrPharmacist = async (req, res) => {
        const {username, Username} = req.params;
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Credentials', true);

    if (!(req.user.Username === username)) {
        res.status(403).json("You are not logged in!");
    }else{
        try{
            const patient = await Patient.findOneAndDelete({Username: Username})
            const pharmacist = await Pharmacist.findOneAndDelete({Username: Username})
            console.log("patient:", patient)
            console.log("pharmacist:", pharmacist)

            if(!patient && !pharmacist){
                return res.status(400).json({error: "This user doesn't exist."})
            }else if(patient && !pharmacist){
                res.status(200).json(patient)
            }else if(!patient && pharmacist){
                res.status(200).json(pharmacist)
            }
        } catch(err){
            res.status(400).json({ error: err.message})

        }
    }
}

// Task 7 : view all infos of pharmacists' requests that want to apply to the platform
const infosOfAPharmacistRequest = async (req, res) => {
    const {username, Username} = req.params;
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Credentials', true);

    if (!(req.user.Username === username)) {
        res.status(403).json("You are not logged in!");
    }else{
        try{
            const pharmacistsRequest = await PharmacistRequest.findOne({Username: Username});
            if(!pharmacistsRequest){
                return res.status(400).json({error: "There are no requests made by this pharmacist!"})
            }
            res.status(200).json(pharmacistsRequest);
        } catch(err){
            res.status(400).json({ error: err.message})
        }
    }
}

const infosOfRequestsByPharmacist = async (req, res) => {
    const {username, Username} = req.params;
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', true);
    if (!(req.user.Username === username)) {
        res.status(403).json("You are not logged in!");
    }else{
        try{const pharmacistsRequests = await PharmacistRequest.find({}).sort({createdAt: -1});
        if(!pharmacistsRequests){
            return res.status(400).json({error: "There are no requests made by pharmacists."})
        }
        res.status(200).json(pharmacistsRequests);
    } catch(err){
        res.status(400).json({ error: err.message})

    }
    }
}

// Task 12: view a list of all available medicines' details
const availableMedicinesDetailsByAdmin = async (req, res) => {
    const {username} = req.params;
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', true);
    if (!(req.user.Username === username)) {
        res.status(403).json("You are not logged in!");
    }else{
            try{const medicines = await Medicine.find({});
    
            if(!medicines){
                return res.status(400).json({error: "There are no available medicines!"})
            }
            console.log("medicines",medicines)
            res.status(200).json(medicines.map(({Name, ActiveIngredients, Price, Picture, MedicalUse}) => ({Name, ActiveIngredients, Price, Picture, MedicalUse})));
        } catch(err){
            res.status(400).json({ error: err.message})

        }
    }
}

// Task 22: view pharmacist's info
const pharmacistInfo = async (req, res) => {
    const {username, Username} = req.params;
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', true);
    if (!(req.user.Username === username)) {
        res.status(403).json("You are not logged in!");
    }else{
        try{
            const pharmacist = await Pharmacist.findOne({Username: Username},{_id:0, Password:0});
            if(!pharmacist){
                return res.status(400).json({error: "This pharmacist does not exist!"})
            }
            res.status(200).json(pharmacist);
        } catch(err){
            res.status(400).json({ error: err.message})

        }
    }
}

const allPharmacists = async (req, res) => {
    const {username} = req.params;
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', true);
    if (!(req.user.Username === username)) {
        res.status(403).json("You are not logged in!");
    }else{
        try{
            const pharmacists = await Pharmacist.find();
            if(!pharmacists){
                return res.status(400).json({error: "No registered pharmacists!"})
            }
            res.status(200).json(pharmacists.map(
                ({Username, Name, Email, DateOfBirth, HourlyRate, Affiliation, EducationalBackground}) => 
                ({Username, Name, Email, DateOfBirth, HourlyRate, Affiliation, EducationalBackground})
            ));
        } catch(err){
            res.status(400).json({ error: err.message})

        }
    }
}

const allPatients = async (req,res) => {
    const {username} = req.params;
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', true);
    if (!(req.user.Username === username)) {
        res.status(403).json("You are not logged in!");
    }else{
        try{
            const patients = await Patient.find();
            if(!patients){
                return res.status(400).json({error: "No registered patients!"})
            }
            res.status(200).json(patients.map(
                ({Username, Name, Email, DateOfBirth, Gender, MobileNumber}) => 
                ({Username, Name, Email, DateOfBirth, Gender, MobileNumber})
            ));
        } catch(err){
            res.status(400).json({ error: err.message})
        }
    }
}

// Task 23: view patient's info
const patientInfo = async (req, res) => {
    const {username, Username} = req.params;
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', true);
    if (!(req.user.Username === username)) {
        res.status(403).json("You are not logged in!");
    }else{
        try{
            const info = await Patient.findOne({Username: Username},{ _id: 0, Password: 0, Prescriptions: 0, EmergencyContactMobile: 0, EmergencyContactName:0, EmergencyContactRelation:0 });
            if(!info){
                return res.status(400).json({error: "This patient does not exist!"})
            }
            res.status(200).json(info);
        } catch(err){
            res.status(400).json({ error: err.message})
        }
    }
}

 // Search for medicine by name
 const getMedicineByName = async (req, res) => {
    const {username, Name} = req.params;
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', true);
    if (!(req.user.Username === username)) {
        res.status(403).json("You are not logged in!");
    }else{
        try{
            const info = await Medicine.findOne({Name: Name},{ _id: 0, ActiveIngredients: 0, Price: 0, Picture: 0, MedicalUse:0 });
            if(!info){
                return res.status(400).json({error: "This medicine does not exist!"})
            }
            res.status(200).json(info);
        } catch(err){
            res.status(400).json({ error: err.message})
        }
    }
}

 // Filter medicine by medical use
 const getMedicineByMedicalUse = async (req, res) => {
    const {username, MedicalUse} = req.params;
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', true);
    if (!(req.user.Username === username)) {
        res.status(403).json("You are not logged in!");
    }else{
        try{
            const info = await Medicine.findOne({MedicalUse: MedicalUse},{ _id: 0, Name: 0, ActiveIngredients: 0, Price: 0, Picture: 0 });
            if(!info){
                return res.status(400).json({error: "This medicine does not exist!"})
            }
            res.status(200).json(info);
        } catch(err){
            res.status(400).json({ error: err.message})
        }
    }
}

const addPharmacist = async (req, res) => {
    const {username} = req.params;
    const {Username, Name, Email, Password, DateOfBirth, HourlyRate, Affiliation, EducationalBackground} = req.body;
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', true);

    if (!(req.user.Username === username)) {
        res.status(403).json("You are not logged in!");
    }else{
        try {
            if (!(await isUsernameUnique(Username))) {
                throw new Error('Username is already taken.');
            }

            if (!Username || 
                !Name ||
                !Email ||
                !Password ||
                !DateOfBirth ||
                !HourlyRate ||
                !Affiliation ||
                !EducationalBackground
                ) { 
                throw Error('All fields must be filled.');
            }
        
            const pharmacist = await  Pharmacist.create({
                Username,
                Name, 
                Email, 
                Password, 
                DateOfBirth, 
                HourlyRate, 
                Affiliation, 
                EducationalBackground
            });
            await pharmacist.save();
            res.status(200).json({pharmacist})
        } catch(error) {
            res.status(400).json({ error: error.message})
        }
    }
}

const acceptOrRejectPharmacistRequest = async (req, res) => {
    const { Username, username } = req.params;
    const { action } = req.body; 

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', true);

    if (!(req.user.Username === username)) {
        res.status(403).json("You are not logged in!");
    }else{
        try {
            const pharmacistRequest = await PharmacistRequest.findOne({ Username, Status: 'pending' });

            if (!pharmacistRequest) {
                return res.status(404).json({ error: "Pending pharmacist request with the given username not found" });
            }

            if (action === 'accept') {
                const pharmacist = new Pharmacist(pharmacistRequest.toObject());
                await pharmacist.save();
                pharmacistRequest.Status = 'accepted';
                await pharmacistRequest.save();
                res.status(200).json({ message: 'Pharmacist request approved and added to the platform' });
            } else if (action === 'reject') {
                pharmacistRequest.Status = 'rejected';
                await pharmacistRequest.save();
                res.status(200).json({ message: 'Pharmacist request rejected' });
            } else {
                res.status(400).json({ error: 'Invalid action' });
            }
        } catch (error) {
            res.status(500).json({ error: "Server error", details: error.message });
        }
    }
}

const viewSalesReportOnChosenMonth = async (req, res) => {
    const { Username, chosenMonth } = req.params;
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', true);
    if (!(req.user.Username === Username)) {
      res.status(403).json("You are not logged in!");
    }else{
      try {
  
        const salesReport = await SReport.findOne();
  
        //console.log(salesReport);
        if (!salesReport) {
          return res.status(404).json({ message: `Sales report not found ` });
        }
  
        const monthlySales = salesReport.monthlySales.find((entry) => entry.Month === chosenMonth);
        //console.log(monthlySales);
        if (!monthlySales) {
          return res.status(404).json({ message: `No sales data found for ${chosenMonth}` });
        }
  
        const medicineSales = salesReport.medicineSales.filter(
          (entry) => new Date(entry.date).toLocaleString('default', { month: 'long' }) === chosenMonth
        );
        //console.log(medicineSales);
        
  
        res.status(200).json({
          username: Username,
          chosenMonth,
          monthlySales: monthlySales.totalSales,
          medicineSales,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
      }
    }
  };


module.exports = {addAdmin,
    removePatientOrPharmacist,
    infosOfRequestsByPharmacist,
    availableMedicinesDetailsByAdmin,
    infosOfAPharmacistRequest,
    pharmacistInfo,
    allPharmacists,
    allPatients,
    patientInfo,
    getMedicineByName,
    getMedicineByMedicalUse,
    addPharmacist,
    acceptOrRejectPharmacistRequest,
};