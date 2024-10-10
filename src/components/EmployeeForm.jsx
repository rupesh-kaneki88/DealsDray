import React, { useState, useEffect } from 'react';

const EmployeeForm = ({ onCreateEmployee, onUpdateEmployee, editMode, editEmployee }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    designation:'',
    gender: '',
    course: '',
    attachments: [],
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

useEffect(() => {
  if (editMode && editEmployee) {
    // Ensure we deep copy the employee object and set it
    setFormData({
      name: editEmployee.name || '',
      email: editEmployee.email || '',
      phoneNumber: editEmployee.phoneNumber || '',
      designation: editEmployee.designation || '',
      gender: editEmployee.gender || '',
      course: editEmployee.course || '',
      attachments: editEmployee.attachments || [],
    });
  }
}, [editMode, editEmployee]);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, attachments: files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
  
    const formDataToSend = new FormData();
    for (const key in formData) {
        if (key === 'attachments') {
        // Append each file in the attachments array
        formData[key].forEach(file => {
          formDataToSend.append('attachments', file); // No need for an index
        });
      } else {
        formDataToSend.append(key, formData[key]);
      }
    }
  
    try {
      if (editMode && editEmployee) {
        await onUpdateEmployee(editEmployee._id, formDataToSend);
        setSuccessMessage('Employee updated successfully!');
      } else {
        await onCreateEmployee(formDataToSend);
        setSuccessMessage('Employee created successfully!');
      }
  
      // Reset form data
      setFormData({
        name: '',
        email: '',
        phoneNumber: '',
        designation:'',
        gender: '',
        course: '',
        attachments: [],
      });
    } catch (error) {
      setErrorMessage('Error submitting form. Please try again.', error);
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mt-8 bg-stone-300 p-20 rounded">
    <label className="text-2xl font-bold mb-4 block text-left">
      {editMode ? 'Edit' : 'Create'} Employee
    </label>

    {/* Display Error or Success Message */}
    {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
    {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}

    {/* Form Fields */}
    {/* Name */}
    <label className="block mb-2 text-gray-800 text-left">Name:</label>
    <input
      type="text"
      name="name"
      value={formData.name}
      onChange={handleChange}
      
      className="border border-gray-300 px-2 py-1 rounded mb-4 w-full"
    />

     {/* Email */}
     <label className="block mb-2 text-gray-800 text-left">Email ID:</label>
    <input
      type="email"
      name="email"
      value={formData.email}
      onChange={handleChange}
      
      className="border border-gray-300 px-2 py-1 rounded mb-4 w-full"
    />

    {/* Phone Number */}
    <label className="block mb-2 text-gray-800 text-left">Phone Number:</label>
    <input
      type="text"
      name="phoneNumber"
      value={formData.phoneNumber}
      onChange={handleChange}
      
      className="border border-gray-300 px-2 py-1 rounded mb-4 w-full"
    />
 
     {/* Designation */}
     <label className="block mb-2 text-gray-800 text-left">Designation:</label>
    <input
      type="text"
      name="designation"
      value={formData.designation}
      onChange={handleChange}
      
      className="border border-gray-300 px-2 py-1 rounded mb-4 w-full"
    />

    {/* Gender */}
    <label className="block mb-2 text-gray-800 text-left">Gender:</label>
    <select
      name="gender"
      value={formData.gender}
      onChange={handleChange}
      
      className="border border-gray-300 px-2 py-1 rounded mb-4 w-full"
    >
      <option value="">Select Gender</option>
      <option value="Male">Male</option>
      <option value="Female">Female</option>
      <option value="Other">Other</option>
    </select>

     {/* Course */}
     <label className="block mb-2 text-gray-800 text-left">Course:</label>
    <input
      type="text"
      name="course"
      value={formData.course}
      onChange={handleChange}
      
      className="border border-gray-300 px-2 py-1 rounded mb-4 w-full"
    />
    

    {/* Image */}
    <label className="block mb-2 text-gray-800 text-left">Attachments:</label>
    <input
      type="file"
      multiple
      name="attachments"
      onChange={handleFileChange}
      className="border border-gray-300 px-2 py-1 rounded mb-4 w-full"
    />

    {/* Submit Button */}
    <button
      type="submit"
      className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
    >
      {editMode ? 'Update Client' : 'Create Client'}
    </button>
  </form>
  );
};

export default EmployeeForm;
