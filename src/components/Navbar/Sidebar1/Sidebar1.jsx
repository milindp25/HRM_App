import React, { useContext } from "react";
import "./sidebar.css";
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import Diversity3OutlinedIcon from '@mui/icons-material/Diversity3Outlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import NordicWalkingOutlinedIcon from '@mui/icons-material/NordicWalkingOutlined';
import { Link,useNavigate} from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../Helper/reduxUser";

const Sidebar1 = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    // Your logout logic here
    // For example, you can clear the user data from Redux or Local Storage
    // And then show the logout successful alert
    dispatch(logout());
    alert("Logged out successfully!");
    navigate("/");
  };

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">HRM</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/addemployee" style={{ textDecoration: "none" }}>
            <li>
              <PersonAddAlt1OutlinedIcon className="icon" />
              <span>Add Employee</span>
            </li>
          </Link>
          <Link to="/adddepartment" style={{ textDecoration: "none" }}>
            <li>
              <Diversity3OutlinedIcon className="icon" />
              <span>Add Department</span>
            </li>
          </Link>
          <Link to="/addjob" style={{ textDecoration: "none" }}>
            <li>
              <WorkOutlineOutlinedIcon className="icon" />
              <span>Add New Job potings</span>
            </li>
          </Link>
          <Link to="/employeeperformance" style={{ textDecoration: "none" }}>
            <li>
              <NordicWalkingOutlinedIcon className="icon" />
              <span>Provide Employee Performance</span>
            </li>
          </Link>
          <Link to="/viewexpense" style={{ textDecoration: "none" }}>
            <li>
              <AccountBalanceOutlinedIcon className="icon" />
              <span>View Team Expenses</span>
            </li>
          </Link>
          <Link to="/approveexpense" style={{ textDecoration: "none" }}>
            <li>
              <AttachMoneyOutlinedIcon className="icon" />
              <span>Approve Expense</span>
            </li>
          </Link>
          <Link to="/viewpayroll" style={{ textDecoration: "none" }}>
          <li>
            <SettingsApplicationsIcon className="icon" />
            <span>View Payroll</span>
          </li>
          </Link>
          <p className="title">USER</p>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Profile</span>
          </li>
          <li onClick={handleLogout}>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar1;
