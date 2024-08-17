import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import { styled } from "@mui/system";
import backgroundImage from "../Assets/BackgroundIMG.png";

const HeroSection = styled(Paper)(({ theme }) => ({
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  minHeight: "70vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "flex-start",
  padding: theme.spacing(8, 4),
  textAlign: "left",
  color: "#8fb07a",
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(4, 2),
    backgroundSize: "contain",
    backgroundPosition: "top",
    minHeight: "20vh",
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  color: "#10183D",
  fontSize: "50px",
  fontFamily: "Kaushan Script, sans-serif",
  marginTop: theme.spacing(5),
  marginLeft: theme.spacing(7),
  [theme.breakpoints.down("sm")]: {
    fontSize: "22px",
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
}));

const ParagraphText = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginLeft: theme.spacing(7),
  fontSize: "20px",
  fontFamily: "Inter, sans-serif",
  width: "57%",
  color: "#d4af37",
  fontWeight: "800",
  [theme.breakpoints.down("sm")]: {
    fontSize: "10px",
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(2),
    width: "57%",
  },
}));

const SectionHero = () => {
  return (
    <HeroSection elevation={0}>
      <SectionTitle variant="h1">Welcome To B-Able Q Teaching</SectionTitle>
      <ParagraphText variant="body1">
        Let's learn Quran Online with one of the best Online Quran Learning
        Academy. We are providing online Quran teaching service to kids and
        adults, male and female across the globe. Our Quran learning courses are
        specially designed for Abled kids.
      </ParagraphText>
    </HeroSection>
  );
};

export default SectionHero;
