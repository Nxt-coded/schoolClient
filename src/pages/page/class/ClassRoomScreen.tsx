document.title = "View Students";
// import moment from "moment"
import { useDispatch, useSelector } from "react-redux";
import pix from "../../../assets/pix.jpg";
import { Link } from "react-router-dom";
import { displayClass } from "../../../global/reduxState";
import LittleHeader from "../../../components/layout/LittleHeader";
import Button from "../../../components/reUse/Button";
import { FaSpinner, FaStar } from "react-icons/fa6";
import { useSchoolClassRM, useSchoolData } from "../../hook/useSchoolAuth";
import { FC, useState } from "react";
import {
  useClassStudent,
  useTeacherDetail,
} from "../../../pagesForTeachers/hooks/useTeacher";
import lodash from "lodash";
import Input from "../../../components/reUse/Input";
import toast from "react-hot-toast";
import {
  bulkUploadofClassroomWithQueue,
  deleteClassroom,
} from "@/pages/api/schoolAPIs";
import { MdDelete } from "react-icons/md";

interface iProps {
  props?: any;
}

const TeacherDetails: FC<iProps> = ({ props }) => {
  const { teacherDetail } = useTeacherDetail(props);

  return (
    <div className="w-[220px] flex gap-2 border-r">
      <img
        className="w-16 shadow-md h-14 rounded-2xl border object-cover"
        src={teacherDetail?.avatar ? teacherDetail?.avatar : pix}
      />
      <div>
        <p className="leading-tight">{teacherDetail?.staffName}</p>
        <div className="mt-6" />
        <p className="flex items-center gap-1">
          <FaStar className="ml-1 mb-1" />
          <span>{parseFloat(teacherDetail?.staffRating).toFixed(2)}</span>
        </p>
      </div>
    </div>
  );
};

const ClassStudents: FC<iProps> = ({ props }) => {
  const { classStudents } = useClassStudent(props);

  const pref = classStudents?.students?.map((props: any) => {
    return props?.totalPerformance === undefined ? 0 : props?.totalPerformance;
  });

  const rate =
    pref?.reduce((a: number, b: number) => {
      return a + b;
    }, 0) / pref?.length;

  return <div className="">{rate ? rate.toFixed(2) : 0}%</div>;
};

const ClassRoomScreen = () => {
  const dispatch = useDispatch();
  const { schoolClassroom, mutate } = useSchoolClassRM();

  const classroom = useSelector((state: any) => state?.classroomToggled);
  const { data } = useSchoolData();

  const handleDisplayClassroom = () => {
    if (!document.startViewTransition) {
      dispatch(displayClass(!classroom));
    } else {
      document.startViewTransition(() => {
        dispatch(displayClass(!classroom));
      });
    }
  };
  const [file, setFile] = useState();
  const [toggle, setToggle] = useState<boolean>(false);
  const [deletingClassID, setDeletingClassID] = useState<string>("");
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [classToDelete, setClassToDelete] = useState<any>(null);

  const handleDeleteClassroom = async (classID: string) => {
    setDeletingClassID(classID);
    try {
      const response = await deleteClassroom(data?._id, classID);
      if (response?.successful === 1 || response?.status === "success") {
        toast.success("Classroom deleted successfully");
        mutate("api/view-classrooms/");
        setShowDeleteModal(false);
      } else {
        toast.error(response?.message || "Failed to delete classroom");
      }
    } catch (error: any) {
      toast.error(error?.message || "Error deleting classroom");
    } finally {
      setDeletingClassID("");
    }
  };

  const openDeleteModal = (classItem: any) => {
    setClassToDelete(classItem);
    setShowDeleteModal(true);
  };

  const handleBulkClassroom = async () => {
    if (!file) return;
    setToggle(true);
    const formData = new FormData();
    formData.append("file", file as any);

    try {
      const res: any = await bulkUploadofClassroomWithQueue(
        data?._id,
        formData as any
      );
      if (res && res.queued) {
        toast.success("Upload queued — will be submitted when online");
      } else {
        toast.success(res?.data?.message || "Class data Have Been Successfully Imported");
      }

      // revalidate classroom list
      if (mutate) await mutate("api/view-classrooms/");
    } catch (err) {
      toast.error("Failed to upload class data");
    } finally {
      setToggle(false);
      setFile(undefined as any);
      const inputEl = document.getElementById(
        "file"
      ) as HTMLInputElement | null;
      if (inputEl) inputEl.value = "";
    }
  };

  return (
    <div className="">
      {/* header */}
      <div className="mb-0" />
      <LittleHeader name={"View and Manage Class Rooms"} />

      <div className="mt-10" />

      <div className="flex w-full justify-end items-start">
        {file ? (
          <Button
            name={
              toggle ? (
                <div className="flex items-center gap-2 duration-300 transition-all">
                  <FaSpinner className="animate-spin text-[18px]" />
                  <span>Uploading Data</span>
                </div>
              ) : (
                "Add file to ClassRoom"
              )
            }
            className="uppercase lg:text-[12px] text-[9px] font-medium bg-red-500 py-2 sm:py-4 md:py-2 lg:py-4 md:px-4 hover:bg-red-600 cursor-pointer transition-all duration-300"
            onClick={handleBulkClassroom}
          />
        ) : (
          <label
            htmlFor="file"
            className="uppercase lg:text-[12px]font-medium bg-neutral-950 py-2 sm:py-4 md:py-2 lg:py-4 md:px-4 hover:bg-neutral-900 cursor-pointer transition-all duration-300 px-5 border rounded-md m-2 overflow-hidden flex items-center justify-center text-white  md:text-[13px] text-[11px]"
          >
            upload file for Bulk Entry
            <input
              id="file"
              type="file"
              accept=".csv"
              className="hidden"
              hidden
              onChange={(e: any) => {
                setFile(e.target.files[0]);
              }}
            />
          </label>
        )}
        <Button
          name="Add new ClassRoom"
          className={`uppercase text-[12px] font-medium ${
            data?.categoryType === "Secondary" ? "bg-blue-950" : "bg-red-950"
          } py-2 sm:py-4 md:py-2 lg:py-4 md:px-8 ${
            data?.categoryType === "Secondary"
              ? "hover:bg-blue-900"
              : "hover:bg-red-900"
          } cursor-pointer transition-all duration-300`}
          onClick={handleDisplayClassroom}
        />
      </div>
      <div
        className="py-6 px-2 border rounded-md min-w-[300px] overflow-y-hidden "
        style={{ color: "var(--secondary)" }}
      >
        <div className="text-[gray] w-[1550px] flex  gap-2 text-[12px] font-medium uppercase mb-10 px-4">
          <div className="w-[80px] border-r">Class</div>
           <div className="w-[180px] border-r">View Detail</div>
          <div className="w-[100px] border-r">Number of Students</div>

          <div className="w-[100px] border-r">Number of Subjects Offered</div>

          <div className="w-[270px] border-r">Class School-Fee</div>
          <div className="w-[20px] border-r"></div>

          <div className="w-[270px] border-r">school fee paid Ratio</div>

          <div className="w-[220px] border-r">class teacher Info</div>

          <div className="w-[150px] border-r">Class Academic Performance</div>

         
          <div className="w-[70px] border-r">Delete</div>
        </div>

        <div className=" w-[1550px] overflow-hidden">
          {lodash
            .sortBy(schoolClassroom?.classRooms, "className")
            .map((props: any, i: number) => (
              <div>
                <div>
                  <div
                    key={props}
                    className={`w-full flex items-center gap-2 text-[12px] font-medium  h-16 px-4 my-2  overflow-hidden ${
                      i % 2 === 0 ? "bg-slate-50" : "bg-white"
                    }`}
                  >
                    <div className="w-[80px] border-r">{props?.className}</div>

                     <Link
                      to={`class-details/${props?._id}`}
                      className="w-[180px] border-r"
                    >
                      <Button
                        name="View class"
                        className="py-3 w-[85%] bg-black text-white  hover:bg-neutral-800 transition-all duration-300"
                        onClick={() => {}}
                      />
                    </Link>

                    <div className={`w-[100px] border-r`}>
                      {props?.students?.length}
                    </div>
                    <div className={`w-[100px] border-r`}>
                      {props?.classSubjects?.length}
                    </div>

                    <div className="w-[270px] border-r flex justify-between pr-2 gap-4">
                      <div className="flex flex-col items-center">
                        <label className="text-[10px] font-medium">
                          1st Term
                        </label>
                        <p className="mt-3 font-bold">
                          ₦
                          {isNaN(parseInt(props?.class1stFee))
                            ? "0"
                            : parseInt(props?.class1stFee).toLocaleString()}
                        </p>
                      </div>
                      <div className="flex flex-col items-center">
                        <label className="text-[10px] font-medium">
                          2nd Term
                        </label>
                        <p className="mt-3 font-bold">
                          ₦
                          {isNaN(parseInt(props?.class2ndFee))
                            ? "0"
                            : parseInt(props?.class2ndFee).toLocaleString()}
                        </p>
                      </div>
                      <div className="flex flex-col items-center">
                        <label className="text-[10px] font-medium">
                          3rd Term
                        </label>
                        <p className="mt-3 font-bold">
                          ₦
                          {isNaN(parseInt(props?.class3rdFee))
                            ? "0"
                            : parseInt(props?.class3rdFee).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="w-[20px] border-r">-</div>
                    <div className="w-[270px] border-r flex justify-between pr-2 gap-4">
                      <div className="flex flex-col items-center">
                        <label className="text-[10px] font-medium">
                          1st Term
                        </label>
                        <p
                          className={`mt-3 font-bold *:
                         ${
                           (props?.schoolFeesHistory?.length /
                             props?.students?.length) *
                             100 >=
                           70
                             ? `${
                                 data?.categoryType === "Secondary"
                                   ? "text-blue-950"
                                   : "text-green-950"
                               }`
                             : "text-red-500"
                         } 
                        `}
                        >
                          {parseFloat(
                            (
                              (props?.schoolFeesHistory?.length /
                                props?.students?.length) *
                              100
                            ).toFixed(2)
                          )
                            ? parseFloat(
                                (
                                  (props?.schoolFeesHistory?.length /
                                    props?.students?.length) *
                                  100
                                ).toFixed(2)
                              )
                            : 0}
                          %
                        </p>
                      </div>
                      <div className="flex flex-col items-center">
                        <label className="text-[10px] font-medium">
                          2nd Term
                        </label>
                        <p
                          className={`mt-3 font-bold *:
                         ${
                           (props?.schoolFeesHistory?.length /
                             props?.students?.length) *
                             100 >=
                           70
                             ? `${
                                 data?.categoryType === "Secondary"
                                   ? "text-blue-950"
                                   : "text-green-950"
                               }`
                             : "text-red-500"
                         } 
                        `}
                        >
                          {parseFloat(
                            (
                              (props?.schoolFeesHistory2?.length /
                                props?.students?.length) *
                              100
                            ).toFixed(2)
                          )
                            ? parseFloat(
                                (
                                  (props?.schoolFeesHistory2?.length /
                                    props?.students?.length) *
                                  100
                                ).toFixed(2)
                              )
                            : 0}
                          %
                        </p>
                      </div>
                      <div className="flex flex-col items-center">
                        <label className="text-[10px] font-medium">
                          3rd Term
                        </label>
                        <p
                          className={`mt-3 font-bold *:
                         ${
                           (props?.schoolFeesHistory3?.length /
                             props?.students?.length) *
                             100 >=
                           70
                             ? `${
                                 data?.categoryType === "Secondary"
                                   ? "text-blue-950"
                                   : "text-green-950"
                               }`
                             : "text-red-500"
                         } 
                        `}
                        >
                          {parseFloat(
                            (
                              (props?.schoolFeesHistory3?.length /
                                props?.students?.length) *
                              100
                            ).toFixed(2)
                          )
                            ? parseFloat(
                                (
                                  (props?.schoolFeesHistory?.length /
                                    props?.students?.length) *
                                  100
                                ).toFixed(2)
                              )
                            : 0}
                          %
                        </p>
                      </div>
                    </div>

                    {/* name */}
                    <div className="w-[220px]">
                      {props?.classTeacherName ? (
                        <TeacherDetails props={props?.teacherID} />
                      ) : (
                        <div>no teacher assigned yet</div>
                      )}
                    </div>

                    <div className="w-[150px] border-r  ">
                      <ClassStudents props={props?._id} />
                    </div>

                   

                    <div className="w-[70px] border-r flex items-center justify-center">
                      <button
                        onClick={() => openDeleteModal(props)}
                        disabled={deletingClassID === props?._id}
                        className="p-2 text-red-500 hover:bg-red-100 rounded-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Delete classroom"
                      >
                        {deletingClassID === props?._id ? (
                          <FaSpinner className="animate-spin text-[18px]" />
                        ) : (
                          <MdDelete size={20} />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 rounded-md">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4 overflow-hidden">
            <div className="p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-2">
                Delete Classroom
              </h2>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete the classroom{" "}
                <span className="font-semibold text-red-600">
                  {classToDelete?.className}
                </span>
                ? This action cannot be undone.
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  disabled={deletingClassID === classToDelete?._id}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    handleDeleteClassroom(classToDelete?._id);
                    setShowDeleteModal(false);
                  }}
                  disabled={deletingClassID === classToDelete?._id}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all duration-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {deletingClassID === classToDelete?._id && (
                    <FaSpinner className="animate-spin text-[16px]" />
                  )}
                  {deletingClassID === classToDelete?._id
                    ? "Deleting..."
                    : "Delete"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassRoomScreen;
