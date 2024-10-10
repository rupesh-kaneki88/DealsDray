import React, { useState, useEffect, useCallback } from 'react';
import EmployeeList from '../components/EmployeeList';
import EmployeeForm from '../components/EmployeeForm';

const EmployeePage = () => {
  const baseURL = "http://localhost:3001";

  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editEmployee, setEditEmployee] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState('name'); // Default sorting by name
  const [sortOrder, setSortOrder] = useState('asc'); // Default ascending order

  const fetchEmployees = useCallback(async () => {
    try {
      const response = await fetch(`${baseURL}/employees`);
      const data = await response.json();
      setEmployees(data);
      setFilteredEmployees(data); // Initial full list
      handleSort(sortField, sortOrder, data); // Sort after fetching employees
    } catch (error) {
      console.error('Error fetching employees:', error.message);
    }
  }, [sortField, sortOrder]);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees,sortField]);

  const handleCreateEmployee = async (newEmployee) => {
    try {
      const response = await fetch(`${baseURL}/employees`, {
        method: 'POST',
        body: newEmployee,
      });
      if (response.ok) {
        const data = await response.json();
        setEmployees([...employees, data]);
        setFilteredEmployees([...employees, data]);
        setShowForm(false);
        window.alert('Employee created successfully!');
        fetchEmployees();
      } else {
        console.error('Failed to create Employee');
        window.alert('Failed to create an Employee');
      }
    } catch (error) {
      console.error('Error creating Employee:', error);
    }
  };

  const handleUpdateEmployee = async (id, updatedEmployee) => {
    try {
      const response = await fetch(`${baseURL}/employees/${id}`, {
        method: 'PUT',
        body: updatedEmployee,
      });
      if (response.ok) {
        const updatedEmployees = employees.map((employee) =>
          employee._id === id ? updatedEmployee : employee
        );
        setEmployees(updatedEmployees);
        setFilteredEmployees(updatedEmployees);
        setShowForm(false);
        setEditEmployee(null);
        window.alert('Employee updated successfully!');
        fetchEmployees();
      } else {
        console.error('Failed to update employee');
        window.alert('Some error occurred');
      }
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  const handleDeleteEmployee = async (id) => {
    try {
      const response = await fetch(`${baseURL}/employees/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        window.alert('Employee deleted successfully!');
        fetchEmployees();
      } else {
        console.error('Failed to delete employee');
      }
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const handleEditEmployee = (employee) => {
    setEditEmployee(employee);
    setShowForm(true);
  };

  const handleSearch = (query) => {
    const lowercasedQuery = query.toLowerCase();
    const filtered = employees.filter((employee) => {
      const formattedDate = new Date(employee.createDate).toLocaleDateString().toLowerCase(); // Convert createDate to readable format
      return (
        employee.name.toLowerCase().includes(lowercasedQuery) ||
        employee.email.toLowerCase().includes(lowercasedQuery) ||
        formattedDate.includes(lowercasedQuery) // Add formatted date filtering
      );
    });
    setFilteredEmployees(filtered); // Set filtered list
  };

  const handleSort = (field, order, employeesData) => {
    const sorted = [...employeesData].sort((a, b) => {
      let valueA = a[field];
      let valueB = b[field];

      if (field === 'createDate') {
        valueA = new Date(valueA);
        valueB = new Date(valueB);
      } else {
        valueA = valueA.toLowerCase();
        valueB = valueB.toLowerCase();
      }

      if (order === 'asc') {
        return valueA > valueB ? 1 : -1;
      } else {
        return valueA < valueB ? 1 : -1;
      }
    });
    setFilteredEmployees(sorted); // Set sorted list
  };

  const handleSortFieldChange = (e) => {
    const field = e.target.value;
    setSortField(field);
    handleSort(field, sortOrder, filteredEmployees.length > 0 ? filteredEmployees : employees);
  };

  const toggleSortOrder = () => {
    const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newOrder);
    handleSort(sortField, newOrder, filteredEmployees.length > 0 ? filteredEmployees : employees);
  };

  const handleSearchQueryChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    handleSearch(query);
  };

  const displayedEmployees = searchQuery ? filteredEmployees : employees;

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Employees</h1>

      {!showForm && (
        <div className="flex justify-between items-center mb-8">
          <input
            type="text"
            placeholder="Search by name, email, or date"
            value={searchQuery}
            onChange={handleSearchQueryChange}
            className="border border-gray-300 rounded-md px-3 py-1 ml-8"
          />
          <div className="flex items-center mr-8">
            <select
              value={sortField}
              onChange={handleSortFieldChange}
              className="border border-gray-300 rounded-md px-3 py-1 mr-2"
            >
              <option value="name">Sort by Name</option>
              <option value="email">Sort by Email</option>
              <option value="createDate">Sort by Date</option>
            </select>
            <button
              onClick={toggleSortOrder}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
            </button>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mr-8"
          >
            Create Employee
          </button>
        </div>
      )}

      <EmployeeList
        employees={displayedEmployees || []}
        onDeleteEmployee={handleDeleteEmployee}
        onEditEmployee={handleEditEmployee}
      />

      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md h-[80vh] overflow-y-auto relative ">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 rounded-full"
              onClick={() => setShowForm(false)}
            >
              &#x2715; {/* Close button */}
            </button>
            <EmployeeForm
              onCreateEmployee={handleCreateEmployee}
              onUpdateEmployee={handleUpdateEmployee}
              editMode={Boolean(editEmployee)}
              editEmployee={editEmployee}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeePage;
