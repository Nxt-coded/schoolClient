// import moment from "moment"
import { useDispatch, useSelector } from "react-redux";
import pix from "../../../assets/pix.jpg";
import { Link, useParams } from "react-router-dom";
import { displayClass } from "../../../global/reduxState";
import LittleHeader from "../../../components/layout/LittleHeader";
import Button from "../../../components/reUse/Button";
import { FaStar } from "react-icons/fa6";
import { useSchoolClassRM, useViewSessionTerm } from "../../hook/useSchoolAuth";
import { FC } from "react";
import { useTeacherDetail } from "../../../pagesForTeachers/hooks/useTeacher";
import lodash from "lodash";

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
          <span>{teacherDetail?.staffRating?.toFixed(2)}</span>
        </p>
      </div>
    </div>
  );
};

const Result = () => {
  const { session, term, termID } = useParams();

  const dispatch = useDispatch();
  const data = Array.from({ length: 0 });

  const { schoolClassroom } = useSchoolClassRM();

  const classroom = useSelector((state: any) => state.classroomToggled);
  const { sessionTermData } = useViewSessionTerm(termID);

  document.title = `Viewing ${sessionTermData?.data?.year} session of ${sessionTermData?.data?.presentTerm}`;

  return (
    <div className="">
      {/* header */}
      <div className="mb-0" />
      <LittleHeader
        name={`Viewing ${sessionTermData?.data?.year} session of ${sessionTermData?.data?.presentTerm}`}
      />

      <div className="mt-10" />
      <div
        className="py-6 px-2 border rounded-md min-w-[300px] overflow-y-hidden "
        style={{ color: "var(--secondary)" }}
      >
        <div className="text-[gray] w-[1480px] flex  gap-2 text-[12px] font-medium uppercase mb-10 px-4">
          <div className="w-[80px] border-r">Class</div>
          <div className="w-[100px] border-r">Number of Students</div>

          <div className="w-[120px] border-r">Number of Subjects Offered</div>

          <div className="w-[220px] border-r">class teacher Info</div>

          <div className="w-[150px] border-r">Class Academic Performance</div>
          <div className="w-[150px] border-r">SchoolFee Paid</div>
          <div className="w-[150px] border-r">SchoolFee UnPaid</div>

          <div className="w-[220px] border-r">view Results</div>
        </div>

        <div className=" w-[1480px] overflow-hidden">
          {lodash
            .sortBy(sessionTermData?.data?.classResult, "className")
            .map((props: any, i: number) => (
              <div key={props._id}>
                <div>
                  <div
                    key={props}
                    className={`w-full flex items-center gap-2 text-[12px] font-medium  h-16 px-4 my-2  overflow-hidden ${
                      i % 2 === 0 ? "bg-slate-50" : "bg-white"
                    }`}
                  >
                    <div className="w-[80px] border-r">{props.className}</div>

                    <div className={`w-[100px] border-r pl-4`}>
                      {props?.students?.length}
                    </div>
                    <div className={`w-[120px] border-r pl-4`}>
                      {props?.classSubjects.length}
                    </div>

                    {/* name */}
                    <div className="w-[220px]">
                      {props.classTeacherName ? (
                        <TeacherDetails props={props.teacherID} />
                      ) : (
                        <div>no teacher assigned yet</div>
                      )}
                    </div>
                    {props?.classPerformance < 40 ? (
                      <div className="w-[150px] border-r pl-4 text-red-500 font-semibold">
                        {props?.classPerformance}%
                      </div>
                    ) : (
                      <div className="w-[150px] border-r pl-4">
                        {props?.classPerformance}%
                      </div>
                    )}

                    <div className="w-[150px] border-r pl-4 text-green-600 text-bold">
                      {sessionTermData?.data?.presentTerm === "1st Term"
                        ? isNaN(
                            Math.floor(
                              (props?.schoolFeesHistory?.length /
                                props?.students?.length) *
                                100
                            )
                          )
                          ? 0
                          : Math.floor(
                              (props?.schoolFeesHistory?.length /
                                props?.students?.length) *
                                100
                            )
                        : sessionTermData?.data?.presentTerm === "2nd Term"
                        ? isNaN(
                            Math.floor(
                              (props?.schoolFeesHistory2?.length /
                                props?.students?.length) *
                                100
                            )
                          )
                          ? 0
                          : Math.floor(
                              (props?.schoolFeesHistory2?.length /
                                props?.students?.length) *
                                100
                            )
                        : sessionTermData?.data?.presentTerm === "3rd Term"
                        ? isNaN(
                            Math.floor(
                              (props?.schoolFeesHistory3?.length /
                                props?.students?.length) *
                                100
                            )
                          )
                          ? 0
                          : Math.floor(
                              (props?.schoolFeesHistory3?.length /
                                props?.students?.length) *
                                100
                            )
                        : null}
                      %
                    </div>
                    <div className="w-[150px] border-r pl-4 text-red-500 font-semibold">
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

                    <Link
                      to={`student-result/${props._id}`}
                      className="w-[220px] border-r"
                    >
                      <Button
                        name="View Student Results"
                        className="py-3 w-[86%] bg-black text-white  hover:bg-neutral-800 transition-all duration-300"
                        onClick={() => {}}
                      />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Result;
