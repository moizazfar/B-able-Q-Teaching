import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Huruuf1 from "../Assets/quran/Rectangle 3.png";
import Huruuf2 from "../Assets/quran/Rectangle 4.png";
import Huruuf3 from "../Assets/quran/Rectangle 5.png";
import arabicLesson from "../Assets/audio/Bismillah.mp3";
import { Lock } from "@mui/icons-material";
import axios from "axios";

const OurLesson = () => {
  const [videoProgress, setVideoProgress] = useState([]);
  const audioRef = useRef(null);
  const [cardStatus, setCardStatus] = useState({
    Mufradat: false,
    Murakkabat: false,
    Murqattaat: false,
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  }, []);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const accessToken = localStorage.getItem("access_token");
        const response = await axios.get(
          "https://fyp-back.up.railway.app/api/accounts/video-progress/",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setVideoProgress(response.data);
      } catch (error) {
        console.error("Error fetching video progress:", error);
      }
    };
    fetchProgress();
  }, []);

  useEffect(() => {
    const updateCardStatus = () => {
      const completedVideos = videoProgress
        .filter((v) => v.completed)
        .map((v) => v.video_id);

      const isMufradatComplete = completedVideos.length >= 29;
      const isMurakkabatComplete =
        isMufradatComplete && completedVideos.length >= 155;
      const isMurqattaatComplete =
        isMurakkabatComplete && completedVideos.length >= 169;

      setCardStatus({
        Mufradat: true,
        Murakkabat: isMufradatComplete,
        Murqattaat: isMurakkabatComplete,
      });
    };

    updateCardStatus();
  }, [videoProgress]);

  const handleLockedCardClick = () => {
    setSnackbarMessage(
      "You need to complete the previous lessons to unlock this lesson."
    );
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const onHuroofMufradatClick = () => {
    navigate("/ourlesson/huroofmufradat");
  };

  const onHuroofMurakkabatClick = () => {
    navigate("/ourlesson/huroofmurakkabat");
  };

  const onHuroofMurqattaatClick = () => {
    navigate("/ourlesson/huroofmuraqattat");
  };

  return (
    <Box sx={{ py: 4 }}>
      <Box sx={{ mb: 4, textAlign: "center" }}>
        <Typography
          variant="h1"
          sx={{ fontFamily: "Kaushan Script", color: "#10183D", fontSize: 60 }}
        >
          Featured Quran Lessons
        </Typography>
        <Typography
          variant="body1"
          sx={{ fontFamily: "Inter", color: "#DCBA84", fontSize: 20 }}
        >
          We have organized comprehensive Quran lessons for Abled kids.
        </Typography>
      </Box>

      {/* Arabic Audio Element with Subtitles */}
      <Box sx={{ display: "none" }}>
        <audio ref={audioRef} controls>
          <source src={arabicLesson} type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
      </Box>

      <Grid container spacing={5} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <Card
            sx={{
              maxWidth: 550,
              height: 650,
              cursor: "pointer",
              position: "relative",
              "&:hover": cardStatus.Mufradat ? { transform: "scale(1.1)" } : {},
              opacity: cardStatus.Mufradat ? 1 : 0.8,
            }}
            onClick={
              cardStatus.Mufradat
                ? onHuroofMufradatClick
                : handleLockedCardClick
            }
          >
            {!cardStatus.Mufradat && (
              <Box
                sx={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(255, 255, 255, 0.7)",
                  zIndex: 1,
                }}
              >
                <Lock
                  sx={{
                    marginBottom: "50px",
                    fontSize: 60,
                    color: "#738760",
                  }}
                />
              </Box>
            )}
            <CardActionArea>
              <CardMedia
                component="img"
                height="530"
                image={Huruuf1}
                alt="Huroof Mufradat"
              />
              <CardContent>
                <Typography
                  variant="h2"
                  sx={{ color: "#738760", fontWeight: "bolder", fontSize: 30 }}
                >
                  Huroof Mufradat
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "#738760", fontSize: 25 }}
                >
                  Individual Letters
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card
            sx={{
              maxWidth: 550,
              height: 650,
              cursor: cardStatus.Murakkabat ? "pointer" : "not-allowed",
              position: "relative",
              "&:hover": cardStatus.Murakkabat
                ? { transform: "scale(1.1)" }
                : {},
              opacity: cardStatus.Murakkabat ? 1 : 0.8,
            }}
            onClick={
              cardStatus.Murakkabat
                ? onHuroofMurakkabatClick
                : handleLockedCardClick
            }
          >
            {!cardStatus.Murakkabat && (
              <Box
                sx={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(255, 255, 255, 0.7)",
                  zIndex: 1,
                }}
              >
                <Lock
                  sx={{
                    marginBottom: "50px",
                    fontSize: 60,
                    color: "#738760",
                  }}
                />
              </Box>
            )}
            <CardActionArea>
              <CardMedia
                component="img"
                height="530"
                image={Huruuf2}
                alt="Huroof Murakkabat"
              />
              <CardContent>
                <Typography
                  variant="h2"
                  sx={{ color: "#738760", fontWeight: "bolder", fontSize: 30 }}
                >
                  Huroof Murakkabat
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "#738760", fontSize: 25 }}
                >
                  Compound Letters
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card
            sx={{
              maxWidth: 550,
              height: 650,
              cursor: cardStatus.Murqattaat ? "pointer" : "not-allowed",
              position: "relative",
              "&:hover": cardStatus.Murqattaat
                ? { transform: "scale(1.1)" }
                : {},
              opacity: cardStatus.Murqattaat ? 1 : 0.8,
            }}
            onClick={
              cardStatus.Murqattaat
                ? onHuroofMurqattaatClick
                : handleLockedCardClick
            }
          >
            {!cardStatus.Murqattaat && (
              <Box
                sx={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(255, 255, 255, 0.7)",
                  zIndex: 1,
                }}
              >
                <Lock
                  sx={{
                    marginBottom: "50px",
                    fontSize: 60,
                    color: "#738760",
                  }}
                />
              </Box>
            )}
            <CardActionArea>
              <CardMedia
                component="img"
                height="530"
                image={Huruuf3}
                alt="Huroof Muraqatta’at"
              />
              <CardContent>
                <Typography
                  variant="h2"
                  sx={{ color: "#738760", fontWeight: "bolder", fontSize: 30 }}
                >
                  Huroof Muraqatta’at
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "#738760", fontSize: 25 }}
                >
                  Disjoined Letters
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="info"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default OurLesson;
