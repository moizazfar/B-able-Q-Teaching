import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Avatar,
} from "@mui/material";
import { styled } from "@mui/system";
import PersonIcon from "@mui/icons-material/Person"; 
import zawarImage from "../Assets/profilepic/zawar.jpeg"; 
import moizImage from "../Assets/profilepic/moiz.jpeg"; 
import areebaImage from "../Assets/profilepic/areeba.jpeg"; 
import alinaImage from "../Assets/profilepic/alina.jpeg";

const teamMembers = [
  {
    name: "Muhammad Zawar",
    role: "Backend Developer",
    roleNo: "2020F-BSE-081",
    image: zawarImage,
  },
  {
    name: "Moiz Azfar",
    role: "Frontend/Backend Developer",
    roleNo: "2020F-BSE-054",
    image: moizImage,
  },
  {
    name: "Areeba Naseer",
    role: "Frontend Developer",
    roleNo: "2020F-BSE-284",
    image: areebaImage, 
  },
  {
    name: "Alina Hussain",
    role: "Frontend Developer",
    roleNo: "2020F-BSE-298",
    image: alinaImage,
  },
];

const TeamContainer = styled(Box)({
  padding: "30px 10px",
  backgroundColor: "#10183D",
});

const TeamCard = styled(Card)({
  maxWidth: 250,
  margin: "20px",
});

const TeamSection = () => {
  return (
    <TeamContainer>
      <Typography color="white" variant="h4" align="center" gutterBottom>
        Our Team
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {teamMembers.map((member, index) => (
          <Grid item key={index}>
            <TeamCard>
              {member.image ? (
                <CardMedia
                  component="img"
                  alt={member.name}
                  height="300"
                  width="450"
                  image={member.image}
                />
              ) : (
                <Avatar>
                  <PersonIcon />
                </Avatar>
              )}
              <CardContent>
                <Typography variant="h6" component="div">
                  {member.name}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {member.role}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {member.roleNo}
                </Typography>
              </CardContent>
            </TeamCard>
          </Grid>
        ))}
      </Grid>
    </TeamContainer>
  );
};

export default TeamSection;
