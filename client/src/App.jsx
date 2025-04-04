import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import AttendancePage from './components/Attadance';
import Students from './components/Students';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/attendance" element={<AttendancePage />} />
        <Route path="/students" element={<Students />} />
        {/* <Route path="/" element={<Navbar />} /> */}


        {/* other routes */}
      </Routes>
    </Router>
  );
}
export default App