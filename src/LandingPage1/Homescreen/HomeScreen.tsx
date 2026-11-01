import ABetter from "./ABetter";
import Everything from "./Everything";
import StartUsing from "./StartUsing";
import TrustedBy from "./TrustedBy";
import WorkWithUs from "./WorkWithUs";

// import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HeroScreen from "../Hero";
import UnlockScreen from "./UnlockScreen";
import PeopleScreen from "./PeopleScreen";

import { Helmet } from "react-helmet";

const LandingScreen = () => {
  return (
    <div>
      <Helmet>
        <title>Just Next - School Management System & Portal</title>
        <meta name="description" content="Just Next is Nigeria's leading school management platform. Streamline student records, report cards, fees, attendance, and administrative tasks effortlessly." />
        <link rel="canonical" href="https://justnext.ng/" />
      </Helmet>
      <ABetter />
      <TrustedBy />
      <div className="my-5" />
      <UnlockScreen />
      <div className="my-14" />
      <PeopleScreen />
      <div className="my-24" />
      <Everything />
      <StartUsing />
    </div>
  );
};

export default LandingScreen;
