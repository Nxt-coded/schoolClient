import { useState } from "react";
import IG from "../../assets/ig.png";
import FB from "../../assets/fb.png";
import Linkden from "../../assets/linkden.png";
import X from "../../assets/twitter.png";
import { CgClose } from "react-icons/cg";
import Input from "../../components/reUse/Input";
import Button from "../../components/reUse/Button";
import toast, { Toaster } from "react-hot-toast";
import { useStudentInfo } from "../hooks/useStudentHook";
import {
  updateLinkedin,
  updateStudentFacebook,
  updateStudentInstagram,
  updateXAccount,
} from "../api/studentAPI";

const StudentSocialSettings = () => {
  const [toggle, setToggle] = useState<string | null>(null);
  const [facebook, setFacebook] = useState<string>("");
  const [instagram, setInstagram] = useState<string>("");
  const [x, setX] = useState<string>("");
  const [linkedin, setLinkedin] = useState<string>("");

  const { studentInfo } = useStudentInfo();
  const schoolID = studentInfo?.schoolIDs;
  const studentID = studentInfo?._id;

  const StudentFacebook = () => {
    try {
      updateStudentFacebook(schoolID, studentID, facebook).then((res) => {
        toast.success("Facebook Updated Successfully");
        return res?.data;
      });
    } catch (error) {
      toast.error("Error Updating Facebook Account");
      console.error();
      return error;
    }
  };

  const studentInstagram = () => {
    try {
      updateStudentInstagram(schoolID, studentID, instagram).then((res) => {
        toast.success("Instagram Updated Successsfully");
        return res?.data;
      });
    } catch (error) {
      console.error();
      return error;
    }
  };

  const updateLinkedinAcct = () => {
    try {
      updateLinkedin(schoolID, studentID, linkedin).then((res) => {
        toast.success("Linkedin Account Updated");
        return res?.data;
      });
    } catch (error) {
      toast.error("Error Updating Linkedin");
      console.error();
      return error;
    }
  };

  const studentXAccount = () => {
    try {
      updateXAccount(schoolID, studentID, x).then((res) => {
        toast.success("X Updated Successsfully");
        return res?.data;
      });
    } catch (error) {
      toast.error("Error Updating X");
      console.error();
      return error;
    }
  };
  return (
    <div>
      <div>
        {" "}
        <div className="relative">
          <Toaster />
          <div className="border rounded-[4px] shadow-sm">
            <div className="py-3 px-4 uppercase text-blue-950 text-[16px] font-semibold md:text-[18px]">
              Socials
            </div>
            <div className="border-b py-6 px-4 flex justify-between items-center hover:bg-gray-50">
              <div className="min-w-[80%] lg:min-w-[30%] flex justify-start items-center">
                <h3 className="font-normal w-[120px] flex items-center gap-2 text-[14px] md:text-[18px]">
                  <img
                    src={FB}
                    alt=""
                    className="w-[12px] h-[12px] md:w-[20px] md:h-[20px] object-contain"
                  />
                  facebook
                </h3>
                {studentInfo?.facebookAccount ? (
                  <h1 className="text-[14px] md:text-[18px] font-[700] text-blue-500">
                    {studentInfo?.facebookAccount}
                  </h1>
                ) : (
                  <h1 className="text-[14px] md:text-[18px] text-blue-500">
                    + add your facebook handle
                  </h1>
                )}
              </div>
              <div
                className="md:py-1 md:px-3 px-4 py-[2px] border border-blue-950 rounded-md text-[14px] md:text-[18px] font-medium cursor-pointer transition-all duration-300 hover:scale-105 ml-[3px]"
                onClick={() => {
                  setToggle("facebook");
                }}
              >
                Edit
              </div>
            </div>
            <div className="border-b py-6 px-4 flex justify-between items-center hover:bg-gray-50">
              <div className="min-w-[80%] lg:min-w-[30%] flex justify-start items-center">
                <h3 className="font-normal w-[120px] flex items-center gap-2 text-[14px] md:text-[18px]">
                  <img
                    src={IG}
                    alt=""
                    className="w-[12px] h-[12px] md:w-[20px] md:h-[20px] object-contain"
                  />
                  instagram
                </h3>
                {studentInfo?.instagramAccount ? (
                  <h1 className="text-[14px] md:text-[18px] font-[700] text-blue-500 md:ml-[5px]">
                    {studentInfo?.instagramAccount}
                  </h1>
                ) : (
                  <h1 className="text-[14px] md:text-[18px] text-blue-500 md:ml-[5px]">
                    + add your instagram handle
                  </h1>
                )}
              </div>
              <div
                className="md:py-1 md:px-3 px-4 py-[2px] border border-blue-950 rounded-md text-[14px] md:text-[18px] font-medium cursor-pointer transition-all duration-300 hover:scale-105 ml-[3px]"
                onClick={() => {
                  setToggle("instagram");
                }}
              >
                Edit
              </div>
            </div>
            <div className="border-b py-6 px-4 flex justify-between items-center hover:bg-gray-50">
              <div className="min-w-[80%] lg:min-w-[30%] flex justify-start items-center">
                <h3 className="font-normal w-[120px] flex items-center gap-2 text-[14px] md:text-[18px]">
                  <img
                    src={X}
                    alt=""
                    className="w-[12px] h-[12px] md:w-[20px] md:h-[20px] object-contain"
                  />
                  X
                </h3>
                {studentInfo?.xAccount ? (
                  <h1 className="text-[14px] md:text-[18px] font-[700] text-blue-500">
                    {studentInfo?.xAccount}
                  </h1>
                ) : (
                  <h1 className="text-[14px] md:text-[18px] text-blue-500">
                    + add your X handle
                  </h1>
                )}
              </div>
              <div
                className="md:py-1 md:px-3 px-4 py-[2px] border border-blue-950 rounded-md text-[14px] md:text-[18px] font-medium cursor-pointer transition-all duration-300 hover:scale-105 ml-[3px]"
                onClick={() => {
                  setToggle("x");
                }}
              >
                Edit
              </div>
            </div>
            <div className="border-b py-6 px-4 flex justify-between items-center hover:bg-gray-50">
              <div className="min-w-[80%] lg:min-w-[30%] flex justify-start items-center">
                <h3 className="font-normal w-[120px] flex items-center gap-2 text-[14px] md:text-[18px]">
                  <img
                    src={Linkden}
                    alt=""
                    className="w-[12px] h-[12px] md:w-[20px] md:h-[20px] object-contain"
                  />
                  linkedIn
                </h3>
                {studentInfo?.linkedinAccount ? (
                  <h1 className="text-[14px] md:text-[18px] font-[700] text-blue-500">
                    {studentInfo?.linkedinAccount}
                  </h1>
                ) : (
                  <h1 className="text-[14px] md:text-[18px] text-blue-500">
                    + add your linkedIn handle
                  </h1>
                )}
              </div>
              <div
                className="md:py-1 md:px-3 px-4 py-[2px] border border-blue-950 rounded-md text-[14px] md:text-[18px] font-medium cursor-pointer transition-all duration-300 hover:scale-105 ml-[3px]"
                onClick={() => {
                  setToggle("linkedin");
                }}
              >
                Edit
              </div>
            </div>
          </div>
          {toggle && (
            <div className="absolute w-full h-full backdrop-blur-sm top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center">
              <div className="freshh md:w-[350px] shadow-md bg-white rounded-md p-4 text-[11px] md:text-[16px] w-[280px] min-h-[200px]">
                <div className="mb-4 flex items- center justify-between">
                  <h2 className="text-blue-950 font-semibold">
                    {toggle === "facebook" && "Enter Your Facebook Handle"}
                    {toggle === "linkedin" && "Enter Your Linkedln Handle"}
                    {toggle === "x" && "Enter Your X Handle"}
                    {toggle === "instagram" && "Enter Your Instagram Handle"}
                  </h2>
                  <CgClose
                    className="text-blue-950 text-[20px] font-bold cursor-pointer hover:scale-110 ml-[50px]"
                    onClick={() => {
                      setToggle(null);
                    }}
                  />
                </div>
                <div className="mt-[50px]">
                  {toggle === "facebook" && (
                    <Input
                      placeholder="Enter Your Facebook Handle"
                      value={facebook}
                      className="w-[230px] md:w-[300px]"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setFacebook(e.target.value);
                      }}
                    />
                  )}
                </div>

                <div className="mt-[50px]">
                  {toggle === "instagram" && (
                    <Input
                      placeholder="Enter Your Facebook Handle"
                      value={instagram}
                      className="w-[230px] md:w-[300px]"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setInstagram(e.target.value);
                      }}
                    />
                  )}
                </div>
                <div className="mt-[50px]">
                  {toggle === "x" && (
                    <Input
                      placeholder="Enter Your Facebook Handle"
                      value={x}
                      className="w-[230px] md:w-[300px]"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setX(e.target.value);
                      }}
                    />
                  )}
                </div>
                <div className="mt-[50px]">
                  {toggle === "linkedin" && (
                    <Input
                      placeholder="Enter Your Facebook Handle"
                      value={linkedin}
                      className="w-[230px] md:w-[300px]"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setLinkedin(e.target.value);
                      }}
                    />
                  )}
                </div>

                {toggle === "facebook" && (
                  <Button
                    name="Update"
                    className="bg-blue-950 hover:scale-105 transition-all duration-300"
                    onClick={() => {
                      StudentFacebook();
                      setToggle(null);
                    }}
                  />
                )}
                {toggle === "instagram" && (
                  <Button
                    name="Update"
                    className="bg-blue-950 hover:scale-105 transition-all duration-300"
                    onClick={() => {
                      studentInstagram();
                      setToggle(null);
                    }}
                  />
                )}
                {toggle === "x" && (
                  <Button
                    name="Update"
                    className="bg-blue-950 hover:scale-105 transition-all duration-300"
                    onClick={() => {
                      studentXAccount();
                      setToggle(null);
                    }}
                  />
                )}
                {toggle === "linkedin" && (
                  <Button
                    name="Update"
                    className="bg-blue-950 hover:scale-105 transition-all duration-300"
                    onClick={() => {
                      updateLinkedinAcct();
                      setToggle(null);
                    }}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentSocialSettings;
