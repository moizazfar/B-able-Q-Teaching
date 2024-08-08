import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Typography,
  Link,
  CircularProgress,
  Snackbar,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import MuiAlert from "@mui/material/Alert";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import loginImage from "../Assets/BackgroundLOGIN.png";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "100%",
    backgroundColor: "#f9f9f9",
  },
  loginImage: {
    width: "100%",
    height: "100vh",
    background: `url(${loginImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  loginFormContainer: {
    width: "100%",
    height: "auto",
    display: "flex",
    justifyContent: "flex-end",
  },
  loginForm: {
    backgroundColor: "white",
    padding: "40px",
    width: "300px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    position: "relative",
  },
  formGroup: {
    marginBottom: "20px",
  },
  loginButton: {
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
  loadingSpinner: {
    color: "#007bff",
  },
  successMessage: {
    color: "green",
  },
}));

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const LoginPage = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value.trim(),
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { username, password } = formData;

    if (!username || !password) {
      setError("Username and Password are required.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:8000/api/accounts/token/",
        {
          username,
          password,
          is_student: true, // Directly logging in as a student
        }
      );

      console.log("Login successful:", response.data);

      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);

      setSuccessMessage("Successfully logged in!");
      setOpenSnackbar(true);

      navigate("/student-dashboard");
    } catch (err) {
      setError("Failed to sign in. Check username and password.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container className={classes.root}>
      <div className={classes.loginImage}>
        <div className={classes.loginFormContainer}>
          <div className={classes.loginForm}>
            <Typography variant="h5" component="h2" gutterBottom>
              Login Now
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Please login to continue using our app
            </Typography>
            <form onSubmit={handleLogin}>
              <div className={classes.formGroup}>
                <TextField
                  fullWidth
                  id="username"
                  label="Enter username"
                  variant="outlined"
                  margin="normal"
                  name="username"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className={classes.formGroup}>
                <TextField
                  fullWidth
                  id="password"
                  label="Enter Password"
                  variant="outlined"
                  type={showPassword ? "text" : "password"}
                  margin="normal"
                  name="password"
                  required
                  onChange={handleChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={togglePasswordVisibility}
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
                className={classes.loginButton}
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress
                    size={24}
                    className={classes.loadingSpinner}
                  />
                ) : (
                  "Login"
                )}
              </Button>
            </form>
            {error && (
              <Typography className={classes.errorText}>{error}</Typography>
            )}
            <Typography variant="body2" color="textSecondary">
              Don't have an account? <Link href="/register">Sign Up</Link>
            </Typography>
            <Snackbar
              open={openSnackbar}
              autoHideDuration={6000}
              onClose={handleCloseSnackbar}
            >
              <Alert onClose={handleCloseSnackbar} severity="success">
                {successMessage}
              </Alert>
            </Snackbar>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default LoginPage;
