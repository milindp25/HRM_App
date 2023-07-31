import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Calendar from 'react-calendar';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import 'react-calendar/dist/Calendar.css';
import './attendance.css';

const AttendancePage = () => {
    const [date, setDate] = useState(new Date());
    const [showCalendar, setShowCalendar] = useState(false);
    const [clockedIn, setClockedIn] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setDate(new Date());
        }, 1000);
        return function cleanup() {
            clearInterval(timer);
        }
    }, []);

    const handleClockIn = () => {
        setClockedIn(true);
    }

    const handleClockOut = () => {
        setClockedIn(false);
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
                <button onClick={handleClockIn} disabled={clockedIn}style={{width:"300px",marginTop:"20px"}}>Clock In</button>
                <button onClick={handleClockOut} disabled={!clockedIn}style={{width:"300px",marginTop:"20px"}}>Clock Out</button>
            </div>
        </div>
        </>
    )
}

export default AttendancePage;
