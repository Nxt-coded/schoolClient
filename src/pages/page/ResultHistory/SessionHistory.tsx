import lodash from "lodash";
import {
  useClassAcademicHistory,
  useTeacherInfo,
} from "../../../pagesForTeachers/hooks/useTeacher";
import { useReadMyClassInfoData } from "../../../pagesForStudents/hooks/useStudentHook";
import LittleHeader from "../../../components/layout/LittleHeader";

import pix from "../../../assets/pix.jpg";
import { Link } from "react-router-dom";
import Button from "../../../components/reUse/Button";
import {
  useSchoolData,
  useSchoolSessionData,
  useViewSessionTerm,
  useViewTermDetail,
} from "../../hook/useSchoolAuth";
import { FC } from "react";

interface iProps {
  props?: any;
}

const SessionTerm: FC<iProps> = ({ props }) => {
  const { sessionTermData } = useViewSessionTerm(props);
  const { termData } = useViewTermDetail(props);

  return (
    <Link
      to={`${props}/${sessionTermData?.data?.year.replace(
        "/",
        "-"
      )}/${sessionTermData?.data?.presentTerm.replace(" ", "-")}`}
      //   to={`${props}`}
      className="w-[150px] border-r text-black font-bold flex justify-start"
    >
      <Button
        name={`View ${sessionTermData?.data?.presentTerm} session `}
        className="bg-blue-950 py-4 text-white text-[12px] font-normal rounded-lg -ml-2"
      />
    </Link>
  );
};

const Holder: FC<iProps> = ({ props }) => {
  return <div className=" ">View Details</div>;
};

const PropsData: FC<iProps> = ({ props }) => {
  const { termData } = useViewTermDetail(props);
  const { sessionTermData } = useViewSessionTerm(props);

  return (
    <div className="flex text-[10px] font-extrabold mt-3 italic gap-5 text-blue-900 ">
      <p className="text-[14px] font-bold pl-2">
        {termData?.classResult?.length > 0 &&
          termData?.classResult
            .map((el: any) => {
              return el?.students?.length;
            })
            ?.reduce((a: number, b: number) => {
              return a + b;
            })}
      </p>
    </div>
  );
};

const Fee: FC<iProps> = ({ props }) => {
  const { sessionTermData } = useViewSessionTerm(props);
  const { termData } = useViewTermDetail(props);

  console.log("FEE: ", termData);

  return (
    <div className="w-12">
      {termData?.classResult.length > 0 ? (
        <div>
          <p className="text-[10px] uppercase">Paid</p>
          <p className="text-[12px] font-bold text-green-500">
            {(
              (sessionTermData?.data?.classResult
                .map((el: any) => {
                  return el?.schoolFeesHistory?.length;
                })
                ?.reduce((a: number, b: number) => {
                  return a + b;
                }) /
                sessionTermData?.data?.classResult
                  .map((el: any) => {
                    return el.students.length;
                  })
                  ?.reduce((a: number, b: number) => {
                    return a + b;
                  })) *
              100
            ).toFixed(2)}
            %
          </p>

          <p className="text-[10px] mt-2 uppercase">unPaid</p>
          <p className="text-[12px] font-bold text-red-500">
            {(
              (sessionTermData?.data?.classResult
                .map((el: any) => {
                  return el.students.length - el?.schoolFeesHistory?.length;
                })
                ?.reduce((a: number, b: number) => {
                  return a + b;
                }) /
                sessionTermData?.data?.classResult
                  .map((el: any) => {
                    return el.students.length;
                  })
                  ?.reduce((a: number, b: number) => {
                    return a + b;
                  })) *
              100
            ).toFixed(2)}
            %
          </p>
        </div>
      ) : null}
    </div>
  );
};

const SessionHistory = () => {
  const { teacherInfo } = useTeacherInfo();

  const { state } = useReadMyClassInfoData(teacherInfo?.classesAssigned);
  const { classAcademicHistory } = useClassAcademicHistory(state?._id);

  let data = lodash.groupBy(classAcademicHistory?.classHistory, "session");

  const { data: schoolData } = useSchoolData();
  const { schoolInfo } = useSchoolSessionData(schoolData?._id);



  return (
    <div className="">
      <LittleHeader name="Viewing School Academic History" />
      <div className="avatar">
        <div className="mask mask-squircle w-12 h-12">
          <img
            src={schoolData?.avatar ? schoolData?.avatar : pix}
            alt="Avatar"
          />
        </div>
      </div>
      <div>
        <div className="font-bold">{schoolData?.schoolName}</div>
        <div className="text-[12px] opacity-50 ">View Academic History</div>
      </div>

      <div className=" w-full overflow-x-auto">
        <div className="py-6 px-2 border rounded-md min-w-[600px] overflow-y-hidden mt-9">
          <div className=" w-[1200px] text-[gray] flex gap-9 text-[12px] font-medium uppercase mb-10 px-4">
            <div className="w-[150px] border-r">Session</div>
            <div className="w-[150px] border-r">Number of Terms</div>
            <div className="w-[150px] border-r">Number of Tearcher</div>
            <div className="w-[150px] border-r flex flex-col">
              <p>Number of Student</p>
              <div className="flex  text-[10px] font-extrabold mt-3 italic gap-5 text-blue-900">
                <p className="w-12">1st Term</p>
                <p className="w-12">2nd Term</p>
                <p className="w-12">3rd Term</p>
              </div>
            </div>
            <div className="w-[220px] border-r flex flex-col">
              <p>Number of SchoolFee Stat</p>
              <div className="flex  text-[10px] font-extrabold mt-3 italic gap-5 text-blue-900">
                <p className="w-12">1st Term</p>
                <p className="w-12">2nd Term</p>
                <p className="w-12">3rd Term</p>
              </div>
            </div>
            <Holder />
          </div>

          <div>
            <div
              // key={}
              className=""
            >
              {schoolInfo?.map((props: any) => (
                <div
                  className="w-[1200px] flex items-center gap-9 text-[12px] font-medium  h-22 px-4 my-2 overflow-hidden"
                  style={{
                    width: `${1200 + props?.term?.length * 170}px`,
                  }}
                >
                  <div className="w-[150px] border-r-2 border-blur-950 text-black">
                    {props?.year}
                  </div>
                  <div className="w-[150px] border-r text-black">
                    {props?.term.length}
                  </div>
                  <div className="w-[150px] border-r text-black flex">
                    {props?.numberOfTeachers}
                  </div>

                  <div className="w-[150px] flex border-r text-black">
                    {props?.term?.map((props: any, i: number) => (
                      <div key={i} className="w-12">
                        {" "}
                        <PropsData props={props} />
                      </div>
                    ))}
                  </div>
                  <div className="w-[220px] gap-5 border-r text-black flex">
                    {props?.term?.map((props: any) => (
                      <Fee props={props} />
                    ))}
                  </div>

                  {props?.term?.map((props: any) => (
                    <SessionTerm props={props} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionHistory;
