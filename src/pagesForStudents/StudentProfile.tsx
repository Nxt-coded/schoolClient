import moment from "moment";
import pix from "../assets/Child2.jpg";
import LittleHeader from "../components/layout/LittleHeader";
import { useStudentInfo, useStudentInfoData } from "./hooks/useStudentHook";
import { Link, useParams } from "react-router-dom";
import pic from "../../src/assets/Child1.jpg";
import { MdEmail } from "react-icons/md";
import { HiPhoto } from "react-icons/hi2";
import { BsPerson, BsPhone } from "react-icons/bs";
import { FaAddressBook } from "react-icons/fa6";
import { FaQrcode } from "react-icons/fa";
import IG from "../../src/assets/ig.png";
import FB from "../../src/assets/fb.png";
import Linkden from "../../src/assets/linkden.png";
import X from "../../src/assets/ig.png";
import { FaUserEdit } from "react-icons/fa";
import { mutate } from "swr";
import toast from "react-hot-toast";
import { useState, useEffect, useRef } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import StudentIDCardModal from "@/components/modals/StudentIDCardModal";
import {
  readClassInfo,
  readOneClassInfo,
  updateStudentAvatar,
} from "./api/studentAPI";
import {
  useClassSubjects,
  useSchoolStudentDetail,
} from "../pages/hook/useSchoolAuth";

const StudentProfile = () => {
  const [state, setState] = useState<string>("");
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showIDCard, setShowIDCard] = useState(false);
  const student = useStudentInfo().studentInfo;
  const fetchOnce = useRef(true);
  const initials =
    student?.studentName?.charAt(0) +
    student?.staffName?.charAt(student?.staffName.indexOf(" ") + 1);

  const studentInfo = useStudentInfo()?.studentInfo;

  console.log(student);

  const { studentDetails } = useSchoolStudentDetail(student?._id);
  // console.log("Student Details:", studentInfo);
  const fetchSubjects = async (classID: string) => {
    setLoading(true);
    try {
      const res = await readClassInfo(classID);
      // console.log("Fetched subjects:", res);
      setSubjects(res.subjects);
    } catch (error) {
      console.error("Failed to fetch subjects:", error);
    } finally {
      setLoading(false);
    }
  };

  console.log("FetchSubject", fetchSubjects);

  const changeImage = (e: any) => {
    // console.log("start...");
    const file = e.target.files[0];

    const formData: any = new FormData();
    formData.append("avatar", file);
    setState(file);

    if (state) {
      const timer = setTimeout(() => {
        setLoading(true);
        updateStudentAvatar(studentInfo?._id, formData).then((res) => {
          mutate(`api/view-teacher-detail/${studentInfo?._id}`);
          if (res.status === 201) {
            toast.success("Image has been updated");
          } else {
            toast.error(`${res?.response?.data?.message}`);
          }
        });
        clearTimeout(timer);
      }, 50);
    }
  };

  const { readSubject } = useClassSubjects(studentInfo?.presentClassID);
  // console.log("readSubject", readSubject);

  return (
    <div>
      <div className="freshh">
        <div>
          <div className="w-full mb-7 pb-5 flex justify-between items-center border-b">
            <div className="flex items-center gap-4">
              <div className="text-[24px] text-blue-850">
                <div className="text-[12px] md:text-[29px]">
                  Welcome To your Profile,
                </div>
                <span className="font-bold text-blue-950">
                  {student?.studentFirstName}
                </span>
              </div>
            </div>
            <Link to="/your-settings">
              <div className="font-normal flex items-center gap-2 cursor-pointer hover:scale-105 text-[11px] md:text-[18px]">
                <FaUserEdit /> Edit Profile
              </div>
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          <div className="min-h-[87vh] ">
            <div className="mb-8">
              <h1 className="mb-2 font-medium text-[17px] text-gray-600 uppercase">
                Profile Image:
              </h1>
              {loading ? (
                <div className="mb-2 h-[320px] md:h-[300px] w-[90%] md:w-[80%] object-cover rounded-lg border flex justify-center items-center">
                  <ClipLoader color="#172554" size={30} />
                </div>
              ) : (
                <img
                  src={student?.avatar ? student?.avatar : pic}
                  alt="profile-image"
                  className="mb-2 border h-[320px] md:h-[300px] w-[90%] md:w-[80%] object-cover rounded-lg"
                />
              )}

              <div className="ml-7 flex gap-2 text-blue-800 items-center ">
                <HiPhoto className="cursor-pointer hover:scale-105 transition-all duration-300" />
                <label
                  htmlFor="id"
                  className="cursor-pointer hover:scale-105 transition-all duration-300"
                >
                  Change Profile Image
                </label>
                <input
                  id="id"
                  className="hidden"
                  onChange={changeImage}
                  type="file"
                />
              </div>
            </div>
            <div className="">
              <h1 className="mb-3 font-medium text-[17px] text-gray-600 uppercase">
                Personal Information
              </h1>
              <div className="mb-3 py-2 px-3 bg-gray-100 rounded-lg">
                <p className="mb-1 flex items-center gap-1">
                  <BsPerson /> First Name:
                </p>
                <h1 className="text-[18px] font-semibold">
                  {student?.studentFirstName}
                </h1>
              </div>
              <div className="mb-3 py-2 px-3 bg-gray-100 rounded-lg">
                <p className="mb-1 flex items-center gap-1">
                  <BsPerson /> First LastName:
                </p>
                <h1 className="text-[18px] font-semibold">
                  {student?.studentLastName}
                </h1>
              </div>
              <div className="mb-3 py-2 px-3 bg-gray-100 rounded-lg">
                <p className="mb-1 flex items-center gap-1">
                  <BsPerson /> Gender:
                </p>
                {student?.gender === "" ? (
                  <h1 className="text-[18px] text-blue-500 font-normal">
                    + add your gender
                  </h1>
                ) : (
                  <h1 className="text-[18px] font-semibold">
                    {student?.gender}
                  </h1>
                )}
              </div>
              <div className="mb-3 py-2 px-3 bg-gray-100 rounded-lg">
                <p className="mb-1 flex items-center gap-1 md:text-[17px] text-[11px]">
                  <MdEmail /> My Email Address:
                </p>
                <h1 className="md:text-[18px] font-semibold lowercase text-[11px]">
                  {student?.email}
                </h1>
              </div>
              <div className="mb-3 py-2 px-3 bg-gray-100 rounded-lg">
                <p className="mb-1 flex items-center gap-1 md:text-[17px] text-[11px]">
                  <MdEmail /> Parent Email Address:
                </p>
                <h1 className="md:text-[18px] font-semibold lowercase text-[11px]">
                  {student?.parentEmail}
                </h1>
              </div>
              <div className="mb-3 py-2 px-3 bg-gray-100 rounded-lg">
                <p className="mb-1 flex items-center gap-1 md:text-[17px] text-[11px]">
                  <BsPhone />
                  My Phone Number:
                </p>
                {studentInfo?.phone === "" ? (
                  <h1 className="md:text-[18px] text-blue-500 font-normal text-[11px]">
                    + add your phone number
                  </h1>
                ) : (
                  <h1 className="md:text-[18px] text-blue-500 font-normal text-[11px]">
                    {studentInfo?.phone}
                  </h1>
                )}
              </div>
              <div className="mb-3 py-2 px-3 bg-gray-100 rounded-lg">
                <p className="mb-1 flex items-center gap-1 md:text-[17px] text-[11px]">
                  <BsPhone />
                  Parent Phone Number:
                </p>
                {studentInfo?.parentPhoneNumber === "" ? (
                  <h1 className="md:text-[18px] text-blue-500 font-normal text-[11px]">
                    + add parent phone number
                  </h1>
                ) : (
                  <h1 className="md:text-[18px] text-blue-500 font-normal text-[11px]">
                    {studentInfo?.parentPhoneNumber}
                  </h1>
                )}
              </div>
              <div className="mb-3 py-2 px-3 bg-gray-100 rounded-lg">
                <p className="mb-1 flex items-center gap-1">
                  <FaAddressBook /> Home Address:
                </p>
                <h1 className="text-[11px] md:text-[18px] font-semibold">
                  {student?.studentAddress}
                </h1>
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div className="min-h-[65vh] transition-all duration-300 ">
            <div className="mb-3 md:mb-5">
              <div className="mb-2 font-medium md:text-[17px] text-[11px] text-gray-600 uppercase">
                School Fees:
              </div>
              <div className="font-bold rounded-lg flex justify-start items-center text-green-600">
                ₦{studentInfo?.classTermFee?.toLocaleString()}
              </div>
            </div>
            <div className="mb-3 md:mb-5">
              <div className="mb-2 font-medium text-[17px] text-gray-600 uppercase">
                Role:
              </div>
              <div className="p-3 bg-gray-100 font-medium rounded-lg text-[17px]">
                Student
              </div>
            </div>
            <div className="mb-3 md:mb-5">
              <div className="mb-2 font-medium md:text-[17px] text-[11px] text-gray-600 uppercase">
                School EnrollmentID:
              </div>
              <div className="p-3 bg-gray-100 font-medium rounded-lg text-[17px]">
                {student?.enrollmentID}
              </div>
              <button
                onClick={() => setShowIDCard(true)}
                className="mt-2 flex items-center gap-2 text-blue-950 font-medium text-[13px] hover:text-blue-700 transition-all duration-200 cursor-pointer"
              >
                <FaQrcode size={16} />
                View My QR ID Card
              </button>
            </div>
            <div className="mb-5">
              <div className="mb-2 font-medium text-[11px] md:text-[17px] text-gray-600 uppercase">
                Onboard Date:
              </div>
              <div className="p-3 bg-gray-100 font-medium rounded-lg text-[17px]">
                {moment(student?.createdAt).format("ll")}
              </div>
            </div>
            <div className="">
              <div className="flex items-center gap-5">
                <div className="mb-1 font-medium text-[11px] md:text-[17px] text-gray-600 uppercase">
                  Socials:
                </div>
                <div className="border w-full" />
              </div>
              <div className="mb-1 p-3 font-medium rounded-lg text-[18px] flex items-center gap-2 italic">
                <div>
                  <img
                    src={FB}
                    alt="facebook pic"
                    className="w-[20px] h-[20px] object-contain"
                  />
                </div>
                <h3 className="text-blue-500 text-[11px] md:text-[17px]">
                  + add your facebook handle or parents
                </h3>
              </div>
              <div className="mb-1 p-3 font-medium rounded-lg text-[18px] flex items-center gap-2 italic">
                <div>
                  <img
                    src={IG}
                    alt="instagram pic"
                    className="w-[20px] h-[20px] object-contain"
                  />
                </div>
                <h3 className="text-blue-500 text-[11px] md:text-[17px]">
                  + add your instagram handle or parents
                </h3>
              </div>
              <div className="mb-1 p-3 font-medium rounded-lg text-[18px] flex items-center gap-2 italic">
                <div>
                  <img
                    src={X}
                    alt="X pic"
                    className="w-[20px] h-[17px] object-contain"
                  />
                </div>
                <h3 className="text-blue-500 text-[11px] md:text-[17px]">
                  + add your X handle or parents
                </h3>
              </div>
              <div className="mb-1 p-3 font-medium rounded-lg text-[18px] flex items-center gap-2 italic">
                <div>
                  <img
                    src={Linkden}
                    alt="LinkedIn pic"
                    className="w-[20px] h-[20px] object-contain"
                  />
                </div>
                <h3 className="text-blue-500 text-[11px] md:text-[17px]">
                  + add your linkedIn handle or parents
                </h3>
              </div>
            </div>
          </div>
          {/* Section 3 */}
          <div className="min-h-[87vh] transition-all duration-300 lg:col-span-2 xl:col-auto lg:flex justify-between items-start xl:block">
            <div className="mb-10 lg:w-[47%] xl:w-auto">
              <div className="mb-3 font-medium text-[17px] text-gray-600 uppercase">
                My Current Class:
              </div>
              <div className="font-[700]">{studentInfo?.classAssigned}</div>
            </div>
            <div className="lg:w-[47%] xl:w-auto h-[500px] w-[330px]">
              <div className="mb-3 font-bold md:text-[17px] text-gray-600 uppercase text-[9px]">
                Subjects Offered & Subject Teachers Name:
              </div>
              {readSubject?.length > 0 ? (
                readSubject?.map((subject: any) => (
                  <div className="border-b mb-1 py-1 flex items-center justify-between font-medium text-[10px] md:text-[17px] w-[84%]">
                    <h1>{subject?.subjectTitle}</h1>
                    <h1>{subject?.subjectTeacherName}</h1>
                  </div>
                ))
              ) : (
                <div className="flex justify-center items-center h-full">
                  <h2 className="text-gray-500">No subjects assigned yet</h2>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {showIDCard && student && (
        <StudentIDCardModal student={student} onClose={() => setShowIDCard(false)} />
      )}
    </div>
  );
};

export default StudentProfile;
