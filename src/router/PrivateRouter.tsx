import { FC, PropsWithChildren, useEffect, useState } from "react";
import {
  getSchoolCookie,
  openServerAPI,
  readSchool,
} from "../pages/api/schoolAPIs";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRouter: FC<PropsWithChildren> = ({ children }) => {
  const stateToken = useSelector((state: any) => state.user);

  useEffect(() => {
    openServerAPI();
  }, []);
  return <div>{stateToken ? <div>{children}</div> : <Navigate to="/" />}</div>;
};

export default PrivateRouter;
