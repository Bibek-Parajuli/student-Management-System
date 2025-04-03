import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Attadance.css";

const AttendancePage = () => {
  const [selectedFaculty, setSelectedFaculty] = useState("CSIT");
  const [selectedSemester, setSelectedSemester] = useState("1");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [students, setStudents] = useState([]);
  // const [attendanceData, setAttendanceData] = useState({});
  const URL = "http://localhost:3000";

  useEffect(() => {
    async function fetchStudents() {
      try {
        const response = await axios.get(
          `${URL}/student/list`
        );
        setStudents(Array.isArray(response.data.sampleStudents) ? response.data.sampleStudents : []);
      } catch (error) {
        console.error("Error fetching students:", error);
        setStudents([]);
      }
    }
    fetchStudents();
  }, [selectedSemester, selectedFaculty]);

  // const handleAttendanceToggle = (studentId) => {
  //   const dateKey = selectedDate;
  //   setAttendanceData(prev => ({
  //     ...prev,
  //     [dateKey]: {
  //       ...prev[dateKey],
  //       [studentId]: !prev[dateKey]?.[studentId],
  //     },
  //   }));
  // };

  // const calculateMonthlyAttendance = (studentId) => {
  //   const month = selectedDate.slice(0, 7);
  //   const entries = Object.entries(attendanceData).filter(([date]) =>
  //     date.startsWith(month)
  //   );
  //   const presentDays = entries.filter(([_, data]) => data[studentId]).length;
  //   const totalDays = entries.length;
  //   return {
  //     present: presentDays,
  //     absent: totalDays - presentDays,
  //     percentage: totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 0,
  //   };
  // };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="attendance-container">
      <div className="filters">
        <div className="filter-group">
          <label>Faculty:</label>
          <select 
            value={selectedFaculty} 
            onChange={(e) => setSelectedFaculty(e.target.value)}
          >
            <option value="CSIT">CSIT</option>
            <option value="BCA">BCA</option>
            <option value="BIM">BIM</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Semester:</label>
          <select
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
              <option key={sem} value={sem}>{sem}</option>
            ))}
          </select> 
        </div>

        <div className="filter-group">
          <label>Date:</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>
      </div>

      <div className="attendance-summary">
        <h2>Attendance for {formatDate(selectedDate)}</h2>
        <p>Faculty: {selectedFaculty} | Semester: {selectedSemester}</p>
      </div>

      <table className="attendance-table">
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Roll No.</th>
            <th>Attendance Today</th>
            <th>Monthly Summary</th>
          </tr>
        </thead>
        <tbody>
          {/* {students.map(student => (
            <tr key={student.id}>   
              <td>{student.name}</td>
              <td>{student.roll}</td> */}
              {/* <td>
                <button
                  className={`attendance-toggle ${
                    attendanceData[selectedDate]?.[student.id] ? "present" : "absent"
                  }`}
                  onClick={() => handleAttendanceToggle(student.id)}
                >
                  {attendanceData[selectedDate]?.[student.id] ? "Present" : "Absent"}
                </button> */}
              {/* </td>
              <td>
                <div className="monthly-stats">
                  <span>Present: {calculateMonthlyAttendance(student.id).present}</span>
                  <span>Absent: {calculateMonthlyAttendance(student.id).absent}</span>
                  <span>Percentage: {calculateMonthlyAttendance(student.id).percentage}%</span>
                </div>
              </td>
            </tr>
          ))} */}
        </tbody>
      </table>
    </div>
  );
};

export default AttendancePage;