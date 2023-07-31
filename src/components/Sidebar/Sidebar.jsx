import React from "react";
import "./sidebar.css";
import AccessibilityNewOutlinedIcon from "@mui/icons-material/AccessibilityNewOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import PunchClockOutlinedIcon from "@mui/icons-material/PunchClockOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import MoneyOutlinedIcon from "@mui/icons-material/MoneyOutlined";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link,useNavigate} from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../Helper/reduxUser";

const Sidebar = () => {
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
          <Link to="/attendance" style={{ textDecoration: "none" }}>
            <li>
              <PunchClockOutlinedIcon className="icon" />
              <span>Attendance</span>
            </li>
          </Link>
          <Link to="/benefits" style={{ textDecoration: "none" }}>
            <li>
              <AccessibilityNewOutlinedIcon className="icon" />
              <span>Benefits Available</span>
            </li>
          </Link>
          <Link to="/recruitment" style={{ textDecoration: "none" }}>
            <li>
              <AccessibilityNewOutlinedIcon className="icon" />
              <span>Jobs Open</span>
            </li>
          </Link>
          <Link to="/performance" style={{ textDecoration: "none" }}>
            <li>
              <SupportAgentOutlinedIcon className="icon" />
              <span>Performance</span>
            </li>
          </Link>
          <Link to="/viewexpense" style={{ textDecoration: "none" }}>
            <li>
              <AccountBalanceOutlinedIcon className="icon" />
              <span>View Expenses</span>
            </li>
          </Link>
          <Link to="/addexpense" style={{ textDecoration: "none" }}>
            <li>
              <AttachMoneyOutlinedIcon className="icon" />
              <span>Add Expense</span>
            </li>
          </Link>
          <Link to="/viewpayroll" style={{ textDecoration: "none" }}>
            <li>
              <MoneyOutlinedIcon className="icon" />
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

export default Sidebar;
