// src/components/EmployeePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Manager.css'; // Import custom styles for the EmployeePage component
import Navbar from '../../components/Navbar/Navbar';
import { useSelector } from 'react-redux';
import Sidebar1 from '../../components/Navbar/Sidebar1/Sidebar1';

const ManagerPage = () => {
   // Get the user data from Redux
   const user = useSelector(state => state.user.currentUser);

   // Combine first and last name for Employee Name
   const fullName = `${user.first_name} ${user.last_name}`;
 
   // Combine first and last name for Manager Name
   const managerName = `${user.manager_first_name} ${user.manager_last_name}`;
 
   // Extract the desired order of details
   const detailOrder = [
     { label: 'Employee ID', key: 'employee_id' },
     { label: 'Employee Name', key: 'full_name' },
     { label: 'Manager Name', key: 'manager_name' },
     { label: 'Department Name', key: 'department_name' },
     { label: 'Date of Joining', key: 'date_of_joining' },
     { label: 'Email', key: 'email' },
     { label: 'Phone Number', key: 'phone_number' },
     { label: 'City', key: 'city' },
     { label: 'State', key: 'state' },
   ];
 
   // Prepare the data with correct labels and values
   const dataWithLabels = {
     ...user,
     full_name: fullName,
     manager_name: managerName,
   };
 
   return (
     <div>
       {/* Taskbar */}
       <Navbar />
 
       {/* Sidebar */}
       <Sidebar1 />
 
       {/* Employee Details */}
       <div className="container mt-4">
         <div className="row justify-content-md-center">
           <div className="col-md-4">
             <div className="card">
               {/* Updated heading */}
               <div className="card-header text-center">
                 <strong>Employee Details</strong>
               </div>
               <div className="card-body">
                 {detailOrder.map(({ label, key }) => (
                   <p key={key}>
                     <strong style={{ color: '#1976d2'}}>
                       {label}:
                     </strong>{' '}
                     {dataWithLabels[key]}
                   </p>
                 ))}
               </div>
             </div>
           </div>
         </div>
       </div>
     </div>
   );
 };

export default ManagerPage;
