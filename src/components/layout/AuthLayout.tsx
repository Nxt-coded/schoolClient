import { Outlet, useLocation } from "react-router-dom";

const AuthLayout = () => {
  const { pathname } = useLocation();

  return (
    <div
      className="text-blue-950 w-full h-screen flex flex-col justify-center 
    "
    >
      {/* <div className="mt-20" /> */}
      <div
        className={`
          ${pathname === "/auth" ? "mt-5" : "mt-32"} 
        flex `}
      >
        <Outlet />
      </div>

      {/* <div className="bg-red-50 h-full w-full flex justify-center">
        <Outlet />
      </div> */}

      <div className="flex-1" />

      <div className="flex justify-center items-center flex-col ">
        <div className="w-full pb-3 flex flex-col items-center">
          <div className="border-b w-[40%]  " />
        </div>

        <div className="text-[13px] mt-2">Built to support your school</div>
        <p className="font-medium text-[14px] mt-1">
          Innovating Education, Just for you!
        </p>
        <div className="mt-5" />
      </div>
    </div>
  );
};

export default AuthLayout;
