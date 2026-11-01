import { useEffect, useState } from "react";
import LittleHeader from "../../../components/static/LittleHeader";
import { useSchoolCookie, useSchoolData } from "../../hook/useSchoolAuth";
import Button from "../../../components/reUse/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  categoryState,
  changeCategoryState,
  getSchoolInfo,
  pickedCategory,
} from "../../../global/reduxState";
import { Link, useNavigate } from "react-router-dom";
import {
  changeSchoolLocation,
  changeSchoolName,
  changeSchoolStarted,
  changeSchoolTags,
} from "../../api/schoolAPIs";

const SecondStep = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dataInfo = useSelector((state: any) => state.categoryData);

  const schoolInfo = useSelector((state: any) => state.schoolInfo);

  const { data } = useSchoolData();

  let readValue = dataInfo?.filter((el: any) => el.state === true);

  return (
    <div className="flex text-blue-950 flex-col w-full h-screen items-center pt-20 ">
      <div className="w-full px-6 mb-10">
        <LittleHeader name="Step Three" />
      </div>

      <div className="mt-0" />
      <div className="mb-10 text-[18px] capitalize font-medium text-blue-950 p-4 ">
        Please enter school Categories
      </div>

      <div className="w-[90%] md:w-[600px]">
        <label className="text-[15px] ml-2 "></label>

        <div className="flex justify-center w-full flex-wrap ">
          {dataInfo?.map((props: any) => (
            <div
              className={`border text-[12px] text-center font-medium px-10 py-5 rounded-full m-2 cursor-pointer  ${
                props.state && "bg-blue-950 text-white"
              } `}
              onClick={() => {
                dispatch(changeCategoryState(props));
              }}
            >
              {props.val}
            </div>
          ))}
        </div>

        <div className="flex w-full justify-center mt-40">
          <Link to="/step-two-data" className="flex w-full justify-center">
            <Button
              name="Previous"
              className="bg-red-600 w-[80%] py-4 "
              onClick={() => {}}
            />
          </Link>

          <div
            // to="/"
            className="flex w-full justify-center"
          >
            <Button
              name="Submit"
              className="bg-blue-950 w-[80%] py-4 "
              onClick={() => {
                changeSchoolName(data?._id, {
                  schoolName: schoolInfo.schoolName,
                }).then(() => {
                  changeSchoolTags(data?._id, { schoolTags: readValue });
                  changeSchoolLocation(data?._id, {
                    address: schoolInfo.schoolLocation,
                  }).then(() => {
                    changeSchoolStarted(data?._id).then(() => {
                      const x = setTimeout(() => {
                        window.location.reload();
                        clearTimeout(x);
                      }, 200);
                      navigate("/dashboard");
                    });
                  });
                });

                dispatch(getSchoolInfo({}));
                dispatch(pickedCategory(null));
              }}
            />
          </div>
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

export default SecondStep;
