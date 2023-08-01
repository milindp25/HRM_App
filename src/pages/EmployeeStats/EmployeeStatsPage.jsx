import React, { useMemo, useState, useEffect } from 'react';
import { useTable } from 'react-table';
import Navbar from '../../components/Navbar/Navbar';
import './viewEmployeeStats.css';
import { publicRequest } from '../../Helper/ApiRequest';
import Sidebar1 from '../../components/Navbar/Sidebar1/Sidebar1';
import { useSelector } from 'react-redux';

const ViewEmployeeStatsPage = () => {
  const [salaryData, setSalaryData] = useState([]);
  const [performanceData, setPerformanceData] = useState([]);
  const [averageRatingData, setAverageRatingData] = useState([]);

  const user = useSelector(state => state.user.currentUser);

  // Fetch the data for each table when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const salaryResp = await publicRequest.get('/department/getDepartmentSalary');
        setSalaryData(salaryResp.data);

        const performanceResp = await publicRequest.get('/employee/getAboveAvgEmployee');
        setPerformanceData(performanceResp.data);

        const ratingResp = await publicRequest.get('/department/getDepartmentRating');
        setAverageRatingData(ratingResp.data);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, []);

  // Define the columns for each table
  const salaryColumns = useMemo(() => [
    {
      Header: 'Department Name',
      accessor: 'department_name',
    },
    {
      Header: 'Total Salary',
      accessor: 'total_salary',
    },
  ], []);

  const performanceColumns = useMemo(() => [
    {
      Header: 'First Name',
      accessor: 'first_name',
    },
    {
      Header: 'Last Name',
      accessor: 'last_name',
    },
    {
      Header: 'Average Rating',
      accessor: 'average_rating',
    },
  ], []);

  const averageRatingColumns = useMemo(() => [
    {
      Header: 'Department Name',
      accessor: 'department_name',
    },
    {
      Header: 'Average Rating',
      accessor: 'average_rating',
    },
  ], []);

  // Get table props for each table
  const {
    getTableProps: getSalaryTableProps,
    getTableBodyProps: getSalaryTableBodyProps,
    headerGroups: salaryHeaderGroups,
    rows: salaryRows,
    prepareRow: prepareSalaryRow,
  } = useTable({ columns: salaryColumns, data: salaryData });

  const {
    getTableProps: getPerformanceTableProps,
    getTableBodyProps: getPerformanceTableBodyProps,
    headerGroups: performanceHeaderGroups,
    rows: performanceRows,
    prepareRow: preparePerformanceRow,
  } = useTable({ columns: performanceColumns, data: performanceData });

  const {
    getTableProps: getAverageRatingTableProps,
    getTableBodyProps: getAverageRatingTableBodyProps,
    headerGroups: averageRatingHeaderGroups,
    rows: averageRatingRows,
    prepareRow: prepareAverageRatingRow,
  } = useTable({ columns: averageRatingColumns, data: averageRatingData });

  // Component return statement
  return (
    <>
      <Navbar />
      <Sidebar1 />

      <div className="page-wrapper">
        <div className="content">
        <h2 style={{ color: '#1976d2'}}>Above Average Performing Employees</h2>
        <table {...getPerformanceTableProps()}>
          <thead>
            {performanceHeaderGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getPerformanceTableBodyProps()}>
            {performanceRows.map((row) => {
              preparePerformanceRow(row);
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
      <div className="page-wrapper">
        <div className="content">
        <h2 style={{ color: '#1976d2'}}>Total Salary by Department</h2>
        <table {...getSalaryTableProps()}>
          <thead>
            {salaryHeaderGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getSalaryTableBodyProps()}>
            {salaryRows.map((row) => {
              prepareSalaryRow(row);
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

      

      <div className="page-wrapper">
        <div className="content">
        <h2 style={{ color: '#1976d2'}}>Average Performance Rating by Department</h2>
        <table {...getAverageRatingTableProps()}>
          <thead>
            {averageRatingHeaderGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getAverageRatingTableBodyProps()}>
            {averageRatingRows.map((row) => {
              prepareAverageRatingRow(row);
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

export default ViewEmployeeStatsPage;
