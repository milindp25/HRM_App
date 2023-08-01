import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Calendar from 'react-calendar';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import 'react-calendar/dist/Calendar.css';
import './attendance.css';
import { useSelector } from 'react-redux';
import { publicRequest } from '../../Helper/ApiRequest';

const AttendancePage = () => {
    const [date, setDate] = useState(new Date());
    const [showCalendar, setShowCalendar] = useState(false);
    const [clockedIn, setClockedIn] = useState(false);
    const user = useSelector(state => state.user.currentUser);

    useEffect(() => {
        const timer = setInterval(() => {
            setDate(new Date());
        }, 1000);
        return function cleanup() {
            clearInterval(timer);
        }
    }, []);

    const handleClockIn = async () => {
        const clockInTime = moment().format('HH:mm:ss');
        const formattedDate = moment(date).format('YYYY-MM-DD');
        const clockInDetails = {
            employee_id: user.employee_id,
            time_in: clockInTime,
            date: formattedDate
        };
        setClockedIn(true);
        try {
            const response = await publicRequest.post('/employee/clockIn', { clockInDetails });
            alert(`You have successfully clocked in at ${clockInTime}`);
        } catch (error) {
            // If clocking in failed, make sure to set clockedIn back to false
            setClockedIn(false);
    
            // Show the error message in an alert
            alert(error.response.data.message);
        }
    };
    
    const handleClockOut = async(e) => {
        const clockInTime = moment().format('HH:mm:ss');
        const formattedDate = moment(date).format('YYYY-MM-DD');
        const clockOutDetails = {
            employee_id: user.employee_id,
            time_out: clockInTime,
            date: formattedDate
        };
        setClockedIn(true);
        try {
            const response = await publicRequest.post('/employee/clockOut', { clockOutDetails });
            alert(`You have successfully clocked in at ${clockInTime}`);
        } catch (error) {
            // If clocking in failed, make sure to set clockedIn back to false
            setClockedIn(false);
            // Show the error message in an alert
            alert(error.response.data.message);
        }
    }
    

    const handleCalendarToggle = () => {
        setShowCalendar(!showCalendar);
    }

    return (
        <>
        <Navbar />
        <div className="page-wrapper">
            <Sidebar />
            <div className="content">
                <h3 className="header">Attendance</h3>
                <p className="date-display" onClick={handleCalendarToggle}>
                    {`Today's date: ${moment(date).format('MMMM Do YYYY')}`}
                </p>
                {showCalendar && <Calendar value={date} onChange={setDate} />}
                <button onClick={handleClockIn} style={{width:"300px", marginTop:"20px"}}>Clock In</button>
                <button onClick={handleClockOut}  style={{width:"300px", marginTop:"20px"}}>Clock Out</button>
            </div>
        </div>
        </>
    )
}

export default AttendancePage;
