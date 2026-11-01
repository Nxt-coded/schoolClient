import { FC } from "react";
import MainHeader from "./MainHeader";
import HeroScreen from "./HeroScreen";
import SchoolHome from "./SchoolHome";

interface iProps {
  props?: any;
}

const SchoolPage: FC<iProps> = ({ props }) => {
  return (
    <div>
      <MainHeader props={props} />
      <HeroScreen />
      <SchoolHome />
      <div className="absolute bottom-0 w-full">{/* <Footer /> */}</div>
    </div>
  );
};

export default SchoolPage;
