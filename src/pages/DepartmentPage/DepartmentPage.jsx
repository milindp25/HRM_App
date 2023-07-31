import React, { useMemo } from 'react';
import { useTable } from 'react-table';
import { Link } from 'react-router-dom';
import './departments.css'; // Create and import your custom CSS file for the page (optional).
import Navbar from '../../components/Navbar/Navbar';
import Sidebar1 from '../../components/Navbar/Sidebar1/Sidebar1';

const DepartmentsPage = () => {
  // Sample department data (replace this with your actual data)
  const departments = useMemo(() => [
    {
      departmentId: 1,
      departmentName: 'HR Department',
      managerName: 'John Doe',
    },
    {
      departmentId: 2,
      departmentName: 'Finance Department',
      managerName: 'Jane Smith',
    },
    // Add more department objects as needed
  ], []);

  const columns = useMemo(() => [
    {
      Header: 'Department ID',
      accessor: 'departmentId',
    },
    {
      Header: 'Department Name',
      accessor: 'departmentName',
    },
    {
      Header: 'Manager Name',
      accessor: 'managerName',
    },
    {
      Header: 'View Employees',
      Cell: ({ row }) => (
        <Link to={`/viewdepartments/${row.original.departmentId}`}>View Employees</Link>
      ),
    },
  ], []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: departments });

  return (
    <>
    <Navbar />
    <Sidebar1 />
    <div className="page-wrapper">
      <div className="content">
        <h2 className="page-title" style={{ marginBottom: '50px' }}>
          Departments
        </h2>

        {/* Add Department button */}
        <Link to="/adddepartment" className="add-department-button">
          Add Department
        </Link>

        <table {...getTableProps()} style={{ margin: 'auto' }}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => (
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

export default DepartmentsPage;
