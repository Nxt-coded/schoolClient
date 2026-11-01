import { useState } from "react";
import Input from "../../../components/reUse/Input";
import Button from "../../../components/reUse/Button";

import LittleHeader from "../../../components/static/LittleHeader";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getSchoolInfo } from "../../../global/reduxState";

const FirstScreen = () => {
  const dispatch = useDispatch();
  const [schoolName, setSchoolName] = useState<string>("");

  return (
    <div className="flex text-blue-950 flex-col w-full h-screen items-center pt-20 ">
      <div className="w-full px-6 mb-10">
        <LittleHeader name="Step One" />
      </div>

      <div className="mt-0" />
      <div className="mb-10 text-[18px] capitalize font-medium text-blue-950 p-4 ">
        Please enter school Infos
      </div>

      <div className="w-[90%] md:w-[600px]">
        <label className="text-[15px] ml-2 ">Enter School Name</label>
        <Input
          placeholder="Enter school Name"
          className="w-full"
          value={schoolName}
          onChange={(e: any) => {
            setSchoolName(e.target.value);
          }}
        />

        <div className="flex w-full justify-center mt-80">
          <Link to="/step-two-data" className="flex w-full justify-center">
            <Button
              name="Next"
              className="bg-blue-950 w-[80%] py-4 mt-0"
              onClick={() => {
                dispatch(getSchoolInfo({ schoolName }));
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

export default FirstScreen;
