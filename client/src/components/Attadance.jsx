import { useState, useEffect } from "react";
import "../styles/Attadance.css";
import useStudents from "../hooks/useStudent";
import Navbar, { Unauthorize } from "./Utility";

const token = localStorage.getItem("token");

const AttendancePage = () => {
  const { students, loading, error } = useStudents();

  const [selectedFaculty, setSelectedFaculty] = useState("CSIT");
  const [selectedSemester, setSelectedSemester] = useState("1");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [attendanceData, setAttendanceData] = useState({});
  const [monthlySummary, setMonthlySummary] = useState({});
  const [loadingStudents, setLoadingStudents] = useState({});

  // Filter students by faculty & semester
  useEffect(() => {
    const filtered = students.filter(
      (student) =>
        student.faculty === selectedFaculty &&
        student.semester === selectedSemester
    );
    setFilteredStudents(filtered);
  }, [students, selectedFaculty, selectedSemester]);

  // Load today's attendance for filtered students
  useEffect(() => {
    const fetchAttendanceForDate = async () => {
      const initialized = {};

      await Promise.all(
        filteredStudents.map(async (student) => {
          try {
            const res = await fetch(
              `http://localhost:3000/api/attendance/${student._id}?date=${selectedDate}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            const data = await res.json();
            initialized[student._id] = data?.status?.toLowerCase() || "absent";
          } catch (err) {
            console.error(`Error fetching attendance for ${student.name}`, err);
            initialized[student._id] = "absent";
          }
        })
      );

      setAttendanceData(initialized);
    };

    if (filteredStudents.length > 0) {
      fetchAttendanceForDate();
    }
  }, [filteredStudents, selectedDate]);

  // Load monthly summary
  useEffect(() => {
    const month = selectedDate.slice(0, 7); // YYYY-MM

    filteredStudents.forEach(async (student) => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/summary/${student._id}?month=${month}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!res.ok) throw new Error("Summary fetch failed");

        const data = await res.json();
        setMonthlySummary((prev) => ({
          ...prev,
          [student._id]: data,
        }));
      } catch (err) {
        console.error(`Failed to fetch summary for ${student.name}`, err);
      }
    });
  }, [filteredStudents, selectedDate]);

  // Toggle attendance
  const handleAttendanceToggle = async (studentId) => {
    const currentStatus = attendanceData[studentId] || "absent";
    const newStatus = currentStatus === "present" ? "absent" : "present";

    setLoadingStudents((prev) => ({ ...prev, [studentId]: true }));

    try {
      await sendAttendanceToBackend(studentId, newStatus);

      setAttendanceData((prev) => ({ ...prev, [studentId]: newStatus }));

      setMonthlySummary((prev) => {
        const current = prev[studentId] || {
          present: 0,
          absent: 0,
          percentage: 0,
        };
        let updated = { ...current };

        if (newStatus === "present" && currentStatus === "absent") {
          updated.present += 1;
          updated.absent = Math.max(0, updated.absent - 1);
        } else if (newStatus === "absent" && currentStatus === "present") {
          updated.present = Math.max(0, updated.present - 1);
          updated.absent += 1;
        }

        const total = updated.present + updated.absent;
        updated.percentage =
          total > 0 ? Math.round((updated.present / total) * 100) : 0;

        return {
          ...prev,
          [studentId]: updated,
        };
      });
    } catch (err) {
      alert("Failed to update attendance.");
    } finally {
      setLoadingStudents((prev) => ({ ...prev, [studentId]: false }));
    }
  };

  // Save attendance to backend
  const sendAttendanceToBackend = async (studentId, status) => {
    const normalizedDate = new Date(selectedDate + "T00:00:00.000Z");

    const res = await fetch("http://localhost:3000/api/attendance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        studentId,
        status,
        date: normalizedDate,
      }),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to save attendance");
    }

    return await res.json();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error while fetching data</div>;
  if (!token) return <Unauthorize />;

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
              <tr key={student._id}>
                <td>{student.name}</td>
                <td>{student.contactNumber}</td>
                <td>
                  <button
                    className={`attendance-toggle ${
                      attendanceData[student._id] === "present"
                        ? "green"
                        : "red"
                    }`}
                    onClick={() => handleAttendanceToggle(student._id)}
                    disabled={loadingStudents[student._id]}
                  >
                    {loadingStudents[student._id]
                      ? "Saving..."
                      : attendanceData[student._id] === "present"
                      ? "Present"
                      : "Absent"}
                  </button>
                </td>
                <td>
                  <div className="monthly-stats">
                    <span>
                      Present: {monthlySummary[student._id]?.present ?? 0}
                    </span>
                    <span>
                      Absent: {monthlySummary[student._id]?.absent ?? 0}
                    </span>
                    <span>
                      Percentage: {monthlySummary[student._id]?.percentage ?? 0}%
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
