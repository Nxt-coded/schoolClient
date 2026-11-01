document.title = "view class info for result approval";

import LittleHeader from "../../../components/static/LittleHeader";
import pix from "../../../assets/pix.jpg";
import {
  useSchoolClassRM,
  useSchoolTeacher,
  useSchoolTeacherDetail,
} from "../../hook/useSchoolAuth";
import { useState, FC } from "react";
import { MdCheck, MdClose } from "react-icons/md";

import toast, { Toaster } from "react-hot-toast";

import { Link } from "react-router-dom";

interface iProps {
  props?: any;
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
        <div className="text-[10px] opacity-50 flex flex-wrap gap-2 font-semibold">
          {schoolSubjectTeacherDetail?.classesAssigned?.map((el: any) => (
            <div>{el.className}</div>
          ))}{" "}
        </div>
        <p className="mt-1">Teacher</p>
      </div>
    </div>
  );
};

const ClassMidTermReady = () => {
  const [subjectTeacher, setSubjectTeacher] = useState("");
  const { schoolTeacher } = useSchoolTeacher();
  const { schoolClassroom } = useSchoolClassRM();

  return (
    <div>
      <LittleHeader name={"View Subject"} />
      <Toaster position="top-center" reverseOrder={true} />
      <div className="mb-28" />

      <div className="mb-28" />

      <div className="py-6 px-2  border rounded-md min-w-[300px] overflow-y-hidden ">
        <div className="text-[gray] w-[1250px] flex  gap-2 text-[12px] font-medium uppercase mb-10 px-4">
          <div className="w-[200px] border-r">Class</div>

          <div className="w-[200px] border-r">Teacher Info</div>

          <div className="w-[150px] border-r">Class Academic Performance</div>

          <div className="w-[150px] border-r">SchoolFee Paid</div>
          <div className="w-[150px] border-r ">SchoolFee UnPaid</div>
          <div className="w-[100px] border-r">Number of Students</div>

          <div className="w-[300px] border-r">view/Approve</div>
        </div>

        <div className=" w-[1250px] overflow-hidden ">
          {schoolClassroom?.classRooms?.map((props: any, i: number) => (
            <div>
              <div>
                <div
                  key={props}
                  className={`w-full flex items-center gap-2 text-[12px] font-medium  min-h-16 px-4 my-2  overflow-hidden ${
                    i % 2 === 0 ? "bg-slate-50" : "bg-white"
                  }`}
                >
                  <div className="w-[200px] border-r">{props?.className}</div>

                  <div className={`w-[200px] border-r `}>
                    {props?.classTeacherName ? (
                      <div>
                        <TeacherInfo props={props?.teacherID} />
                      </div>
                    ) : (
                      "Not assigned yet"
                    )}
                  </div>

                  <div className="w-[150px] border-r pl-4">
                    {props?.classPerformance}%
                  </div>
                  <div className="w-[150px] border-r pl-4">
                    {schoolClassroom?.presentTerm === "1st Term"
                      ? Math.floor(
                          (props?.schoolFeesHistory?.length /
                            props?.students?.length) *
                            100
                        )
                      : schoolClassroom?.presentTerm === "2nd Term"
                      ? Math.floor(
                          (props?.schoolFeesHistory2?.length /
                            props?.students?.length) *
                            100
                        )
                      : schoolClassroom?.presentTerm === "3rd Term"
                      ? Math.floor(
                          (props?.schoolFeesHistory3?.length /
                            props?.students?.length) *
                            100
                        )
                      : null}
                    %
                  </div>
                  <div className="w-[150px] border-r pl-4 text-red-500">
                    {schoolClassroom?.presentTerm === "1st Term"
                      ? Math.floor(
                          ((props?.students?.length -
                            props?.schoolFeesHistory?.length) /
                            props?.students?.length) *
                            100
                        )
                      : schoolClassroom?.presentTerm === "2nd Term"
                      ? Math.floor(
                          ((props?.students?.length -
                            props?.schoolFeesHistory?.length) /
                            props?.students?.length) *
                            100
                        )
                      : schoolClassroom?.presentTerm === "3rd Term"
                      ? Math.floor(
                          ((props?.students?.length -
                            props?.schoolFeesHistory?.length) /
                            props?.students?.length) *
                            100
                        )
                      : null}
                    %
                  </div>

                  <div className="w-[100px] border-r">
                    {props?.students?.length}
                  </div>

                  <div className="w-[300px] border-r">
                    <div className="mt-5 text-[13px] font-medium">
                      <Link
                        to={`/class-midresult-approve/${props?._id}`}
                        className=" my-3 py-4 bg-blue-950 text-white px-4 rounded-md text-[12px] transition-all duration-300 hover:text-white cursor-pointer "
                      >
                        View/Approve Mid-Result
                      </Link>
                      <div className="mt-5" />
                      {/* Put this part before </body> tag */}
                      <input
                        type="checkbox"
                        id="assign_class_subject"
                        className="modal-toggle"
                      />
                      <div className="modal  rounded-md" role="dialog">
                        <div className="modal-box bg-white rounded-md">
                          <p className="flex items-center justify-between my-4 ">
                            <p className="font-bold">Add New Subject</p>

                            <label
                              htmlFor="assign_class_subject"
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
                              <p> Subject: {subjectTeacher}</p>
                              {subjectTeacher && (
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
                                value={subjectTeacher}
                                onChange={(
                                  e: React.ChangeEvent<HTMLSelectElement>
                                ) => {
                                  setSubjectTeacher(e.target.value);
                                }}
                              >
                                <option disabled selected>
                                  Select the subject Teacher
                                </option>
                                {schoolTeacher?.staff.map(
                                  (props: any, i: number) => (
                                    <option value={props?.staffName} key={i}>
                                      {props.staffName}
                                      {/* Peter */}
                                    </option>
                                  )
                                )}
                              </select>
                            </div>
                          </div>
                        </div>

                        <label
                          className="modal-backdrop"
                          htmlFor="assign_class_subject"
                        >
                          Close
                        </label>
                      </div>
                    </div>
                  </div>
                  {/* name */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClassMidTermReady;
