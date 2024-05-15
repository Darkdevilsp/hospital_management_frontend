import React, { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
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
import AppointmentBooking from "./components/Patients/appointmentBooking.jsx";
import Doctors from "./components/Management/doctors.jsx";
import Staff from "./components/Management/Staff.jsx";
import ManagementDashboard from "./components/Management/managementDashboard.jsx";
import Hdp from "./components/Patients/hdp.jsx";
import Patients from "./components/Management/patients.jsx";

const App = () => {
    const [user, setUser] = useState(sessionStorage.getItem('user') || "None");
    const [usingname, setUsingname] = useState("");

    useEffect(() => {
        sessionStorage.setItem('user', user);
    }, [user]);

    function handleLogout() {
        setUser("None");
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('usingname')
        setUsingname("");
    }

    return (
        <div className={"completebody"}>
            <div className="topnav">
                <Link to="/"><button>HOME</button></Link>
                {user === "None" ? (
                    <div>
                        <Link to="/patientLogin"><button style={{marginLeft: '10px'}}>PATIENT LOGIN</button></Link>
                        <Link to="/doctorLogin"><button style={{marginLeft: '10px'}}>DOCTOR LOGIN</button></Link>
                        <Link to="/managementLogin"><button style={{marginLeft: '10px'}}>MANAGEMENT LOGIN</button></Link>
                    </div>
                ) : user === "management" || user === "Admin" ? (
                    <div>
                        <Link to="/m-Dashboard"><button>DASHBOARD</button> </Link>
                        <Link to="/m-patients"><button>PATIENTS</button></Link>
                        <Link to="/m-doctors"><button>DOCTORS</button></Link>
                        {/*<Link to="/m-staff">
                            <button>STAFF</button>
                        </Link>*/}
                        <Link to="/"><button onClick={handleLogout}>LOGOUT</button></Link>
                    </div>
                ) : user === "patient" ?
                    (
                        <div>
                            <Link to="/p-Dashboard"><button >DASHBOARD</button> </Link>
                            <Link to="/"><button onClick={handleLogout}>LOGOUT</button></Link>
                        </div>

                    ) :
                    (
                        <div>
                            <Link to="/d-Dashboard"><button>DASHBOARD</button> </Link>
                            <Link to="/"><button onClick={handleLogout}>LOGOUT</button></Link>
                        </div>

                    )
                }

            </div>


            <div>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/patientLogin" element={<PatientLogin user={user} setuser={setUser} usingname={usingname} setUsingname={setUsingname} />} />
                    <Route path="/doctorLogin" element={<DoctorLogin user={user} setuser={setUser} usingname={usingname} setUsingname={setUsingname} />} />
                    <Route path="/managementLogin" element={<ManagementLogin user={user} setuser={setUser} usingname={usingname} setUsingname={setUsingname} />} />
                    <Route path="/patientSignup" element={<PatientSignup user={user} setuser={setUser} usingname={usingname} setUsingname={setUsingname} />} />
                    <Route path="/managementSignup" element={<ManagementSignup user={user} setuser={setUser} usingname={usingname} setUsingname={setUsingname} />} />
                    <Route path="/m-doctorSignup" element={<DoctorSignup user={user} setuser={setUser} usingname={usingname} setUsingname={setUsingname} />} />
                    <Route path="/p-Dashboard" element={<PatientDashboard user={user} setuser={setUser} usingname={usingname} setUsingname={setUsingname} />} />
                    <Route path="/d-Dashboard" element={<DoctorDashboard user={user} setuser={setUser} usingname={usingname} setUsingname={setUsingname} />} />
                    <Route path="/p-appointment" element={<AppointmentBooking user={user} setuser={setUser} usingname={usingname} setUsingname={setUsingname} />} />
                    <Route path="/m-doctors" element={<Doctors user={user} setuser={setUser} usingname={usingname} setUsingname={setUsingname} />} />
                    <Route path="/m-staff" element={<Staff user={user} setuser={setUser} usingname={usingname} setUsingname={setUsingname} />} />
                    {/* <Route path="/m/:username/Dashboard" element={<App1 />} /> */}
                    <Route path="/m-Dashboard" element={<ManagementDashboard user={user} setuser={setUser} usingname={usingname} setUsingname={setUsingname} />} />
                    <Route path={"/p-hdp"} element={<Hdp user={user} setuser={setUser} usingname={usingname} setUsingname={setUsingname} />}></Route>
                    <Route path={"/m-patients"} element={<Patients user={user} setuser={setUser} usingname={usingname} setUsingname={setUsingname} /> } />
                </Routes>

            </div>
            <footer style={{backgroundColor: 'whitesmoke', position: 'fixed', bottom: '0', width: "100%" }}>
                <p style={{ textAlign: 'center', color: 'black' }}>&#169; made with &#10084; by mc&sp</p>
            </footer>

        </div>
    );
};

export default App;
