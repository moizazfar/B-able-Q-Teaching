import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Grid, IconButton } from "@mui/material";
import { styled } from "@mui/system";
import logo from "../Assets/Logo/Logo.png";
import { Facebook, Instagram, LinkedIn, Twitter } from "@mui/icons-material";

const FooterContainer = styled("footer")({
  backgroundColor: "#DCBA84",
  width: "100vw",
  maxWidth: "100vw",
  overflowX: "hidden",
  marginTop: "auto",
});

const PagesList = styled("ul")({
  padding: 0,
  margin: 0,
  listStyle: "none",
  "& h2": {
    fontSize: "2rem",
    color: "white",
    marginBottom: "25px",
    position: "relative",
    "&::before": {
      content: '""',
      position: "absolute",
      height: "2px",
      width: "50px",
      left: 0,
      bottom: "-8px",
      background: "#DCBA84",
    },
  },
  "& li": {
    marginBottom: "15px",
  },
  "& a": {
    color: "#10183D",
    fontSize: "1.1rem",
    display: "block",
    transition: "0.5s",
    "&:hover": {
      color: "#10183D",
      transform: "translateX(-12px)",
    },
  },
});

const SocialIcons = styled("div")({
  padding: "1.5rem 0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  "& i": {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    height: "40px",
    width: "40px",
    fontSize: "1.5rem",
    margin: "2px 8px",
    cursor: "pointer",
    background: "#10183D",
    color: "white",
    borderRadius: "50%",
    transition: "0.5s",
    "&:hover": {
      transform: "scale(1.2)",
      color: "#738760",
      background: "10183D",
    },
  },
  "&:before": {
    content: '""',
    position: "absolute",
    width: "90%",
    height: "1px",
    background: "#10183D",
    top: 0,
    left: "50%",
    transform: "translateX(-50%)",
  },
});

const LegalInfo = styled("div")({
  padding: "0.5rem 4%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: "#10183D",
});

const UpArrowLink = styled(Link)({
  position: "relative",
  display: "inline-flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "0.6rem",
  background: "white",
  border: "0.2rem solid white",
  borderRadius: "0.6rem",
  zIndex: 1,
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "0%",
    height: "100%",
    background: "#10183D",
    zIndex: -1,
    transition: "0.5s",
  },
  "&:hover::before": {
    width: "100%",
  },
  "& i": {
    fontSize: "1.6rem",
    color: "#10183D",
    transition: "0.5s",
  },
  "&:hover i": {
    color: "#10183D",
  },
});

const Footer = () => {
  return (
    <FooterContainer>
      <Box className="top" textAlign="center">
        <Grid container spacing={4} justifyContent="space-evenly">
          <Grid item xs={12} sm={6} md={3}>
            <PagesList>
              <Typography variant="h2">Quick Links</Typography>
              <li>
                <Link to="/">
                  <i className="bx bx-right-arrow-alt"></i>Home
                </Link>
              </li>
              <li>
                <Link to="/ourlesson">
                  <i className="bx bx-right-arrow-alt"></i>Our Lesson
                </Link>
              </li>
              <li>
                <Link to="/ourassignment">
                  <i className="bx bx-right-arrow-alt"></i>Our Assignment
                </Link>
              </li>
              <li>
                <Link to="/aboutus">
                  <i className="bx bx-right-arrow-alt"></i>About Us
                </Link>
              </li>
              <li>
                <Link to="/contactus">
                  <i className="bx bx-right-arrow-alt"></i>Contact Us
                </Link>
              </li>
            </PagesList>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <PagesList>
              <Typography variant="h2">Get In Touch</Typography>
              <li>
                <Link to="#">
                  <i className="bx bxs-phone"></i>+923410678476
                </Link>
              </li>
              <li>
                <Link to="#">
                  <i className="bx bxs-envelope"></i>moiz@gmail.com
                </Link>
              </li>
              <li>
                <Link to="#">
                  <i className="bx bxs-location-plus"></i>Sir Syed University of
                  Engineering and Technology
                </Link>
              </li>
            </PagesList>
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <Box textAlign="center">
              <img height="100" src={logo} alt="Logo" />
              <Typography variant="body1" mt={2}>
                We are available 24/7, and the sign-up process is extremely
                simple!
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <SocialIcons>
        <IconButton>
          <LinkedIn />
        </IconButton>
        <IconButton>
          <Facebook />
        </IconButton>
        <IconButton>
          <Instagram />
        </IconButton>
        <IconButton>
          <Twitter />
        </IconButton>
      </SocialIcons>
      <LegalInfo>
        <div className="legal">
          <Typography variant="body1" color="white">
            Copyright &copy; 2024 B-Able Q Teaching. All rights reserved
          </Typography>
        </div>
        <div className="copyright">
          <UpArrowLink to="#">
            <i className="bx bx-up-arrow-alt"></i>
          </UpArrowLink>
        </div>
      </LegalInfo>
    </FooterContainer>
  );
};

export default Footer;
