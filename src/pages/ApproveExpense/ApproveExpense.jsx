import React, { useEffect, useMemo, useState } from 'react';
import { useTable } from 'react-table';
import Navbar from '../../components/Navbar/Navbar';
import './approveExpense.css'; // Create and import your custom CSS file for the page (optional).
import Sidebar1 from '../../components/Navbar/Sidebar1/Sidebar1';
import { publicRequest } from '../../Helper/ApiRequest';
import { useSelector } from 'react-redux';

const ApproveExpensesPage = () => {

  const user = useSelector(state => state.user.currentUser);
  const [data, setData] = useState([]);

  const approveExpense = async (expenseId) => {
    // Here, you can handle the logic to approve the expense and update the status to 'APR'.
    // For this example, we will simply update the status in the data array.
    setData((prevData) =>
      prevData.map((expense) =>
        expense.expenseId === expenseId ? { ...expense, status: 'APR' } : expense
      )
    );
    try {
      const resp = await publicRequest.post(`/employee/updateExpense?id=${expenseId}`);    
    // Show an alert indicating that the expense has been approved.
    alert(`Expense ID: ${expenseId} has been approved.`);
    } catch (err) {
      console.error('Error updating data:', err);
      throw err;
    }

  };

  useEffect(() => {
    const getExpenses = async () => {
      try {
        // Replace 'your-api-endpoint' with the actual endpoint for expenses data
        const resp = await publicRequest.get(`/employee/getTeamExpense?id=${user.employee_id}`);
        console.log(resp);

        const processedData = resp.data.map((item) => ({
          expenseId: item.expense_id,
          employeeName: item.employee_name,
          expenseType: item.expense_type,
          date: item.date,
          expenseAmount: item.amount,
          status: item.expense_status,
        }));

        setData(processedData);
      } catch (err) {
        console.error('Error fetching data:', err);
        throw err;
      }
    };

    getExpenses();
  }, []); // Empty dependency array ensures the effect runs only once after the initial render.

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
