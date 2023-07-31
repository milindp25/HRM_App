import React, { useMemo, useState } from 'react';
import { useTable } from 'react-table';
import Navbar from '../../components/Navbar/Navbar';
import './approveExpense.css'; // Create and import your custom CSS file for the page (optional).
import Sidebar1 from '../../components/Navbar/Sidebar1/Sidebar1';

const ApproveExpensesPage = () => {
  const [data, setData] = useState([
    {
      expenseId: 'EXP001',
      employeeName: 'John Doe',
      expenseType: 'Travel',
      date: '01/08/2023',
      expenseAmount: 500,
      status: 'PND',
    },
    {
      expenseId: 'EXP002',
      employeeName: 'Jane Smith',
      expenseType: 'Office Supplies',
      date: '05/08/2023',
      expenseAmount: 150,
      status: 'PND',
    },
    // Add more expense data as needed.
  ]);

  const approveExpense = (expenseId) => {
    // Here, you can handle the logic to approve the expense and update the status to 'APR'.
    // For this example, we will simply update the status in the data array.
    setData((prevData) =>
      prevData.map((expense) =>
        expense.expenseId === expenseId ? { ...expense, status: 'APR' } : expense
      )
    );

    // Show an alert indicating that the expense has been approved.
    alert(`Expense ID: ${expenseId} has been approved.`);
  };

  const getFancyStatus = (status) => {
    const statusStyles = {
      APR: {
        color: 'green',
        fontWeight: 'bold',
      },
      PND: {
        color: 'orange',
        fontWeight: 'bold',
      },
    };

    return (
      <span style={statusStyles[status] || {}}>
        {status === 'APR' ? 'Approved' : status === 'PND' ? 'Pending' : status}
      </span>
    );
  };

  const columns = useMemo(() => [
    {
      Header: 'Expense ID',
      accessor: 'expenseId',
    },
    {
      Header: 'Employee Name',
      accessor: 'employeeName',
    },
    {
      Header: 'Expense Type',
      accessor: 'expenseType',
    },
    {
      Header: 'Date',
      accessor: 'date',
    },
    {
      Header: 'Expense Amount',
      accessor: 'expenseAmount',
    },
    {
      Header: 'Status',
      accessor: 'status',
      Cell: ({ value }) => getFancyStatus(value),
    },
    {
      Header: 'Action',
      Cell: ({ row }) =>
        row.original.status === 'PND' ? (
          <button onClick={() => approveExpense(row.original.expenseId)}>Approve</button>
        ) : null,
    },
  ], []);

  const filteredData = useMemo(() => data.filter((item) => item.status === 'PND'), [data]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: filteredData });

  return (
    <>
      <Navbar />
      <Sidebar1 />

      <div className="page-wrapper">
        <div className="content">
          <h2 className="page-title" style={{ marginBottom: '50px' }}>
            Approve Expenses
          </h2>

          <table {...getTableProps()} style={{ margin: 'auto' }}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ApproveExpensesPage;
