import  { useState } from 'react';
import '../css/Dashboard.css';

const Dashboard = () => {
    const [dialogVisible, setDialogVisible] = useState(false);
    const [clickedBox, setClickedBox] = useState(null);

    const handleBoxClick = (boxName) => {
        if (boxName === 'TTS') {
            setClickedBox('TTS');
            setTimeout(() => {
                setClickedBox(null);
            }, 5000);
        } else {
            setDialogVisible(true);
        }
    };

    const handleCloseDialog = () => {
        setDialogVisible(false);
    };

    return (
        <div>
            <div className="background">
                <div className="shape"></div>
                <div className="shape"></div>
            </div>
            <div className="dashboard-container">
                <h2 className="dashboard-heading">AMS (Attendance Management System)</h2>
                <div className="box" onClick={() => handleBoxClick('Check-In')}>Check-In</div>
                <div className="box" onClick={() => handleBoxClick('Check-Out')}>Check-Out</div>
                <div className="box" onClick={() => handleBoxClick('Attendance')}>Attendance</div>
                <div
                    className={`box ${clickedBox === 'TTS' ? 'clicked' : ''}`}
                    onClick={() => handleBoxClick('TTS')}
                >
                    TTS
                </div>
                <div className="box" onClick={() => handleBoxClick('Supervisor Panel')}>Supervisor Panel</div>
                <div className="box" onClick={() => handleBoxClick('Admin Panel')}>Admin Panel</div>
            </div>
            {dialogVisible && (
                <div className="dialog-overlay">
                    <div className="dialog-box">
                        <p>Upcoming Feature....!</p>
                        <button onClick={handleCloseDialog}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
