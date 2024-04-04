import React, { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import App1 from './App1'; // Importing App1 component
import Home from './Pages/Home/Home/Home.jsx';
import PatientLogin from './components/Patients/patientLogin.jsx';
import DoctorLogin from './components/Doctors/doctorLogin.jsx';
import ManagementLogin from './components/Management/managementLogin.jsx';
import './App.css';
import PatientSignup from "./components/Patients/patientSignup.jsx";
import ManagementSignup from "./components/Management/managementSignup.jsx";
import DoctorSignup from "./components/Doctors/doctorSignup.jsx";
import PatientDashboard from "./components/Patients/patientDashboard.jsx";
import DoctorDashboard from "./components/Doctors/doctorDashboard.jsx";
//import ManagementDashboard from "./components/Management/managementDashboard.jsx";
import AppointmentBooking from "./components/Patients/appointmentBooking.jsx";
import Doctors from "./components/Management/doctors.jsx";
import Staff from "./components/Management/Staff.jsx";
import ManagementDashboard from "./components/Management/managementDashboard.jsx";

const App = () => {
    const [user, setUser] = useState(sessionStorage.getItem('user') || "None");

    useEffect(() => {
        sessionStorage.setItem('user', user);
    }, [user]);

    function handleLogout() {
        setUser("None");
        sessionStorage.removeItem('user');
    }

    return (
        <div className={"completebody"}>
                <div className="topnav">
                    <Link to="/"><button>HOME</button></Link>
                    {user === "None" ? (
                        <div>
                            <Link to="/patientLogin"><button>PATIENT LOGIN</button></Link>
                            <Link to="/doctorLogin"><button>DOCTOR LOGIN</button></Link>
                            <Link to="/managementLogin"><button>MANAGEMENT LOGIN</button></Link>
                        </div>
                    ) : user === "management" || user === "Admin" ? (
                        <div>
                            <Link to="/m/:username/patients"><button>PATIENTS</button></Link>
                            <Link to="/m/:username/doctors"><button>DOCTORS</button></Link>
                            <Link to="/m/:username/staff"><button>STAFF</button></Link>
                            <Link to="/"><button onClick={handleLogout}>LOGOUT</button></Link>
                        </div>
                    ) : (
                        <Link to="/"><button onClick={handleLogout}>LOGOUT</button></Link>
                    )}

                </div>
                <br/>

                <div>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/patientLogin" element={<PatientLogin user={user} setuser={setUser} />} />
                    <Route path="/doctorLogin" element={<DoctorLogin user={user} setuser={setUser} />} />
                    <Route path="/managementLogin" element={<ManagementLogin user={user} setuser={setUser} />} />
                    <Route path="/patientSignup" element={<PatientSignup user={user} setuser={setUser} />} />
                    <Route path="/managementSignup" element={<ManagementSignup user={user} setuser={setUser} />} />
                    <Route path="/m/:username/doctorSignup" element={<DoctorSignup user={user} setuser={setUser} />} />
                    <Route path="/p/:username/Dashboard" element={<PatientDashboard user={user} setuser={setUser} />} />
                    <Route path="/d/:username/Dashboard" element={<DoctorDashboard user={user} setuser={setUser} />} />
                    <Route path="/p/:username/appointment" element={<AppointmentBooking />} />
                    <Route path="/m/:username/doctors" element={<Doctors />} />
                    <Route path="/m/:username/staff" element={<Staff />} />
                    {/* <Route path="/m/:username/Dashboard" element={<App1 />} /> */}
                    <Route path="/m/:username/Dashboard" element={<ManagementDashboard />} />
                </Routes>
                </div>

        </div>
    );
};

export default App;
