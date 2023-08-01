import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import './addExpense.css'; // Create and import your custom CSS file for the page (optional).
import { useSelector } from 'react-redux';
import { publicRequest } from '../../Helper/ApiRequest';

const commonExpenseTypes = [
  'Travel',
  'Office Supplies',
  'Meals & Entertainment',
  'Utilities',
  'Training & Seminars',
  'Miscellaneous',
];



const AddExpensePage = () => {

    
  const user = useSelector(state => state.user.currentUser);
  const [expenseData, setExpenseData] = useState({
    expenseType: '',
    date: '',
    expenseAmount: '',
    employee_id : user.employee_id,
    status: 'PND', // Default status is 'PND' (Pending) for new expenses.
  });

  const [error, setError] = useState("");



  const handleChange = (event) => {
    const { name, value } = event.target;
    setExpenseData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setError("");
  };

  const handleAddExpense = async(e) => {
    if (expenseData.expenseType === '') {
      setError('Please select an expense type');
      return;
    }
    if (expenseData.date === '') {
      setError('Please select a date');
      return;
    }
    if (expenseData.expenseAmount === '' || expenseData.expenseAmount <= 0) {
      setError('Please enter a valid expense amount');
      return;
    }
    try {
      const response = await publicRequest.post('/employee/addExpense', { expenseData });
      // Here, you can handle the logic to add the expense to your data or database.
      // For example, you can show a pop-up with the added expense details.
      alert(`Expense Added:\nExpense Type: ${expenseData.expenseType}\nDate: ${expenseData.date}\nExpense Amount: ${expenseData.expenseAmount}\nStatus: ${expenseData.status}`);
    } catch (error) {
      alert(`Failed to create employee`);
      console.error('Login failed:', error);
    }
    // Reset the input fields
    setExpenseData({
      expenseType: '',
      date: '',
      expenseAmount: '',
      status: 'PND',
    });
  };

  return (
    <>
      <Navbar />
      <Sidebar />

      <div className="page-wrapper">
        <div className="content">
          <h2 className="page-title" style={{ marginBottom: '50px' }}>
            Add Expense
          </h2>

          {error && <p className="error-message">{error}</p>}

          <div className="form-group">
            <label htmlFor="expenseType">Expense Type:</label>
            <select
              id="expenseType"
              name="expenseType"
              value={expenseData.expenseType}
              onChange={handleChange}
              required
            >
              <option value="">Select an expense type</option>
              {commonExpenseTypes.map((expenseType) => (
                <option key={expenseType} value={expenseType}>
                  {expenseType}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              value={expenseData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="expenseAmount">Expense Amount:</label>
            <input
              type="number"
              id="expenseAmount"
              name="expenseAmount"
              value={expenseData.expenseAmount}
              onChange={handleChange}
              required
            />
          </div>

          <button onClick={handleAddExpense}>Submit</button>
        </div>
      </div>
    </>
  );
};

export default AddExpensePage;
