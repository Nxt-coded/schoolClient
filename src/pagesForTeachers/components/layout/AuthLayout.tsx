import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="text-blue-950 w-full h-[100%] flex flex-col ">
      <Outlet />

      <div className="flex-1" />
      <div className="w-full flex flex-col items-center">
        <div className="border-b w-[40%]  " />

        <div className="text-[13px] mt-2">This project is Built </div>
        <p className="font-medium text-[14px] mt-1">With you in Mind </p>
      </div>
    </div>
  );
};

export default AuthLayout;
