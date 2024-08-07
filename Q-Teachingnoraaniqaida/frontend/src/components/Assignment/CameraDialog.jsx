import React from "react";
import {
  Box,
  Typography,
  Dialog,
  DialogContent,
  IconButton,
  Button,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import Webcam from "react-webcam";

const CameraDialog = ({
  open,
  onClose,
  onCapture,
  webcamRef,
  currentHuroof,
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
      <Typography variant="h5">
        Capture Image for {currentHuroof?.alphabet_name}
      </Typography>
      <IconButton onClick={onClose}>
        <CloseIcon />
      </IconButton>
    </Box>
    <DialogContent
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width="100%"
        videoConstraints={{ width: 1280, height: 720, facingMode: "user" }}
      />
      <Button variant="contained" color="primary" onClick={onCapture}>
        Capture
      </Button>
    </DialogContent>
  </Dialog>
);

export default CameraDialog;
