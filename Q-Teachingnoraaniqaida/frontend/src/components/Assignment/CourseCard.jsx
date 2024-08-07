import { Paper, Typography } from "@mui/material";

const CourseCard = ({ huroof, image, onClick, disabled, completed }) => (
  <>
    <Paper
      elevation={3}
      onClick={!disabled ? onClick : null}
      sx={{
        borderRadius: "15px",
        padding: 2,
        textAlign: "center",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        position: "relative",
        "&:hover": { transform: disabled ? "none" : "scale(1.05)" },
      }}
    >
      <img
        src={image}
        alt={huroof}
        style={{ width: "100px", height: "100px" }}
      />
      <Typography variant="h5">{huroof}</Typography>
      {completed && (
        <Typography
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: "green",
            fontWeight: "bold",
          }}
        >
          ✓
        </Typography>
      )}
    </Paper>
  </>
);

export default CourseCard;
