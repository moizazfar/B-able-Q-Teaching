import React, { useEffect, useRef } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Huruuf1 from "../Assets/quran/Rectangle 3.png";
import Huruuf2 from "../Assets/quran/Rectangle 4.png";
import Huruuf3 from "../Assets/quran/Rectangle 5.png";
import arabicLesson from "../Assets/audio/Bismillah.mp3"; // Import your Arabic audio file
// import subtitles from "../Assets/subtitles/subtitles_arabic.vtt"; // Import your Arabic subtitles file

const OurLesson = () => {
  const navigate = useNavigate();
  const audioRef = useRef(null); // Reference to the audio element

  const onHuroofMufradatClick = () => {
    navigate("/ourlesson/huroofmufradat");
  };

  const onHuroofMurakkabatClick = () => {
    navigate("/ourlesson/huroofmurakkabat");
  };

  const onHuroofMuraqattatClick = () => {
    navigate("/ourlesson/huroofmuraqattat");
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  }, []);

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
              "&:hover": { transform: "scale(1.1)" },
            }}
            onClick={onHuroofMufradatClick}
          >
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
              cursor: "pointer",
              "&:hover": { transform: "scale(1.1)" },
            }}
            onClick={onHuroofMurakkabatClick}
          >
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
              cursor: "pointer",
              "&:hover": { transform: "scale(1.1)" },
            }}
            onClick={onHuroofMuraqattatClick}
          >
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
    </Box>
  );
};

export default OurLesson;
