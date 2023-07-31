import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import './addDepartment.css'; // Create and import your custom CSS file for the page (optional).
import Sidebar1 from '../../components/Navbar/Sidebar1/Sidebar1';
import { publicRequest } from '../../Helper/ApiRequest';

const AddDepartmentPage = () => {

  const [departments, setDepartments] = useState([]);
  const [managers, setManagers] = useState([]);
  const [departmentData, setDepartmentData] = useState({
    departmentId: '',
    departmentName: '',
    managerName: '',
  });

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

    const getAllManagers = async () => {
      try {
        const resp = await publicRequest.get(`/employee/getAllManagers`);
        setManagers(resp.data);
      } catch (err) {
        console.error('Error fetching data:', err);
        throw err;
      }
    };

    getDepartments();
    getAllManagers();
  }, []);

  useEffect(() => {
    // Find the highest department ID
    const highestDepartmentId = Math.max(
      ...(departments?.map((department) => department.department_id) ?? [0])
    );

    // Update the departmentId value in the state
    setDepartmentData((prevData) => ({
      ...prevData,
      departmentId: (highestDepartmentId + 1).toString(),
    }));
  }, [departments]);

  const [errors, setErrors] = useState({
    departmentId: '',
    departmentName: '',
    managerName: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDepartmentData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };


  const validateInputs = () => {

    // Check if the department ID is not empty
    if (departmentData.departmentId.trim() === '') {

      alert('Department ID cannot be empty');
      return false;
    }

    // Check if the department name is not empty
    if (departmentData.departmentName.trim() === '') {

      alert('Department Name cannot be empty');
      return false;
    }

    // Check if the manager name is not empty
    if (departmentData.managerName.trim() === '') {

      alert('Department Name cannot be empty');
      return false;
    }
    return true;
  };
  
  const handleAddDepartment = async (e) => {
    if (validateInputs()) {
      try {
        const response = await publicRequest.post('/department/addDeprtment', { departmentData });
        alert(`Department Added:\nDepartment ID: ${departmentData.departmentId}\nDepartment Name: ${departmentData.departmentName}\nManager Name: ${departmentData.managerName}`);
      } catch (error) {
        alert(`Failed to create employee`);
        console.error('Login failed:', error);
      }
  
      setDepartmentData((prevData) => ({
        ...prevData,
        departmentId: (parseInt(prevData.departmentId) + 1).toString(),
        departmentName: '',
        managerName: '',
      }));
    }
  };
  

  return (
    <>
      <Navbar />
      <Sidebar1 />

      <div className="page-wrapper">
        <div className="content">
          <h2 className="page-title" style={{ marginBottom: '50px' }}>
            Add Department
          </h2>

          <div className="form-group">
            <label htmlFor="departmentId">Department ID:</label>
            <input
              type="text"
              id="departmentId"
              name="departmentId"
              value={departmentData.departmentId}
              onChange={handleChange}
              required
              disabled
            />
            {errors.departmentId && <div className="error-message">{errors.departmentId}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="departmentName">Department Name:</label>
            <input
              type="text"
              id="departmentName"
              name="departmentName"
              value={departmentData.departmentName}
              onChange={handleChange}
              required
            />
            {errors.departmentName && <div className="error-message">{errors.departmentName}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="managerName">Manager Name:</label>
            <select
              id="managerName"
              name="managerName"
              value={departmentData.managerName}
              onChange={handleChange}
              required
            >
              <option value="">Select Manager</option>
              {managers.map((manager) => (
                <option key={manager.employee_id} value={manager.employee_id}>
                  {manager.first_name} {manager.last_name}
                </option>
              ))}
            </select>
            {errors.managerName && <div className="error-message">{errors.managerName}</div>}
          </div>

          <button onClick={handleAddDepartment}>Submit</button>
        </div>
      </div>
    </>
  );
};

export default AddDepartmentPage;
