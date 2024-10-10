const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer'); 
const employeeController = require('../controller/employeeController')

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Define where to store files
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Use a unique name for each file
    }
});

const upload = multer({ storage: storage }); // Initialize multer with storage settings

router.post('/', upload.array('attachments', 5), employeeController.createEmployee);

router.get('/', employeeController.getEmployee);

router.get('/:id', employeeController.getEmployeeById);

router.put('/:id', upload.array('attachments', 5), employeeController.updateEmployee);

router.delete('/:id', employeeController.deleteEmployee);

module.exports = router;




