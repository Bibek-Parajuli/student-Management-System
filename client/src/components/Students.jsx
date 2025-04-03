import  { useState } from "react";
import useStudents from "../hooks/useStudent";
import "../styles/Students.css";

const Students = () => {
  const { students, loading, error } = useStudents();
  const [selectedFaculty, setSelectedFaculty] = useState("All");
  const [selectedSemester, setSelectedSemester] = useState("All");

  const filteredStudents = students.filter(student => {
    const facultyMatch = selectedFaculty === "All" || student.faculty === selectedFaculty;
    const semesterMatch = selectedSemester === "All" || student.semester === selectedSemester;
    return facultyMatch && semesterMatch;
  });

  if (loading) return <div className="loading">Loading student data...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="student-table-container">
      <div className="filters">
        <div className="filter-group">
          <label>Faculty:</label>
          <select
            value={selectedFaculty}
            onChange={(e) => setSelectedFaculty(e.target.value)}
          >
            <option value="All">All Faculties</option>
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
            <option value="All">All Semesters</option>
            {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
              <option key={sem} value={sem}>Semester {sem}</option>
            ))}
          </select>
        </div>
      </div>

      <table className="student-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Roll No.</th>
            <th>Faculty</th>
            <th>Semester</th>
            <th>Contact</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map(student => (
            <tr key={student._id}>
              <td>{student.name}</td>
              <td>{student.contactNumber}</td>
              <td>{student.faculty}</td>
              <td>{student.semester}</td>
              <td>{student.contactNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {filteredStudents.length === 0 && (
        <div className="no-results">No students found matching the filters</div>
      )}
    </div>
  );
};

export default Students;