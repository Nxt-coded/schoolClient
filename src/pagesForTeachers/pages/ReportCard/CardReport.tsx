document.title = "View Students Grades";
import pix from "../../../assets/pix.jpg";
import Button from "../../../components/reUse/Button";
import LittleHeader from "../../../components/static/LittleHeader";
import moment from "moment";
import { FC, useState } from "react";
import {
  useSchoolSessionData,
  useStudentAttendance,
} from "../../../pages/hook/useSchoolAuth";
import {
  useClassStudent,
  useClassSubject,
  useSchoolAnnouncement,
  useStudentGrade,
  useStudentMidGrade,
  useTeacherInfo,
} from "../../hooks/useTeacher";
import {
  midReportCardRemark,
  psychoReportCardRemark,
  readClassInfo,
  remark,
  reportCardRemark,
  viewStudentGrade,
} from "../../api/teachersAPI";
import { mutate } from "swr";
import toast, { Toaster } from "react-hot-toast";
import Input from "../../components/reUse/Input";
import { checkPromotionStatus } from "../../../utils/promotionUtils";
import {
  useReadMyClassInfoData,
  useReadOneClassInfo,
} from "../../../pagesForStudents/hooks/useStudentHook";
import lodash from "lodash";
import ClipLoader from "react-spinners/ClipLoader";

interface iProps {
  props?: any;
  id?: string;
  el?: any;
  data?: any;
  i?: number;
  stateValue?: string;
  teacherInfo?: any;
  oneClass?: any;
}

const ButtonReport: FC<iProps> = ({ stateValue, props, teacherInfo }) => {
  const { gradeData } = useStudentGrade(props?._id);
  const { schoolInfo } = useSchoolSessionData(props?.schoolIDs);

  // SS 1A session: 2024/2025(Second Term)

  // let result = gradeData?.reportCard
  //   .find((el: any) => {
  //     return el.classInfo ===  `${props?.classAssigned} session: ${schoolInfo[0]?.year}(${schoolInfo[0]?.presentTerm})`;
  //   })
  //   ?.result?.find((data: any) => {
  //     return data.subject === el?.subjectTitle;
  //   });

  let result = gradeData?.reportCard.find((el: any) => {
    return (
      el.classInfo ===
      `${props?.classAssigned} session: ${schoolInfo[0]?.year}(${schoolInfo[0]?.presentTerm})`
    );
  });


  console.log("gradeData: ", stateValue);

  return (
    <div className="w-[180px] border-r">
      <Button
        name="Add Comment"
        className="pl-4 py-3 w-[85%] bg-black text-white  hover:bg-neutral-800 transition-all duration-300"
        onClick={() => {
          if (stateValue !== "") {
            reportCardRemark(teacherInfo?._id, props?._id, {
              teacherComment: stateValue,
            }).then((res: any) => {
              if (res.status === 201) {
                mutate(`api/student-report-card/${props?._id}`);
                toast.success("Report Card Report Noted");
              } else {
                toast.error(`${res?.response?.data?.message}`);
              }
            });
          } else {
            toast.error("Please give a REMARK");
          }
        }}
      />
    </div>
  );
};

const SubjectScore: FC<iProps> = ({ props, el }) => {
  const { gradeData } = useStudentGrade(props?._id);
  const { schoolInfo } = useSchoolSessionData(props?.schoolIDs);
  const { schoolAnnouncement } = useSchoolAnnouncement(props?.schoolIDs);

  let result = gradeData?.reportCard
    .find((el: any) => {
      return (
        el.classInfo ===
        `${props?.classAssigned} session: ${
          schoolInfo?.find(
            (el) => el?.year === schoolAnnouncement?.presentSession
          )?.year
        }(${
          (schoolAnnouncement?.presentTerm
          )
        })`
      );
    })
    ?.result?.find((data: any) => {
      return data.subject === el?.subjectTitle;
    });

  return (
    <div className="w-[200px] border-r-2 border-blue-950 ">
      <div className="w-[260px] border-">
        <p className="pl-1 font-bold text-[15px] capitalize ">
          {result?.subject
            ? result?.subject.length > 21
              ? result?.subject.slice(0, 21).concat("...")
              : result?.subject
            : "Have't Entered"}
        </p>

        <div className="pl-1 flex gap-1 mt-2 text-[10px] ">
          {/* <p className="w-[30px] border-r">1st</p>
          <p className="w-[30px] border-r">2nd</p>
          <p className="w-[30px] border-r">3rd</p> */}
          <p className="w-[30px] border-r">Test</p>
          <p className="w-[35px] border-r">Exam</p>
          <p className="w-[35px] ">Total</p>
          <p className="w-[35px] ">Grade</p>
        </div>
      </div>
      <div className="pl-1 flex gap-1 mt-2 text-[12px] ">
        {/* <p className="w-[30px] border-r">{result?.test1 ? result?.test1 : 0}</p> */}
        {/* <p className="w-[30px] border-r">{result?.test2 ? result?.test2 : 0}</p>
        <p className="w-[30px] border-r">{result?.test3 ? result?.test3 : 0}</p>*/}
        <p className="w-[30px] border-r">{result?.test4 ? result?.test4 : 0}</p>
        <p className="w-[35px] border-r">{result?.exam ? result?.exam : 0}</p>
        <p className="w-[35px] font-bold border-r">
          {result?.mark ? result?.mark : 0}
        </p>
        <p className="w-[35px] font-bold">
          {result?.grade ? result?.grade : "Nill"}
        </p>
      </div>
    </div>
  );
};

const MainStudentRow: FC<iProps> = ({ props, i, oneClass: theClass }) => {
  const { teacherInfo } = useTeacherInfo();
  const { gradeData } = useStudentGrade(props?._id);
  const { subjectData } = useClassSubject(theClass?._id);
  const { schoolInfo } = useSchoolSessionData(props?.schoolIDs);

  const [loading, setLoading] = useState<boolean>(false);
  const [attendance, setAttendace] = useState<string>("");

  const { schoolAnnouncement } = useSchoolAnnouncement(teacherInfo?.schoolIDs);
  let result = gradeData?.reportCard.find((el: any) => {
    return (
      el.classInfo ===
      `${props?.classAssigned} session: ${
        schoolInfo?.find(
          (el) => el?.year === schoolAnnouncement?.presentSession
        )?.year
      }(${schoolAnnouncement?.presentTerm})`
    );
  });

  const [stateValue, setStateValue] = useState(
    `${result?.classTeacherComment ? result?.classTeacherComment : ""}`
  );

  return (
    <div
      className={`w-full flex items-center gap-2 text-[12px] font-medium  h-28 px-4 my-2  overflow-hidden ${
        i % 2 === 0 ? "bg-slate-50" : "bg-white"
      }`}
    >
      <div className={`w-[100px] border-r font-bold`}>{i + 1}</div>
      {/* name */}
      <div className="w-[250px] flex border-r">
        <div className="flex gap-2">
          <img
            className=" mask mask-squircle w-14 h-14 rounded-md border object-cover"
            src={pix}
          />

          <div className="w-[180px] flex flex-col justify-center">
            <div>
              {props?.studentFirstName} {props?.studentLastName}
            </div>
            {(() => {
              const prom = checkPromotionStatus(
                schoolAnnouncement,
                result?.result || [],
                result?.points || 0
              );
              return (
                <div
                  className={`text-[10px] font-bold uppercase mt-1 px-1.5 py-0.5 rounded border max-w-fit ${
                    prom.isRepeat
                      ? "bg-red-100 text-red-700 border-red-300"
                      : "bg-green-100 text-green-700 border-green-300"
                  }`}
                  title={prom.reason}
                >
                  {prom.status}
                </div>
              );
            })()}
          </div>
        </div>
      </div>
      <div className="w-[300px] border-r">
        {/* <AttendanceRatio props={props} /> */}

        <textarea
          className="border rounded-sm w-[94%] p-1 text-[12px] h-20 resize-none mx-2"
          placeholder="Add comment about student's general performance"
          value={stateValue}
          onChange={(e) => {
            setStateValue(e.target.value);
          }}
        />
      </div>

      <div className="w-[100px] border-r">{result?.points}</div>

      <div className="w-[100px] border-r">{result?.grade}</div>

      <div
        className={`w-[${
          subjectData?.classSubjects.length * 270
        }px] border-r items-center flex`}
      >
        <div className="flex gap-4">
          {lodash
            .sortBy(subjectData?.classSubjects, "subjectTitle")
            ?.map((el: any) => (
              <SubjectScore props={props} el={el} />
            ))}
        </div>
      </div>

      <div className="w-[100px] border-r">
        <input
          type="text"
          className="pl-2 w-[90%] h-[45px] border"
          placeholder="70/100"
          defaultValue={result?.attendance ? result?.attendance : ""}
          value={attendance}
          onChange={(e: any) => setAttendace(e.target.value)}
        />
      </div>

      {/* <div className="w-[300px] border-r">
        <textarea
          className="border rounded-sm w-[94%] p-1 text-[12px] h-14 resize-none mx-2"
          placeholder={`${
            result?.classTeacherComment
              ? result?.classTeacherComment
              : "Give a Remark"
          } `}
          defaultValue={
            result?.classTeacherComment ? result?.classTeacherComment : ""
          }
          value={stateValue}
          onChange={(e) => {
            setStateValue(e.target.value);
          }}
        />
      </div> */}

      <div className="w-[180px] border-r relative">
        <Button
          name={
            result?.classTeacherComment
              ? "Approve Result"
              : loading
              ? "Loading"
              : "Result Approved"
          }
          icon={
            loading && (
              <ClipLoader
                color="white"
                size={20}
                className="absolute left-7 top-5"
              />
            )
          }
          className={`pl-4 py-3 w-[85%]  text-white ${
            result?.attendance
              ? "bg-black hover:bg-neutral-800 "
              : "bg-red-500 hover:bg-red-600 "
          } transition-all duration-300`}
          onClick={() => {
            setLoading(true);
            // if (result?.classTeacherComment !== "") {
            reportCardRemark(teacherInfo?._id, props?._id, {
              attendance,
              teacherComment: stateValue,
            }).then((res: any) => {
              setLoading(false);
              if (res.status === 201) {
                mutate(`api/student-report-card/${props?._id}`);
                toast.success("Report Card Approved");
              } else {
                toast.error(`${res?.response?.data?.message}`);
              }
            });
            // }
            // else {
            //   toast.error("Please give a REMARK");
            //   setLoading(false);
            // }
          }}
        />
      </div>
    </div>
  );
};

const Remark: FC<iProps> = ({ id, data }) => {
  const { mainStudentAttendance } = useStudentAttendance(id!);

  let name2 = data?.studentFirstName;

  let result = mainStudentAttendance?.data?.attendance?.find((el: any) => {
    return el?.studentFirstName === name2;
  });

  let timer = Date.now();

  return (
    <div
      className={`w-[100px] border-r 
      ${
        result?.present
          ? "text-green-600"
          : result?.absent
          ? "text-red-600"
          : null
      }`}
    >
      {moment(result?.createdAt).format("ll") === moment(timer).format("ll") &&
      result?.present
        ? "Present"
        : result?.absent
        ? "Absent"
        : null}
    </div>
  );
};

const AttendanceRatio: FC<iProps> = ({ props }) => {
  const { mainStudentAttendance } = useStudentAttendance(props?._id);

  return (
    <div>
      {(mainStudentAttendance?.data?.attendance?.filter(
        (el: any) => el.present === true
      ).length /
        mainStudentAttendance?.data?.attendance?.length) *
      100 ? (
        <div>
          {(
            (mainStudentAttendance?.data?.attendance?.filter(
              (el: any) => el.present === true
            ).length /
              mainStudentAttendance?.data?.attendance?.length) *
            100
          ).toFixed(2)}
          %
        </div>
      ) : (
        <p>0%</p>
      )}
    </div>
  );
};

const SubjectMap: FC<iProps> = ({ props, i }) => {
  return <div className="w-[200px] border-r ">subject Offered</div>;
};

const MainStudentPsycho: FC<iProps> = ({ props, i }) => {
  const { teacherInfo } = useTeacherInfo();
  const { gradeData } = useStudentGrade(props?._id);

  const { schoolInfo } = useSchoolSessionData(props?.schoolIDs);
  const [loading, setLoading] = useState<boolean>(false);

  const [confidence, setConfidence] = useState<string>("10");
  const [communication, setCommunication] = useState<string>("10");
  const [leadership, setLeadership] = useState<string>("10");
  const [punctuality, setPunctuality] = useState<string>("10");
  const [empathy, setEmpathy] = useState<string>("10");
  const [presentational, setPresentational] = useState<string>("10");
  const [hardworking, setHardworking] = useState<string>("10");
  const [resilient, setResilient] = useState<string>("10");
  const [sportship, setSportship] = useState<string>("10");

  // let result = gradeData?.reportCard.find((el: any) => {
  //   return (
  //     el.classInfo ===
  //     `${props?.classAssigned} session: ${schoolInfo![0]!?.year}(${
  //       schoolInfo![0]!?.presentTerm
  //     })`
  //   );
  // });

  const { schoolAnnouncement: data } = useSchoolAnnouncement(
    teacherInfo?.schoolIDs
  );

  let result = gradeData?.reportCard.find((el: any) => {
    return (
      el.classInfo ===
      `${props?.classAssigned} session: ${
        schoolInfo?.find((el) => el?.year === data?.presentSession)?.year
      }(${
        schoolInfo?.find((el) => el?.presentTerm === data?.presentTerm)
          ?.presentTerm
      })`
    );
  });

  return (
    <div
      className={`w-full flex items-center gap-2 text-[12px] font-medium  h-28 px-4 my-2  overflow-hidden ${
        i % 2 === 0 ? "bg-slate-50" : "bg-white"
      }`}
    >
      <div className={`w-[30px] border-r font-bold `}>{i + 1}</div>
      {/* name */}
      <div className="w-[250px] flex border-r">
        <div className="flex gap-2">
          <img
            className=" mask mask-squircle w-14 h-14 rounded-md border object-cover"
            src={pix}
          />

          <div className="w-[180px] ">
            {" "}
            {props?.studentFirstName} {props?.studentLastName}
          </div>
        </div>
      </div>

      <div className={`w-[420px] bg- border-r items-center flex`}>
        <div className="flex flex-col">
          <label className="text-[9px] uppercase">Communication</label>
          <input
            className="w-16 h-10 border p-2  mr-16"
            placeholder={
              gradeData?.reportCard[0]?.softSkill[0]?.[`communication`]
                ? gradeData?.reportCard[0]?.softSkill[0]?.[`communication`]
                : "Over 10"
            }
            value={communication}
            onChange={(e) => setCommunication(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-[9px] uppercase">Leadership</label>
          <input
            className="w-16 h-10 border p-2 mr-6"
            placeholder={
              gradeData?.reportCard[0]?.softSkill[0]?.[`leadership`]
                ? gradeData?.reportCard[0]?.softSkill[0]?.[`leadership`]
                : "Over 10"
            }
            value={leadership}
            onChange={(e) => setLeadership(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-[9px] uppercase">Punctuality</label>
          <input
            className="w-16 h-10 border p-2 mr-8"
            placeholder={
              gradeData?.reportCard[0]?.softSkill[0]?.[`punctuality`]
                ? gradeData?.reportCard[0]?.softSkill[0]?.[`punctuality`]
                : "Over 10"
            }
            value={punctuality}
            onChange={(e) => setPunctuality(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-[9px] uppercase">Empathy</label>
          <input
            className="w-16 h-10 border p-2 "
            placeholder={
              gradeData?.reportCard[0]?.softSkill[0]?.[`empathy`]
                ? gradeData?.reportCard[0]?.softSkill[0]?.[`empathy`]
                : "Over 10"
            }
            value={empathy}
            onChange={(e) => setEmpathy(e.target.value)}
          />
        </div>
      </div>

      <div className={`w-[420px] border-r items-center flex`}>
        <div className="flex flex-col">
          <label className="ml-2 text-[9px] uppercase">confidence</label>
          <input
            className="w-16 h-10 border p-2 ml-2 mr-6"
            placeholder={
              gradeData?.reportCard[0]?.peopleSkill[0]?.[`confidence`]
                ? gradeData?.reportCard[0]?.peopleSkill[0]?.[`confidence`]
                : "over 10"
            }
            value={confidence}
            onChange={(e) => setConfidence(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-[9px] uppercase">Presentational</label>
          <input
            className="w-16 h-10 border p-2 mr-14"
            value={presentational}
            placeholder={
              gradeData?.reportCard[0]?.peopleSkill[0]?.[`presentational`]
                ? gradeData?.reportCard[0]?.peopleSkill[0]?.[`presentational`]
                : "Over 10"
            }
            onChange={(e) => setPresentational(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-[9px] uppercase">Hardworking</label>
          <input
            className="w-16 h-10 border p-2 mr-10"
            value={hardworking}
            placeholder={
              gradeData?.reportCard[0]?.peopleSkill[0]?.[`hardworking`]
                ? gradeData?.reportCard[0]?.peopleSkill[0]?.[`hardworking`]
                : "Over 10"
            }
            onChange={(e) => setHardworking(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-[9px] uppercase">Resilient</label>
          <input
            className="w-16 h-10 border p-2 "
            value={resilient}
            placeholder={
              gradeData?.reportCard[0]?.peopleSkill[0]?.[`resilient`]
                ? gradeData?.reportCard[0]?.peopleSkill[0]?.[`resilient`]
                : "Over 10"
            }
            onChange={(e) => setResilient(e.target.value)}
          />
        </div>
      </div>
      <div className={`w-[120px] border-r items-center flex`}>
        <div className="flex flex-col">
          <label className="ml-2 text-[9px] uppercase">Sportship</label>
          <input
            className="w-16 h-10 border p-2 ml-2 mr-6"
            value={sportship}
            placeholder={
              gradeData?.reportCard[0]?.physicalSkill[0]?.[`sportship`]
                ? gradeData?.reportCard[0]?.physicalSkill[0]?.[`sportship`]
                : "Over 10"
            }
            onChange={(e) => setSportship(e.target.value)}
          />
        </div>
      </div>

      <div className="w-[180px] border-r relative">
        <Button
          name={
            result?.classTeacherComment
              ? "Update Psychometric"
              : loading
              ? "Loading"
              : "Add Comment"
          }
          icon={
            loading && (
              <ClipLoader
                color="white"
                size={20}
                className="absolute left-7 top-5"
              />
            )
          }
          className={`pl-4 py-3 w-[85%]  text-white ${
            result?.psycho
              ? "bg-black hover:bg-neutral-800 "
              : "bg-red-500 hover:bg-red-600 "
          } transition-all duration-300`}
          onClick={() => {
            setLoading(true);
            if (
              communication !== "" &&
              confidence !== "" &&
              resilient !== "" &&
              punctuality !== "" &&
              leadership !== "" &&
              empathy !== "" &&
              presentational !== "" &&
              sportship !== "" &&
              hardworking !== ""
            ) {
              psychoReportCardRemark(teacherInfo?._id, props?._id, {
                communication,
                confidence,
                resilient,
                punctuality,
                leadership,
                hardworking,
                presentational,
                empathy,
                sportship,
              }).then((res: any) => {
                setLoading(false);
                if (res.status === 201) {
                  mutate(`api/student-report-card/${props?._id}`);
                  toast.success("Report Card Report Noted");
                } else {
                  toast.error(`${res?.response?.data?.message}`);
                }
              });
            } else {
              toast.error("Please give a REMARK");
            }
          }}
        />
      </div>
    </div>
  );
};

const CardReport = () => {
  const { teacherInfo } = useTeacherInfo();

  const [state, setState] = useState<string>(
    teacherInfo?.classesAssigned[0]?.classID
  );

  const { oneClass } = useReadOneClassInfo(state);
  const { classStudents } = useClassStudent(oneClass?._id!);
  const { subjectData } = useClassSubject(oneClass?._id);
  const allStudents = classStudents?.students;
  const sortedStudents = allStudents?.sort((a: any, b: any) =>
    a.studentFirstName?.localeCompare(b.studentFirstName)
  );

  const [toggle, setToggle] = useState<boolean>(true);
  const [toggle1, setToggle1] = useState<boolean>(false);
  const [toggle2, setToggle2] = useState<boolean>(false);

  return (
    <div className="">
      <Toaster position="top-center" reverseOrder={true} />
      {/* header */}
      <div className="mb-0" />
      <LittleHeader name={"Class Teacher Remark"} />

      <div className="mt-10">
        <div className="text-[12px] font-semibold">Report Record</div>
        <select
          className="select select-bordered  w-full max-w-xs mb-10 mt-2"
          value={state}
          onChange={(e: any) => {
            setState(e.target.value);
          }}
        >
          {teacherInfo?.classesAssigned?.length > 0 ? (
            teacherInfo?.classesAssigned?.map((el: any) => (
              <option value={el?.classID}>{el?.className}</option>
            ))
          ) : (
            <option
              value="No class Assigned yet"
              // disabled
              className="text-black"
            >
              No class Assigned yet
            </option>
          )}
        </select>
      </div>

      <div className="flex uppercase text-[12px] gap-4 mb-5">
        <button
          className={`${
            toggle ? "bg-red-500 text-white" : "bg-slate-200"
          } rounded-md px-6 py-2 duration-300 transition-all`}
          onClick={() => {
            setToggle2(false);
            setToggle1(false);
            setToggle(true);
          }}
        >
          Teacher's Comments
        </button>

        <button
          className={`${
            toggle1 ? "bg-red-500 text-white" : "bg-slate-200"
          } rounded-md px-6 duration-300 transition-all py-2`}
          onClick={() => {
            setToggle1(true);
            setToggle2(false);
            setToggle(false);
          }}
        >
          Psychometric
        </button>
        <button
          className={`${
            toggle2 ? "bg-purple-500 text-white" : "bg-slate-200"
          } rounded-md px-6 duration-300 transition-all py-2`}
          onClick={() => {
            setToggle2(true);
            setToggle1(false);
            setToggle(false);
          }}
        >
          Mid Test
        </button>
      </div>

      <div className="flex w-full justify-end"></div>
      <div className="py-6 px-2 border rounded-md min-w-[300px] overflow-y-hidden ">
        {toggle ? (
          <div>
            <div
              className={`text-[gray] flex  gap-2 text-[12px] font-medium uppercase mb-10 px-4`}
              style={{
                width: `${1120 + subjectData?.classSubjects.length * 260}px`,
              }}
            >
              <div className="w-[100px] border-r">Sequence</div>
              <div className="w-[250px] border-r">student Info</div>
              <div className="w-[300px] border-r">Teacher's Comment</div>

              <div className="w-[100px] border-r">Total Points</div>
              <div className="w-[100px] border-r">Grade</div>
              {/* 260px */}
              <div
                className={`w-[${
                  subjectData?.classSubjects.length * 270
                }px] border-r`}
              >
                {/* <div>Subject Grade</div> */}
                <div className="flex">
                  <div className="flex gap-4">
                    {lodash
                      .sortBy(subjectData?.classSubjects, "subjectTitle")
                      ?.map((props: any, i: number) => (
                        <SubjectMap props={props} i={i} />
                      ))}
                  </div>
                </div>
              </div>

              <div className="w-[100px] border-r">Attendance</div>
              {/* <div className="w-[300px] border-r">Give Report/Remark</div> */}

              <div className="w-[180px] border-r">Submit Report</div>
            </div>

            <div
              className={` overflow-hidden`}
              style={{
                width: `${1120 + subjectData?.classSubjects.length * 260}px`,
              }}
            >
              {sortedStudents?.length > 0 ? (
                <div>
                  {sortedStudents?.map((props: any, i: number) => (
                    <div key={props}>
                      <MainStudentRow props={props} i={i} oneClass={oneClass} />
                    </div>
                  ))}
                </div>
              ) : (
                <div>No student yet</div>
              )}
            </div>
          </div>
        ) : toggle1 ? (
          <div className={`w-[1400px] overflow-hidden`}>
            <div
              className={` overflow-auto text-[gray] flex  gap-2 text-[12px] font-medium uppercase mb-10 px-4`}
              style={
                {
                  // width: `${260 + subjectData?.classSubjects.length * 260}px`,
                }
              }
            >
              <div className="w-[30px] border-r">s/n</div>
              <div className="w-[220px] border-r">student Info</div>

              <div className="w-[420px] border-r px-1">
                <p className="font-semibold text-blue-950 text-[13px]">
                  {" "}
                  Soft Skill
                </p>
                <div className="flex gap-4 mt-4">
                  <p>Communication</p>
                  <p>Leadership</p>
                  <p>Punctuality</p>
                  <p>Empathy</p>
                </div>
              </div>

              <div className="w-[420px] border-r px-1">
                <p className="font-semibold text-blue-950 text-[13px]">
                  People Skill
                </p>
                <div className="flex gap-4 mt-4">
                  <p>confidence</p>
                  <p>Presentational</p>
                  <p>HardWorking</p>
                  <p>resilient</p>
                </div>
              </div>

              <div className="w-[120px] border-r px-1">
                <p className="font-semibold text-blue-950 text-[13px]">
                  {" "}
                  Physical Skill
                </p>
                <div className="flex gap-4 mt-4">
                  <p>Sportship</p>
                </div>
              </div>

              <div className="w-[180px] border-r text-[16px] font-semibold mt-4">
                Submit Record
              </div>
            </div>

            <div
              className={` overflow-hidden`}
              style={
                {
                  // width: `${260 + subjectData?.classSubjects.length * 260}px`,
                }
              }
            >
              {sortedStudents?.length > 0 ? (
                <div>
                  {sortedStudents?.map((props: any, i: number) => (
                    <div key={props}>
                      <MainStudentPsycho props={props} i={i} />
                    </div>
                  ))}
                </div>
              ) : (
                <div>No student yet</div>
              )}
            </div>
          </div>
        ) : toggle2 ? (
          <div>
            <div
              className={`text-[gray] flex  gap-2 text-[12px] font-medium uppercase mb-10 px-4`}
              style={{
                width: `${1120 + subjectData?.classSubjects.length * 260}px`,
              }}
            >
              <div className="w-[100px] border-r">Sequence</div>
              <div className="w-[250px] border-r">student Info</div>
              <div className="w-[100px] border-r">
                Student's Attendance Ratio now
              </div>
              {/* 260px */}
              <div
                className={`w-[${
                  subjectData?.classSubjects.length * 200
                }px] border-r`}
              >
                {/* <div>Subject Grade</div> */}
                <div className="flex">
                  <div className="flex gap-4">
                    {lodash
                      .sortBy(subjectData?.classSubjects, "subjectTitle")
                      ?.map((props: any) => (
                        <div>
                          <SubjectMidMap props={props} />
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              <div className="w-[100px] border-r">Total Points</div>
              <div className="w-[100px] border-r">Grade</div>
              <div className="w-[100px] border-r">Attendance</div>
              {/* <div className="w-[300px] border-r">Give Report/Remark</div> */}

              <div className="w-[180px] border-r">Submit Report</div>
            </div>

            <div
              className={` overflow-hidden`}
              style={{
                width: `${1120 + subjectData?.classSubjects.length * 200}px`,
              }}
            >
              {sortedStudents?.length > 0 ? (
                <div>
                  {sortedStudents?.map((props: any, i: number) => (
                    <div key={props}>
                      <MidTestMainStudentRow
                        props={props}
                        i={i}
                        oneClass={oneClass}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div>No student yet</div>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default CardReport;

const MidTestMainStudentRow: FC<iProps> = ({
  props,
  i,
  oneClass: theClass,
}) => {
  const { teacherInfo } = useTeacherInfo();
  const { gradeData } = useStudentGrade(props?._id);
  const { gradeMidData } = useStudentMidGrade(props?._id);

  const { subjectData } = useClassSubject(theClass?._id);
  const { schoolInfo } = useSchoolSessionData(props?.schoolIDs);

  const [loading, setLoading] = useState<boolean>(false);
  const [attendance, setAttendace] = useState<string>("");

  let result = gradeMidData?.reportCard.find((el: any) => {
    return (
      el.classInfo ===
      `${props?.classAssigned} session: ${schoolInfo![0]!?.year}(${
        schoolInfo![0]!?.presentTerm
      })`
    );
  });

  const reading = gradeMidData?.midReportCard.find((el: any) => {
    return (
      el.classInfo ===
      `${props?.classAssigned} session: ${schoolInfo[0]?.year}(${schoolInfo[0]?.presentTerm})`
    );
  });

  const [stateValue, setStateValue] = useState();
  `${reading?.classTeacherComment ? reading?.classTeacherComment : ""}`;

  return (
    <div
      className={`w-full flex items-center gap-2 text-[12px] font-medium  h-28 px-4 my-2  overflow-hidden ${
        i % 2 === 0 ? "bg-slate-50" : "bg-white"
      }`}
    >
      <div className={`w-[100px] border-r font-bold`}>{i + 1}</div>
      {/* name */}
      <div className="w-[250px] flex border-r">
        <div className="flex gap-2">
          <img
            className=" mask mask-squircle w-14 h-14 rounded-md border object-cover"
            src={pix}
          />

          <div className="w-[180px] ">
            {" "}
            {props?.studentFirstName} {props?.studentLastName}
          </div>
        </div>
      </div>
      <div className="w-[100px] border-r">
        <AttendanceRatio props={props} />
      </div>
      <div
        className={`w-[${
          subjectData?.classSubjects.length * 270
        }px] border-r items-center flex`}
      >
        <div className="flex gap-4">
          {lodash
            .sortBy(subjectData?.classSubjects, "subjectTitle")
            ?.map((el: any) => (
              <div>
                <SubjectMdScore
                  props={props}
                  el={el}
                  gradeMidData={gradeMidData}
                />
              </div>
            ))}
        </div>
      </div>
      <div className="w-[100px] border-r">{reading?.points}</div>
      <div className="w-[100px] border-r">{reading?.grade}</div>
      <div className="w-[100px] border-r">
        <input
          type="text"
          className="pl-2 w-[90%] h-[45px] border"
          placeholder="70/100"
          defaultValue={result?.attendance ? result?.attendance : ""}
          value={attendance}
          onChange={(e: any) => setAttendace(e.target.value)}
        />
      </div>
      <div className="w-[180px] border-r relative">
        <Button
          name={
            result?.classTeacherComment
              ? "Update Comment"
              : loading
              ? "Loading"
              : "Add Comment"
          }
          icon={
            loading && (
              <ClipLoader
                color="white"
                size={20}
                className="absolute left-7 top-5"
              />
            )
          }
          className={`pl-4 py-3 w-[85%]  text-white ${
            result?.classTeacherComment
              ? "bg-black hover:bg-neutral-800 "
              : "bg-red-500 hover:bg-red-600 "
          } transition-all duration-300`}
          onClick={() => {
            setLoading(true);
            if (stateValue !== "") {
              midReportCardRemark(teacherInfo?._id, props?._id, {
                attendance,
                teacherComment: stateValue,
              }).then((res: any) => {
                setLoading(false);
                if (res.status === 201) {
                  mutate(`api/student-report-card/${props?._id}`);
                  toast.success("Report Card Report Noted");
                } else {
                  setLoading(false);
                  toast.error(`${res?.response?.data?.message}`);
                }
              });
            } else {
              toast.error("Please give a REMARK");
            }
          }}
        />
      </div>
    </div>
  );
};

const SubjectMdScore: FC<any> = ({ props, el, gradeMidData }) => {
  const { gradeData } = useStudentGrade(props?._id);
  const { schoolInfo } = useSchoolSessionData(props?.schoolIDs);

  let result = gradeMidData?.midReportCard

    .find((el: any) => {
      return (
        el.classInfo ===
        `${props?.classAssigned} session: ${schoolInfo[0]?.year}(${schoolInfo[0]?.presentTerm})`
      );
    })
    ?.result?.find((data: any) => {
      return data.subject === el?.subjectTitle;
    });

  return (
    <div className="w-[200px] border-r-2 border-blue-950 ">
      <div className="w-[200px] border-">
        <p className="pl-1 font-bold text-[15px] capitalize ">
          {result?.subject ? result?.subject : "Have't Entered"}
        </p>

        <div className="pl-1 flex gap-1 mt-2 text-[10px] ">
          <p className="w-[35px] border-r">Score</p>
          <p className="w-[35px] ">Total</p>
          <p className="w-[35px] ">Grade</p>
        </div>
      </div>
      <div className="pl-1 flex gap-1 mt-2 text-[12px] ">
        <p className="w-[35px] border-r">{result?.exam ? result?.exam : 0}</p>
        <p className="w-[35px] font-bold border-r">
          {result?.mark ? result?.mark : 0}
        </p>
        <p className="w-[35px] font-bold">
          {result?.grade ? result?.grade : "Nill"}
        </p>
      </div>
    </div>
  );
};

const SubjectMidMap: FC<iProps> = ({ props }) => {
  return <div className="w-[200px] border-r ">subject Offered</div>;
};
