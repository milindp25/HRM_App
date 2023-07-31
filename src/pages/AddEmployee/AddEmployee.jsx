import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import './addemployee.css'; // Create and import your custom CSS file for the page (optional).
import Sidebar1 from '../../components/Navbar/Sidebar1/Sidebar1';
import { publicRequest } from '../../Helper/ApiRequest';

const AddEmployeePage = () => {
  const [employeeData, setEmployeeData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    date_of_birth: '',
    street_address_1: '',
    street_address_2: '',
    city: '',
    state: '',
    department_id: '',
    date_of_joining: '',
    user_type: 'E',
  });

  const [departments, setDepartments] = useState([]);

  // Make the API call only once when the component mounts
  useEffect(() => {
    const getDepartments = async () => {
      try {
        const resp = await publicRequest.get(`/employee/getAllDepartments`);
        setDepartments(resp.data);
      } catch (err) {
        console.error('Error fetching data:', err);
        throw err;
      }
    };

    getDepartments();
  }, []); // Empty dependency array ensures the effect runs only once after the initial render.


  const handleChange = (event) => {
    const { name, value } = event.target;
    setEmployeeData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddEmployee = async (e)  => {
    // Here, you can handle the logic to add the employee to your data or database.
    // For example, you can show a pop-up with the added employee details.

    // Perform validations before adding the employee
    if (
        !employeeData.first_name ||
        !employeeData.last_name ||
        !employeeData.email ||
        !employeeData.phone_number ||
        !employeeData.date_of_birth ||
        !employeeData.city ||
        !employeeData.state ||
        !employeeData.department_id ||
        !employeeData.date_of_joining ||
        !employeeData.user_type
      ) {
        alert('Please fill in all the required fields.');
        return;
      }
  
      const today = new Date().toISOString().slice(0, 10);
      if (employeeData.date_of_birth >= today) {
        alert('Date of Birth cannot be today or a future date.');
        return;
      }
  
      if (employeeData.date_of_joining < today) {
        alert('Date of Joining cannot be a past date.');
        return;
      }
    console.log(employeeData);

    try {

      const response = await publicRequest.post('/employee/addEmployee', { employeeData});
      alert(`Employee Created:\nFull Name: ${employeeData.first_name} ${employeeData.last_name}\nEmail: ${employeeData.email}\nPhone: ${employeeData.phone_number}\nDepartment ID: ${employeeData.department_id}`);
    } catch (error) {
      alert(`Failed to create employee`);
      console.error('Login failed:', error);
    }
    alert(`Employee Created:\nFull Name: ${employeeData.first_name} ${employeeData.last_name}\nEmail: ${employeeData.email}\nPhone: ${employeeData.phone_number}\nDepartment ID: ${employeeData.department_id}`);
    // Reset the input fields
    setEmployeeData({
      first_name: '',
      last_name: '',
      email: '',
      phone_number: '',
      date_of_birth: '',
      street_address_1: '',
      street_address_2: '',
      city: '',
      state: '',
      department_id: '',
      date_of_joining: '',
      user_type: 'E',
    });
  };

  return (
    <>
      <Navbar />
      <Sidebar1 />

      <div className="page-wrapper">
        <div className="content">
          <h2 className="page-title" style={{ marginBottom: '20px' }}>
            Add Employee
          </h2>

          <div className="form-group">
            <label htmlFor="first_name">First Name:</label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={employeeData.first_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
              <label htmlFor="last_name">Last Name:</label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={employeeData.last_name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={employeeData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone_number">Phone Number:</label>
              <input
                type="tel"
                id="phone_number"
                name="phone_number"
                value={employeeData.phone_number}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="date_of_birth">Date of Birth:</label>
              <input
                type="date"
                id="date_of_birth"
                name="date_of_birth"
                value={employeeData.date_of_birth}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="street_address_1">Street Address 1:</label>
              <input
                type="text"
                id="street_address_1"
                name="street_address_1"
                value={employeeData.street_address_1}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="street_address_2">Street Address 2:</label>
              <input
                type="text"
                id="street_address_2"
                name="street_address_2"
                value={employeeData.street_address_2}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="city">City:</label>
              <input
                type="text"
                id="city"
                name="city"
                value={employeeData.city}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="state">State:</label>
              <input
                type="text"
                id="state"
                name="state"
                value={employeeData.state}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
            <label htmlFor="department_id">Department ID:</label>
            <select
              id="department_id"
              name="department_id"
              value={employeeData.department_id}
              onChange={handleChange}
              required
            >
              {/* Map the departments data to create options for the dropdown */}
              {departments.map((department) => (
                <option key={department.department_id} value={department.department_id}>
                  {department.department_name}
                </option>
              ))}
            </select>
          </div>

            <div className="form-group">
              <label htmlFor="date_of_joining">Date of Joining:</label>
              <input
                type="date"
                id="date_of_joining"
                name="date_of_joining"
                value={employeeData.date_of_joining}
                onChange={handleChange}
                required
              />
            </div>

          <div className="form-group">
            <label htmlFor="user_type">User Type:</label> 
            <select
              id="userType"
              name="user_type" 
              value={employeeData.user_type} 
              onChange={handleChange}
            >
              <option value="E">Employee</option>
              <option value="M">Manager</option>
            </select>
          </div>

          <button onClick={handleAddEmployee}>Submit</button>
        </div>
      </div>
    </>
  );
};

export default AddEmployeePage;
