import React from "react";
import {
  Box,
  Typography,
  Dialog,
  DialogContent,
  IconButton,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import CourseCard from "./CourseCard";

const HuroofModal = ({
  open,
  onClose,
  displayedHuroof,
  selectedAssignment,
  handleOpenCamera,
  studentProgress,
}) => (
  <Dialog
    open={open}
    onClose={onClose}
    maxWidth="md"
    fullWidth
    PaperProps={{ style: { borderRadius: 20, padding: 10 } }}
  >
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 2,
      }}
    >
      <Typography variant="h5">Select a Huroof</Typography>
      <IconButton onClick={onClose}>
        <CloseIcon />
      </IconButton>
    </Box>
    <DialogContent
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        flexWrap: "wrap",
        justifyContent: "center",
        maxHeight: "70vh",
        overflowY: "auto",
      }}
    >
      {displayedHuroof.map((huroof, index) => (
        <CourseCard
          key={index}
          huroof={huroof.alphabet_name}
          image={huroof.image}
          onClick={() => handleOpenCamera(huroof)}
          disabled={false}
          completed={studentProgress.some(
            (progress) =>
              progress.assignment_type === selectedAssignment &&
              progress.last_completed_huroof === huroof.alphabet_name
          )}
        />
      ))}
    </DialogContent>
  </Dialog>
);

export default HuroofModal;
