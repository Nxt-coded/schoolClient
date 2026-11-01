import React from "react";
import SchoolPageHeader from "./SchoolPageHeader";
import SchoolPageFooter from "./SchoolPageFooter";
import { Outlet } from "react-router-dom";

const SchoolPageLayout = () => {
  return (
    <div>
      <SchoolPageHeader />
      <div className={`h-[calc(93.7vh-90px)] pt-[100px] px-10`}>
        <Outlet />
      </div>
      <SchoolPageFooter />
    </div>
  );
};

export default SchoolPageLayout;
