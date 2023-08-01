import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import './employeePerformance.css';
import StarRatings from 'react-star-ratings';
import Sidebar1 from '../../components/Navbar/Sidebar1/Sidebar1';
import { publicRequest } from '../../Helper/ApiRequest';
import { useSelector } from 'react-redux';

const employeesData = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' },
  { id: 3, name: 'Michael Johnson' },
  // Add more employee data as needed
];

const EmployeePerformance = () => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employeeId, setEmployeeId] = useState('');
  const [employeeName, setEmployeeName] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [employees,setEmployees] = useState([]);
  const user = useSelector(state => state.user.currentUser);

  const handleEmployeeSelect = (employee) => {
    setSelectedEmployee(employee);
    setEmployeeName(employee.name);
    setEmployeeId(employee.id);
    setIsPopupOpen(false);
  };

  const handleSearchInputChange = (e) => {
    const filter = e.target.value.toLowerCase();
    if (filter) {
      const filteredEmployees = employees.filter((employee) =>
        employee.name.toLowerCase().includes(filter)
      );
      setFilteredOptions(filteredEmployees);
    } else {
      setFilteredOptions(employees.slice(0, 5));
    }
  };

  useEffect(() => {
    const getEmployees = async () => {
      try {
        const resp = await publicRequest.get(`/employee/getEmployeeManaged?id=${user.employee_id}`);
        setEmployees(resp.data);
        setFilteredOptions(resp.data);
      } catch (err) {
        console.error('Error fetching department data:', err);
        throw err;
      }
    };
    getEmployees();
  }, []);

  const dropdownOptions = employees.map((employee) => (
    <li key={employee.employee_id} onClick={() => handleEmployeeSelect(employee)}>
      <a href="#" className="dropdown-item">
        {`${employee.first_name} ${employee.last_name}`}
      </a>
    </li>
  ));

  const handleSubmit = async (e) => {
    if (!employeeId || !employeeName || !dateTo || rating === 0 || !comments) {
      alert('Please fill in all the required fields.');
      return;
    }

    const performanceData={
      employee_id : employeeId,
      date : dateTo,
      rating : rating,
      comments : comments
    }

    try {
      const response = await publicRequest.post('/employee/addPerformance', { performanceData });
      alert(`Performance Submitted:\nEmployee Name: ${employeeName}\nEmployee ID: ${employeeId}\nDate To: ${dateTo}\nRatings: ${rating}\nComments: ${comments}`);
    } catch (error) {
      alert(`Failed to create employee`);
      console.error('Login failed:', error);
    }
    setSelectedEmployee(null);
    setEmployeeId('');
    setEmployeeName('');
    setDateTo('');
    setRating(0);
    setComments('');
  };
  return (
    <>
      <Navbar />
      <Sidebar1 />

           <div className="page-wrapper">
        <div className="content">
          <h2 className="page-title">Employee Performance</h2>

          <div className="form-group">
            <label htmlFor="employeeSelect">Select Employee:</label>
            <div className="dropdown">
              <button
                className="dropdown-toggle hidden-arrow btn btn-primary"
                type="button"
                id="navbarDropdownMenuLink"
                onClick={() => setIsPopupOpen(!isPopupOpen)}
              >
                {selectedEmployee ? selectedEmployee.name : 'Select Employee'}
              </button>
              <ul
                className={`dropdown-menu dropdown-menu-left ${
                  isPopupOpen ? 'show' : ''
                }`}
                aria-labelledby="navbarDropdownMenuLink"
              >
                <li>
                  <div className="input-group mt-2 mx-2">
                    <div className="form-outline w-auto">
                      <input
                        type="search"
                        id="form1"
                        className="form-control-dropdown"
                        onChange={handleSearchInputChange}
                      />
                      <label className="form-label" htmlFor="form1">
                        Search
                      </label>
                    </div>
                  </div>
                </li>
                <li>
                <hr className="dropdown-divider" />
              </li>
              {/* Render the remaining options */}
              {filteredOptions.map((employee) => (
                <li key={employee.id} onClick={() => handleEmployeeSelect(employee)}>
                  <a href="#" className="dropdown-item">
                    {employee.name}
                  </a>
                </li>
              ))}
            </ul>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="employeeId">Employee ID:</label>
            <input
              type="text"
              id="employeeId"
              name="employeeId"
              value={employeeId}
              disabled
            />
          </div>

          <div className="form-group">
            <label htmlFor="employeeName">Employee Name:</label>
            <input
              type="text"
              id="employeeName"
              name="employeeName"
              value={employeeName}
              disabled
            />
          </div>
          <div className="form-group">
            <label htmlFor="dateTo">Date To:</label>
            <input
              type="date"
              id="dateTo"
              name="dateTo"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="ratings">Ratings:</label>
            <StarRatings
              rating={rating}
              starRatedColor="blue"
              changeRating={setRating}
              numberOfStars={5}
              name="rating"
            />
          </div>

          <div className="form-group">
            <label htmlFor="comments">Comments:</label>
            <textarea
              id="comments"
              name="comments"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              rows="4"
              cols="50"
              required
            />
          </div>

          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </>
  );
};

export default EmployeePerformance;
