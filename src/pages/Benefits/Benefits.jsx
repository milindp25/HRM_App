import React, { useMemo, useState, useEffect } from 'react';
import { useTable } from 'react-table';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import './benefits.css';
import { publicRequest } from '../../Helper/ApiRequest';

const BenefitsPage = () => {
  const [data, setData] = useState([]);

  // Make the API call only once when the component mounts
  useEffect(() => {
    const getBenefits = async () => {
      try {
        const resp = await publicRequest.get(`/employee/benefitsAvailable?id=1`);
        console.log(resp);

        const processedData = resp.data.map((item) => ({
          benefit: item.benefit_type,
          startDuration: new Date(item.start_date).toLocaleDateString(),
          endDuration: new Date(item.end_date).toLocaleDateString(),
          id: null,
        }));

        setData(processedData);
      } catch (err) {
        console.error('Error fetching data:', err);
        throw err;
      }
    };

    getBenefits();
  }, []); // Empty dependency array ensures the effect runs only once after the initial render.

  const columns = useMemo(
    () => [
      {
        Header: 'Benefit',
        accessor: 'benefit',
      },
      {
        Header: 'Start Duration',
        accessor: 'startDuration',
      },
      {
        Header: 'End Duration',
        accessor: 'endDuration',
      },
      {
        Header: 'Claim',
        Cell: ({ row }) => (
          <button onClick={() => handleClaim(row.index)} disabled={!!data[row.index]?.id}>
            Claim Benefit
          </button>
        ),
      },
    ],
    [data] // Added data to the dependency array, so the button disables correctly after claiming
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  const handleClaim = (index) => {
    const claimedBenefit = data[index].benefit;
    const id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    alert(`Benefit: ${claimedBenefit} - Benefit ID: ${id}`);
    
    // Remove the claimed benefit from the table
    setData((prevData) => prevData.filter((item, i) => i !== index));
  };

  return (
    <>
      <Navbar />
      <Sidebar />

      <div className="page-wrapper">
        <div className="content">
          <h2 className="page-title" style={{ marginBottom: '50px' }}>
            Employee Benefits
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

export default BenefitsPage;
