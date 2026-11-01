import { Outlet } from "react-router-dom";
import { FC, useState } from "react";

import toast from "react-hot-toast";
import Header from "../static/Header";

const TeacherLayout: FC = () => {
  return (
    <div className="flex w-[100%] text-blue-950">
      <div className="w-[100%]">
        <div className="flex flex-col w-[100%] transition-all duration-300 md:w-[100%]">
          <Header />
          <div
            className={`min-h-[calc(100vh-72px)]  m-2 border rounded-md mt-16 relative `}
            onClick={() => {
              // dispatch(changeToggleToFalse());
            }}
          >
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherLayout;
