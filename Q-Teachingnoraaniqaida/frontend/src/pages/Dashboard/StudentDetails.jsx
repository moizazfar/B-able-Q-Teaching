import React from "react";
import { Box, Paper, Typography, Divider } from "@mui/material";

const StudentDetails = ({ student }) => {
  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h5" gutterBottom>
        Student Details
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Typography variant="body1">
          <strong>Username:</strong> {student[0].username}
        </Typography>
        <Typography variant="body1">
          <strong>Email:</strong> {student[0].email}
        </Typography>
        <Typography variant="body1">
          <strong>Progress Level:</strong> {student[0].level}
        </Typography>
      </Box>
    </Paper>
  );
};

export default StudentDetails;
