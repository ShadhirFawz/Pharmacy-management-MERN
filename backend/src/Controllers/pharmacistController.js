const { default: mongoose } = require('mongoose');
const nodemailer = require('nodemailer');
const Medicine = require("../Models/medicine");
const Pharmacist= require("../Models/pharmacist");
const Notification = require("../Models/NotificationPharmacy");  
const SReport = require("../Models/SReport") ;
// Task 12: view a list of all available medicines
const availableMedicinesDetailsByPharmacist = async (req, res) => {

  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Credentials', true);

  const { Username} = req.params;
  if (!(req.user.Username === Username)) {
    res.status(403).json("You are not logged in!");
  }else{
    try{
      const medicines = await Medicine.find();
      if (!medicines) {
        res.status(400).json({ error: "There are no available medicines!" })
      }
      res.status(200).json(medicines.map(({ Name, ActiveIngredients, Price, Picture, MedicalUse, Quantity, QuantitySold, Status }) => ({ Name, ActiveIngredients, Price, Picture, MedicalUse, Quantity, QuantitySold, Status })));
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }
}

// View all medicines'Quantities and Sales
const availableMedicinesQuantity = async (req, res) => {

  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Credentials', true);

  const { Username} = req.params;
  if (!(req.user.Username === Username)) {
    res.status(403).json("You are not logged in!");
  }else{
    try{
      const medicines = await Medicine.find();
      if (!medicines) {
        res.status(400).json({ error: "There are no available medicines!" })
      }
      res.status(200).json(medicines.map(
        ({ Name, Picture, Quantity, QuantitySold }) =>
          ({ Name, Picture, Quantity, QuantitySold })
      ));
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }
}

// Task 13: view available quantity and sales of each medicine
const medQuantityAndSales = async (req, res) => {
  const { Name, Username } = req.params;
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Credentials', true);

  if (!(req.user.Username === Username)) {
    res.status(403).json("You are not logged in!");
  }else{
    try{
      const medicine = await Medicine.findOne({ Name: Name }, { _id: 0, Price: 0, ActiveIngredients: 0 });
      if (!medicine) {
        res.status(400).json({ error: "This medicine doesn't exist!" })
      }
      res.status(200).json(medicine);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }
}

// add a new medicine to the database
const addMedicine = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Credentials', true);

  const {Username} = req.params;
  if (!(req.user.Username === Username)) {
    res.status(403).json("You are not logged in!");
  }else{

    const { Name,
      ActiveIngredients,
      Price,
      Quantity,
      Picture,
      QuantitySold,
      MedicalUse } = req.body;

    try {
      const medecineExists = await Medicine.findOne({ Name: Name });

      if (medecineExists) {
        return res.status(400).json({ error: "This medicine already exists!" });
      }

      const newMed = await Medicine.create({
        Name: Name,
        ActiveIngredients: ActiveIngredients,
        Price: Price,
        Quantity: Quantity,
        Picture: Picture,
        QuantitySold: QuantitySold,
        MedicalUse: MedicalUse
      });
      await newMed.save();
      res.status(200).json(newMed);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

//Task 18: Update a medicine in the database
const updateMed = async (req, res) => {

  const { Name, Username } = req.params;
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Credentials', true);

  if (!(req.user.Username === Username)) {
    res.status(403).json("You are not logged in!");
  }else{
    try {

      const medExists = await Medicine.findOne({ Name: Name });
      if (!medExists) {
        return res.status(404).json({ error: "This medicine doesn't exist!" });
      }

      let updateData = { ...req.body };

      // // Check if a picture file is provided
      // if (req.file) {
      //   updateData.Picture = req.file.originalname;
      // }

      const updatedMed = await Medicine.findOneAndUpdate({ Name: Name }, updateData, { new: true });

      if (!updatedMed) {
        return res.status(404).json({ error: "No possible updates!" });
      }

      await deleteNotificationIfQuantityNotZero();

      res.status(200).json(updatedMed);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};


// Search for medicine by name
const getMedicineByName = async (req, res) => {
  const { Name , Username} = req.params;
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Credentials', true);

  if (!(req.user.Username === Username)) {
    res.status(403).json("You are not logged in!");
  }else{
    try{

    const info = await Medicine.findOne({ Name: Name }, { _id: 0, ActiveIngredients: 0, Price: 0, Picture: 0, MedicalUse: 0 });
    if (!info) {
      return res.status(400).json({ error: "This medicine does not exist!" })
    }
    res.status(200).json(info);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

// Filter medicine by medical use
const getMedicineByMedicalUse = async (req, res) => {
  const { MedicalUse, Username} = req.params;
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Credentials', true);
  if (!(req.user.Username === Username)) {
    res.status(403).json("You are not logged in!");
  }else{
    try{
      const info = await Medicine.findOne({ MedicalUse: MedicalUse }, { _id: 0, Name: 0, ActiveIngredients: 0, Price: 0, Picture: 0 });
      if (!info) {
        return res.status(400).json({ error: "This medicine does not exist!" })
      }
      res.status(200).json(info);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

// Check if any medicine quantity is out of stock add a notification
const checkMedicineQuantityNotification = async () => {
    try {
      if (Username===undefined){
        return;
      }
      const outOfStockMedicines = await Medicine.find({ Quantity: 0 });
      for (const medicine of outOfStockMedicines) {
        const existingNotification = await Notification.findOne({ type: "Pharmacist", message: `${medicine.Name} is out of stock` });
          console.log(Username);
        if (!existingNotification) {
          const newNotification = await Notification.create({
            type: "Pharmacist",
            username: `${Username}`,
            MedicineName: `${medicine.Name}`,
            message: `${medicine.Name} is out of stock`,
          });
          await newNotification.save();
          //console.log('notification added');
          //console.log(outOfStockMedicines); // Print out the outOfStockMedicines array
        } else {
          console.log('notification already exists');
        }
      } 
    } catch (error) {
      console.error(error);
    }
};

const deleteNotificationIfQuantityNotZero = async () => {
  
    try {
      const notifications = await Notification.find({ type: "Pharmacist" });

      for (let i = 0; i < notifications.length; i++) {
        const notification = notifications[i];
        const medicine = await Medicine.findOne({ Name: notification.MedicineName });
        console.log('Medicine:', medicine);

        if (medicine && medicine.Quantity > 0) {
          await Notification.findOneAndDelete({ MedicineName: notification.MedicineName });
          console.log(`Notification for ${notification.MedicineName} deleted`);
        }
      }
    } catch (error) {
      console.error(error);
    }
};

const archiveMedicine = async (req, res) => {
  const { medicineName, Username } = req.params;
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Credentials', true);
  if (!(req.user.Username === Username)) {
    res.status(403).json("You are not logged in!");
  }else{
    try {
      const medicine = await Medicine.findOne({ Name: medicineName });

      if (!medicine) {
        return res.status(404).json({ message: 'Medicine not found' });
      }
      medicine.Status = 'archived';
      await medicine.save();

      res.json({ message: 'Medicine archived successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};

const unarchiveMedicine = async (req, res) => {
  const { medicineName, Username } = req.params;
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Credentials', true);
  if (!(req.user.Username === Username)) {
    res.status(403).json("You are not logged in!");
  }else{
    try {
      const medicine = await Medicine.findOne({ Name: medicineName });

      if (!medicine) {
        return res.status(404).json({ message: 'Medicine not found' });
      }
      medicine.Status = 'unarchived';
      await medicine.save();

      res.json({ message: 'Medicine unarchived successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};


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

      const monthlySales = salesReport.monthlySales.find((entry) => entry.Month.toLowerCase === chosenMonth.toLowerCase);
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


const viewSalesReportOnMedicine = async (req, res) => {
  const { Username ,medicineName } = req.params;
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Credentials', true);
  if (!(req.user.Username === Username)) {
    res.status(403).json("You are not logged in!");
  }else{
    try {

      const salesReport = await SReport.findOne();

      if (!salesReport) {
        return res.status(404).json({ message: 'Sales report not found' });
      }

      if (medicineName) {
        const salesForMedicine = salesReport.medicineSales.filter(
          (entry) => entry.medicineName.toLowerCase() === medicineName.toLowerCase()
        );

        let totalSales = 0;
        for(const med of salesForMedicine){
          totalSales += med.total;
        }

        return res.status(200).json({
          username: Username,
          medicineName,
          totalSales,
          salesForMedicine
        });


      } else {
        return res.status(400).json({ message: 'Please provide a medicine name' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  }
};

const viewSalesReportOnDate = async (req, res) => {
  const { Username ,date } = req.params;

  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Credentials', true);
  if (!(req.user.Username === Username)) {
    res.status(403).json("You are not logged in!");
  }else{
    try {

      const salesReport = await SReport.findOne();

      if (!salesReport) {
        return res.status(404).json({ message: 'Sales report not found' });
      }

      if (date) {
        const salesOnDate = salesReport.medicineSales.filter(
          (entry) => new Date(entry.date).toLocaleDateString() === new Date(date).toLocaleDateString()
        );

        let totalSales = 0;
        for(const med of salesOnDate){
          totalSales += med.total;
        }

        return res.status(200).json({
          username: Username,
          date,
          totalSales,
          salesOnDate
        });
      } else {
        return res.status(400).json({ message: 'Please provide a date ' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};
// Display all notifications
const displayNotifications = async (req, res) => {
  const { Username } = req.params;

  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Credentials', true);
  if (!(req.user.Username === Username)) {
    res.status(403).json("You are not logged in!");
  }else{
    try {
      const notifications = await Notification.find();
      const notificationMessages = notifications.map(notification => notification.message);
      res.status(200).json(notificationMessages);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};
const getPharmacistWalletAmount = async (req, res) => {
  const { Username } = req.params;
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Credentials', true);
  if (!(req.user.Username === Username)) {
    res.status(403).json("You are not logged in!");
  }else{
    try {
        const pharmacist = await Pharmacist.findOne({ Username });
        if (!pharmacist) {
            return res.status(404).json({ error: 'Pharmacist not found' });
        }

        res.status(200).json({ walletAmount: pharmacist.WalletAmount });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  }
};

const updatePharmacistSalary = async (pharmacistUsername) => {
  // Ensure hoursWorked is a valid number
 // if (typeof hoursWorked !== 'number' || hoursWorked < 0) {
   // throw new Error('Invalid hours worked');
 // }

  const pharmacist = await Pharmacist.findOne({ Username: pharmacistUsername });
  if (pharmacist) {
    const salary = pharmacist.HourlyRate * 176; // Calculate monthly salary
    pharmacist.WalletAmount += salary;
    await pharmacist.save();
    return { message: "Salary updated successfully" };
  } else {
    throw new Error('Pharmacist not found');
  }
};

module.exports = {
  availableMedicinesDetailsByPharmacist,
  availableMedicinesQuantity,
  medQuantityAndSales,
  addMedicine,
  updateMed,
  getMedicineByName,
  getMedicineByMedicalUse,
  checkMedicineQuantityNotification,
  deleteNotificationIfQuantityNotZero,
  archiveMedicine,
  unarchiveMedicine,
  viewSalesReportOnChosenMonth,
  viewSalesReportOnMedicine,
  viewSalesReportOnDate,
  displayNotifications,
  getPharmacistWalletAmount,
  updatePharmacistSalary
};
