import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import { styled } from "@mui/system";
import backgroundImage from "../Assets/BackgroundIMG.png";

const HeroSection = styled(Paper)(({ theme }) => ({
  backgroundImage: `linear-gradient(rgba(143, 176, 122, 0.7), rgba(143, 176, 122, 0.7)), url(${backgroundImage})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  // width: "100%",
  minHeight: "60vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(12, 5),
  textAlign: "center",
  color: "#8fb07a",
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  color: "#10183D",
  fontSize: "50px",
  fontFamily: "Kaushan Script, sans-serif",
  marginBottom: theme.spacing(4),
}));

const ParagraphText = styled(Typography)(({ theme }) => ({
  padding: theme.spacing(1),
  fontSize: "20px",
  fontFamily: "Inter, sans-serif",
  width: "75%",
  color: "#d4af37",
  fontWeight: "800",
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
