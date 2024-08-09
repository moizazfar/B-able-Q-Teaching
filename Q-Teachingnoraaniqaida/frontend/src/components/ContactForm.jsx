import React, { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Snackbar,
  TextField,
  Typography,
  Alert,
  Grid,
  Container,
} from "@mui/material";
import { Person, Email, Phone, Subject, Message } from "@mui/icons-material";
import axios from "axios";
import image from "../Assets/image 1.png";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("https://fyp-back.up.railway.app/api/accounts/contact/", formData);
      setSnackbarMessage("Your message has been sent successfully! 😊");
      setSnackbarSeverity("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Error sending message:", error);
      setSnackbarMessage("Oops! Something went wrong. Please try again. 😞");
      setSnackbarSeverity("error");
    } finally {
      setLoading(false);
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Paper
        elevation={3}
        sx={{
          borderRadius: "30px",
          padding: 5,
          display: "flex",
          flexDirection: "column",
          gap: 6,
          height: "90%",
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            color: "#10183D",
          }}
        >
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Your Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <Person sx={{ color: "#10183D", marginRight: 1 }} />
              ),
            }}
          />
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Your Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <Email sx={{ color: "#10183D", marginRight: 1 }} />
              ),
            }}
          />
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Your Phone No"
            name="phone"
            type="number"
            value={formData.phone}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <Phone sx={{ color: "#10183D", marginRight: 1 }} />
              ),
            }}
          />
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Your Subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <Subject sx={{ color: "#10183D", marginRight: 1 }} />
              ),
            }}
          />
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Message..."
            multiline
            rows={6}
            name="message"
            value={formData.message}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <Message
                  sx={{
                    color: "#10183D",
                    alignSelf: "start",
                    marginTop: 2,
                    marginRight: 1,
                  }}
                />
              ),
            }}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              bgcolor: "#10183D",
              "&:hover": {
                bgcolor: "#040A27",
              },
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
            }}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress
                size={24}
                sx={{ color: "#DCBA84", marginRight: 1 }}
              />
            ) : (
              "Send Message"
            )}
          </Button>
        </Box>
      </Paper>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        position="top"
        // sx={{ position:"fixed",top:"30" }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

const Contact = () => {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 8,
        paddingBottom: 8,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          marginBottom: 4,
        }}
      >
        <Typography
          variant="h1"
          sx={{ fontFamily: "Kaushan Script", color: "#10183D" }}
        >
          Get in Touch
        </Typography>
        <Typography variant="h6" sx={{ color: "#DCBA84" }}>
          You are welcome to send us suggestions, comments, feedback and
          complaints by filling this form.
        </Typography>
      </Box>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <ContactForm />
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src={image}
            alt="Contact Image"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: 2,
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Contact;
