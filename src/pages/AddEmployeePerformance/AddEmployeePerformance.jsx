import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import './employeePerformance.css';
import StarRatings from 'react-star-ratings';
import Sidebar1 from '../../components/Navbar/Sidebar1/Sidebar1';

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
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleEmployeeSelect = (employee) => {
    setSelectedEmployee(employee);
    setEmployeeName(employee.name);
    setEmployeeId(employee.id);
    setIsPopupOpen(false);
  };

  const handleSubmit = () => {
    // Here, you can handle the logic to submit the performance data to your data or database.
    // For example, you can show a pop-up with the submitted performance details.

    if (!employeeId || !employeeName || !dateFrom || !dateTo || rating === 0 || !comments) {
      alert('Please fill in all the required fields.');
      return;
    }

    alert(`Performance Submitted:\nEmployee Name: ${employeeName}\nEmployee ID: ${employeeId}\nDate From: ${dateFrom}\nDate To: ${dateTo}\nRatings: ${rating}\nComments: ${comments}`);

    // Reset the input fields
    setSelectedEmployee(null);
    setEmployeeId('');
    setEmployeeName('');
    setDateFrom('');
    setDateTo('');
    setRating(0);
    setComments('');
  };

  const dropdownOptions = employeesData.map((employee) => (
    <li key={employee.id} onClick={() => handleEmployeeSelect(employee)}>
      <a href="#" className="dropdown-item">
        {employee.name}
      </a>
    </li>
  ));

  const handleSearchInputChange = (e) => {
    const filter = e.target.value.toLowerCase();
    showOptions();

    if (filter) {
      dropdownOptions.forEach((el) => {
        const elText = el.textContent.trim().toLowerCase();
        const isIncluded = elText.includes(filter);
        el.style.display = isIncluded ? 'flex' : 'none';
      });
    }
  };

  const showOptions = () => {
    dropdownOptions.forEach((el) => {
      el.style.display = 'flex';
    });
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
                onClick={() => setIsPopupOpen(true)}
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
                {dropdownOptions}
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
            <label htmlFor="dateFrom">Date From:</label>
            <input
              type="date"
              id="dateFrom"
              name="dateFrom"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              required
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
