// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom';
import Login from './pages/Login/Login';
import EmployeePage from './pages/Employee/Employee';
import AttendancePage from './pages/Attendance/AttendancePage';
import BenefitsPage from './pages/Benefits/Benefits';
import RecruitmentPage from './pages/Recruitment/Recruitment';
import PerformancePage from './pages/Performance/Performance';
import ViewExpensesPage from './pages/ViewExpense/ViewExpense';
import AddExpensePage from './pages/AddExpense/AddExpense';
import PayrollsReceivedPage from './pages/ViewPayroll/ViewPayroll';
import AddEmployeePage from './pages/AddEmployee/AddEmployee';
import DepartmentsPage from './pages/DepartmentPage/DepartmentPage';
import AddDepartmentPage from './pages/AddDepartment/AddDepartmentPage';
import DepartmentEmployeesPage from './pages/DepartmentEmployees/DepartmentEmployees';
import AddJobPage from './pages/AddJob/AddJob';
import EmployeePerformancePage from './pages/AddEmployeePerformance/AddEmployeePerformance';
import ManagerPage from './pages/Manager/Manager';
import ApproveExpensesPage from './pages/ApproveExpense/ApproveExpense';
import {  useSelector } from "react-redux";
import ViewTeamExpensesPage from './pages/ViewTeamExpenses/ViewTeamExpense';
import ViewEmployeeStatsPage from './pages/EmployeeStats/EmployeeStatsPage';



const App = () => {
  // Replace with your authentication logic or state

  const user = useSelector(state => state.user.currentUser);
  console.log(user);
  // const user = {
  //   isAuthenticated: true,
  //   userType: 'employee',
  // };

  return (
    <Router>
      <Routes>
      <Route path="/"> 
        <Route index element={user ? <Navigate to={user.user_type === 'E' ? '/employee' : '/manager'} /> : <Login />} />
        <Route path="/employee" element={<EmployeePage />} />
        <Route path="attendance" element={<AttendancePage />} />
        <Route path="benefits" element={<BenefitsPage />} />
        <Route path="recruitment" element={<RecruitmentPage />} />
        <Route path="performance" element={<PerformancePage />} />
        <Route path="viewExpense" element={<ViewExpensesPage />} />
        <Route path="addexpense" element={<AddExpensePage />} />
        <Route path="viewpayroll" element={<PayrollsReceivedPage />} />
        <Route path="addemployee" element={<AddEmployeePage />} />
        <Route path="viewdepartments">
          <Route index element={<DepartmentsPage />} />
          <Route path=":departmentId" element={<DepartmentEmployeesPage />} />
        </Route>
        <Route path="adddepartment" element={<AddDepartmentPage />} />
        <Route path="addjob" element={<AddJobPage />} />
        <Route path="employeeperformance" element={<EmployeePerformancePage />} />
        <Route path="/manager" element={<ManagerPage />} />
        <Route path="/approveexpense" element={<ApproveExpensesPage />} />
        <Route path="/viewTeamExpense" element={<ViewTeamExpensesPage />} />
        <Route path="/viewEmployeeStats" element={<ViewEmployeeStatsPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
