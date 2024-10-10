const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  name: { type: String, required: true },
  gender: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  course: { type: String, required: true },
  createDate: { type: Date, required: true },
  designation: { type: String, required: true },
  attachments: [{ type: String }], // Storing file paths or URLs
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
