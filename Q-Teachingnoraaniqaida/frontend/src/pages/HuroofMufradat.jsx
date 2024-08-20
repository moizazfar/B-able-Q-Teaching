import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  Modal,
  Button,
  styled,
  Tooltip,
  IconButton,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import axios from "axios";
import huroofData from "./huroofData";

const CourseCard = styled(Card)(({ theme }) => ({
  maxWidth: 345,
  margin: theme.spacing(2),
  cursor: "pointer",
  position: "relative",
  border: "solid 2px #10183D",
  borderRadius: 20,
  "&:hover": {
    transform: "scale(1.05)",
    transition: "transform 0.2s",
  },
}));

const ModalContent = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  backgroundColor: theme.palette.background.paper,
  border: "2px solid #000",
  boxShadow: 24,
  padding: theme.spacing(2),
}));

const LockOverlay = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  opacity: 0,
  transition: "opacity 0.2s",
  "&:hover": {
    opacity: 1,
  },
}));

const HuroofMufradat = () => {
  const [selectedAlphabet, setSelectedAlphabet] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [completedVideos, setCompletedVideos] = useState([]);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const accessToken = localStorage.getItem("access_token");
        const response = await axios.get(
          "http://127.0.0.1:8000/api/accounts/video-progress/",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const completedVideoIds = response.data
          .filter((progress) => progress.completed)
          .map((progress) => progress.video_id);
        setCompletedVideos(completedVideoIds);
      } catch (error) {
        console.error("Error fetching video progress:", error);
      }
    };
    fetchProgress();
  }, []);
  
  const handleCourseClick = (course, index) => {
    if (index === 0 || completedVideos.includes(index - 1)) {
      setSelectedAlphabet(course);
      setModalOpen(true);
    }
  };

  const closeModal = () => {
    setSelectedAlphabet(null);
    setModalOpen(false);
  };

  const handleVideoEnd = async (course) => {
    try {
      if (!completedVideos.includes(course.id)) {
        setCompletedVideos([...completedVideos, course.id]);
        const accessToken = localStorage.getItem("access_token");
        await axios.post(
          "http://127.0.0.1:8000/api/accounts/video-progress/",
          {
            video_id: course.id,
            completed: true,
            alphabet_name: course.alphabet_name,
            assignment_type: "Mufradat",
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
      }
      closeModal();
    } catch (error) {
      console.error("Error updating video progress:", error);
    }
  };

  return (
    <Box className="courses" textAlign="center">
      <Box mb={5}>
        <Typography variant="h2" fontFamily="Kaushan Script">
          Huroof Mufradat
        </Typography>
        <Typography variant="h5" color="textSecondary">
          Individual Letters
        </Typography>
      </Box>

      <Box
        className="course-list"
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
      >
        {huroofData.Mufradat.map((alphabet, index) => (
          <CourseCard
            key={alphabet.id}
            onClick={() => handleCourseClick(alphabet, index)}
            style={{
              opacity:
                index !== 0 && !completedVideos.includes(alphabet.id - 1)
                  ? 0.5
                  : 1,
              position: "relative",
            }}
          >
            <CardMedia
              component="img"
              alt={`Alphabet ${alphabet.alphabet_name}`}
              height="140"
              image={alphabet.image}
              title={`Alphabet ${alphabet.alphabet_name}`}
            />
            {index !== 0 && !completedVideos.includes(alphabet.id - 1) && (
              <LockOverlay>
                <Tooltip
                  title="Please watch the previous video to unlock"
                  arrow
                >
                  <IconButton>
                    <LockIcon sx={{ color: "#fff", fontSize: 40 }} />
                  </IconButton>
                </Tooltip>
              </LockOverlay>
            )}
            {completedVideos.includes(alphabet.id) && (
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
          </CourseCard>
        ))}
      </Box>

      <Modal open={isModalOpen} onClose={closeModal}>
        <ModalContent>
          {selectedAlphabet && (
            <Box>
              <video
                width="100%"
                height="100%"
                controls
                autoPlay
                onEnded={() => handleVideoEnd(selectedAlphabet)}
              >
                <source src={selectedAlphabet.video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <Button
                onClick={closeModal}
                variant="contained"
                color="secondary"
                fullWidth
                sx={{ mt: 2 }}
              >
                Close Video
              </Button>
            </Box>
          )}
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default HuroofMufradat;
