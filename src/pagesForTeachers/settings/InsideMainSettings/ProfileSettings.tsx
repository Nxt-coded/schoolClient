import { useState } from "react";
import {
  updateTeacherAddress,
  updateTeacherFullName,
  updateTeacherGender,
  updateTeacherPhoneNum,
  updateTeacherSignature,
} from "../../api/teachersAPI";
import { useTeacherInfo } from "../../hooks/useTeacher";
import toast, { Toaster } from "react-hot-toast";
import Input from "../../components/reUse/Input";
import Button from "../../components/reUse/Button";
import { CgClose } from "react-icons/cg";
import { mutate } from "swr";

const ProfileSettings = () => {
  const [dropdown, setDropdown] = useState<string | null>(null);
  const [name, setName] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [phonenum, setPhonenum] = useState<string>("");

  const [signature, setSignature] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // Teacher and School
  const { teacherInfo } = useTeacherInfo();
  const schoolID = teacherInfo?.schoolIDs;
  const staffID = teacherInfo?._id;

  console.log(teacherInfo?.signature);

  const handleNameChange = () => {
    try {
      updateTeacherFullName(schoolID, staffID, name).then((res) => {
        toast.success("Full Name Updated");
        return res?.data;
      });
    } catch (error) {
      toast.error("Full Name Not Updated, Try Again");
      console.error();
      return error;
    }
  };

  const handlePhoneNumChange = () => {
    try {
      updateTeacherPhoneNum(schoolID, staffID, phonenum).then((res) => {
        toast.success("Phone Number Updated");
        return res?.data;
      });
    } catch (error) {
      toast.error("Full Name Not Updated, Try Again");
      console.error();
      return error;
    }
  };

  const handleGenderChange = () => {
    try {
      updateTeacherGender(schoolID, staffID, gender).then((res) => {
        toast.success("Your Gender is Successfully Updated");
        return res?.data;
      });
    } catch (error) {
      toast.error("Gender Not Updated, Try Again");
      console.error();
      return error;
    }
  };

  const handleAddressChange = () => {
    try {
      updateTeacherAddress(schoolID, staffID, address).then((res) => {
        toast.success("Your Address is Successfully Updated");
        return res?.data;
      });
    } catch (error) {
      toast.error("Address Not Updated, Try Again");
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
            <h3 className="font-normal w-[100px] text-[13px] sm:text-[15px] md:text-[18px] text-blue-950">
              Full Name
            </h3>
            <h1 className="text-[13px] sm:text-[18px] md:text-[18px] font-medium">
              {teacherInfo?.staffName}
            </h1>
          </div>
          <div
            className="py-1 px-3 border border-blue-950 rounded-md text-[13px] sm:text-[17px] font-medium cursor-pointer transition-all duration-300 hover:scale-105"
            onClick={() => {
              setDropdown("Fullname");
            }}
          >
            Edit
          </div>
        </div>
        <div className="border-b py-6 px-4 flex justify-between items-center hover:bg-gray-50">
          <div className="min-w-[80%] lg:min-w-[30%] flex justify-start items-center">
            <h3 className="font-normal w-[100px] flex items-center gap-1 text-[13px] sm:text-[15px] md:text-[18px]">
              Email
            </h3>
            <div className="w-[60%] sm:w-[80%] xl:w-auto text-[13px] sm:text-[18px] md:text-[18px] font-medium lowercase break-words">
              {teacherInfo?.email}
            </div>
          </div>
        </div>
        <div className="border-b py-6 px-4 flex justify-between items-center hover:bg-gray-50">
          <div className="min-w-[80%] lg:min-w-[30%] flex justify-start items-center">
            <h3 className="font-normal w-[100px] text-[13px] sm:text-[18px] md:text-[18px] ">
              Role
            </h3>
            <h1 className=" font-medium text-[13px] sm:text-[18px] md:text-[18px] ">
              {teacherInfo?.staffRole}
            </h1>
          </div>
          <div></div>
        </div>
        <div className="border-b py-6 px-4 flex justify-between items-center hover:bg-gray-50">
          <div className="min-w-[80%] lg:min-w-[30%] flex justify-start items-center">
            <h3 className="font-normal w-[100px] text-[13px] sm:text-[18px] md:text-[18px] ">
              Gender
            </h3>

            {teacherInfo?.gender ? (
              <h1 className="font-medium text-[13px] sm:text-[18px] md:text-[18px] ">
                {teacherInfo?.gender}
              </h1>
            ) : (
              <div className="font-medium text-blue-500 text-[13px] sm:text-[18px] md:text-[18px]">
                + add your gender
              </div>
            )}
          </div>
          <div
            className="py-1 px-3 border border-blue-950 rounded-md text-[13px] sm:text-[17px] font-medium cursor-pointer transition-all duration-300 hover:scale-105"
            onClick={() => setDropdown("Gender")}
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
            <h3 className="font-normal w-[100px] text-[13px] sm:text-[18px] md:text-[18px] ">
              Phone No:
            </h3>
            {teacherInfo?.phone ? (
              <div>
                <h1 className="text-[13px] sm:text-[17px] font-medium">
                  {teacherInfo?.phone}
                </h1>
              </div>
            ) : (
              <div>+ add your phone number</div>
            )}
          </div>
          <div
            className="py-1 px-3 border border-blue-950 rounded-md text-[13px] sm:text-[17px] font-medium cursor-pointer transition-all duration-300 hover:scale-105"
            onClick={() => setDropdown("PhoneNum")}
          >
            Edit
          </div>
        </div>
        <div className="border-b py-6 px-4 flex justify-between items-center hover:bg-gray-50">
          <div className="min-w-[80%] lg:min-w-[30%] flex justify-start items-center">
            <h3 className="font-normal w-[100px] text-[13px] sm:text-[18px] md:text-[18px] ">
              Address
            </h3>
            <h1 className="w-[60%] sm:w-[70%] xl:w-auto break-words text-[13px] sm:text-[17px] font-medium">
              {teacherInfo?.staffAddress}
            </h1>
          </div>
          <div
            className="py-1 px-3 border border-blue-950 rounded-md text-[13px] sm:text-[17px] font-medium cursor-pointer transition-all duration-300 hover:scale-105"
            onClick={() => setDropdown("Address")}
          >
            Edit
          </div>
        </div>
      </div>
      <div className="mt-10 border p-5 uppercase">
        {teacherInfo?.signature ? (
          <img
            src={teacherInfo?.signature}
            className="w-[200px] h-[120px] border mb-10 object-cover"
          />
        ) : (
          <div className="w-[200px] h-[120px] border mb-10 flex justify-center items-center text-[12px] font-semibold italic">
            <p>NO SIGNATURE YET</p>
          </div>
        )}
        <div>
          {signature ? (
            <button
              className={`bg-red-500 ${
                loading
                  ? "cursor-not-allowed bg-red-400 animate-pulse"
                  : "cursor-pointer"
              } text-white px-[45px] py-4 rounded-md text-[12px]`}
              disabled={loading}
              onClick={() => {
                setLoading(true);
                const formData: any = new FormData();
                formData.append("avatar", signature);
                updateTeacherSignature(teacherInfo?._id, formData)
                  .then((res) => {
                    if (res.status === 201) {
                      toast.success("signature updated successfully");
                      mutate(`api/view-teacher-detail/${teacherInfo?._id}`);
                    } else {
                      toast.error("signature updated Error");
                    }
                  })
                  .finally(() => {
                    setLoading(false);
                  });
              }}
            >
              {loading ? "Loading..." : "upload Signature"}
            </button>
          ) : (
            <div>
              <label
                htmlFor="signature-upload"
                className="mt-4 bg-blue-950 text-white px-12 py-4 rounded-md text-[12px] cursor-pointer"
              >
                Update Signature
              </label>
              <input
                className="hidden"
                type="file"
                id="signature-upload"
                onChange={(e: any) => {
                  setSignature(e.target.files[0]);
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Dropdown Modal For Editing */}
      {dropdown && (
        <div className="absolute w-full h-full flex justify-center items-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 backdrop-blur-sm">
          <div className="freshh p-4 min-h-[200px] min-w-[300px] bg-white border shadow-md rounded-lg">
            <div className="mb-4 flex items- center justify-between">
              <h2 className="text-blue-950 font-semibold">
                {dropdown === "Fullname" && "Enter Your Full Name"}
                {dropdown === "Gender" && "Enter Your Gender"}
                {dropdown === "PhoneNum" && "Enter Your Phone Number"}
                {dropdown === "Address" && "Enter Your Address"}
              </h2>
              <CgClose
                className="text-blue-950 text-[18px] font-bold cursor-pointer hover:scale-110"
                onClick={() => {
                  setDropdown(null);
                }}
              />
            </div>
            {dropdown === "Fullname" && (
              <Input
                placeholder="Example Prince John"
                value={name}
                className="mb-4"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setName(e.target.value);
                }}
              />
            )}
            {dropdown === "Gender" && (
              <div>
                <select
                  name="gender"
                  id="gender"
                  className="mb-3 shadow-sm w-full bg-blue-50 text-blue-950 font-medium outline-none py-2 px-3 rounded-lg border"
                  value={gender}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    setGender(e.target.value);
                  }}
                >
                  <option value="" disabled selected>
                    select
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            )}
            {dropdown === "PhoneNum" && (
              <Input
                placeholder="08123456789"
                value={phonenum}
                className="mb-4"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setPhonenum(e.target.value);
                }}
              />
            )}
            {dropdown === "Address" && (
              <Input
                placeholder="Example 402 creek road, Lekki Lagos"
                value={address}
                className="mb-4"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setAddress(e.target.value);
                }}
              />
            )}
            {/* State Change For button */}
            {dropdown === "Fullname" && (
              <Button
                name="Update"
                className="bg-blue-950 hover:scale-105"
                onClick={() => {
                  handleNameChange();
                  setDropdown(null);
                }}
              />
            )}
            {dropdown === "Gender" && (
              <Button
                name="Update"
                className="bg-blue-950 hover:scale-105"
                onClick={() => {
                  handleGenderChange();
                  setDropdown(null);
                }}
              />
            )}
            {dropdown === "PhoneNum" && (
              <Button
                name="Update"
                className="bg-blue-950 hover:scale-105"
                onClick={() => {
                  handlePhoneNumChange();
                  setDropdown(null);
                }}
              />
            )}
            {dropdown === "Address" && (
              <Button
                name="Update"
                className="bg-blue-950 hover:scale-105"
                onClick={() => {
                  handleAddressChange();
                  setDropdown(null);
                }}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileSettings;
