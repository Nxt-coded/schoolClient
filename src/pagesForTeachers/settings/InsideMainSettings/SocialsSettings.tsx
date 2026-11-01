import { useState } from "react";
import IG from "../../../assets/socials/Ig.png";
import FB from "../../../assets/socials/fb.png";
import Linkden from "../../../assets/socials/linkden.png";
import X from "../../../assets/socials/x-social-media-round-icon.svg";
import { useTeacherInfo } from "../../hooks/useTeacher";
import { CgClose } from "react-icons/cg";
import Input from "../../components/reUse/Input";
import Button from "../../components/reUse/Button";
import {
  updateStaffFacebook,
  updateStaffInstagramAcct,
  updateStaffLinkinAcct,
  updateStaffXAcct,
} from "../../api/teachersAPI";
import toast, { Toaster } from "react-hot-toast";

const SocialsSettings = () => {
  const [toggle, setToggle] = useState<string | null>(null);
  const [facebook, setFacebook] = useState<string>("");
  const [x, setX] = useState<string>("");
  const [instagram, setInstagram] = useState<string>("");
  const [linkedin, setLinkedin] = useState<string>("");

  const { teacherInfo } = useTeacherInfo();
  // console.log("This is Teacher Info", teacherInfo);
  const schoolID = teacherInfo?.schoolIDs;
  const staffID = teacherInfo?._id;

  const changeStaffFacebookAcct = () => {
    try {
      updateStaffFacebook(schoolID, staffID, facebook).then((res) => {
        toast.success("Staff Facebook Handle Updated");
        return res?.data;
      });
    } catch (error) {
      toast.error("Error updating Staff Facebook Handle");
      console.error();
      return error;
    }
  };

  const changeStaffXAcct = () => {
    try {
      updateStaffXAcct(schoolID, staffID, x).then((res) => {
        toast.success("Staff X Handle Updated");
        return res?.data;
      });
    } catch (error) {
      toast.error("Error updating X Handle");
      return error;
    }
  };

  const changeStaffInstagramAcct = () => {
    try {
      updateStaffInstagramAcct(schoolID, staffID, instagram).then((res) => {
        toast.success("IG Acct Updated Successfully");
        return res?.data;
      });
    } catch (error) {
      toast.error("Error Updating Instagram Acct");
      return error;
    }
  };

  const changeStaffLinkedinAcct = () => {
    try {
      updateStaffLinkinAcct(schoolID, staffID, linkedin).then((res) => {
        toast.success("Staff Linkedin Updated Successfully");
        return res?.data;
      });
    } catch (error) {
      toast.error("Error Updating Linkedin Account");
      return error;
    }
  };
  return (
    <div>
      {" "}
      <div className="relative">
        <Toaster />
        <div className="border rounded-[4px] shadow-sm">
          <div className="py-3 px-4 uppercase text-blue-950 font-medium text-[11px] md:text-[18px]">
            Socials
          </div>
          <div className="border-b py-6 px-4 flex justify-between items-center hover:bg-gray-50">
            <div className="min-w-[80%] lg:min-w-[30%] flex justify-start items-center">
              <h3 className="font-normal w-[120px] flex items-center gap-2 text-[12px] md:text-[18px]">
                <img
                  src={FB}
                  alt=""
                  className="w-[12px] h-[12px] md:w-[20px] md:h-[20px] object-contain"
                />
                facebook
              </h3>
              {teacherInfo?.facebookAcct ? (
                <h1 className="text-[11px] md:text-[18px] font-[700] text-blue-500">
                  {teacherInfo?.facebookAcct}
                </h1>
              ) : (
                <h1 className="text-[11px] md:text-[18px] font-[700] text-blue-500">
                  + add your facebook handle
                </h1>
              )}
            </div>
            <div
              className="md:py-1 md:px-3 px-2 py-[2px] border border-blue-950 rounded-md text-[10px] md:text-[18px] font-medium cursor-pointer transition-all duration-300 hover:scale-105 ml-[3px]"
              onClick={() => {
                setToggle("facebook");
              }}
            >
              Edit
            </div>
          </div>
          <div className="border-b py-6 px-4 flex justify-between items-center hover:bg-gray-50">
            <div className="min-w-[80%] lg:min-w-[30%] flex justify-start items-center">
              <h3 className="font-normal w-[120px] flex items-center gap-2 text-[12px] md:text-[18px]">
                <img
                  src={IG}
                  alt=""
                  className="w-[12px] h-[12px] md:w-[20px] md:h-[20px] object-contain"
                />
                instagram
              </h3>
              {teacherInfo?.instagramAcct ? (
                <h1 className="text-[11px] md:text-[18px] font-[700] text-blue-500 md:ml-[5px]">
                  {teacherInfo?.instagramAcct}
                </h1>
              ) : (
                <h1 className="text-[11px] md:text-[18px] font-[700] text-blue-500 md:ml-[5px]">
                  + add your instagram handle
                </h1>
              )}
            </div>
            <div
              className="md:py-1 md:px-3 px-2 py-[2px] border border-blue-950 rounded-md text-[10px] md:text-[18px] font-medium cursor-pointer transition-all duration-300 hover:scale-105 ml-[3px]"
              onClick={() => {
                setToggle("instagram");
              }}
            >
              Edit
            </div>
          </div>
          <div className="border-b py-6 px-4 flex justify-between items-center hover:bg-gray-50">
            <div className="min-w-[80%] lg:min-w-[30%] flex justify-start items-center">
              <h3 className="font-normal w-[120px] flex items-center gap-2 text-[12px] md:text-[18px]">
                <img
                  src={X}
                  alt=""
                  className="w-[12px] h-[12px] md:w-[20px] md:h-[20px] object-contain"
                />
                X
              </h3>
              {teacherInfo?.xAcct ? (
                <h1 className="text-[11px] md:text-[18px] font-[700] text-blue-500">
                  {teacherInfo?.xAcct}
                </h1>
              ) : (
                <h1 className="text-[11px] md:text-[18px] font-[700] text-blue-500">
                  + add your X handle
                </h1>
              )}
            </div>
            <div
              className="md:py-1 md:px-3 px-2 py-[2px] border border-blue-950 rounded-md text-[10px] md:text-[18px] font-medium cursor-pointer transition-all duration-300 hover:scale-105 ml-[3px]"
              onClick={() => {
                setToggle("X");
              }}
            >
              Edit
            </div>
          </div>
          <div className="border-b py-6 px-4 flex justify-between items-center hover:bg-gray-50">
            <div className="min-w-[80%] lg:min-w-[30%] flex justify-start items-center">
              <h3 className="font-normal w-[120px] flex items-center gap-2 text-[12px] md:text-[18px]">
                <img
                  src={Linkden}
                  alt=""
                  className="w-[12px] h-[12px] md:w-[20px] md:h-[20px] object-contain"
                />
                linkedIn
              </h3>
              {teacherInfo?.linkedinAcct ? (
                <h1 className="text-[11px] md:text-[18px] font-[700] text-blue-500">
                  {teacherInfo?.linkedinAcct}
                </h1>
              ) : (
                <h1 className="text-[11px] md:text-[18px] font-[700] text-blue-500">
                  + add your linkedIn handle
                </h1>
              )}
            </div>
            <div
              className="md:py-1 md:px-3 px-2 py-[2px] border border-blue-950 rounded-md text-[10px] md:text-[18px] font-medium cursor-pointer transition-all duration-300 hover:scale-105 ml-[3px]"
              onClick={() => {
                setToggle("linkedin");
              }}
            >
              Edit
            </div>
          </div>
        </div>
        {toggle && (
          <div className="absolute w-full h-full flex justify-center items-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 backdrop-blur-sm">
            <div className="freshh p-4 min-h-[200px] min-w-[250px] bg-white border shadow-md rounded-lg">
              <div className="mb-4 flex items- center justify-between">
                <h2 className="text-blue-950 font-semibold">
                  {toggle === "facebook" && "Enter Your Facebook Handle"}
                  {toggle === "linkedin" && "Enter Your Linkedln Handle"}
                  {toggle === "X" && "Enter Your X Handle"}
                  {toggle === "instagram" && "Enter Your Instagram Handle"}
                </h2>
                <CgClose
                  className="text-blue-950 text-[20px] font-bold cursor-pointer hover:scale-110 ml-[50px]"
                  onClick={() => {
                    setToggle(null);
                  }}
                />
              </div>
              {toggle === "facebook" && (
                <Input
                  placeholder="Enter Your Facebook Handle"
                  value={facebook}
                  className="mb-4"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setFacebook(e.target.value);
                  }}
                />
              )}

              {toggle === "X" && (
                <Input
                  placeholder="Enter Your X Handle"
                  value={x}
                  className="mb-4"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setX(e.target.value);
                  }}
                />
              )}

              {toggle === "linkedin" && (
                <Input
                  placeholder="Enter Your Linkedin Handle"
                  value={linkedin}
                  className="mb-4"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setLinkedin(e.target.value);
                  }}
                />
              )}

              {toggle === "instagram" && (
                <Input
                  placeholder="Enter Your Linkedin Handle"
                  value={instagram}
                  className="mb-4"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setInstagram(e.target.value);
                  }}
                />
              )}
              {/* State Change For button */}
              {toggle === "facebook" && (
                <Button
                  name="Update"
                  className="bg-blue-950 hover:scale-105"
                  onClick={() => {
                    changeStaffFacebookAcct();
                    setToggle(null);
                  }}
                />
              )}

              {toggle === "X" && (
                <Button
                  name="Update"
                  className="bg-blue-950 hover:scale-105"
                  onClick={() => {
                    changeStaffXAcct();
                    setToggle(null);
                  }}
                />
              )}

              {toggle === "instagram" && (
                <Button
                  name="Update"
                  className="bg-blue-950 hover:scale-105"
                  onClick={() => {
                    changeStaffInstagramAcct();
                    setToggle(null);
                  }}
                />
              )}

              {toggle === "linkedin" && (
                <Button
                  name="Update"
                  className="bg-blue-950 hover:scale-105"
                  onClick={() => {
                    changeStaffLinkedinAcct();
                    setToggle(null);
                  }}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SocialsSettings;
