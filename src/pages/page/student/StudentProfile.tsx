import moment from "moment";
import { Link, useParams } from "react-router-dom";
import pic from "../../../assets/pix.jpg";
import { MdEmail } from "react-icons/md";
import { HiPhoto } from "react-icons/hi2";
import { BsPerson, BsPhone } from "react-icons/bs";
import { FaAddressBook, FaSpinner } from "react-icons/fa6";
import { FaQrcode } from "react-icons/fa";
import IG from "../../../assets/ig.png";
import FB from "../../../assets/fb.png";
import Linkden from "../../../assets/linkden.png";
import X from "../../../assets/ig.png";
import { FaUserEdit } from "react-icons/fa";
import { mutate } from "swr";
import toast from "react-hot-toast";
import { useState, useEffect, useRef } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import StudentIDCardModal from "@/components/modals/StudentIDCardModal";

import { useStudentInfo } from "@/pagesForStudents/hooks/useStudentHook";
import {
  useClassSubjects,
  useSchoolData,
  useSchoolStudentDetail,
} from "@/pages/hook/useSchoolAuth";
import { readClassInfo } from "@/pagesForTeachers/api/teachersAPI";
import { updateStudentAvatar } from "@/pagesForStudents/api/studentAPI";
import { updateStudentBulkInfo } from "@/pages/api/schoolAPIs";

const StudentProfile = () => {
  const [state, setState] = useState<string>("");
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showIDCard, setShowIDCard] = useState(false);

  const { studentID } = useParams();

  const { studentDetails } = useSchoolStudentDetail(studentID!);
  //   const student = useStudentInfo().studentInfo;
  const student = studentDetails?.data;
  const studentInfo = useStudentInfo()?.studentInfo;

  const { data } = useSchoolData();

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

  const [formData, setFormData] = useState({
    studentFirstName: "",
    studentLastName: "",
    email: "",
    phone: "",
    gender: "",
    parentEmail: "",
    parentPhoneNumber: "",
    studentAddress: "",
    admissionYear: "",
    admissionNumber: "",
    classAssinged: "",
    graduationYear: "",
    leaveYear: "",
    stateOrigin: "",
    LGA: "",
    BOD: "",
    personalPhone: "",
    performanceRemark: "",
  });

  useEffect(() => {
    if (student) {
      setFormData({
        studentFirstName: student.studentFirstName || "",
        studentLastName: student.studentLastName || "",
        email: student.email || "",
        phone: student.phone || "",
        gender: student.gender || "",
        parentEmail: student.parentEmail || "",
        parentPhoneNumber: student.parentPhoneNumber || "",
        studentAddress: student.studentAddress || "",
        admissionYear: student.admissionYear || "",
        admissionNumber: student.admissionNumber || "",
        classAssinged: student.classAssinged || "",
        graduationYear: student.graduationYear || "",
        leaveYear: student.leaveYear || "",
        stateOrigin: student.stateOrigin || "",
        LGA: student.LGA || "",
        BOD: student.BOD || "",
        personalPhone: student.personalPhone || "",
        performanceRemark: student.performanceRemark || "",
      });
    }
  }, [student]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = () => {
    setLoading(true);
    updateStudentBulkInfo(student?._id, formData).then((res) => {
      mutate(`api/view-student-detail/${student?._id}`);
      toast.success("Student Information Updated Successfully");
      setLoading(false);
    });
  };

  return (
    <div>
      <div className="freshh">
        <div>
          <div className="w-full mb-7 pb-5 flex justify-between items-center border-b">
            <div className="flex items-center gap-4">
              <div className="text-[20px] text-blue-850 flex gap-2">
                Welcome To your Profile,
                <span className="font-bold text-blue-950 capitalize">
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
              {loading ? (
                <div className="mb-2 h-[320px] md:h-[300px] w-[90%] md:w-[80%] object-cover rounded-lg border flex justify-center items-center">
                  <ClipLoader color="#172554" size={30} />
                </div>
              ) : (
                <img
                  src={student?.avatar ? student?.avatar : pic}
                  alt="profile-image"
                  className="mb-2 border h-[320px] md:h-[300px] w-[100%] md:w-[100%] object-cover rounded-lg"
                />
              )}

              <div className="ml- flex gap-2 text-blue-950 items-center ">
                <HiPhoto className="cursor-pointer hover:text-blue-900 transition-all duration-300" />
                <label
                  htmlFor="id"
                  className="cursor-pointer hover:text-blue-900 font-[500] transition-all duration-300"
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
                {/* <h1 className="text-[18px] font-semibold capitalize text-left"></h1> */}
                <input
                  value={
                    formData.studentFirstName || student?.studentFirstName || ""
                  }
                  className="outline-none bg-transparent text-[18px] font-semibold capitalize "
                  name="studentFirstName"
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3 py-2 px-3 bg-gray-100 rounded-lg">
                <p className="mb-1 flex items-center gap-1">
                  <BsPerson /> First LastName:
                </p>

                <input
                  value={
                    formData.studentLastName || student?.studentLastName || ""
                  }
                  className="outline-none bg-transparent text-[18px] font-semibold capitalize "
                  name="studentLastName"
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3 py-2 px-3 bg-gray-100 rounded-lg">
                <p className="mb-1 flex items-center gap-1">
                  <BsPerson /> Gender:
                </p>
                <input
                  value={formData.gender || student?.gender || ""}
                  className="outline-none bg-transparent text-[18px] font-semibold capitalize "
                  name="gender"
                  placeholder="Enter Gender"
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3 py-2 px-3 bg-gray-100 rounded-lg">
                <p className="mb-1 flex items-center gap-1 md:text-[17px] text-[11px]">
                  <MdEmail /> My Email Address:
                </p>
                <input
                  value={formData.email || student?.email || ""}
                  className="outline-none bg-transparent text-[18px] font-semibold capitalize "
                  name="email"
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3 py-2 px-3 bg-gray-100 rounded-lg">
                <p className="mb-1 flex items-center gap-1 md:text-[17px] text-[11px]">
                  <MdEmail /> Parent Email Address:
                </p>
                <input
                  value={formData.parentEmail || student?.parentEmail || ""}
                  className="outline-none bg-transparent text-[18px] font-semibold "
                  name="parentEmail"
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3 py-2 px-3 bg-gray-100 rounded-lg">
                <p className="mb-1 flex items-center gap-1 md:text-[17px] text-[11px]">
                  <BsPhone />
                  My Phone Number:
                </p>
                <input
                  value={formData.phone || student?.phone || ""}
                  className="outline-none bg-transparent text-[18px] font-semibold capitalize "
                  name="phone"
                  placeholder="Enter Phone Number"
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3 py-2 px-3 bg-gray-100 rounded-lg">
                <p className="mb-1 flex items-center gap-1 md:text-[17px] text-[11px]">
                  <BsPhone />
                  Parent Phone Number:
                </p>
                <input
                  value={
                    formData.parentPhoneNumber ||
                    student?.parentPhoneNumber ||
                    ""
                  }
                  className="outline-none bg-transparent text-[18px] font-semibold capitalize "
                  name="parentPhoneNumber"
                  placeholder="Enter parent phone Number"
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3 py-2 px-3 bg-gray-100 rounded-lg">
                <p className="mb-1 flex items-center gap-1">
                  <FaAddressBook /> Home Address:
                </p>
                <input
                  value={
                    formData.studentAddress || student?.studentAddress || ""
                  }
                  className="outline-none bg-transparent text-[18px] font-semibold capitalize "
                  name="studentAddress"
                  placeholder="Enter student Address"
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div className="min-h-[65vh] transition-all duration-300 ">
            <div className="mb-3 md:mb-5">
              <div className="mb-2 font-medium md:text-[17px] text-[11px] text-gray-600 uppercase">
                Class Term Fees:
              </div>
              <div className="font-bold rounded-lg flex justify-start items-center text-green-600">
                ₦{student?.classTermFee?.toLocaleString()}
              </div>
            </div>
            <div className="mb-3 md:mb-5">
              <div className="mb-2 font-medium md:text-[17px] text-[11px] text-gray-600 uppercase">
                Term Fees Balance:
              </div>
              <div className="font-bold rounded-lg flex justify-start items-center text-green-600">
                ₦{student?.termBalance || 0}
              </div>
            </div>
            <div className="mb-3 md:mb-5">
              <div className="mb-2 font-medium md:text-[17px] text-[11px] text-gray-600 uppercase">
                Fee Paid:
              </div>
              <div className="font-bold rounded-lg flex justify-start items-center text-green-600">
                {data?.presentTerm === "1st Term" ? (
                  student?.feesPaid1st ? (
                    "Yes"
                  ) : (
                    <span className="text-red-400">No</span>
                  )
                ) : data?.presentTerm === "2nd Term" ? (
                  student?.feesPaid2nd ? (
                    "Yes"
                  ) : (
                    <span className="text-red-400">No</span>
                  )
                ) : data?.presentTerm === "3rd Term" ? (
                  student?.feesPaid3rd ? (
                    "Yes"
                  ) : (
                    <span className="text-red-400">No</span>
                  )
                ) : null}
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
                View QR ID Card
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
            <div className="mb-5">
              <div className="mb-2 font-medium text-[11px] md:text-[17px] text-gray-600 uppercase">
                Admission Year:
              </div>
              <div className="p-3 bg-gray-100 font-medium rounded-lg text-[17px]">
                <input
                  value={formData.admissionYear || student?.admissionYear || ""}
                  className="outline-none bg-transparent text-[18px] font-semibold capitalize "
                  name="admissionYear"
                  placeholder="No Entry Yet"
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="mb-5">
              <div className="mb-2 font-medium text-[11px] md:text-[17px] text-gray-600 uppercase">
                Admission Number:
              </div>
              <div className="p-3 bg-gray-100 font-medium rounded-lg text-[17px]">
                <input
                  value={
                    formData.admissionNumber || student?.admissionNumber || ""
                  }
                  className="outline-none bg-transparent text-[18px] font-semibold capitalize "
                  name="admissionNumber"
                  placeholder="No Entry Yet"
                  onChange={handleInputChange}
                />
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

            <div className="flex w-full justify-center">
              <div
                className="mt-5 capitalize border rounded-md px-8 py-3 text-white bg-blue-950 font-[500] cursor-pointer transition-all duration-300 hover:bg-blue-900"
                onClick={handleSubmit}
              >
                {loading ? (
                  <div className="flex gap-2 items-center">
                    <FaSpinner className="animate-spin mr-2" /> Loading...
                  </div>
                ) : (
                  "update Info"
                )}
              </div>
            </div>
          </div>
          {/* Section 3 */}
          <div className="min-h-[87vh] transition-all duration-300 lg:col-span-2 xl:col-auto lg:flex justify-between items-start xl:block">
            <div className="mb-10 lg:w-[47%] xl:w-auto">
              <div className="mb-3 font-medium text-[17px] text-gray-600 uppercase">
                Current Class:
              </div>
              <div className="font-[700]">{student?.classAssigned}</div>
            </div>

            <div className="lg:w-[47%] xl:w-auto h-[500px] w-[330px]">
              <div className="mb-5">
                <div className="mb-2 font-medium text-[11px] md:text-[17px] text-gray-600 uppercase">
                  Graduation Year:
                </div>
                <div className="p-3 bg-gray-100 font-medium rounded-lg text-[17px]">
                  <input
                    value={
                      formData.graduationYear || student?.graduationYear || ""
                    }
                    className="outline-none bg-transparent text-[18px] font-semibold capitalize "
                    name="graduationYear"
                    placeholder="No Entry Yet"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="mb-5">
                <div className="mb-2 font-medium text-[11px] md:text-[17px] text-gray-600 uppercase">
                  Leave Year:
                </div>
                <div className="p-3 bg-gray-100 font-medium rounded-lg text-[17px]">
                  <input
                    value={formData.leaveYear || student?.leaveYear || ""}
                    className="outline-none bg-transparent text-[18px] font-semibold capitalize "
                    name="leaveYear"
                    placeholder="No Entry Yet"
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="mb-5">
                <div className="mb-2 font-medium text-[11px] md:text-[17px] text-gray-600 uppercase">
                  State of Origin:
                </div>
                <div className="p-3 bg-gray-100 font-medium rounded-lg text-[17px]">
                  <input
                    value={formData.stateOrigin || student?.stateOrigin || ""}
                    className="outline-none bg-transparent text-[18px] font-semibold capitalize "
                    name="stateOrigin"
                    placeholder="No Entry Yet"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="mb-5">
                <div className="mb-2 font-medium text-[11px] md:text-[17px] text-gray-600 uppercase">
                  LGA:
                </div>
                <div className="p-3 bg-gray-100 font-medium rounded-lg text-[17px]">
                  <input
                    value={formData.LGA || student?.LGA || ""}
                    className="outline-none bg-transparent text-[18px] font-semibold capitalize "
                    name="LGA"
                    placeholder="No Entry Yet"
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="mb-5">
                <div className="mb-2 font-medium text-[11px] md:text-[17px] text-gray-600 uppercase">
                  Date of Birth:
                </div>
                <div className="p-3 bg-gray-100 font-medium rounded-lg text-[17px]">
                  <input
                    value={formData.BOD || student?.BOD || ""}
                    className="outline-none bg-transparent text-[18px] font-semibold capitalize "
                    name="BOD"
                    placeholder="No Entry Yet"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="mb-5">
                <div className="mb-2 font-medium text-[11px] md:text-[17px] text-gray-600 uppercase">
                  Personal Number:
                </div>
                <div className="p-3 bg-gray-100 font-medium rounded-lg text-[17px]">
                  <input
                    value={
                      formData.personalPhone || student?.personalPhone || ""
                    }
                    className="outline-none bg-transparent text-[18px] font-semibold capitalize "
                    name="personalPhone"
                    placeholder="No Entry Yet"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="mb-5">
                <div className="mb-2 font-medium text-[11px] md:text-[17px] text-gray-600 uppercase">
                  Student Performance Remark:
                </div>
                <div className="p-3 bg-gray-100 font-medium rounded-lg text-[17px]">
                  <textarea
                    value={
                      formData.performanceRemark ||
                      student?.performanceRemark ||
                      ""
                    }
                    className="outline-none bg-transparent resize-none h-[200px] text-[18px] font-semibold capitalize "
                    name="performanceRemark"
                    placeholder="No Entry Yet"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
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
