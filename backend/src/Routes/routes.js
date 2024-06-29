const express = require('express');
const router = express.Router();
const upload = require('./multer-config');

// Administrator Controller
const {
    addAdmin,
    removePatientOrPharmacist,
    infosOfAPharmacistRequest,
    infosOfRequestsByPharmacist,
    availableMedicinesDetailsByAdmin,
    pharmacistInfo,
    allPharmacists,
    allPatients,
    patientInfo,
    addPharmacist,
    acceptOrRejectPharmacistRequest
} = require('../Controllers/administratorController');

// Guest Controller
const {
    registerPatient,
    submitRequestToBePharmacist
} = require('../Controllers/guestController');

// Patient Controller
const {
    availableMedicinesDetailsByPatient,
    getMedicineByName,
    getMedicineByMedicalUse,
    addAddressToPatient,
    getPatientAddresses,
    getOrderDetails,
    cancelOrder,
    viewCartItems,
    removeAnItemFromCart,
    addMedicineToCart,
    updateMedicineQuantityInCart,
    checkoutOrder,
    viewAlternatives,
    getPatientWalletAmount,
    getAllOrders,
    getMedicinesFromUnfilledPrescriptions,
    addPrescriptionMedicineToCart,
} = require('../Controllers/patientController');

// Pharmacist Controller
const {
    availableMedicinesDetailsByPharmacist,
    availableMedicinesQuantity,
    medQuantityAndSales,
    addMedicine,
    updateMed,
    checkMedicineQuantityNotification,
    deleteNotificationIfQuantityNotZero,
    archiveMedicine,
    unarchiveMedicine,
    viewSalesReportOnChosenMonth,
    viewSalesReportOnMedicine,
    viewSalesReportOnDate,
    getPharmacistWalletAmount,
    updatePharmacistSalary,

    displayNotifications
} = require('../Controllers/pharmacistController');

// Doctor from the Clinic Controller
const { GetMedicineByDoctor, GetAllMedicines} = require('../Controllers/DoctorFromTheClinic');

const { verify } = require('../Controllers/loginController');

//Routes of Administrator
router.post('/AddAdmin/:username', verify, addAdmin);
router.post('/AddPharmacist/:username', verify, addPharmacist);
router.delete('/RemovePatientOrPharmacist/:username/:Username', verify, removePatientOrPharmacist);
router.get('/InfosOfAPharmacistRequest/:username/:Username', verify, infosOfAPharmacistRequest);
router.get('/InfosOfRequestsByPharmacist/:username', verify, infosOfRequestsByPharmacist);
router.get('/AvailableMedicinesDetailsByAdmin/:username', verify, availableMedicinesDetailsByAdmin);
router.get('/PharmacistInfo/:username/:Username', verify, pharmacistInfo);
router.get('/AllPharmacists/:username', verify, allPharmacists);
router.get('/AllPatients/:username', verify, allPatients);
router.get('/PatientInfo/:username/:Username', verify, patientInfo);
router.get('/MedicineByName/:username/:Name', verify, getMedicineByName);
router.get('/MedicineByMedicalUse/:username/:MedicalUse', verify, getMedicineByMedicalUse);
router.post('/AcceptOrRejectPharmacistRequest/:username/:Username', verify, acceptOrRejectPharmacistRequest);

// Routes of Guest
router.post('/RegisterPatient', registerPatient);
router.post('/SubmitRequestToBePharmacist', upload.fields([
    { name: 'IDDocument', maxCount: 1 },
    { name: 'PharmacyDegreeDocument', maxCount: 1 },
    { name: 'WorkingLicenseDocument', maxCount: 1 },
]), submitRequestToBePharmacist);

// Routes of Patient
router.get('/AvailableMedicinesDetailsByPatient/:Username', verify, availableMedicinesDetailsByPatient);
router.get('/MedicineByName/:Username/:Name', verify, getMedicineByName);
router.get('/MedicineByMedicalUse/:Username/:MedicalUse', verify, getMedicineByMedicalUse);
router.post('/AddAddressToPatient/:Username', verify, addAddressToPatient);
router.get('/GetPatientAddresses/:Username', verify, getPatientAddresses);
router.get('/GetOrderDetails/:Username', verify, getOrderDetails);
router.put('/CancelOrder/:orderId', verify, cancelOrder);
router.get('/viewCartItems/:Username', verify, viewCartItems);
router.delete('/removeItemFromCart/:Username/:MedicineName', verify, removeAnItemFromCart);
router.post('/addMedicineToCart/:Username/:MedicineName', verify, addMedicineToCart);
router.put('/updateQuantity/:Username/:MedicineName/:quantity', verify, updateMedicineQuantityInCart);
router.post('/checkoutOrder/:Username/:paymentMethod/:ShippingAddress', verify, checkoutOrder);
router.get('/viewAlternatives/:Username/:medicineName', verify, viewAlternatives);
router.get('/getPatientWalletAmount/:Username', verify, getPatientWalletAmount);
router.get('/getAllOrders/:Username', verify, getAllOrders);
router.get('/getMedicinesFromUnfilledPrescriptions/:Username', verify, getMedicinesFromUnfilledPrescriptions);
router.post('/addPrescriptionMedicineToCart/:Username/:MedicineName', verify, addPrescriptionMedicineToCart);


// Routes of Pharmacist
router.get('/AvailableMedicinesDetailsByPharmacist/:Username', verify, availableMedicinesDetailsByPharmacist);
router.get('/AvailableMedicinesQuantity/:Username', verify, availableMedicinesQuantity);
router.get('/MedQuantityAndSales/:Username/:Name', verify, medQuantityAndSales);
router.post('/AddMedicine/:Username', verify, upload.single('Picture'), addMedicine);
router.put('/UpdateMed/:Username/:Name', verify, upload.single('Picture'), updateMed);
router.get('/MedicineByName/:Username/:Name', verify, getMedicineByName);
router.get('/MedicineByMedicalUse/:Username/:MedicalUse', verify, getMedicineByMedicalUse);
router.post('/CheckMedicineQuantityNotification', verify, checkMedicineQuantityNotification);
router.post('/deleteNotificationIfQuantityNotZero', verify, deleteNotificationIfQuantityNotZero);
router.put('/archiveMedicine/:Username/:medicineName', verify, archiveMedicine);
router.put('/unarchiveMedicine/:Username/:medicineName', verify, unarchiveMedicine);
router.get('/viewSalesReportOnChosenMonth/:Username/:chosenMonth', verify, viewSalesReportOnChosenMonth);
router.get('/viewSalesReportOnMedicine/:Username/:medicineName', verify, viewSalesReportOnMedicine);
router.get('/viewSalesReportOnDate/:Username/:date', verify, viewSalesReportOnDate);

router.post('/CheckMedicineQuantityNotification/:Username', verify, checkMedicineQuantityNotification);
router.post('/deleteNotificationIfQuantityNotZero/:Username', verify, deleteNotificationIfQuantityNotZero);
router.get('/displayNotifications/:Username', verify, displayNotifications);
router.get('/getPharmacistWalletAmount/:Username', verify, getPharmacistWalletAmount);
router.put('/updatePharmacistSalary/:Username/:hoursWorked', verify, updatePharmacistSalary);




router.get('/GetMedicineByDoctor/:username/:Name', GetMedicineByDoctor);
router.get('/GetAllMedicines/:DoctorUsername', GetAllMedicines);

module.exports = router;