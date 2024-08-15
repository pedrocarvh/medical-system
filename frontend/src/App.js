import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/HomePage/Home';
import CreatePatient from './components/HomePage/CreatePatient/CreatePatient';
import ViewPatient from './components/HomePage/ViewPatient/ViewPatient';
import EditPatient from './components/HomePage/EditPatient/EditPatient';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/create-client" element={<CreatePatient />} />
        <Route path="/view-patient/:cpf" element={<ViewPatient />} />
        <Route path="/edit-patient/:patientId" element={<EditPatient />} />
      </Routes>
    </Router>
  );
}

export default App;
