document.title = "view subjects";

import LittleHeader from "../../../components/static/LittleHeader";
import pix from "../../../assets/pix.jpg";
import {
  useSchoolCookie,
  useSchoolData,
  useSchoolSubject,
  useSchoolTeacher,
  useSchoolTeacherDetail,
} from "../../hook/useSchoolAuth";
import Button from "../../../components/reUse/Button";
import { useState, FC } from "react";
import { MdCheck, MdClose } from "react-icons/md";

import toast, { Toaster } from "react-hot-toast";
import {
  bulkUploadofSubjectWithQueue,
  deletSubject,
  removeTeacherSubject,
  updateSchoolSubjectTeacher,
} from "../../api/schoolAPIs";
import { mutate } from "swr";
import Input from "../../../components/reUse/Input";
import { FaSpinner } from "react-icons/fa6";
import { set } from "lodash";

interface iProps {
  props?: any;
}

interface SubjectRecord {
  _id?: string;
  subjectTitle?: string;
  designated?: string;
  subjectClassID?: string;
  subjectClassIDs?: string;
  classID?: string;
  classDetails?: { _id?: string };
  teacherID?: string;
}

const TeacherInfo: FC<iProps> = ({ props }) => {
  const { schoolSubjectTeacherDetail } = useSchoolTeacherDetail(props);

  return (
    <div className="flex items-center gap-3">
      <div className="avatar">
        <div className="mask mask-squircle w-12 h-12">
          <img
            src={
              schoolSubjectTeacherDetail?.avatar
                ? schoolSubjectTeacherDetail?.avatar
                : pix
            }
            alt="Avatar"
          />
        </div>
      </div>
      <div>
        <div className="font-bold">{schoolSubjectTeacherDetail?.staffName}</div>
        <div className="text-[12px] opacity-50 gap-1 flex flex-wrap items-center  ">
          {schoolSubjectTeacherDetail?.classesAssigned?.map((el: any) => (
            <div className=" flex border-r-2 pr-1 text-[10px] font-semibold">
              {el.className}
            </div>
          ))}{" "}
        </div>
        <p>Teacher</p>
      </div>
    </div>
  );
};

const ViewSubjects = () => {
  const { schoolSubject } = useSchoolSubject();
  const [subjectTeacherID, setSubjectTeacherID] = useState("");
  const [assigningSubjectID, setAssigningSubjectID] = useState<string | null>(
    null
  );
  const [searchSubject, setSearchSubject] = useState("");
  const { dataID } = useSchoolCookie();
  const { data } = useSchoolData();
  const { schoolTeacher } = useSchoolTeacher();

  const onTeacherSubject = async (subject: SubjectRecord) => {
    const subjectID = subject._id;
    if (!dataID || !subjectID || !subjectTeacherID) {
      toast.error("Select a teacher before assigning this subject");
      return;
    }

    setAssigningSubjectID(subjectID);
    try {
      const response = await updateSchoolSubjectTeacher(
        dataID,
        subjectID,
        subjectTeacherID
      );
      if (response?.status !== 201) {
        toast.error(
          response?.response?.data?.message ||
            response?.message ||
            "Unable to assign subject"
        );
        return;
      }

      const teacherIDs = new Set(
        [subject.teacherID, subjectTeacherID].filter(Boolean).map(String)
      );
      const classIDs = new Set(
        [
          subject.subjectClassID,
          subject.subjectClassIDs,
          subject.classID,
          subject.classDetails?._id,
        ]
          .filter(Boolean)
          .map(String)
      );
      await Promise.all([
        mutate(`api/view-school-subject/${dataID}`),
        ...Array.from(teacherIDs, (teacherID) =>
          mutate(`api/view-teacher-detail/${teacherID}`)
        ),
        ...Array.from(classIDs, (classID) =>
          mutate(`api/view-class-info/${classID}`)
        ),
        mutate("api/view-classrooms/"),
      ]);

      const modal = document.getElementById(
        `assign_class_subject_${subjectID}`
      ) as HTMLInputElement | null;
      if (modal) modal.checked = false;
      setSubjectTeacherID("");
      toast.success("Teacher assigned to subject successfully");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Unable to assign subject"
      );
    } finally {
      setAssigningSubjectID(null);
    }
  };

  const [state, setState] = useState("");

  const handleSubjectSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchSubject(e.target.value);
  };

  const sortedSubjects = schoolSubject?.subjects?.sort((a, b) =>
    a.subjectTitle?.localeCompare(b.subjectTitle)
  );

  const subjectSearch = sortedSubjects?.filter((subject: any) => {
    const subjectName =
      `${subject?.subjectTitle} ${subject?.designated}`.toLowerCase();
    return subjectName.includes(searchSubject.toLowerCase());
  });
  const [file, setFile] = useState<File | null>(null);
  const [toggle, setToggle] = useState(false);

  const handleBulkSubject = () => {
    console.log("Preparing Subject Bulk Upload...", { schoolID: data?._id, hasFile: !!file });
    setToggle(true);
    const formData = new FormData();
    formData.append("file", file as any);

    bulkUploadofSubjectWithQueue(data?._id, formData)
      .then((res: any) => {
        console.log("Subject Bulk Upload Response:", res);
        if (res && res.queued) {
          toast.success("Upload queued — will be submitted when online");
        } else {
          toast.success(res?.data?.message || "Subjects Have Been Successfully Imported");
        }
        mutate(`api/view-school-subject/${data?._id}`);
      })
      .catch((err: any) => {
        console.error("Subject Bulk Upload Error:", err);
        toast.error(err?.response?.data?.message || "Failed to upload subjects");
      })
      .finally(() => {
        setToggle(false);
        setFile(null);
        const inputEl = document.getElementById("file") as HTMLInputElement;
        if (inputEl) inputEl.value = "";
      });
  };
  const [propsID, setPropsID] = useState<string | null>("");
  const [propsIDII, setPropsIDII] = useState<string | null>("");

  const handleDeleteSubject = async (subject: SubjectRecord) => {
    const subjectID = subject._id;
    if (!dataID || !subjectID) {
      toast.error("Unable to identify this subject");
      return;
    }

    if (
      !window.confirm(
        `Delete ${subject?.subjectTitle || "this subject"} from ${
          subject?.designated || "its classroom"
        }? This cannot be undone.`
      )
    ) {
      return;
    }

    setPropsIDII(subjectID);
    try {
      const response = await deletSubject(dataID, subjectID);
      if (response?.status !== 201) {
        toast.error(
          response?.response?.data?.message ||
            response?.data?.message ||
            "Unable to delete subject"
        );
        return;
      }

      const classroomIDs = new Set(
        [
          subject?.subjectClassID,
          subject?.subjectClassIDs,
          subject?.classID,
          subject?.classDetails?._id,
        ]
          .filter(Boolean)
          .map(String)
      );
      await Promise.all([
        mutate(`api/view-school-subject/${dataID}`),
        mutate("api/view-classrooms/"),
        mutate(`api/view-classrooms/${dataID}`),
        ...Array.from(classroomIDs, (classID) =>
          mutate(`api/view-class-info/${classID}`)
        ),
        ...(subject?.teacherID
          ? [mutate(`api/view-teacher-detail/${subject.teacherID}`)]
          : []),
      ]);
      toast.success("Subject deleted from the school and classroom");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Unable to delete subject"
      );
    } finally {
      setPropsIDII(null);
    }
  };

  return (
    <div>
      <LittleHeader name={"View Subject"} />
      <Toaster position="top-center" reverseOrder={true} />
      <div className="mb-10" />

      <div className="flex w-full justify-between items-start">
        <Input
          placeholder="Search Subject Or Class Name "
          className="ml-0"
          value={searchSubject}
          onChange={handleSubjectSearch}
        />

        {file ? (
          <Button
            name={
              toggle ? (
                <div className="flex items-center gap-2 duration-300 transition-all">
                  <FaSpinner className="animate-spin text-[18px]" />
                  <span>Uploading Data</span>
                </div>
              ) : (
                "Add file to Subject"
              )
            }
            className="uppercase lg:text-[12px] text-[9px] font-medium bg-red-500 py-2 sm:py-4 md:py-2 lg:py-4 md:px-4 hover:bg-red-600 cursor-pointer transition-all duration-300"
            onClick={handleBulkSubject}
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
      </div>
      <div className="py-6 px-2  border rounded-md min-w-[300px] overflow-y-hidden ">
        <div className="text-[gray] w-[1250px] flex  gap-2 text-[12px] font-medium uppercase mb-10 px-4">
          <div className="w-[200px] border-r">Subject Name</div>

          <div className="w-[300px] border-r">Teacher Info</div>
          <div className="w-[100px] border-r">Class</div>
          <div className="w-[150px] border-r">Assign Teacher</div>
          <div className="w-[230px] border-r">Remove Subject from Teacher</div>
          <div className="w-[200px] border-r">Delete Subject</div>
        </div>

        <div className=" w-[1250px] overflow-hidden ">
          {subjectSearch?.map((props: any, i: number) => (
            <div>
              <div>
                <div
                  key={props}
                  className={`w-full flex items-center gap-2 text-[12px] font-medium  min-h-16 px-4 my-2  overflow-hidden ${
                    i % 2 === 0 ? "bg-slate-50" : "bg-white"
                  }`}
                >
                  <div className="w-[200px] border-r">
                    {props?.subjectTitle}
                  </div>

                  <div className={`w-[300px] border-r `}>
                    {props?.subjectTeacherName ? (
                      <div>
                        <TeacherInfo props={props?.teacherID} />
                      </div>
                    ) : (
                      "Not assigned yet"
                    )}
                  </div>

                  <div className="w-[100px] border-r">{props?.designated}</div>

                  <div className="w-[150px] border-r">
                    <div className="mt-5 text-[13px] font-medium">
                      <label
                        htmlFor={`assign_class_subject_${props._id}`}
                        className=" my-3 bg-blue-950 text-white py-2 px-4 rounded-md text-[12px] transition-all duration-300 hover:text-white cursor-pointer "
                        onClick={() => {
                          setState(props._id);
                          setSubjectTeacherID("");
                        }}
                      >
                        + Assign Teacher
                      </label>
                      <div className="mt-5" />
                      {/* Put this part before </body> tag */}
                      <input
                        type="checkbox"
                        id={`assign_class_subject_${props._id}`}
                        className="modal-toggle"
                      />
                      <div className="modal  rounded-md" role="dialog">
                        <div className="modal-box bg-white rounded-md">
                          <p className="flex items-center justify-between my-4 ">
                            <p className="font-bold">Add New Subject</p>

                            <label
                              htmlFor={`assign_class_subject_${props._id}`}
                              className="hover:bg-blue-50 transition-all duration-300  cursor-pointer rounded-full flex items-center justify-center w-6 h-6 font-bold "
                            >
                              <MdClose />
                            </label>
                          </p>
                          <hr />

                          <p className="mt-2 leading-tight text-[13px] font-medium">
                            Please note that by assigning this subject to this
                            class, it automtically becomes one of the class must
                            take suject.
                            <br />
                            <br />
                            <div className="flex gap-2  items-center">
                              <p>
                                Subject:{" "}
                                {
                                  schoolTeacher?.staff?.find(
                                    (teacher: any) =>
                                      String(teacher?._id) === subjectTeacherID
                                  )?.staffName
                                }
                              </p>
                              {subjectTeacherID && (
                                <div className="flex items-center font-bold">
                                  <span>selected</span>
                                  <MdCheck className="text-green-500 text-[25px] mb-1 " />
                                </div>
                              )}
                            </div>
                          </p>

                          <div className="mt-10 w-full gap-2 flex flex-col items-center">
                            <div className="w-full flex flex-col">
                              <label className="font-medium text-[12px]">
                                Subject Teacher{" "}
                                <span className="text-red-500">*</span>
                              </label>
                              <select
                                className="select bg-gray-100 select-info mt-1 text-[12px] py-0 px-2 w-full max-w-xs mb-3"
                                value={subjectTeacherID}
                                onChange={(
                                  e: React.ChangeEvent<HTMLSelectElement>
                                ) => {
                                  setSubjectTeacherID(e.target.value);
                                }}
                              >
                                <option value="" disabled>
                                  Select the subject Teacher
                                </option>
                                {schoolTeacher?.staff.map(
                                  (props: any, i: number) => (
                                    <option value={props?._id} key={props?._id || i}>
                                      {props.staffName}
                                      {/* Peter */}
                                    </option>
                                  )
                                )}
                              </select>
                            </div>
                          </div>

                          <div className="w-full flex justify-end transition-all duration-300">
                            {subjectTeacherID !== "" ? (
                              <button
                                type="button"
                                disabled={assigningSubjectID === state}
                                className={`rounded-md bg-blue-950 px-6 py-2 text-white ${
                                  assigningSubjectID === state
                                    ? "cursor-not-allowed opacity-60"
                                    : "cursor-pointer"
                                }`}
                                onClick={(event) => {
                                  event.preventDefault();
                                  void onTeacherSubject(props);
                                }}
                              >
                                {assigningSubjectID === state
                                  ? "Assigning…"
                                  : "Proceed"}
                              </button>
                            ) : (
                              <Button
                                name="Can't Proceed"
                                className="bg-[lightgray] text-blue-950 mx-0 cursor-not-allowed"
                              />
                            )}
                          </div>
                        </div>

                        <label
                          className="modal-backdrop"
                          htmlFor={`assign_class_subject_${props._id}`}
                        >
                          Close
                        </label>
                      </div>
                    </div>
                  </div>
                  {/* name */}

                  <label
                    className="w-[230px] my-3 bg-neutral-900 text-white py-2 px-4 flex justify-center items-center rounded-md text-[12px] transition-all duration-300 cursor-pointer "
                    onClick={() => {
                      setPropsID(props._id);
                      removeTeacherSubject(
                        dataID,
                        props?.teacherID,
                        props?._id
                      ).then((res: any) => {
                        if (res.status === 200) {
                          // mutate(`api/view-teacher-detail/${props?.teacherID}`);
                          mutate(`api/view-school-subject/${dataID}`);
                          toast.success(
                            "subject Remove from Teacher's Archieve"
                          );
                          setPropsID(null);
                        } else {
                          toast.error("something went wrong");
                          setPropsID(null);
                        }
                      });
                    }}
                  >
                    {propsID === props._id ? (
                      <span className="flex items-center gap-2">
                        <FaSpinner className="animate-spin text-[16px]" />{" "}
                        Removing Subject's Teacher
                      </span>
                    ) : (
                      " - Remove Subject from Teacher"
                    )}
                  </label>
                  <label
                    className="w-[200px] my-3 bg-red-500 text-white py-2 px-4 flex justify-center items-center rounded-md text-[12px] transition-all duration-300 cursor-pointer "
                    onClick={() => handleDeleteSubject(props)}
                  >
                    {propsIDII === props._id ? (
                      <span className="flex items-center gap-2">
                        <FaSpinner className="animate-spin text-[16px]" />{" "}
                        Deleting Subject's Archive
                      </span>
                    ) : (
                      " - Delete This Subject"
                    )}
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewSubjects;
