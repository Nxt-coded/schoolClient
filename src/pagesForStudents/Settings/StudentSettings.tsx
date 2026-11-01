import { FaPen } from "react-icons/fa";
import dummy from "../assets/dummy.jpg";
import StudentsPersonal from "../StudentsPersonal";
import StudentSchoolDetail from "../StudentSchoolDetail";
import { useState } from "react";
import { useStudentInfo } from "../hooks/useStudentHook";
import { displayImageToggle } from "../../global/reduxState";
import { useDispatch } from "react-redux";
import { updateStudentAvatar } from "../api/studentAPI";
import { mutate } from "swr";
import toast from "react-hot-toast";
import LittleHeader from "../../components/layout/LittleHeader";
import StudentProfileSettings from "./StudentProfileSettings";
import StudentSocialSettings from "./StudentSocialSettings";
import StudentPasswordSecurity from "./StudentPasswordSecurity";

const StudentSettings = () => {
  const [activeSection, setActiveSection] = useState("My Profile");

  const dispatch = useDispatch();
  const { studentInfo } = useStudentInfo();
  const [change, setChange] = useState(false);

  const [state, setState] = useState<string>("");

  const changeImage = (e: any) => {
    const file = e.target.files[0];

    const formData: any = new FormData();
    formData.append("avatar", file);
    setState(file);

    if (state) {
      dispatch(displayImageToggle(true));
      const timer = setTimeout(() => {
        updateStudentAvatar(studentInfo?._id, formData).then((res) => {
          if (res.status === 201) {
            mutate(`api/view-student-info/${studentInfo?._id}`);
            toast.success("Image has been updated");
            dispatch(displayImageToggle(false));
          } else {
            toast.error(`${res?.response?.data?.message}`);
            dispatch(displayImageToggle(false));
          }
        });
        clearTimeout(timer);
      }, 50);
    }
  };

  return (
    <div className="text-blue-950">
      <LittleHeader name={"My Profile Detail Settings"} />
      <div>
        <div className="flex justify-start items-center gap-[20px] border-b transition-all duration-300">
          <div
            onClick={() => setActiveSection("My Profile")}
            className={`h-full cursor-pointer transition-all duration-300 ${
              activeSection === "My Profile"
                ? "border-b-[2px] border-blue-950 font-medium text-blue-950"
                : "border-transparent"
            }`}
          >
            <h1 className="mb-3 text-[14px] md:text-[19px]">My Profile</h1>
          </div>
          <div
            onClick={() => setActiveSection("My Socials")}
            className={`h-full cursor-pointer transition-all duration-300 ${
              activeSection === "My Socials"
                ? "border-b-[2px] border-blue-950 font-medium text-blue-950"
                : "border-transparent"
            }`}
          >
            <h1 className="mb-3 text-[14px] md:text-[19px]">My Socials</h1>
          </div>
          <div
            onClick={() => setActiveSection("Password and Security")}
            className={`h-full cursor-pointer transition-all duration-300 ${
              activeSection === "Password and Security"
                ? "border-b-[2px] border-blue-950 font-medium text-blue-950"
                : "border-transparent"
            }`}
          >
            <h1 className="mb-3 text-[14px] md:text-[19px]">
              Password and Security
            </h1>
          </div>
        </div>

        {/* SETTINGS DIVS */}

        {activeSection === "My Profile" && (
          <div className="mt-5 min-h-[60vh] ">
            <StudentProfileSettings />
          </div>
        )}

        {activeSection === "My Socials" && (
          <div className="mt-5 min-h-[60vh]">
            <div>
              <StudentSocialSettings />
            </div>
          </div>
        )}
        {activeSection === "Password and Security" && (
          <div className="mt-5 min-h-[60vh] freshh">
            <div>
              <StudentPasswordSecurity />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentSettings;
