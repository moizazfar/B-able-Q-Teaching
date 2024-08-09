import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Avatar,
  Typography,
  Button,
  CircularProgress,
  LinearProgress,
  Modal,
  TextField,
  Grid,
  IconButton,
} from "@mui/material";
import axios from "axios";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

const StudentDashboard = () => {
  const [studentDetails, setStudentDetails] = useState({
    user: "student",
    email: "",
    username: "",
    father_name: "",
    gender: "",
    age: "",
    profile_picture: "",
  });
  const [studentProgress, setStudentProgress] = useState([]);
  const [videoProgress, setVideoProgress] = useState([]);
  const [isProfileIncomplete, setIsProfileIncomplete] = useState(false);
  const [open, setOpen] = useState(false);
  const [profilePicFile, setProfilePicFile] = useState(null);

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
        checkProfileCompletion(response.data);
      } catch (error) {
        console.error("Error fetching student details:", error);
      }
    };

    const fetchStudentProgress = async () => {
      try {
        const response = await axios.get(
          "https://fyp-back.up.railway.app/api/accounts/student-progress/",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
        setStudentProgress(response.data);
      } catch (error) {
        console.error("Error fetching student progress:", error);
      }
    };

    const fetchVideoProgress = async () => {
      try {
        const response = await axios.get(
          "https://fyp-back.up.railway.app/api/accounts/video-progress/",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
        setVideoProgress(response.data);
      } catch (error) {
        console.error("Error fetching video progress:", error);
      }
    };

    fetchStudentDetails();
    fetchStudentProgress();
    fetchVideoProgress();
  }, []);

  const checkProfileCompletion = (details) => {
    if (!details.father_name || !details.gender || !details.age) {
      setIsProfileIncomplete(true);
    } else {
      setIsProfileIncomplete(false);
    }
  };

  const handleProfileFormChange = (e) => {
    setStudentDetails({
      ...studentDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleProfilePicChange = (e) => {
    setProfilePicFile(e.target.files[0]);
  };

  const handleProfileFormSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("email", studentDetails.email);
      formData.append("username", studentDetails.username);
      formData.append("father_name", studentDetails.father_name);
      formData.append("gender", studentDetails.gender);
      formData.append("age", studentDetails.age);
      if (profilePicFile) {
        formData.append("profile_picture", profilePicFile);
      }

      await axios.put(
        "https://fyp-back.up.railway.app/api/accounts/student-details/update_profile/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setOpen(false);
      setStudentDetails({ ...studentDetails, ...studentDetails });
      setIsProfileIncomplete(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const calculateAssignmentProgress = (assignmentType) => {
    const assignmentProgress = studentProgress.filter(
      (progress) => progress.assignment_type === assignmentType
    );

    const totalAlphabets = {
      Mufradat: 31,
      Murakkabat: 127,
      Murqattaat: 14,
    }[assignmentType];

    const marksPerAlphabet = 10;

    let totalMarksObtained = 0;
    assignmentProgress.forEach((progress) => {
      totalMarksObtained += progress.marks_obtained;
    });

    const totalMarksPossible = totalAlphabets * marksPerAlphabet;

    const progressPercentage =
      totalMarksPossible > 0
        ? Math.round((totalMarksObtained / totalMarksPossible) * 100)
        : 0;

    return progressPercentage;
  };

  const calculateVideoProgress = (assignmentType) => {
    const assignmentVideos = videoProgress.filter(
      (video) => video.assignment_type === assignmentType
    );
    const totalVideos = {
      Mufradat: 31,
      Murakkabat: 127,
      Murqattaat: 14,
    }[assignmentType];

    let completedVideos = 0;
    assignmentVideos.forEach((video) => {
      if (video.completed) {
        completedVideos++;
      }
    });

    return totalVideos > 0
      ? Math.round((completedVideos / totalVideos) * 100)
      : 0;
  };

  const COLORS = ["#0088FE", "#FFBB28"];

  return (
    <Box sx={{ padding: 4 }}>
      {studentDetails && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            p: 2,
          }}
        >
          <Card
            sx={{
              display: "flex",
              width: "90%",
              borderRadius: 2,
              bgcolor: "#FFEFD6",
            }}
          >
            <Box
              sx={{
                borderRadius: "35px",
                width: "25%",
                bgcolor: "#10183D",
                color: "white",
                p: 2,
                textAlign: "center",
              }}
            >
              {isProfileIncomplete ? (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <Typography variant="h6">
                    Complete your profile to continue
                  </Typography>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => setOpen(true)}
                  >
                    Complete Profile
                  </Button>
                </Box>
              ) : (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <Avatar
                    src={
                      studentDetails.profile_picture ||
                      "https://via.placeholder.com/150"
                    }
                    sx={{ width: 150, height: 150, mx: "auto" }}
                  />
                  <Typography variant="h6">Student Profile</Typography>
                  <Typography variant="body1">
                    <strong>Student Name:</strong> {studentDetails.username}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Father Name:</strong> {studentDetails.father_name}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Gender:</strong> {studentDetails.gender}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Age:</strong> {studentDetails.age}
                  </Typography>

                  <Typography variant="body1">
                    <strong>Email:</strong> {studentDetails.email}
                  </Typography>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => setOpen(true)}
                  >
                    Update Profile
                  </Button>
                </Box>
              )}
            </Box>
            <Box sx={{ width: "75%", p: 3 }}>
              <Typography variant="h4" gutterBottom align="center">
                Student Performance Dashboard
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "12px",
                  mb: 4,
                  bgcolor: "lightgray",
                  borderRadius: "16px",
                }}
              >
                <Card
                  sx={{
                    flex: 1,
                    mx: 1,
                    borderRadius: "45px",
                    bgcolor: "#DCBA84",
                    borderColor: "#10183D",
                    border: "solid",
                  }}
                >
                  <CardContent
                    sx={{
                      textAlign: "center",
                    }}
                  >
                    <Typography variant="h6">Lesson 1</Typography>
                    <Typography variant="h6">Huroof Mufradat</Typography>
                    <CircularProgress
                      variant="determinate"
                      value={calculateVideoProgress("Mufradat")}
                      size={80}
                      thickness={4}
                      sx={{ mt: 2, color: "#10183D" }}
                    />
                    <Typography variant="h6" sx={{ mt: 1 }}>
                      {calculateVideoProgress("Mufradat")}% Completed
                    </Typography>
                  </CardContent>
                </Card>
                <Card
                  sx={{
                    flex: 1,
                    mx: 1,
                    borderRadius: "45px",
                    bgcolor: "#E5C99B",
                    borderColor: "#10183D",
                    border: "solid",
                  }}
                >
                  <CardContent
                    sx={{
                      textAlign: "center",
                    }}
                  >
                    <Typography variant="h6">Lesson 2</Typography>
                    <Typography variant="h6">Huroof Murakkabat</Typography>
                    <CircularProgress
                      variant="determinate"
                      value={calculateVideoProgress("Murakkabat")}
                      size={80}
                      thickness={4}
                      sx={{ mt: 2, color: "#10183D" }}
                    />
                    <Typography variant="h6" sx={{ mt: 1 }}>
                      {calculateVideoProgress("Murakkabat")}% Completed
                    </Typography>
                  </CardContent>
                </Card>
                <Card
                  sx={{
                    flex: 1,
                    mx: 1,
                    borderRadius: "45px",
                    bgcolor: "#F7D8A8",
                    borderColor: "#10183D",
                    border: "solid",
                  }}
                >
                  <CardContent
                    sx={{
                      textAlign: "center",
                    }}
                  >
                    <Typography variant="h6">Lesson 3</Typography>
                    <Typography variant="h6">Huroof Murqattaat</Typography>
                    <CircularProgress
                      variant="determinate"
                      value={calculateVideoProgress("Murqattaat")}
                      size={80}
                      thickness={4}
                      sx={{ mt: 2, color: "#10183D" }}
                    />
                    <Typography variant="h6" sx={{ mt: 1 }}>
                      {calculateVideoProgress("Murqattaat")}% Completed
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  mt: 4,
                }}
              >
                <Card sx={{ borderRadius: "35px", bgcolor: "#FEFCFB" }}>
                  <CardContent>
                    <Typography
                      variant="h5"
                      sx={{ textAlign: "center", mb: 2 }}
                    >
                      Assignment Progress
                    </Typography>
                    <Box
                      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                    >
                      <Box>
                        <Typography variant="body1">
                          Huroof Mufradat Progress:{" "}
                          {calculateAssignmentProgress("Mufradat")}%
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={calculateAssignmentProgress("Mufradat")}
                          sx={{
                            height: "15px",
                            borderRadius: "5px",
                            bgcolor: "#D3D3D3",
                          }}
                        />
                      </Box>
                      <Box>
                        <Typography variant="body1">
                          Huroof Murakkabat Progress:{" "}
                          {calculateAssignmentProgress("Murakkabat")}%
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={calculateAssignmentProgress("Murakkabat")}
                          sx={{
                            height: "15px",
                            borderRadius: "5px",
                            bgcolor: "#D3D3D3",
                          }}
                        />
                      </Box>
                      <Box>
                        <Typography variant="body1">
                          Huroof Murqattaat Progress:{" "}
                          {calculateAssignmentProgress("Murqattaat")}%
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={calculateAssignmentProgress("Murqattaat")}
                          sx={{
                            height: "15px",
                            borderRadius: "5px",
                            bgcolor: "#D3D3D3",
                          }}
                        />
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            </Box>
          </Card>
        </Box>
      )}

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            borderRadius: "25px",
          }}
        >
          <Typography variant="h6" component="h2">
            Complete Your Profile
          </Typography>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12}>
              <TextField
                label="Email"
                fullWidth
                name="email"
                value={studentDetails.email}
                onChange={handleProfileFormChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Username"
                fullWidth
                name="username"
                value={studentDetails.username}
                onChange={handleProfileFormChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Father Name"
                fullWidth
                name="father_name"
                value={studentDetails.father_name}
                onChange={handleProfileFormChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Gender"
                fullWidth
                name="gender"
                value={studentDetails.gender}
                onChange={handleProfileFormChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Age"
                fullWidth
                name="age"
                value={studentDetails.age}
                onChange={handleProfileFormChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Grid item xs={12} display="flex" justifyContent="center">
                <Typography sx={{ textAlign: "center", mt: 3 }}>
                  Upload Your Profile Pic
                </Typography>
                <Avatar
                  alt="Profile Picture"
                  src={studentDetails.profile_picture}
                  sx={{ width: 100, height: 100, mb: 2 }}
                />
                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="profile-pic-upload"
                  type="file"
                  onChange={handleProfilePicChange}
                />
                <label htmlFor="profile-pic-upload">
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                  >
                    <PhotoCamera />
                  </IconButton>
                </label>
              </Grid>
            </Grid>
          </Grid>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
            onClick={handleProfileFormSubmit}
          >
            Save Profile
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default StudentDashboard;
