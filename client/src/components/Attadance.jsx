import { useState, useEffect } from "react";
import "../styles/Attadance.css";
import useStudents from "../hooks/useStudent";
import Navbar, { Unauthorize } from "./Utility";
const token = localStorage.getItem('token')
// import Navbar from "./Utility";
const AttendancePage = () => {
  const { students, loading, error } = useStudents();
  const [selectedFaculty, setSelectedFaculty] = useState("CSIT");
  const [selectedSemester, setSelectedSemester] = useState("1");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [allStudents, setAllStudents] = useState([]); // Ensure it's an array
  const [filteredStudents, setFilteredStudents] = useState([]);

  useEffect(() => {

    setAllStudents(students);
    console.log(students);

  }, [students]); 

  useEffect(() => {
    const filtered = allStudents.filter((student) => {
      const matchesFaculty = student.faculty === selectedFaculty;
      const matchesSemester = student.semester === selectedSemester;
      return matchesFaculty && matchesSemester;
    });

    setFilteredStudents(filtered); // Set the filtered students data to state
  }, [allStudents, selectedFaculty, selectedSemester]); // Runs when any of the dependencies change

  const handleAttendanceToggle = (studentId) => {
    // Example attendance toggle logic (You can modify this to suit your needs)
    console.log(`Toggled attendance for student ${studentId}`);
  };

  const calculateMonthlyAttendance = (studentId) => {
    // This is a placeholder for monthly attendance calculation
    return { present: 10, absent: 5, percentage: 67 };
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Render loading spinner if data is still loading
  if (loading) {
    return <div>Loading...</div>;
  }
  //Render Error while Error occured
  if (error) return <div> Error while Fetching data</div>;
 if(!token) return <Unauthorize/>
  
  return (
    <> 
    <Navbar title="Student Attendance" />
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
                <option key={sem} value={sem}>
                  {sem}
                </option>
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
          <p>
            Faculty: {selectedFaculty} | Semester: {selectedSemester}
          </p>
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
            {filteredStudents.map((student) => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.contactNumber}</td>
                <td>
                  <button
                    className="attendance-toggle"
                    onClick={() => handleAttendanceToggle(student.id)}
                  >
                    Toggle Attendance
                  </button>
                </td>
                <td>
                  <div className="monthly-stats">
                    <span>
                      Present: {calculateMonthlyAttendance(student.id).present}
                    </span>
                    <span>
                      Absent: {calculateMonthlyAttendance(student.id).absent}
                    </span>
                    <span>
                      Percentage:{" "}
                      {calculateMonthlyAttendance(student.id).percentage}%
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AttendancePage;
