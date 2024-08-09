import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import axios from "axios";
import logo from "../Assets/Logo/Logo.png";

const Header = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [userMenuEl, setUserMenuEl] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [studentDetails, setStudentDetails] = useState();

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const response = await axios.get(
          "https://fyp-back.up.railway.app/api/accounts/student-details/",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
        setStudentDetails(response.data);
      } catch (error) {
        console.error("Error fetching student details:", error);
      }
    };

    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      checkLoginStatus();
    } else {
      setIsLoggedIn(false);
      setUser(null);
    }
    fetchStudentDetails();
  }, [isLoggedIn]);

  const checkLoginStatus = async () => {
    try {
      const accessToken = localStorage.getItem("access_token");
      if (accessToken) {
        const response = await axios.get(
          "https://fyp-back.up.railway.app/api/accounts/user/",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setUser(response.data);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    } catch (error) {
      console.error("Error checking login status:", error);
      setIsLoggedIn(false);
      setUser(null);
    }
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleUserMenuClick = (event) => {
    setUserMenuEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuEl(null);
  };

  const handleLogout = async () => {
    try {
      const accessToken = localStorage.getItem("access_token");
      const refreshToken = localStorage.getItem("refresh_token");
      if (refreshToken) {
        await axios.post(
          "https://fyp-back.up.railway.app/api/accounts/logout/",
          { refresh: refreshToken },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        setIsLoggedIn(false);
        setUser(null);
        navigate("/login");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleDashboardRedirect = () => {
    if (user && user.is_student) {
      navigate("/student-dashboard");
    } else if (user && user.is_teacher) {
      navigate("/teacher-dashboard");
    }
    handleUserMenuClose();
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: "#10183D",
        padding: "0 16px",
      }}
    >
      <Toolbar>
        <Link to="/" style={{ display: "flex", alignItems: "center" }}>
          <img src={logo} alt="Logo" style={{ width: "80px" }} />
        </Link>

        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
            <Button
              component={Link}
              to="/"
              sx={{ color: "#C39346", fontSize: "1.2rem" }}
            >
              Home
            </Button>
            <Button
              component={Link}
              to="/ourlesson"
              sx={{ color: "#C39346", fontSize: "1.2rem" }}
            >
              Our Lesson
            </Button>
            {isLoggedIn && (
              <Button
                component={Link}
                to="/ourassignment"
                sx={{ color: "#C39346", fontSize: "1.2rem" }}
              >
                Our Assignment
              </Button>
            )}
            <Button
              component={Link}
              to="/aboutus"
              sx={{ color: "#C39346", fontSize: "1.2rem" }}
            >
              About Us
            </Button>
            <Button
              component={Link}
              to="/contactus"
              sx={{ color: "#C39346", fontSize: "1.2rem" }}
            >
              Contact Us
            </Button>
          </Box>

          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            sx={{ display: { xs: "flex", md: "none" }, color: "#C39346" }}
            onClick={handleMenuClick}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            sx={{ display: { xs: "block", md: "none" } }}
          >
            <MenuItem component={Link} to="/" onClick={handleMenuClose}>
              Home
            </MenuItem>
            <MenuItem
              component={Link}
              to="/ourlesson"
              onClick={handleMenuClose}
            >
              Our Lesson
            </MenuItem>
            {isLoggedIn && (
              <MenuItem
                component={Link}
                to="/ourassignment"
                onClick={handleMenuClose}
              >
                Our Assignment
              </MenuItem>
            )}
            <MenuItem component={Link} to="/aboutus" onClick={handleMenuClose}>
              About Us
            </MenuItem>
            <MenuItem
              component={Link}
              to="/contactus"
              onClick={handleMenuClose}
            >
              Contact Us
            </MenuItem>
          </Menu>
        </Box>

        {isLoggedIn ? (
          <>
            <IconButton onClick={handleUserMenuClick} sx={{ ml: 2 }}>
              <Avatar
                sx={{ bgcolor: "#C39346" }}
                alt={user?.username}
                src={studentDetails?.profile_picture || user?.username}
              />
            </IconButton>
            <Menu
              anchorEl={userMenuEl}
              open={Boolean(userMenuEl)}
              onClose={handleUserMenuClose}
            >
              <MenuItem onClick={handleDashboardRedirect}>Dashboard</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </>
        ) : (
          <Button
            component={Link}
            to="/login"
            variant="contained"
            sx={{ ml: 2, backgroundColor: "#C39346", color: "#10183D" }}
          >
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
