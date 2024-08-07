import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Assignment from "./pages/Assignment";
import OurLesson from "./pages/OurLesson";
import HuroofMufradat from "./pages/HuroofMufradat";
import HuroofMurakkabat from "./pages/HuroofMurakkabat";
import HuroofMaraqatat from "./pages/HuroofMaraqatat";
import StudentDashboard from "./pages/Dashboard/StudentDashboard";
import LoginForm from "./pages/DemoLogin";
import SignupForm from "./pages/DemoSignup";
import TeacherDashboard from "./pages/Dashboard/TeacherDashboard";
import PrivateRoute from "./PrivateRoutes";

const AppRoutes = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/ourlesson"
          element={<PrivateRoute component={OurLesson} />}
        />
        <Route path="/ourlesson/huroofmufradat" element={<HuroofMufradat />} />
        <Route
          path="/ourlesson/huroofmurakkabat"
          element={<HuroofMurakkabat />}
        />
        <Route
          path="/ourlesson/huroofmuraqattat"
          element={<HuroofMaraqatat />}
        />
        <Route path="/ourassignment" element={<Assignment />} />
        <Route path="/contactus" element={<ContactPage />} />
        <Route path="/aboutus" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignupPage />} />
        <Route
          path="/student-dashboard"
          element={<PrivateRoute component={StudentDashboard} />}
        />
        <Route
          path="/teacher-dashboard"
          element={<PrivateRoute component={TeacherDashboard} />}
        />
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
};

export default AppRoutes;
