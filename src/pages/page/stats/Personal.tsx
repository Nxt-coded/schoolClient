import { FC } from "react";
import { FaChartLine } from "react-icons/fa";
// import _ from "lodash";
import {
  useSchoolData,
  useSchoolSchoolFees,
  useSchoolStudents,
  useViewSessionTerm,
} from "../../hook/useSchoolAuth";
import MaleFemaleTeacherScreen from "./MaleFemaleTeacherScreen";
import { FaCheckDouble } from "react-icons/fa6";
import { StudentChartScreen } from "./chart/ChartScreen";
import { OtherPaymentChart } from "./chart/OtherPaymentChart";

const Personal: FC = () => {
  const { data } = useSchoolData();

  const { schoolFeeRecord } = useSchoolSchoolFees(data?._id);
  const { students } = useSchoolStudents(data?._id);

  // to include later....!
  // && el.session === data?.presentSession;

  let read1 = schoolFeeRecord
    ?.filter((el: any) => {
      return (
        el.term === "1st Term" &&
        el?.sessionID === data?.presentSessionID &&
        el?.termID === data?.presentTermID
      );
    })
    .map((el: any) => {
      return el?.amount;
    })
    .reduce((a: number, b: number) => {
      return a + b;
    }, 0);

  let read2 = schoolFeeRecord
    ?.filter((el: any) => {
      return (
        el.term === "2nd Term" &&
        el?.sessionID === data?.presentSessionID &&
        el?.termID === data?.presentTermID
      );
    })
    .map((el: any) => {
      return el?.amount / 100;
    })
    .reduce((a: number, b: number) => {
      return a + b;
    }, 0);

  let read3 = schoolFeeRecord
    ?.filter((el: any) => {
      return (
        el.term === "3rd Term" &&
        el?.sessionID === data?.presentSessionID &&
        el?.termID === data?.presentTermID
      );
    })
    .map((el: any) => {
      return el?.amount / 100;
    })
    .reduce((a: number, b: number) => {
      return a + b;
    }, 0);

  let check = schoolFeeRecord
    ?.filter((el: any) => {
      return (
        el.term === "1st Term" &&
        el?.sessionID === data?.presentSessionID &&
        el?.termID === data?.presentTermID
      );
    })
    .map((el: any) => {
      return el.studentID;
    });

  let check1 = schoolFeeRecord
    ?.filter((el: any) => {
      return (
        el.term === "2nd Term" &&
        el?.sessionID === data?.presentSessionID &&
        el?.termID === data?.presentTermID
      );
    })
    .map((el: any) => {
      return el.studentID;
    });

  let check2 = schoolFeeRecord
    ?.filter((el: any) => {
      return (
        el.term === "3rd Term" &&
        el?.sessionID === data?.presentSessionID &&
        el?.termID === data?.presentTermID
      );
    })
    .map((el: any) => {
      return el.studentID;
    });

  const { sessionTermData } = useViewSessionTerm(data?.presentTermID);

  return (
    <div>
      <div
        className={`mb-2 ${
          data?.categoryType === "Secondary"
            ? "text-blue-950"
            : "text-green-950"
        }`}
      >
        <span className="font-bold text-[12px] ">Population Counts</span>
        <div className="grid grid-cols-2 gap-3 mt-2">
          <div className="border rounded-md min-h-[100px] p-4">
            <p className="font-medium leading-tight">
              Total Students Registered:
            </p>

            <h1 className="text-[40px] font-medium">
              {data?.students?.length}
            </h1>
          </div>

          <div className="border rounded-md min-h-[60px] p-4">
            <p className="font-medium leading-tight">Total Teachers Hired:</p>

            <h1 className="text-[40px] font-medium">{data?.staff?.length}</h1>
          </div>
          <div className="border rounded-md min-h-[60px] p-4">
            <p className="font-medium leading-tight">Total Subjects</p>

            <h1
              className="text-[25px] mt-5 font-bold"
              style={{ color: "var(--primary)" }}
            >
              {data?.subjects?.length}
              <span className="text-[12px]"></span>
            </h1>
          </div>
          <div className="border rounded-md min-h-[100px] p-4">
            <p className="font-medium leading-tight">Total Classrooms</p>

            <h1 className="text-[25px] mt-5  font-bold break-words leading-tight">
              {data?.classRooms?.length}
            </h1>
          </div>

          <div className="border rounded-md min-h-[100px] p-4 col-span-2">
            <p className="font-bold mb-3">
              Revenue Report:
              <p className="text-[12px]">{data?.presentSession}</p>
            </p>

            <h1 className="text-[12px] font-medium">
              <div className=" grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-2 xl:grid-cols-3 justify-center gap-[0.30rem]">
                <div className="border min-w-[90px]  min-h-[100px] rounded-md p-2 break-words flex flex-col items-center justify-center ">
                  <p>1st Term School Fees Revenue </p>
                  <p className="font-bold mt-2 text-[14px] ">
                    ₦{read1?.toLocaleString()}
                  </p>
                  <p className="leading-tight mt-2 text-center">
                    Total Revenue
                  </p>
                </div>

                <div className="border min-w-[90px]  min-h-[100px] rounded-md p-2 break-words flex flex-col items-center justify-center ">
                  <p>2nd Term School Fees Revenue</p>
                  <p className="font-bold mt-2 text-[14px] ">
                    ₦{read2?.toLocaleString()}
                  </p>
                  <p className="leading-tight mt-2 text-center">
                    Total Revenue
                  </p>
                </div>

                <div className="sm:col-span-2 xl:col-span-1 border min-w-[90px]  min-h-[100px] rounded-md p-2 break-words flex flex-col items-center justify-center ">
                  <p>3rd Term School Fees Revenue</p>
                  <p className="font-bold mt-2 text-[14px] ">
                    ₦{read3?.toLocaleString()}
                  </p>
                  <p className="leading-tight mt-2 text-center">
                    Total Revenue
                  </p>
                </div>
              </div>
            </h1>
          </div>

          <div className="border rounded-md min-h-[100px] p-4 col-span-2">
            <p className="font-bold mb-3">
              School Fee Paid/Not Paid:
              <p className="text-[12px]">{data?.presentSession}</p>
            </p>

            <h1 className="text-[12px] font-medium">
              <div className=" grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-2 xl:grid-cols-3 justify-center gap-[0.30rem]">
                <div className="border min-w-[90px]  min-h-[100px] rounded-md p-2 break-words flex flex-col items-center justify-center ">
                  <p>1st Term </p>
                  <p className="font-bold mt-2 text-[14px] ">
                    {`${check?.length}/${students?.data?.students?.length}`}{" "}
                  </p>
                  <p className="leading-tight mt-2 text-center">Paid</p>
                </div>

                <div className="border min-w-[90px]  min-h-[100px] rounded-md p-2 break-words flex flex-col items-center justify-center ">
                  <p>2nd Term</p>
                  <p className="font-bold mt-2 text-[14px] ">
                    {`${check1?.length}/${students?.data?.students?.length}`}
                  </p>
                  <p className="leading-tight mt-2 text-center">
                    Total Revenue
                  </p>
                </div>

                <div className="sm:col-span-2 xl:col-span-1 border min-w-[90px]  min-h-[100px] rounded-md p-2 break-words flex flex-col items-center justify-center ">
                  <p>3rd Term</p>
                  <p className="font-bold mt-2 text-[14px] ">
                    {`${check2?.length}/${students?.data?.students?.length}`}
                  </p>
                  <p className="leading-tight mt-2 text-center">
                    Total Revenue
                  </p>
                </div>
              </div>
            </h1>
          </div>
        </div>
      </div>
      <div className="border-t my-5" />
      <div className="w-full">
        {/* <MaleFemaleTeacherScreen /> */}
        <StudentChartScreen data={data} />
        {sessionTermData?.data?.paymentOptions?.length > 0 ? (
          <OtherPaymentChart data={data} sessionTermData={sessionTermData} />
        ) : (
          <div className="font-semibold text-black/50 capitalize mt-10">
            <hr />
            <div className="mt-5 flex flex-col items-center">
              <FaChartLine className="text-[30px] mb-2" />
              <p className="text-[13px]">no record for other payment yet</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Personal;
