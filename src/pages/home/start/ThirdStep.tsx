import { useEffect, useState } from "react";
import { useSchoolCookie } from "../../hook/useSchoolAuth";
import Input from "../../../components/reUse/Input";
import Button from "../../../components/reUse/Button";

import LittleHeader from "../../../components/static/LittleHeader";
import { Link } from "react-router-dom";
import { getSchoolInfo } from "../../../global/reduxState";
import { useDispatch, useSelector } from "react-redux";

const ThirdScreen = () => {
  const [schoolLocation, setSchoolLocation] = useState<string>("");
  const dispatch = useDispatch();
  const getInfo = useSelector((state: any) => state.schoolInfo);
  return (
    <div className="flex text-blue-950 flex-col w-full h-screen items-center pt-20 ">
      <div className="w-full px-6 mb-10">
        <LittleHeader name="Step Two" />
      </div>

      <div className="mt-0" />
      <div className="mb-10 text-[18px] capitalize font-medium text-blue-950 p-4 ">
        Please enter school Infos
      </div>

      <div className="w-[90%] md:w-[600px]">
        <label className="text-[15px] ml-2 ">Enter School Location</label>
        <Input
          placeholder="Enter School Location"
          className="w-full"
          value={schoolLocation}
          onChange={(e: any) => {
            setSchoolLocation(e.target.value);
          }}
        />

        <div className="flex w-full justify-center mt-80">
          <Link to="/" className="flex w-full justify-center">
            <Button
              name="Previous"
              className="bg-red-600 w-[80%] py-4 mt-0"
              onClick={() => {}}
            />
          </Link>
          <Link to="/step-third-data" className="flex w-full justify-center">
            <Button
              name="Next"
              className="bg-blue-950 w-[80%] py-4 mt-0"
              onClick={() => {
                dispatch(
                  getSchoolInfo({
                    schoolName: getInfo.schoolName,
                    schoolLocation,
                  })
                );
              }}
            />
          </Link>
        </div>
      </div>

      <div className="flex-1" />
      <div className="w-full flex flex-col items-center">
        <div className="border-b w-[40%]  " />

        <div className="text-[13px] mt-2">This project is Built </div>
        <p className="font-medium text-[14px] mt-1">With you in Mind </p>
      </div>
    </div>
  );
};

export default ThirdScreen;
