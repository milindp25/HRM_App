import React, { useMemo } from 'react';
import { useTable } from 'react-table';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import './departmentEmployees.css'; // Create and import your custom CSS file for the page (optional).
import { useLocation } from "react-router-dom";

const DepartmentEmployeesPage = () => {
  // Sample employee data (replace this with your actual data)

  const id = useLocation().pathname.split("/viewdepartments/")[1];
  console.log(id);
  const employees = useMemo(() => [
    {
      employee_id: 1,
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com',
      phone_number: '123-456-7890',
      date_of_birth: '1990-01-01',
      street_address_1: '123 Main Street',
      street_address_2: 'Apt 4B',
      city: 'New York',
      state: 'NY',
      department_id: 1,
      date_of_joining: '2021-05-15',
      user_type: 'E',
      age: 32,
    },
    {
      employee_id: 2,
      first_name: 'Jane',
      last_name: 'Smith',
      email: 'jane.smith@example.com',
      phone_number: '987-654-3210',
      date_of_birth: '1985-03-20',
      street_address_1: '456 Oak Avenue',
      street_address_2: '',
      city: 'Los Angeles',
      state: 'CA',
      department_id: 1,
      date_of_joining: '2022-02-10',
      user_type: 'E',
      age: 37,
    },
    // Add more employee objects as needed
  ], []);

  // Get the department ID from URL parameter
  const { departmentId } = useParams();

  // Filter employees based on the selected department ID
  const departmentEmployees = useMemo(() => employees.filter(employee => employee.department_id === parseInt(departmentId)), [employees, departmentId]);

  const columns = useMemo(() => [
    {
      Header: 'Employee ID',
      accessor: 'employee_id',
    },
    {
      Header: 'First Name',
      accessor: 'first_name',
    },
    {
      Header: 'Last Name',
      accessor: 'last_name',
    },
    {
      Header: 'Email',
      accessor: 'email',
    },
    {
      Header: 'Phone Number',
      accessor: 'phone_number',
    },
    {
      Header: 'Date of Birth',
      accessor: 'date_of_birth',
    },
    {
      Header: 'Street Address 1',
      accessor: 'street_address_1',
    },
    {
      Header: 'Street Address 2',
      accessor: 'street_address_2',
    },
    {
      Header: 'City',
      accessor: 'city',
    },
    {
      Header: 'State',
      accessor: 'state',
    },
    {
      Header: 'Department ID',
      accessor: 'department_id',
    },
    {
      Header: 'Date of Joining',
      accessor: 'date_of_joining',
    },
    {
      Header: 'User Type',
      accessor: 'user_type',
    },
    {
      Header: 'Age',
      accessor: 'age',
    },
  ], []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: departmentEmployees });

  return (
    <>
      <Navbar />
      <Sidebar />

      <div className="page-wrapper">
        <div className="content">
          <h2 className="page-title" style={{ marginBottom: '50px' }}>
            Department Employees
          </h2>

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

export default DepartmentEmployeesPage;
