import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  Dialog,
  DialogContent,
  IconButton,
  Button,
} from "@mui/material";
import {
  Close as CloseIcon,
  CheckCircleOutline as CheckCircleOutlineIcon,
} from "@mui/icons-material";
import { green } from "@mui/material/colors";
import pic from "../Assets/image/Assignment.png";
import Webcam from "react-webcam";
import axios from "axios";
import huroofData from "./huroofData";
import AssignmentHuroof from "../components/Assignment/AssignmentHuroof";
import CourseCard from "../components/Assignment/CourseCard";

const Assignment = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openCamera, setOpenCamera] = useState(false);
  const [currentHuroof, setCurrentHuroof] = useState(null);
  const [displayedHuroof, setDisplayedHuroof] = useState([]);
  const [remainingHuroof, setRemainingHuroof] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState("Mufradat");
  const [studentProgress, setStudentProgress] = useState([]);
  const [videoProgress, setVideoProgress] = useState([]);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const webcamRef = useRef(null);
  const accessToken = localStorage.getItem("access_token");

  useEffect(() => {
    const fetchStudentProgress = async () => {
      try {
        const response = await axios.get(
          "https://fyp-back.up.railway.app/api/accounts/student-progress",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setStudentProgress(response.data);
      } catch (error) {
        console.error("Error fetching student progress:", error);
      }
    };

    const fetchVideoProgress = async () => {
      try {
        const response = await axios.get(
          "https://fyp-back.up.railway.app/api/accounts/video-progress/",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const completedVideos = response.data
          .filter((progress) => progress.completed)
          .map((progress) => progress.video_id);
        setVideoProgress(completedVideos);
      } catch (error) {
        console.error("Error fetching video progress:", error);
      }
    };

    if (accessToken) {
      fetchStudentProgress();
      fetchVideoProgress();
    }
  }, [accessToken]);

  useEffect(() => {
    const updateRemainingHuroof = () => {
      if (selectedAssignment) {
        const remaining = huroofData[selectedAssignment].filter((huroof) =>
          videoProgress.includes(huroof.id)
        );
        setRemainingHuroof(remaining);
      }
    };
    updateRemainingHuroof();
  }, [selectedAssignment, studentProgress, videoProgress]);

  useEffect(() => {
    if (remainingHuroof.length > 0) {
      setDisplayedHuroof(remainingHuroof);
    }
  }, [remainingHuroof]);

  const isAssignmentLocked = (assignment) => {
    const assignmentsOrder = ["Mufradat", "Murakkabat", "Murqattaat"];
    const currentIndex = assignmentsOrder.indexOf(assignment);
    const previousAssignment = assignmentsOrder[currentIndex - 1];

    if (assignment === "Mufradat") return false;

    const isPreviousAssignmentCompleted = studentProgress.some(
      (progress) =>
        progress.assignment_type === previousAssignment &&
        progress.completed_assignments === huroofData[previousAssignment].length
    );

    return !isPreviousAssignmentCompleted;
  };

  const handleOpenModal = (assignment) => {
    if (!isAssignmentLocked(assignment)) {
      setSelectedAssignment(assignment);
      setOpenModal(true);
    } else {
      alert("Complete the previous assignment to unlock this one.");
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setOpenCamera(false);
    setCurrentHuroof(null);
  };

  const handleOpenCamera = (huroof) => {
    setCurrentHuroof(huroof);
    setOpenCamera(true);
  };

  const handleSuccess = async (predictionLetter, confidenceScore) => {
    setOpenCamera(false);

    try {
      const isNewAlphabet = studentProgress.every(
        (progress) =>
          progress.last_completed_huroof !== currentHuroof.alphabet_name
      );

      const marksObtained = isNewAlphabet ? 10 : 0;

      const response = await axios.post(
        "https://fyp-back.up.railway.app/api/accounts/student-progress/",
        {
          assignment_type: selectedAssignment,
          completed_assignments: 1,
          last_completed_huroof: currentHuroof.alphabet_name,
          marks_obtained: marksObtained,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setStudentProgress((prevProgress) => [...prevProgress, response.data]);

      setRemainingHuroof((prev) =>
        prev.filter((h) => h.alphabet_name !== currentHuroof.alphabet_name)
      );

      setOpenSuccessModal(true);

      if (remainingHuroof.length === 1) {
        alert(
          `Congratulations! You've completed all letters in ${selectedAssignment}. Moving to the next assignment.`
        );
        moveToNextAssignment();
      }
    } catch (error) {
      console.error("Error updating progress:", error);
    }
  };

  const handleFailure = () => {
    setOpenCamera(false);
    alert("Try again! Your prediction was not accurate enough.");
  };

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    processImage(imageSrc);
  };

  const processImage = async (imageSrc) => {
    try {
      const blob = await fetch(imageSrc).then((res) => res.blob());
      const formData = new FormData();
      formData.append("image", blob, "capture.jpg");
      const response = await axios.post(
        "https://fyp-back.up.railway.app/api/recognize_sign/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const { prediction_letter, confidence_score } = response.data;
      if (
        currentHuroof.alphabet_name.toUpperCase() ===
          prediction_letter.toUpperCase() &&
        confidence_score >= 70
      ) {
        handleSuccess(prediction_letter, confidence_score);
      } else {
        handleFailure();
      }
    } catch (error) {
      console.error("Error processing image:", error);
    }
  };

  const moveToNextAssignment = () => {
    const nextAssignments = {
      Mufradat: "Murakkabat",
      Murakkabat: "Murqattaat",
      Murqattaat: null,
    };

    const nextAssignment = nextAssignments[selectedAssignment];
    if (nextAssignment) {
      setSelectedAssignment(nextAssignment);
      setRemainingHuroof(
        huroofData[nextAssignment].filter(
          (huroof) =>
            !studentProgress.some(
              (progress) =>
                progress.assignment_type === nextAssignment &&
                progress.last_completed_huroof === huroof.alphabet_name
            )
        )
      );
    }
  };

  const allVideosWatched =
    videoProgress.length === huroofData[selectedAssignment]?.length;

  const noVideosWatched = videoProgress.length === 0;

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "white",
        gap: 2,
        padding: 4,
      }}
    >
      <Typography
        variant="h2"
        sx={{
          fontFamily: "Kaushan Script",
          color: "#10183D",
          fontSize: 60,
          marginBottom: 4,
        }}
      >
        Our Featured Assignments
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            height: "500px",
            width: "450px",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "flex-start",
          }}
        >
          <img
            src={pic}
            alt="Assignment"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Box>
        <Box
          sx={{
            width: "660px",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <AssignmentHuroof
            prop="Huroof Al-Mufradat"
            huroof="ھُرُوفُ المُفرَدَات"
            letters="Individual Letters"
            onClick={() => handleOpenModal("Mufradat")}
            locked={isAssignmentLocked("Mufradat")}
          />
          <AssignmentHuroof
            prop="Huroof Al-Murakkabat"
            huroof="ھُرُوفُ المُرَکَّبَات"
            letters="Compound Letters"
            onClick={() => handleOpenModal("Murakkabat")}
            locked={isAssignmentLocked("Murakkabat")}
          />
          <AssignmentHuroof
            prop="Huroof Al-Murqattaat"
            huroof="ھُرُوفُ المُقَطَّعَات"
            letters="Disjoined Letters"
            onClick={() => handleOpenModal("Murqattaat")}
            locked={isAssignmentLocked("Murqattaat")}
          />
        </Box>
      </Box>

      {/* Assignment Modal */}
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        fullWidth
        maxWidth="md"
        PaperProps={{
          sx: { borderRadius: "20px", backgroundColor: "#fff7e6" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 2,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontFamily: "Kaushan Script",
              color: "#10183D",
              fontWeight: "bold",
            }}
          >
            {selectedAssignment === "Mufradat"
              ? "Huroof Al-Mufradat (Individual Letters)"
              : selectedAssignment === "Murakkabat"
              ? "Huroof Al-Murakkabat (Compound Letters)"
              : "Huroof Al-Murqattaat (Disjoined Letters)"}
          </Typography>
          <IconButton onClick={handleCloseModal}>
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContent
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            justifyContent: "center",
            overflowY: "auto",
          }}
        >
          {allVideosWatched && remainingHuroof.length > 0 ? (
            displayedHuroof.map((huroof) => (
              <CourseCard
                key={huroof.id}
                huroof={huroof}
                onClick={() => handleOpenCamera(huroof)}
                isCompleted={studentProgress.some(
                  (progress) =>
                    progress.assignment_type === selectedAssignment &&
                    progress.last_completed_huroof === huroof.alphabet_name
                )}
              />
            ))
          ) : noVideosWatched ? (
            <Typography variant="h5" sx={{ textAlign: "center" }}>
              It looks like you haven't watched any videos yet. To start the
              assignment, please watch the videos first. Watching the videos
              will help you understand the signs better and improve your
              performance. Happy Learning!
            </Typography>
          ) : (
            displayedHuroof.map((huroof) => (
              <CourseCard
                key={huroof.id}
                huroof={huroof.alphabet_name}
                image={huroof.image}
                onClick={() => handleOpenCamera(huroof)}
                disabled={false}
                completed={studentProgress.some(
                  (progress) =>
                    progress.last_completed_huroof === huroof.alphabet_name
                )}
              />
            ))
          )}
        </DialogContent>
      </Dialog>

      {/* Camera Modal */}
      <Dialog open={openCamera} onClose={() => setOpenCamera(false)} fullWidth>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 2,
            backgroundColor: "#fff7e6",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontFamily: "Kaushan Script",
              fontSize: "30px",
              color: "#10183D",
              fontWeight: "bold",
            }}
          >
            {currentHuroof ? currentHuroof.alphabet_name : ""}
          </Typography>
          <IconButton onClick={() => setOpenCamera(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContent>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width="100%"
            height="100%"
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 2,
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={capture}
              sx={{
                fontFamily: "Kaushan Script",
                backgroundColor: "#DCBA84",
                "&:hover": { backgroundColor: "#caa774" },
              }}
            >
              Capture
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Success Modal */}
      <Dialog
        open={openSuccessModal}
        onClose={() => setOpenSuccessModal(false)}
      >
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <CheckCircleOutlineIcon
              sx={{ fontSize: 80, color: green[500], marginBottom: 2 }}
            />
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Success! You have completed this assignment.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setOpenSuccessModal(false)}
            >
              OK
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Assignment;
