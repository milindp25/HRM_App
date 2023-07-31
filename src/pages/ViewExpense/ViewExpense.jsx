import React, { useMemo, useState, useEffect } from 'react';
import { useTable } from 'react-table';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import './viewExpense.css';
import { publicRequest } from '../../Helper/ApiRequest';

const ViewExpensesPage = () => {
  const [data, setData] = useState([]);

  // Make the API call only once when the component mounts
  useEffect(() => {
    const getExpenses = async () => {
      try {
        // Replace 'your-api-endpoint' with the actual endpoint for expenses data
        const resp = await publicRequest.get(`/employee/getExpenses?id=1`);
        console.log(resp);

        const processedData = resp.data.map((item) => ({
          expenseId: item.expense_id,
          expenseType: item.expense_type,
          date: new Date(item.date).toLocaleDateString(),
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
  ], [data]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <>
      <Navbar />
      <Sidebar />

      <div className="page-wrapper">
        <div className="content">
          <h2 className="page-title" style={{ marginBottom: '50px' }}>
            View Expenses
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
}

export default ViewExpensesPage;
