import React from "react";
import SectionHero from "../components/HeroSection";

// import CoursesPreview from "../components/CoursesPreview";
// import Testimonials from "../components/Testimonials";
import ContactForm from "../components/ContactForm";
// import FeaturesSection from "../components/FeatureSection";
import TeamSection from "../components/TeamSection";
import AssignmentLanding from "../components/AssignmentLanding";
import AboutPage from "./AboutPage";

const HomePage = () => {
  return (
    <div className="landing-page">
      <SectionHero />
      <AboutPage />

      <AssignmentLanding />
      <TeamSection />
      <ContactForm />
    </div>
  );
};

export default HomePage;
