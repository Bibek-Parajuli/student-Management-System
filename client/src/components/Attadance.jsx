import React, { useState, useEffect } from 'react';
import { DatePicker, Table, Select } from 'antd';
import '../styles/Attadance.css';
import moment from 'moment';

const { Option } = Select;

const AttendancePage = () => {
  // State management
  const [selectedFaculty, setSelectedFaculty] = useState('CSIT');
  const [selectedSemester, setSelectedSemester] = useState(1);
  const [selectedDate, setSelectedDate] = useState(moment());
  const [students, setStudents] = useState([]);
  const [attendanceData, setAttendanceData] = useState({});

  // Sample data - replace with API calls
  const sampleStudents = {
    CSIT: {
      1: [
        { id: 1, name: 'John Doe', roll: 1 },
        { id: 2, name: 'Jane Smith', roll: 2 },
      ],
      2: [
        { id: 3, name: 'Bob Wilson', roll: 1 },
        { id: 4, name: 'Alice Brown', roll: 2 },
      ],
    },
    BCA: {
      1: [
        { id: 5, name: 'Mike Johnson', roll: 1 },
        { id: 6, name: 'Sarah Davis', roll: 2 },
      ],
    },
    BIM: {
      1: [
        { id: 7, name: 'David Miller', roll: 1 },
        { id: 8, name: 'Emma Wilson', roll: 2 },
      ],
    },
  };

  // Load sample data
  useEffect(() => {
    const facultyStudents = sampleStudents[selectedFaculty] || {};
    setStudents(facultyStudents[selectedSemester] || []);
  }, [selectedFaculty, selectedSemester]);

  // Attendance handling
  const handleAttendanceToggle = (studentId) => {
    const dateKey = selectedDate.format('YYYY-MM-DD');
    setAttendanceData(prev => ({
      ...prev,
      [dateKey]: {
        ...prev[dateKey],
        [studentId]: !prev[dateKey]?.[studentId]
      }
    }));
  };

  // Calculate monthly attendance
  const calculateMonthlyAttendance = (studentId) => {
    const month = selectedDate.format('YYYY-MM');
    const entries = Object.entries(attendanceData).filter(([date]) => 
      date.startsWith(month)
    );
    
    const presentDays = entries.filter(([_, data]) => data[studentId]).length;
    const totalDays = entries.length;
    
    return {
      present: presentDays,
      absent: totalDays - presentDays,
      percentage: totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 0
    };
  };

  // Table columns
  const columns = [
    {
      title: 'Student Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Roll No.',
      dataIndex: 'roll',
      key: 'roll',
    },
    {
      title: 'Attendance Today',
      key: 'attendance',
      render: (_, record) => (
        <button 
          className={`attendance-toggle ${attendanceData[selectedDate.format('YYYY-MM-DD')]?.[record.id] ? 'present' : 'absent'}`}
          onClick={() => handleAttendanceToggle(record.id)}
        >
          {attendanceData[selectedDate.format('YYYY-MM-DD')]?.[record.id] ? 'Present' : 'Absent'}
        </button>
      ),
    },
    {
      title: 'Monthly Summary',
      key: 'monthly',
      render: (_, record) => {
        const stats = calculateMonthlyAttendance(record.id);
        return (
          <div className="monthly-stats">
            <span>Present: {stats.present}</span>
            <span>Absent: {stats.absent}</span>
            <span>Percentage: {stats.percentage}%</span>
          </div>
        );
      },
    },
  ];

  return (
    <div className="attendance-container">
      <div className="filters">
        <div className="filter-group">
          <label>Faculty:</label>
          <Select
            value={selectedFaculty}
            onChange={setSelectedFaculty}
            style={{ width: 120 }}
          >
            <Option value="CSIT">CSIT</Option>
            <Option value="BCA">BCA</Option>
            <Option value="BIM">BIM</Option>
          </Select>
        </div>

        <div className="filter-group">
          <label>Semester:</label>
          <Select
            value={selectedSemester}
            onChange={setSelectedSemester}
            style={{ width: 80 }}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
              <Option key={sem} value={sem}>{sem}</Option>
            ))}
          </Select>
        </div>

        <div className="filter-group">
          <label>Date:</label>
          <DatePicker 
            value={selectedDate}
            onChange={setSelectedDate}
            format="YYYY-MM-DD"
          />
        </div>
      </div>

      <div className="attendance-summary">
        <h2>Attendance for {selectedDate.format('MMMM Do, YYYY')}</h2>
        <p>Faculty: {selectedFaculty} | Semester: {selectedSemester}</p>
      </div>

      <Table 
        columns={columns} 
        dataSource={students} 
        rowKey="id"
        pagination={false}
        bordered
      />
    </div>
  );
};

export default AttendancePage;