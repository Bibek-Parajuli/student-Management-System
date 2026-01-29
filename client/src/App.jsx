import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import AttendancePage from './components/Attadance';
import Students from './components/Students';
import EmailAnnouncement from './components/EmailAnnouncement';
import SendAnnouncement from './components/UploadAnnouncement';
import AddStudent from './components/StudentsCRUD';
import Contact from './components/Contact';
import axios from 'axios';
import { useEffect } from 'react';
import SingleAnnouncement from './components/singleAnnouncement';

function App() {
  const location=useLocation();
  useEffect(() => {
    if (location.pathname === '/login' || location.pathname==='/register') {
      localStorage.removeItem('token');
    }
  }, [location]);

axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});
  return (
    // <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/contactus" element={<Contact />} />
        <Route path='*' element={<NotFound/>} />
        <Route path="/attendance" element={<AttendancePage />} />
        <Route path="/students" element={<Students/>} />
        <Route path="/announcement" element={<EmailAnnouncement />} />

        <Route path="/announcements/:id" element={<SingleAnnouncement />} />
        <Route path="/addannouncement" element={<SendAnnouncement />} />
        <Route path="/addstudent" element={<AddStudent />} />
        <Route path="/" element={<Login />} />
      </Routes>
    //  </Router>  *
  );
}


const NotFound = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
};

export default App