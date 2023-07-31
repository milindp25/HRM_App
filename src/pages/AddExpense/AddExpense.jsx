import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import './addExpense.css'; // Create and import your custom CSS file for the page (optional).

const commonExpenseTypes = [
  'Travel',
  'Office Supplies',
  'Meals & Entertainment',
  'Utilities',
  'Training & Seminars',
  'Miscellaneous',
];

const AddExpensePage = () => {
  const [expenseData, setExpenseData] = useState({
    expenseId: '',
    expenseType: '',
    date: '',
    expenseAmount: '',
    status: 'PND', // Default status is 'PND' (Pending) for new expenses.
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setExpenseData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddExpense = () => {
    // Here, you can handle the logic to add the expense to your data or database.
    // For example, you can show a pop-up with the added expense details.
    alert(`Expense Added:\nExpense ID: ${expenseData.expenseId}\nExpense Type: ${expenseData.expenseType}\nDate: ${expenseData.date}\nExpense Amount: ${expenseData.expenseAmount}\nStatus: ${expenseData.status}`);

    // Reset the input fields
    setExpenseData({
      expenseId: '',
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

          <div className="form-group">
            <label htmlFor="expenseId">Expense ID:</label>
            <input
              type="text"
              id="expenseId"
              name="expenseId"
              value={expenseData.expenseId}
              onChange={handleChange}
              required
            />
          </div>

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
