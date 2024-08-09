import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Typography,
  Link,
  CircularProgress,
  Snackbar,
  Alert,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import loginImage from "../Assets/BackgroundLOGIN.png";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: `url(${loginImage}) no-repeat center center fixed`,
    backgroundSize: "cover",
  },
  signUpContainer: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
    padding: "20px",
    boxSizing: "border-box",
  },
  signUpForm: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    padding: "40px",
    maxWidth: "400px",
    boxSizing: "border-box",
  },
  formGroup: {
    marginBottom: "20px",
    width: "100%",
  },
  signUpButton: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#0056b3",
    },
  },
  errorText: {
    color: "red",
    marginTop: "10px",
  },
  successText: {
    color: "green",
    marginTop: "10px",
  },
  loadingSpinner: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "20px",
  },
}));

const SignUpPage = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const { username, email, password } = formData;

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "https://fyp-back.up.railway.app/api/accounts/register/",
        {
          username,
          email,
          password,
          is_student: true,
        },
        { headers: { "Content-Type": "application/json" } }
      );
      setLoading(false);
      setSuccess(true);
      console.log(response.data);
      navigate("/login");
    } catch (err) {
      setLoading(false);
      if (
        err.response &&
        (err.response.status === 400 || err.response.status === 409)
      ) {
        setError(
          "User already registered. Please use a different email or username."
        );
      } else {
        setError(
          err.response
            ? err.response.data.error
            : "Failed to register due to server error"
        );
      }
      console.error("Registration error:", err);
    }
  };

  return (
    <Container className={classes.root}>
      <div className={classes.signUpContainer}>
        <div className={classes.signUpForm}>
          <Typography variant="h5" component="h2" gutterBottom>
            Sign Up Now
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Please fill the details and create an account
          </Typography>
          <form onSubmit={handleSignUp}>
            <div className={classes.formGroup}>
              <TextField
                fullWidth
                id="username"
                label="Username"
                variant="outlined"
                margin="normal"
                required
                name="username"
                onChange={handleChange}
              />
            </div>
            <div className={classes.formGroup}>
              <TextField
                fullWidth
                id="email"
                label="Email"
                variant="outlined"
                margin="normal"
                required
                name="email"
                onChange={handleChange}
              />
            </div>
            <div className={classes.formGroup}>
              <TextField
                fullWidth
                id="password"
                label="Password"
                variant="outlined"
                type={showPassword ? "text" : "password"}
                margin="normal"
                required
                name="password"
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <Button
              type="submit"
              variant="contained"
              className={classes.signUpButton}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Sign Up"}
            </Button>
          </form>
          {error && (
            <Typography className={classes.errorText}>{error}</Typography>
          )}
          {success && (
            <Snackbar
              open={success}
              autoHideDuration={6000}
              onClose={() => setSuccess(false)}
            >
              <Alert
                onClose={() => setSuccess(false)}
                severity="success"
                sx={{ width: "100%" }}
              >
                Successfully Registered!
              </Alert>
            </Snackbar>
          )}
          <Typography variant="body2" color="textSecondary">
            Have an account? <Link href="/login">Login</Link>
          </Typography>
        </div>
      </div>
    </Container>
  );
};

export default SignUpPage;
