import React, { useEffect, useState } from "react";
import Input from "../../../components/reUse/Input";
import PhoneNumberInput from "./PhoneInput";
import pic from "../../../assets/pix1.png";
import pic1 from "../../../assets/pix2.png";
import pic2 from "../../../assets/pix3.png";
import pic3 from "../../../assets/pix4.png";
import { useDispatch, useSelector } from "react-redux";
import {
  googleData,
  readSchool,
  updateRegisterationStatus,
} from "../../api/schoolAPIs";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getEntryEmail } from "../../../global/reduxState";

const pix = [pic, pic1, pic2, pic3];

const EnquiryForm = () => {
  const dispatch = useDispatch();
  const schoolEmail = useSelector((state: any) => state.getEmail);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("Select Role");

  const [schoolGoogleEmail, setSchoolGoogleEmail] = useState<string>("");
  const [schoolName, setSchoolName] = useState<string>("");
  const [schoolLocation, setSchoolLocation] = useState<string>("");
  const [schoolCategory, setSchoolCategory] =
    useState<string>("Nursery/Primary");
  const [schoolOrganization, setSchoolOrganization] = useState<string>("");

  const [schoolOrganizationToggle, setSchoolOrganizationToggle] =
    useState<boolean>(false);
  const [schoolOrganizationToggle1, setSchoolOrganizationToggle1] =
    useState<boolean>(false);
  const [schoolPhoneNumber, setSchoolPhoneNumber] = useState<string>("");

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (role) => {
    setSelectedRole(role);
    setIsOpen(false);
  };

  const [count, setCount] = useState<number>(0);
  const navigate = useNavigate();

  const getData = async () => {
    await googleData().then((res) => {
      if (res?.data?.data !== "") {
        readSchool(res?.data?.data).then((res) => {
          if (res.status === 200) {
            setSchoolGoogleEmail(res?.data?.email);
          }
        });
      }
    });
  };

  useEffect(() => {
    getData();
    let timer: NodeJS.Timer | null | any = null;

    timer = setTimeout(() => {
      setCount((prevCount) => prevCount + 1);
    }, 5000);

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [count]);

  return (
    <div className="flex flex-col w-full items-center justify-center -mt-24 mb-10 ">
      <div className=" w-full flex justify-center items-center lg:w-[55%]">
        <div className="lg:min-h-[89%] min-h-screen w-full shadow rounded-md flex justify-center items-center gap-3  flex-row-reverse overflow-hidden mx-10 lg:mx-0 ">
          {/* Image sider */}
          <div className="h-[53rem] w-[40%] lg:flex justify-end md:hidden lg:items-end hidden">
            <div
              className="w-full h-[46.9rem] relative"
              style={{
                background: "linear-gradient(to bottom, transparent, #f0f0f0)",
              }}
            >
              <img
                src={pix[count % pix.length]}
                alt=""
                className="absolute w-full bottom-0"
              />
            </div>
          </div>

          {/* data form */}
          <div className=" pb-3 ml-5 h-full lg:w-[70%] w-full flex justify-center items-center flex-col gap-2">
            <div className="lg:w-[96%] md:w-[80%] lg:h-[18%] h-[12%] text-wrap">
              <p className="lg:text-[29px] md:text-[20px] text-[18px] ml-8 md:ml-0 text-black font-bold leading-tight  pt-4 overflow-hidden overflow-ellipsis break-words ">
                Digitize your school in minutes with NEXT's Integrated Platform
              </p>
            </div>
            <div className="mt-5 w-[96%] h-[80%] flex justify-center items-center flex-col gap-2">
              <div className="h-[20%] w-full flex flex-col">
                <label
                  htmlFor="input-field"
                  className="text-[18px] mb-5  font-semibold text-gray-700 pl-2"
                >
                  School4 Email:{" "}
                  <strong>
                    {schoolGoogleEmail ? schoolGoogleEmail : schoolEmail}
                  </strong>
                </label>
              </div>
              <div className="h-[20%] w-full flex flex-col">
                <label
                  htmlFor="input-field"
                  className="text-[14px] font-semibold text-gray-700 pl-2"
                >
                  Enter School Name
                </label>
                <Input
                  type="text"
                  id="input-field"
                  className="pl- mt-2 w-[90%] rounded"
                  placeholder="Enter Your School Name..."
                  value={schoolName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setSchoolName(e.target.value);
                  }}
                />
              </div>
              <div className="-mt-3 h-[20%] w-full flex flex-col">
                <label
                  htmlFor="input-field"
                  className="text-[14px] font-semibold mt- text-gray-700 pl-2"
                >
                  Enter School Location:
                </label>
                <Input
                  type="text"
                  id="input-field"
                  className="pl- mt-2 w-[90%] rounded"
                  placeholder="Enter Your School Location..."
                  value={schoolLocation}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setSchoolLocation(e.target.value);
                  }}
                />
              </div>

              <div className="-mt-3 h-[20%] w-full flex flex-col">
                <label
                  htmlFor="input-field"
                  className="mt- mb-1 font-semibold text-[14px] text-gray-700 pl-2"
                >
                  Enter your School Category:
                </label>
                <select
                  className="select select-bordered w-full max-w-xs ml-2"
                  value={schoolCategory}
                  onChange={(e: any) => {
                    setSchoolCategory(e.target.value);
                  }}
                >
                  <option disabled selected>
                    Choose School Category?
                  </option>
                  <option value={"Nursery/Primary"}>Nursery/Primary</option>
                  <option value={"Secondary"}>Secondary</option>
                </select>
              </div>
              <div className="ml-4 mt-3 h-[20%] w-full flex flex-col gap-5">
                <label
                  htmlFor=" input-field"
                  className="text-[14px] font-semibold mt-2 text-gray-700 ml-1"
                >
                  Select Organization Type
                </label>

                <div className="-mt-1 flex gap-4 ml-2 lg:flex-row flex-col">
                  <div
                    className="flex gap-2 items-center"
                    onClick={() => {
                      setSchoolOrganizationToggle(true);
                      setSchoolOrganizationToggle1(false);
                      setSchoolOrganization("Independent School");
                    }}
                  >
                    <input
                      checked={schoolOrganizationToggle}
                      type="checkbox"
                      defaultChecked
                      className="checkbox"
                    />
                    <p className="text-[12px] font-semibold">
                      Independent School
                    </p>
                  </div>
                  <div
                    className="flex gap-2 items-center"
                    onClick={() => {
                      setSchoolOrganizationToggle1(true);
                      setSchoolOrganizationToggle(false);

                      setSchoolOrganization("Group Of Schools");
                    }}
                  >
                    <input
                      checked={schoolOrganizationToggle1}
                      type="checkbox"
                      defaultChecked
                      className="checkbox"
                    />
                    <p className="text-blue-950 text-[12px] font-semibold">
                      Group Of Schools
                    </p>
                  </div>
                </div>
              </div>
              <div className="ml-5 h-[40%] w-full ">
                <div className="bg-white w-full py-6 rounded-lg flex justify-between items-center lg:flex-row flex-col">
                  <div className="w-full ">
                    <PhoneNumberInput
                      onChange={(phone: any) => {
                        setSchoolPhoneNumber(phone);
                      }}
                    />
                  </div>
                </div>
                <button
                  className="py-2 px-8 mt-4 rounded-md bg-blue-950 text-white font-bold"
                  onClick={() => {
                    console.log("Thinking....");
                    updateRegisterationStatus({
                      email: schoolEmail,
                      schoolPhoneNumber,
                      schoolName,
                      schoolCategory,
                      schoolLocation,
                      schoolOrganization,
                    }).then((res) => {
                      console.log(res);
                      if (res?.data?.status === 201) {
                        dispatch(getEntryEmail(""));
                        toast.success("School registration successful!");
                        navigate("/auth/register-message");
                      }
                    });
                  }}
                >
                  submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnquiryForm;
