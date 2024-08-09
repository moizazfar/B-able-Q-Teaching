import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import Slider from "react-slick";
import pic1 from "../Assets/Screenshots/A1.png";
import pic2 from "../Assets/Screenshots/A2.png";
import pic3 from "../Assets/Screenshots/A3.jpeg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const AssignmentLanding = () => {
  const [images, setImages] = useState([pic1, pic2, pic3]);

  useEffect(() => {
    // Add more images or fetch from an API if needed
  }, []);
  
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
  };

  return (
    <Box
      sx={{
        // height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "white",
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
          width: "80%",
          height: "60%",
          margin: "auto",
        }}
      >
        <Slider {...settings}>
          {images.map((image, index) => (
            <Box key={index}>
              <img
                src={image}
                alt={`Assignment ${index + 1}`}
                style={{
                  width: "100%",
                  justifyContent: "center",
                  objectFit: "cover",
                }}
              />
            </Box>
          ))}
        </Slider>
      </Box>
    </Box>
  );
};

export default AssignmentLanding;
