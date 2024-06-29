const express = require('express');

const multer = require('multer');
const path = require('path');

const storage = multer.memoryStorage();

const allowedFileTypes = ['pdf', 'jpeg', 'jpg', 'png', 'PDF', 'JPEG', 'JPG', 'PNG', 'Pdf', 'Jpeg', 'Jpg', 'Png'];

const fileFilter = (req, file, cb) => {
    const extname = path.extname(file.originalname).toLowerCase();
    if (allowedFileTypes.includes(extname.substr(1))) {
        return cb(null, true);
    }
    return cb(new Error('Invalid file type. Only PDF, JPEG, JPG, and PNG files are allowed.'));
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
});

module.exports = upload;