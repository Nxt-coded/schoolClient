import LittleHeader from "@/components/layout/LittleHeader";
import {
  useComplain,
  useStudentInfo,
  useStudentInfoData,
  useViewRemark,
} from "@/pagesForStudents/hooks/useStudentHook";
import { Toaster } from "react-hot-toast";
import moment from "moment";
import { AttendanceDataChart } from "@/pagesForTeachers/pages/report/AttendanceDtaaChart";
import { StraightChart } from "@/pagesForTeachers/pages/report/StraightChart";
import { AcademicPerformance } from "@/pagesForTeachers/pages/report/AcademicPerformance";
import { Participation } from "@/pagesForTeachers/pages/report/Participation";

const ViewWeekReport = () => {
  const { studentInfo } = useStudentInfo();
  const { studentInfoData } = useStudentInfoData(studentInfo?._id);
  const { remarks } = useViewRemark(studentInfo?._id);
  const { complainData } = useComplain(studentInfo?._id);
  let complain = complainData ? complainData[0] : null;
  return (
    <div>
      <Toaster position="top-center" reverseOrder={true} />
      {/* header */}
      <div className="mb-0" />
      <LittleHeader
        name={`Viewing ${studentInfoData?.studentFirstName} Weekly Report`}
      />

      <div>
        <p className="font-semibold ml-3">Class Teacher Remarks</p>

        <p className="my-5 max-w-2xl text-[18px] italic pl-3">
          {remarks?.data[0]?.remark}
        </p>
      </div>

      <p className="font-semibold ml-3 mt-8">
        Data Presentation of Weekly Report
      </p>
      <main>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ">
          <div className="border min-h-10 rounded-md p-4 m-2 flex flex-col">
            <p className="leading-tight text-red-400">
              Outstanding School-fee Payment
            </p>

            <p className="mt-10 text-[30px] md:text-[40px] font-semibold">
              ₦{parseFloat(remarks?.data[0]?.payment).toLocaleString()}
            </p>

            <p className="text-[12px] text-blue-950 -mt-2">
              This is a simple Notification that the above amount is still yet
              to be paid.
              <br />
              <p className="mt-2">Once paid it will be updated</p>
            </p>

            <div className="flex-1" />
            <div className="flex ">
              <p className="text-[12px] rounded-sm py-1 px-6 text-white bg-orange-500 cursor-pointer">
                Paid off Outstanding
              </p>
            </div>
          </div>
          <div className="border min-h-10 rounded-md p-4 m-2">
            <div className="flex flex-col h-full">
              <p>Most Recent Complain</p>

              <p className="text-[12px] mt-10">Your Complain Message:</p>
              <p>
                {complain?.title
                  ? complain?.title
                  : "You haven't made any complain"}
              </p>
              <div className="flex-1" />
              <div className="flex items-end flex-col ">
                <p className="text-[12px] font-semibold mt-5 ">
                  complain status
                </p>
                {complain?.seen ? (
                  <p className="text-[12px] rounded-sm py-1 px-6 text-white bg-orange-500">
                    Seen
                  </p>
                ) : complain?.send && complain?.resolve ? (
                  <p className="text-[12px] rounded-sm py-1 px-6 text-white bg-red-500">
                    Resolved
                  </p>
                ) : (
                  <p className="text-[12px]">Not yet open</p>
                )}
              </div>
            </div>
          </div>

          <div className="border min-h-10 rounded-md p-4 col-span-1 sm:col-span-3 lg:col-span-1 m-2">
            <div>
              <p>Special Announcement</p>
              <p className="text-[12px] leading-[1] opacity-40 font-light">
                You are seeing this because it is very important
              </p>

              <p className="text-[12px] font-semibold mt-8">
                Notice Type:{" "}
                <span className="uppercase">
                  {remarks?.data[0]?.announcement?.status}
                </span>
              </p>
              <p>{remarks?.data[0]?.announcement?.title}</p>
              <p className="text-[13px] text-black/60">
                {remarks?.data[0]?.announcement?.details}
              </p>
              <p className="text-[13px] text-black/60 mt-6">
                {moment(remarks?.data[0]?.announcement?.date).format("LL")}
              </p>
              <p className="text-[12px] text-black/50 mt-">
                Created At:{" "}
                {moment(remarks?.data[0]?.announcement?.createdAt).format("LL")}
              </p>
            </div>
          </div>
        </div>
      </main>

      <section className="mt-5 ">
        <main className="grid grid-cols-1 lg:grid-cols-3">
          <div className="py-4 min-h-5 border rounded-md m-2 col-span-2 grid grid-cols-1 lg:grid-cols-2 ">
            <AttendanceDataChart
              studentInfoData={studentInfoData}
              remarks={remarks}
            />
            <div className="p-4 min-h-5 rounded-md m- ">
              <StraightChart
                studentInfoData={studentInfoData}
                remarks={remarks}
              />
            </div>
          </div>
          <div className="p-4 min-h-5 border rounded-md m-2 ">
            <div className="flex flex-col">
              <AcademicPerformance remarks={remarks} />
            </div>
          </div>
        </main>
      </section>

      <section className="mt-5 ">
        <main className="grid grid-cols-1 lg:grid-cols-3">
          <div className="border rounded-md m-2 p-4 min-h-10">
            <div>
              <p className="text-[12px]">This Week Data</p>
              <div className="flex flex-wrap items-center justify-between">
                <div>
                  <p className=" mt-6 text-[12px] text-green-800 font-semibold">
                    Best Performing Subject
                  </p>
                  <p className=" flex justify-center items-center text-[14px] px-6 py-2 bg-blue-950 text-white rounded-md">
                    {remarks?.data[0]?.best}
                  </p>
                </div>
                <div>
                  <p className=" mt-6 text-[12px] text-red-800 font-semibold">
                    Worst Performing Subject
                  </p>
                  <p className="flex justify-center items-center text-[14px] px-6 py-2 bg-red-500 text-white rounded-md">
                    {remarks?.data[0]?.worst}
                  </p>
                </div>
              </div>
              <div className=" mt-10 pt-2 border-t text-[12px] ">
                <p>Last Week Data</p>
              </div>

              <div className="flex flex-wrap items-center justify-between">
                <div>
                  <p className=" mt-6 text-[12px] text-green-800 font-semibold">
                    Best Performing Subject
                  </p>
                  <p className="flex justify-center items-center text-[14px] px-6 py-2 bg-blue-950/80 text-white rounded-md">
                    {remarks?.data[1]?.best}
                  </p>
                </div>
                <div>
                  <p className=" mt-6 text-[12px] text-red-800 font-semibold">
                    Worst Performing Subject
                  </p>
                  <p className="flex justify-center items-center text-[14px] px-6 py-2 bg-red-500/80 text-white rounded-md">
                    {remarks?.data[1]?.worst}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="border rounded-md m-2 min-h-10">
            <Participation remarks={remarks} />
          </div>
          <div className="border rounded-md m-2 p-4 min-h-10">
            <p className="text-[18px] uppercase font-medium">Study Focus</p>
            <p className="text-[12px]">
              Topic to Focus studies on for the weekend
            </p>

            <div className="mt-10 flex flex-wrap uppercase">
              {remarks?.data[0]?.topicFocus
                ?.replace("and", ",")
                .split(",")
                .map((el: any, i: number) => (
                  <div key={i} className="flex">
                    <p className="m-2 text-[12px] px-4 py-2 text-white bg-blue-950 rounded-sm font-medium">
                      {el}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </main>
      </section>
    </div>
  );
};

export default ViewWeekReport;
