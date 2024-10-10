const multer = require('multer');
const path = require('path');
const Employee = require('../model/EmployeeModel');

// Allowed file types
const allowedFileTypes = /jpeg|jpg|png/;

// Configure multer to save files in the uploads folder
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Use timestamp + extension as filename
  }
});

// File filter to allow only jpg/png files
const fileFilter = (req, file, cb) => {
  const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedFileTypes.test(file.mimetype);
  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Only .jpg and .png files are allowed!'), false);
  }
};

const upload = multer({ storage, fileFilter });

// Email validation function
const validateEmail = (email) => {
  const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return re.test(email);
};

// Numeric validation function
const validateNumeric = (value) => {
  return /^[0-9]+$/.test(value);
};

// Create a new employee
exports.createEmployee = async (req, res) => {
  try {
    console.log('Starting employee creation process');
    console.log('Request Body:', req.body);
    console.log('Request Files:', req.files);

    if (!req.files || req.files.length === 0) {
      return res.status(400).send('No files uploaded.');
    }

    const { name, phoneNumber, email, gender, course, designation } = req.body;

    // Validate fields
    if (!name || !course || !phoneNumber || !designation || !email || !gender) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    if (!validateNumeric(phoneNumber)) {
      return res.status(400).json({ message: 'Phone number must contain only numbers' });
    }

    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res.status(400).json({ message: 'Employee with this email already exists' });
    }

    const date = new Date();
    const isoString = date.toISOString();
    const createDate = isoString.replace(/T/, ' ').replace(/\..*/, ''); // "2024-10-10 14:30:00"

    const employee = new Employee({
      name,
      phoneNumber,
      email,
      gender,
      course,
      designation,
      createDate,
      attachments: req.files.map(file => file.filename), // Store paths of uploaded files
    });

    await employee.save();
    res.status(201).json({ message: 'Employee created successfully', employee });
    
  } catch (err) {
    console.error('Error creating employee:', err);
    res.status(500).json({ message: 'Failed to create employee', error: err.message });
  }
};

exports.getEmployee = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (err) {
    console.error('Error fetching employees:', err);
    res.status(500).json({ message: 'Failed to fetch employees', error: err.message });
  }
};

exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json(employee);
  } catch (err) {
    console.error('Error fetching employee:', err);
    res.status(500).json({ message: 'Failed to fetch employee', error: err.message });
  }
};

// Update an employee
exports.updateEmployee = async (req, res) => {
  try {
    const { name, phoneNumber, email, gender, course, designation } = req.body;

    const updatedFields = {
      name,
      phoneNumber,
      email,
      gender,
      course,
      designation,
    };

    if (req.files && req.files.length > 0) {
      updatedFields.attachments = req.files.map(file => file.filename); // Update file paths if new files are uploaded
    }

    const employee = await Employee.findByIdAndUpdate(req.params.id, updatedFields, { new: true });

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(200).json({ message: 'Employee updated successfully', employee });
  } catch (err) {
    console.error('Error updating employee:', err);
    res.status(500).json({ message: 'Failed to update employee', error: err.message });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json({ message: 'Employee deleted successfully', employee });
  } catch (err) {
    console.error('Error deleting employee:', err);
    res.status(500).json({ message: 'Failed to delete employee', error: err.message });
  }
};
