// App1.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './Pages/Dashboard/Dashboard';
import Home from './Pages/Home/Home/Home';
import PatientViewDoctor from './Pages/Doctors/Doctors/PatientViewDoctor';
import AddDoctor from './Pages/Doctors/AddDoctor/AddDoctor';
import ApproveDoctor from './Pages/Doctors/ApproveDoctor/ApproveDoctor';
import DeleteDoctor from './Pages/Doctors/DeleteDoctor/DeleteDoctor';
import FindDoctor from './Pages/Doctors/UpdateDoctor/FindDoctor';
import Patients from './Pages/Patients/Patients/Patients';
import AddPatient from './Pages/Patients/AddPatients/AddPatient';
import ViewDoctors from './Pages/Patients/ViewDoctors/ViewDoctors';
import PatientDetails from './Pages/Patients/PatientsDetails/PatientDetails';
import Staffs from './Pages/Staffs/Staffs';
import Appointment from './Pages/Appointments/Appointment';
import Login from './Pages/Login/Login';
import Registration from './Pages/Login/Registration/Registration';
import PageNotFound from './Pages/PageNotFound/PageNotFound';
import Footer from './Pages/Shared/Footer/Footer';

function App1() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Dashboard />}>
                    <Route index element={<Home />} />
                    <Route path="doctors" element={<PatientViewDoctor />} />
                    <Route path="addDoctor" element={<AddDoctor />} />
                    <Route path="approveDoctor" element={<ApproveDoctor />} />
                    <Route path="deleteDoctor" element={<DeleteDoctor />} />
                    <Route path="updateDoctor" element={<FindDoctor />} />
                    <Route path="patients" element={<Patients />} />
                    <Route path="addPatient" element={<AddPatient />} />
                    <Route path="viewDoctors" element={<ViewDoctors />} />
                    <Route path="patientDetails/:id" element={<PatientDetails />} />
                    <Route path="staffs" element={<Staffs />} />
                    <Route path="appointment" element={<Appointment />} />
                    <Route path="login" element={<Login />} />
                    <Route path="registration" element={<Registration />} />
                    <Route path="*" element={<PageNotFound />} />
                </Route>
            </Routes>
            <Footer />
        </div>
    );
}

export default App1;
