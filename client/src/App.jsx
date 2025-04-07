import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import AttendancePage from './components/Attadance';
import Students from './components/Students';
import EmailAnnouncement from './components/EmailAnnouncement';
import SendAnnouncement from './components/UploadAnnouncement';
import AddStudent from './components/StudentsCRUD';
import Contact from './components/Contact';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/contactus" element={<Contact />} />

        <Route path="/attendance" element={<AttendancePage />} />
        <Route path="/students" element={<Students />} />
        <Route path="/announcement" element={<EmailAnnouncement />} />
        <Route path="/addannouncement" element={<SendAnnouncement />} />
        <Route path="/addstudent" element={<AddStudent />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}
export default App