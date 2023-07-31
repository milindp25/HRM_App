import React, { useMemo, useState, useEffect } from 'react';
import { useTable } from 'react-table';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import './performance.css';
import { publicRequest } from '../../Helper/ApiRequest';

const PerformancePage = () => {
  const [data, setData] = useState([]);

  // Make the API call only once when the component mounts
  useEffect(() => {
    const getPerformanceData = async () => {
      try {
        const resp = await publicRequest.get('/employee/getPerformance?id=1');
        console.log(resp);

        const processedData = resp.data.map((item) => ({
          fromDate: item.start_date,
          tillDate: item.end_date,
          performance: item.rating,
          comments: item.comments,
        }));

        setData(processedData);
      } catch (err) {
        console.error('Error fetching data:', err);
        throw err;
      }
    };

    getPerformanceData();
  }, []); // Empty dependency array ensures the effect runs only once after the initial render.

  const convertToStars = (value) => {
    const star = '⭐'; // You can customize the star symbol.
    return star.repeat(value);
  };

  const columns = useMemo(() => [
    {
      Header: 'From Date',
      accessor: 'fromDate',
    },
    {
      Header: 'Till Date',
      accessor: 'tillDate',
    },
    {
      Header: 'Performance',
      accessor: 'performance',
      Cell: ({ value }) => convertToStars(value),
    },
    {
      Header: 'Comments',
      accessor: 'comments',
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
            Performance Details
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

export default PerformancePage;
