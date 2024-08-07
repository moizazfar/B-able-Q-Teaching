import { Box, Paper, Typography } from "@mui/material";

const AssignmentHuroof = ({ prop, huroof, letters, onClick }) => (
  <>
    <Paper
      elevation={3}
      onClick={onClick}
      sx={{
        borderRadius: "35px",
        backgroundColor: "#DCBA84",
        border: "3px solid #10183D",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        position: "relative",
        padding: 2,
        "&:hover": { transform: "scale(1.1)", cursor: "pointer" },
      }}
    >
      <Box
        sx={{
          borderRadius: "30px",
          backgroundColor: "#10183D",
          padding: 2,
          zIndex: 1,
          color: "white",
          width: "180px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="body1">Assignment {prop}</Typography>
      </Box>
      <Box
        sx={{
          width: "500px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "#10183D",
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          {huroof}
        </Typography>
        <Typography variant="h5" sx={{ color: "#10183D" }}>
          {letters}
        </Typography>
      </Box>
    </Paper>
  </>
);

export default AssignmentHuroof;
