import React from "react";
import { Box, Typography, Container, Grid } from "@mui/material";
import { styled } from "@mui/system";
import girlimg from "../Assets/image/image 2.png";
import boyimg from "../Assets/image/image 3.png";

const AboutImage = styled("img")(({ theme }) => ({
  maxWidth: "100%",
  height: "auto",
  [theme.breakpoints.down("sm")]: {
    minHeight: "20vh",
    // height: "10%",
  },
}));

const AboutPage = () => {
  return (
    <Box
      sx={{
        width: "100vw",
        // height: "85vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#f5f5f5",
        minHeight: { xs: "20vh", md: "85vh", lg: "85vh" },
      }}
    >
      <Container sx={{ textAlign: "center", width: "75vw" }}>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={2.5} sm={4}>
            <AboutImage src={girlimg} alt="Girl" loading="lazy" />
          </Grid>
          <Grid item xs={7} sm={4}>
            <Typography
              variant="h1"
              sx={{
                fontFamily: "Kaushan Script",
                fontSize: { xs: 30, md: 60 },
                color: "#10183D",
                mb: 2,
              }}
            >
              About Us
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontFamily: "Inter",
                color: "#DCBA84",
                mt: 2,
                fontWeight: "800",
                fontSize: { xs: 13, md: 17 },
              }}
            >
              We are providing online Quran classes that are suitable for the
              whole family especially one of the best online Quran classes for
              kids. Our Quran tutors are ready to help students and to teach
              Quran online to the students who want to learn Islam and Quran
              online. We have developed extensive Quran courses for you and your
              kid's basic Islamic education. Our online Quran tutors utilize
              unique learning tools, and combine both ancient and modern methods
              for online Quran classes. Learn fundamental teachings of Islam and
              Tajweed-ul-Quran online through our innovative Islamic courses and
              experience it for yourself.
            </Typography>
          </Grid>
          <Grid item xs={2.5} sm={4}>
            <AboutImage src={boyimg} alt="Boy" loading="lazy" />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AboutPage;
