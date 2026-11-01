document.title = "staff Detail's Page";
import { BsThreeDotsVertical } from "react-icons/bs";
import LittleHeader from "../../../components/layout/LittleHeader";
import Button from "../../../components/reUse/Button";
import { FaStar } from "react-icons/fa6";

const StudentDetail = () => {
  const attendanceData = Array.from({ length: 59 }, (i: number) => {
    // count++;
    const counted = Math.floor(Math.random() * 1000);
    return { record: counted % 2 === 0 ? true : false, count: counted };
  });

  return (
    <div>
      <LittleHeader name="Student Details" back />

      <div>Student Name</div>

      <div className="w-full text-blue-950 h-[90px] rounded-lg border flex justify-between overflow-hidden ">
        <div className="bg-blue-950 text-white w-[160px] md:w-[300px] px-4 py-2 rounded-lg ">
          <div>Performance Ratio</div>
          <div className="text-[35px] font-bold">
            "A" <span className="text-[20px]">Student</span>
          </div>
        </div>
        <div className=" px-4 py-1 rounded-lg text-center flex flex-col">
          <div className="mr-0">change class</div>
          <Button name="Up Grade" className="bg-blue-950 mx-0 ml-0 py-5  " />
        </div>
      </div>

      <div className="my-6 border-t" />

      <div className="w-full min-h-[180px] pb-10 bg-slate-50 rounded-lg border py-2 px-4 ">
        <p>Present Class In JSS 1A </p>
        <p className="text-[13px]">
          Class Handled: <span className="font-bold">JSS A1</span>
        </p>

        <div className="mt-5 text-[13px] font-medium">Subjects Offer</div>

        <div className="mt-1 w-full grid grid-cols-2 ">
          <div className="bg-white border flex flex-col  rounded-2xl pb-2 min-h-[200px] px-4 pt-4">
            <div className="mt-3 flex justify-between items-center font-bold">
              <p>Mathematics</p>
              <div className="w-8 h-8 transition-all duration-300 rounded-full hover:bg-slate-50 cursor-pointer flex justify-center items-center">
                <BsThreeDotsVertical className="hover:text-blue-900" />
              </div>
            </div>
            <div className="flex">
              <p className="text-[12px] bg-slate-100 rounded-sm py-2 pl-1 shadow-sm pr-4 mb-5">
                compulsory
              </p>
            </div>
            <div className="flex-1" />
            <p className="text-[13px] font-medium">Subject Teacher Name</p>
            <div className="flex mb-4 gap-2 flex-wrap">
              <div className="text-blue-950  rounded-mlg mt-1 px-0 border-t font-medium py-2 text-[17px] ">
                John Amadi
              </div>
            </div>

            <div>
              <p className="text-[12px] mb-2  text-[lightgray]">Records</p>

              <div className="font-medium text-[12px] flex items-center gap-3">
                <p className="border rounded-full bg-orange-500 text-white px-4 py-2">
                  Total Quiz: <span className="font-bold">2</span>
                </p>
                <p className="border rounded-full bg-pink-500 text-white px-4 py-2">
                  Total Test: <span className="font-bold">2</span>
                </p>
                <p className="border rounded-full bg-blue-950 text-white px-4 py-2">
                  Examination: <span className="font-bold">0</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 w-full min-h-[100px] pb-10 bg-slate-50 rounded-lg border py-2 px-4 ">
        <p>student's Performance Detail</p>
        <p className="text-[13px] flex items-center font-medium">
          General Performance Ratings:{" "}
          <span className="font-bold flex items-center gap-1">
            <FaStar className="ml-1 mb-1" />
            5.0
          </span>
        </p>
        <div className="flex gap-4 mt-5">
          <div className="border rounded-md px-4 py-2 bg-blue-50">
            <div className=" text-[16px] font-medium border-b pb-2">
              Report/Record: <span className="font-bold"></span>
            </div>
            <div className="ml-5 text-[13px] font-medium mt-2">
              <span> </span> Mathematics: <span className="font-bold">12</span>
            </div>
          </div>
          <div className="border rounded-md px-4 py-2 bg-blue-50">
            <div className=" text-[16px] font-medium border-b pb-2">
              Test Held: <span className="font-bold">2</span>
            </div>
            <div className="ml-5 text-[13px] font-medium mt-2">
              <span> </span> Mathematics: <span className="font-bold">2</span>
            </div>
          </div>
        </div>
      </div>

      {/* Attendance */}

      <div className="mt-6 w-full min-h-[60px] bg-slate-50 rounded-lg border py-2 px-4 ">
        <p className="mb-2">
          Attendance Heatmap:{" "}
          <span className="font-medium">
            {(
              (attendanceData.filter((el) => el.record === true).length /
                attendanceData.length) *
              100
            ).toFixed(2)}
            %
          </span>
        </p>
        <div className="w-full flex gap-1">
          {/* <div className="w-3 h-3 border bg-green-300" />
          <div className="w-3 h-3 border bg-white" /> */}

          <div className="flex flex-wrap gap-1 w-full">
            {attendanceData.map((props: any) => (
              <div className="tooltip">
                <div
                  className={`w-4 h-4 rounded-[3px] border ${
                    props.record ? "bg-green-500" : "bg-white"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetail;
