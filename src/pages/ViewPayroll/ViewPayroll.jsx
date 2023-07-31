import React, { useMemo, useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import './payrollreceived.css'; // Create and import your custom CSS file for the page (optional).
import { publicRequest } from '../../Helper/ApiRequest';

const PayrollsReceivedPage = () => {
  const [data, setData] = useState([]);

  // Make the API call only once when the component mounts
  useEffect(() => {
    const getPayrolls = async () => {
      try {
        // Replace 'your-api-endpoint' with the actual endpoint for payroll data
        const resp = await publicRequest.get(`/employee/getPayroll?id=1`);
        console.log(resp);

        setData(resp.data);
      } catch (err) {
        console.error('Error fetching data:', err);
        throw err;
      }
    };

    getPayrolls();
  }, []); // Empty dependency array ensures the effect runs only once after the initial render.

  const columns = useMemo(
    () => [
      {
        Header: 'Payroll ID',
        accessor: 'payroll_id',
      },
      {
        Header: 'Pay Period',
        accessor: 'pay_period',
      },
      {
        Header: 'Hourly Rate',
        accessor: 'hourly_rate',
      },
      {
        Header: 'Amount',
        accessor: 'amount',
      },
    ],
    []
  );

  return (
    <>
      <Navbar />
      <Sidebar />

      <div className="page-wrapper">
        <div className="content">
          <h2 className="page-title" style={{ marginBottom: '50px' }}>
            Payrolls Received
          </h2>

          <table className="payrolls-table">
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={column.Header}>{column.Header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row.payroll_id}>
                  {columns.map((column) => (
                    <td key={column.Header}>{row[column.accessor]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default PayrollsReceivedPage;
