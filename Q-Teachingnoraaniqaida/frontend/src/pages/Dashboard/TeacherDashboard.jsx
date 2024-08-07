import React, { useEffect, useState } from "react";
import { Box, Paper, Typography, CircularProgress } from "@mui/material";
import axios from "axios";

const TeacherDashboard = () => {
    const [teacherDetails, setTeacherDetails] = useState(null);
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchTeacherData = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/accounts/teacher/");
                setTeacherDetails(response.data.teacher);
                setStudents(response.data.students);
            } catch (error) {
                console.error("Error fetching teacher data:", error);
            }
        };

        fetchTeacherData();
    }, []);

    if (!teacherDetails || !students.length) {
        return <CircularProgress />;
    }

    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h3" sx={{ marginBottom: 2 }}>Teacher Dashboard</Typography>
            <Paper sx={{ padding: 3, marginBottom: 2 }}>
                <Typography variant="h5">Teacher Details</Typography>
                <Typography>Name: {teacherDetails.name}</Typography>
                <Typography>Email: {teacherDetails.email}</Typography>
                <Typography>Class: {teacherDetails.class}</Typography>
            </Paper>
            <Paper sx={{ padding: 3 }}>
                <Typography variant="h5">Student Details</Typography>
                {students.map((student, index) => (
                    <Box key={index} sx={{ marginBottom: 1 }}>
                        <Typography>Name: {student.name}</Typography>
                        <Typography>Email: {student.email}</Typography>
                        <Typography>Class: {student.class}</Typography>
                        <Typography>Progress: {student.progress.sign_language_proficiency}</Typography>
                    </Box>
                ))}
            </Paper>
        </Box>
    );
};

export default TeacherDashboard;