import React from 'react';

const EmployeeList = ({ employees, onDeleteEmployee, onEditEmployee }) => {
  const handleDeleteClick = (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this item?");
    if (confirmed) {
      onDeleteEmployee(id);
    }
  };

  return (
    <table className="table-auto w-full">
      <thead>
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile Number</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Designation</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Create Date</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {employees.map((Employee) => (
          <tr key={Employee._id} className="hover:bg-gray-100 transition duration-150 ease-in-out">
            <td className="px-6 py-4 whitespace-nowrap">
              {Employee.attachments && Employee.attachments.length > 0 && (
                <img
                  src={`http://localhost:3001/uploads/${Employee.attachments}`}
                  alt={Employee.name}
                  className="employee-image rounded"
                  style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                />
              )}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">{Employee.name}</td>
            <td className="px-6 py-4 whitespace-nowrap">{Employee.email}</td>
            <td className="px-6 py-4 whitespace-nowrap">{Employee.phoneNumber}</td>
            <td className="px-6 py-4 whitespace-nowrap">{Employee.designation}</td>
            <td className="px-6 py-4 whitespace-nowrap">{Employee.gender}</td>
            <td className="px-6 py-4 whitespace-nowrap">{Employee.course}</td>
            <td className="px-6 py-4 whitespace-nowrap">{new Date(Employee.createDate).toLocaleDateString()}</td>
            <td className="px-6 py-4 whitespace-nowrap">
              <button onClick={() => onEditEmployee(Employee)} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700 mr-2">Edit</button>
              <button onClick={() => handleDeleteClick(Employee._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EmployeeList;
