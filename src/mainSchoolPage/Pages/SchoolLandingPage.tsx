import React from "react";
import HomeScreen from "./HomeScreen";
import WelcomePage, { capitalizeWords } from "./WelcomePage";
import Gallery from "./Gallery";
import Teachers from "./Teachers";
import Footer from "./Footer";
import Header from "../Block/Header";
import SchoolPageHeader from "../../schoolPage/layout/SchoolPageHeader";
import ImportanceScreen from "./ImportanceScreen";
import SchoolHero from "./SchoolHero";
import { useParams } from "react-router-dom";
import { useSchoolDataByName } from "@/pages/hook/useSchoolAuth";
import TestimoniaSlider from "./TestimoniaSlider";

const SchoolLandingPage = () => {
  const { schoolName } = useParams();
  const { schoolInfo } = useSchoolDataByName(capitalizeWords(schoolName));
  return (
    <div>
      <SchoolPageHeader />
      <SchoolHero schoolName={schoolName} schoolInfo={schoolInfo} />
      {/* <HomeScreen /> */}
      <WelcomePage />
      <Gallery />
      <Teachers />
      <ImportanceScreen />
      <TestimoniaSlider />
      {/* <Footer /> */}
    </div>
  );
};

export default SchoolLandingPage;
