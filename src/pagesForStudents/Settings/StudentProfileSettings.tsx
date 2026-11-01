import { useState } from "react";

import toast, { Toaster } from "react-hot-toast";
import Input from "../../components/reUse/Input";
import Button from "../../components/reUse/Button";
import { CgClose } from "react-icons/cg";
import { useStudentInfo } from "../hooks/useStudentHook";
import {
  updateParentEmail,
  updateStudentAddress,
  updateStudentFirstName,
  updateStudentGender,
  updateStudentLastName,
  updateStudentParentNumber,
  updateStudentPhoneNumber,
} from "../api/studentAPI";

const StudentProfileSettings = () => {
  const [toggle, setToggle] = useState<string | null>(null);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [parentPhoneNum, setParentPhoneNumb] = useState<string>("");
  const [parentEmail, setParentEmail] = useState<string>("");

  const { studentInfo } = useStudentInfo();
  // console.log("Student Info", studentInfo);
  const schoolID = studentInfo?.schoolIDs;
  const studentID = studentInfo?._id;

  const handleParentEmail = () => {
    try {
      updateParentEmail(schoolID, studentID, parentEmail).then((res) => {
        toast.success("Parent Email Updated Successfully");
        return res?.data;
      });
    } catch (error) {
      toast.error("Couldn't Update Check Your Internet Connection");
      console.error();
      return error;
    }
  };

  const handleGender = () => {
    try {
      updateStudentGender(schoolID, studentID, gender).then((res) => {
        toast.success("Gender Updated Successfully");
        return res?.data;
      });
    } catch (error) {
      toast.error("Error Updating Gender");
      console.error();
      return error();
    }
  };

  const handlePhoneNumber = () => {
    try {
      updateStudentPhoneNumber(schoolID, studentID, phoneNumber).then((res) => {
        toast.success("Phone Number Updated Successfully");
        return res?.data;
      });
    } catch (error) {
      error.toast("Error, Check Your Internet Connection");
      console.error();
      return error;
    }
  };

  const handleParentPhoneNumber = () => {
    try {
      updateStudentParentNumber(schoolID, studentID, parentPhoneNum).then(
        (res) => {
          toast.success("Parent Number Updated Successfully");
          return res?.data;
        }
      );
    } catch (error) {
      toast.error("Error Updating Parent Number");
      console.error();
      return error;
    }
  };

  const handleStudentAddress = () => {
    try {
      updateStudentAddress(schoolID, studentID, address).then((res) => {
        toast.success("Address Updated Successfully");
        return res?.data;
      });
    } catch (error) {
      toast.error("Error Updating Address");
      console.error();
      return error;
    }
  };

  const handleFirstName = () => {
    try {
      updateStudentFirstName(schoolID, studentID, firstName, lastName).then(
        (res) => {
          toast.success("First Name Updated Successfully");
          return res?.data;
        }
      );
    } catch (error) {
      toast.error("Error Updating First Name");
      console.error();
      return error;
    }
  };
  const handleLastName = () => {
    try {
      updateStudentLastName(schoolID, studentID, lastName, firstName).then(
        (res) => {
          toast.success("Last Name Updated Successfully");
          return res?.data;
        }
      );
    } catch (error) {
      toast.error("Error Updating First Name");
      console.error();
      return error;
    }
  };
  return (
    <div className="relative">
      <Toaster />
      <div className="border mb-4 rounded-[4px] shadow-sm">
        <div className="py-3 px-4 uppercase text-blue-950 font-medium">
          General
        </div>
        <div className="border-b py-6 px-4 flex justify-between items-center hover:bg-gray-50">
          <div className="min-w-[80%] lg:min-w-[30%] flex justify-start items-center">
            <h1 className="text-[13px] flex items-center gap-3 sm:text-[18px] md:text-[18px] font-medium">
              <h3 className="font-bold w-full text-[13px] sm:text-[15px] md:text-[18px] text-blue-950">
                First Name:
              </h3>
              {studentInfo?.studentFirstName}
            </h1>
          </div>
          {/* <div
            className="py-1 px-6 border border-blue-950 rounded-md text-[14px] md:text-[17px] font-medium cursor-pointer transition-all duration-300 hover:scale-105"
            onClick={() => {
              setToggle("firstName");
            }}
          >
            Edit
          </div> */}
        </div>
        <div className="border-b py-6 px-4 flex justify-between items-center hover:bg-gray-50">
          <div className="min-w-[80%] lg:min-w-[30%] flex justify-start items-center">
            <h1 className="text-[13px] sm:text-[18px]  flex items-center gap-3 md:text-[18px] font-medium">
              <h3 className="font-bold w-full text-[13px] sm:text-[15px] md:text-[18px] text-blue-950">
                Last Name:
              </h3>

              {studentInfo?.studentLastName}
            </h1>
          </div>
        </div>
        <div className="border-b py-6 px-4 flex justify-between items-center hover:bg-gray-50">
          <div className="min-w-[80%] lg:min-w-[30%] flex justify-start items-center">
            <h1 className="text-[13px] flex items-center gap-3 sm:text-[18px] md:text-[18px] font-medium">
              <h3 className="font-bold w-full text-[14px] md:text-[18px] text-blue-950 ">
                Parent Email:
              </h3>
              <div className="text-[14px] md:text-[17px]">
                {studentInfo?.parentEmail}
              </div>
            </h1>
          </div>
          <div
            className="py-1 px-6 border border-blue-950 rounded-md text-[14px] md:text-[17px] font-medium cursor-pointer transition-all duration-300 hover:scale-105"
            onClick={() => {
              setToggle("ParentEmail");
            }}
          >
            Edit
          </div>
        </div>
        <div className="border-b py-6 px-4 flex justify-between items-center hover:bg-gray-50">
          <div className="min-w-[80%] flex items-center gap-3 lg:min-w-[30%]">
            <h3 className="font-bold w-[50px] flex items-center gap-1 text-[13px] sm:text-[15px] md:text-[18px] mr-[5px] md:mr-[50px]">
              Email:
            </h3>
            <div className="w-full xl:w-auto text-[14px] md:text-[18px] font-medium lowercase">
              {studentInfo?.email}
            </div>
          </div>
        </div>

        <div className="border-b py-6 px-4 flex justify-between items-center hover:bg-gray-50">
          <div className="min-w-[80%] lg:min-w-[30%] flex justify-start items-center">
            <h3 className="font-bold w-[100px] text-[13px] sm:text-[18px] md:text-[18px] ">
              Gender:
            </h3>

            {studentInfo?.gender ? (
              <h1 className="font-medium text-[13px] sm:text-[18px] md:text-[18px] ">
                {studentInfo?.gender}
              </h1>
            ) : (
              <div className="font-medium text-blue-500 text-[13px] sm:text-[18px] md:text-[18px]">
                + add your gender
              </div>
            )}
          </div>
          <div
            className="py-1 px-6 border border-blue-950 rounded-md text-[14px] sm:text-[17px] font-medium cursor-pointer transition-all duration-300 hover:scale-105"
            onClick={() => setToggle("gender")}
          >
            Edit
          </div>
        </div>
      </div>
      <div className="border rounded-[4px] shadow-sm">
        <div className="py-3 px-4 uppercase text-blue-950 font-medium">
          Contact
        </div>
        <div className="border-b py-6 px-4 flex justify-between items-center hover:bg-gray-50">
          <div className="min-w-[80%] lg:min-w-[30%] flex justify-start items-center">
            <h3 className="font-bold w-[] text-[14px] md:text-[18px] ">
              Phone No:
            </h3>
            {studentInfo?.phone ? (
              <div className="bg-red-500 w-full">
                <h1 className="text-[14px] w-full !sm:text-[14px] font-medium">
                  {studentInfo?.phone}
                </h1>
              </div>
            ) : (
              <div className="text-[14px] md:text-[18px] text-blue-950  ml-2 ">
                + add your phone number
              </div>
            )}
          </div>
          <div
            className="py-1 px-6 border border-blue-950 rounded-md text-[14px] md:text-[17px] font-medium cursor-pointer transition-all duration-300 hover:scale-105"
            onClick={() => setToggle("phone")}
          >
            Edit
          </div>
        </div>
        <div className="border-b py-6 px-4 flex justify-between items-center hover:bg-gray-50">
          <div className="min-w-[80%]  flex justify-start items-center">
            <h3 className="font-bold text-[14px] md:text-[18px] ">
              Parent No:
            </h3>
            {studentInfo?.parentPhoneNumber ? (
              <div>
                <h1 className="text-[14px] sm:text-[17px] font-medium">
                  {studentInfo?.parentPhoneNumber}
                </h1>
              </div>
            ) : (
              <div className="text-[10px] md:text-[18px] text-blue-950 ml-2">
                + add your parent number
              </div>
            )}
          </div>
          <div
            className="py-1 px-6 border border-blue-950 rounded-md text-[14px] md:text-[17px] font-medium cursor-pointer transition-all duration-300 hover:scale-105"
            onClick={() => setToggle("parentNumber")}
          >
            Edit
          </div>
        </div>
        <div className="border-b py-6 px-4 flex justify-between items-center hover:bg-gray-50">
          <div className="min-w-[80%] lg:min-w-[30%] flex justify-start items-center">
            <h3 className="font-bold w-[70px] text-[14px] md:text-[18px] md:w-[30%]">
              Address:
            </h3>
            <h1 className="w-[60%] sm:w-[70%] xl:w-auto md:break-words text-[14px] md:text-[17px] font-medium">
              {studentInfo?.studentAddress}
            </h1>
          </div>
          <div
            className="py-1 px-6 border border-blue-950 rounded-md text-[14px] md:text-[17px] font-medium cursor-pointer transition-all duration-300 hover:scale-105"
            onClick={() => setToggle("Address")}
          >
            Edit
          </div>
        </div>
      </div>
      {/* Dropdown Modal For Editing */}

      {toggle && (
        <div className="absolute w-full h-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center backdrop-blur-sm">
          <div className="freshh p-4 min-h-[200px] min-w-[300px] bg-white border shadow-md rounded-lg flex justify-start items-center flex-col">
            <div className="mb-4 flex items- center justify-between">
              <h2 className="text-blue-950 font-semibold">
                {toggle === "firstName" && "Enter Your First Name"}
                {toggle === "lastName" && "Enter Your Last Name"}
                {toggle === "gender" && "Enter Your Gender"}
                {toggle === "ParentEmail" && "Enter Your Parents Email"}
                {toggle === "phone" && "Enter Your Phone Number"}
                {toggle === "parentNumber" && "Enter Your Parent Phone Number"}
                {toggle === "Address" && "Enter Your Address"}
              </h2>
              <CgClose
                className="text-blue-950 text-[18px] font-bold cursor-pointer hover:scale-110 ml-[80px]"
                onClick={() => {
                  setToggle(null);
                }}
              />
            </div>
            {toggle === "firstName" && (
              <Input
                placeholder="Input FirstName"
                value={firstName}
                className="mb-4"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFirstName(e.target.value);
                }}
              />
            )}
            {toggle === "lastName" && (
              <Input
                placeholder="Input LastName"
                value={lastName}
                className="mb-4"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setLastName(e.target.value);
                }}
              />
            )}
            {toggle === "gender" && (
              <div className="w-full">
                <select
                  name="gender"
                  id="gender"
                  className="mb-3 shadow-sm w-full bg-blue-50 text-blue-950 font-medium outline-none py-2 px-3 rounded-lg border"
                  value={gender}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    setGender(e.target.value);
                  }}
                >
                  <option value="select">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            )}
            {toggle === "ParentEmail" && (
              <Input
                placeholder="youremailhere@gmail.com"
                value={parentEmail}
                className="mb-4"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setParentEmail(e.target.value);
                }}
              />
            )}
            {toggle === "Address" && (
              <Input
                placeholder="Example 402 creek road, Lekki Lagos"
                value={address}
                className="mb-4"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setAddress(e.target.value);
                }}
              />
            )}

            {toggle === "parentNumber" && (
              <Input
                placeholder="0900007777776"
                value={parentPhoneNum}
                className="mb-4"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setParentPhoneNumb(e.target.value);
                }}
              />
            )}
            {toggle === "phone" && (
              <Input
                placeholder="0900007777776"
                value={phoneNumber}
                className="mb-4"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setPhoneNumber(e.target.value);
                }}
              />
            )}
            {/* State Change For button */}
            {toggle === "firstName" && (
              <Button
                name="Update"
                className="bg-blue-950 hover:scale-105 mt-10"
                onClick={() => {
                  handleFirstName();
                  setToggle(null);
                }}
              />
            )}
            {toggle === "lastName" && (
              <Button
                name="Update"
                className="bg-blue-950 hover:scale-105"
                onClick={() => {
                  handleLastName();
                  setToggle(null);
                }}
              />
            )}
            {toggle === "ParentEmail" && (
              <Button
                name="Update"
                className="bg-blue-950 hover:scale-105"
                onClick={() => {
                  handleParentEmail();
                  setToggle(null);
                }}
              />
            )}
            {toggle === "gender" && (
              <Button
                name="Update"
                className="bg-blue-950 hover:scale-105"
                onClick={() => {
                  handleGender();
                  setToggle(null);
                }}
              />
            )}
            {toggle === "phone" && (
              <Button
                name="Update"
                className="bg-blue-950 hover:scale-105 mt-[60px]"
                onClick={() => {
                  handlePhoneNumber();
                  setToggle(null);
                }}
              />
            )}
            {toggle === "parentNumber" && (
              <Button
                name="Update"
                className="bg-blue-950 hover:scale-105 mt-[60px]"
                onClick={() => {
                  handleParentPhoneNumber();
                  setToggle(null);
                }}
              />
            )}
            {toggle === "Address" && (
              <Button
                name="Update"
                className="bg-blue-950 hover:scale-105 mt-[60px]"
                onClick={() => {
                  handleStudentAddress();
                  setToggle(null);
                }}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentProfileSettings;
