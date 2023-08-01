import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import './addJob.css'; // Create and import your custom CSS file for the page (optional).
import Sidebar1 from '../../components/Navbar/Sidebar1/Sidebar1';
import { publicRequest } from '../../Helper/ApiRequest';

// const randomPositions = ['Software Engineer', 'Product Manager', 'Data Analyst', 'UI/UX Designer'];
// const randomDepartments = ['Engineering', 'Marketing', 'Finance', 'Human Resources'];

const AddJobPage = () => {
  const [jobData, setJobData] = useState({
    position_name: '',
    department_name: '',
    start_date: '',
    end_date: '',
    status: 'open',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setJobData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [departments, setDepartments] = useState([]);
  const [jobs, setJobs] = useState([]);

  // Make the API call only once when the component mounts
  useEffect(() => {
    const getDepartments = async () => {
      try {
        // Assuming the endpoint returns the department data
        const resp = await publicRequest.get(`/employee/getAllDepartments`);
        setDepartments(resp.data);
      } catch (err) {
        console.error('Error fetching department data:', err);
        throw err;
      }
    };

    const getAllJobs = async () => {
      try {
        // Assuming the endpoint returns the job data
        const resp = await publicRequest.get(`/employee/getAllJobs`);
        setJobs(resp.data);
      } catch (err) {
        console.error('Error fetching job data:', err);
        throw err;
      }
    };

    getDepartments();
    getAllJobs();
  }, []);

  const validateInputs = () => {

    if (
      jobData.position_name.trim() === '' ||
      jobData.department_name.trim() === '' ||
      jobData.start_date === '' ||
      jobData.end_date === ''
    ) {
      alert('Please fill in all required fields.');
      return false;
    } else if (new Date(jobData.start_date) > new Date(jobData.end_date)) {
      alert('Start date cannot be later than end date.');
      return false;
    }
    return true;
  };

  const handleAddJob = async (e) => {
    if (validateInputs()) {
      try {
        const response = await publicRequest.post('/department/addJob', { jobData });
        alert(
          `Job Created:\nPosition Name: ${jobData.position_name}\nDepartment Name: ${jobData.department_name}\nStart Date: ${jobData.start_date}\nEnd Date: ${jobData.end_date}\nStatus: ${jobData.status}`
        );
      } catch (error) {
        alert(`Failed to create employee`);
        console.error('Login failed:', error);
      }
      // Reset the input fields
      setJobData({
        position_name: '',
        department_name: '',
        start_date: '',
        end_date: '',
        status: 'Open',
      });
    }
  };

  return (
    <>
      <Navbar />
      <Sidebar1 />

      <div className="page-wrapper">
        <div className="content">
          <h2 className="page-title" style={{ marginBottom: '50px' }}>
            Add Job
          </h2>

          <div className="form-group">
            <label htmlFor="position_name">Position Name:</label>
            <select
              id="position_name"
              name="position_name"
              value={jobData.position_name}
              onChange={handleChange}
              required
            >
              <option value="">Select a position</option>
              {jobs.map((position) => (
                <option key={position.job_id} value={position.job_id}>
                  {position.job_title}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="department_name">Department Name:</label>
            <select
              id="department_name"
              name="department_name"
              value={jobData.department_name}
              onChange={handleChange}
              required
            >
              <option value="">Select a department</option>
              {departments.map((department) => (
                <option key={department.department_id} value={department.department_id}>
                  {department.department_name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="start_date">Start Date:</label>
            <input
              type="date"
              id="start_date"
              name="start_date"
              value={jobData.start_date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="end_date">End Date:</label>
            <input
              type="date"
              id="end_date"
              name="end_date"
              value={jobData.end_date}
              onChange={handleChange}
              required
            />
          </div>

          

          <button onClick={handleAddJob}>Submit</button>
        </div>
      </div>
    </>
  );
};

export default AddJobPage;
