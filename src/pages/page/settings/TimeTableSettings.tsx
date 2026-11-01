import { useState } from "react";
import Button from "../../../components/reUse/Button";
import { timeTableSetups } from "../../api/schoolAPIs";
import { useSchoolData } from "../../hook/useSchoolAuth";
import toast, { Toaster } from "react-hot-toast";
import ClipLoader from "react-spinners/ClipLoader";

const TimeTableSettingsScreen = () => {
  const { data } = useSchoolData();

  const [startClass, setStartClass] = useState<string>(``);
  const [endClass, setEndClass] = useState<string>("");

  const [startBreak, setStartBreak] = useState<string>(``);
  const [endBreak, setEndBreak] = useState<string>("");

  const [period, setPeriod] = useState<string>("");

  const [toggle, setToggle] = useState<Boolean>(false);

  const [phoneNumber, setPhoneNumber] = useState("");

  return (
    <div className="sm:w-[350%] rounded-lg border min-h-[560px] text-blue-950">
      <Toaster position="top-center" />
      <p className="text-[13px] p-4 font-medium ">
        This section allows you to customize and tailor your timetable to align
        with your schools unique daily educational schedule
        <br />
        <br />
        Please note that its crucial to ensure the information entered
        accurately reflects your school's schedule
        <br />
        <br />
        Once you've updated your settings, click "Update Table Detail" to
        confirm. Your customized timetable will be reflected throughout the
        system.
        <br />
      </p>

      <div className="mx-5">
        <hr />
      </div>

      <div className="p-5 w-full">
        <div className="text-[12px] mt-5 font-semibold w-full">
          <div className="flex flex-col gap-6 w-full lg:flex-row">
            <div className="flex flex-col w-full">
              <p>First Class Begins: </p>
              <select
                className=" border-blue-950 select select-info flex-1"
                // value={startClass}
                onChange={(e) => setStartClass(e.target.value)}
              >
                <option disabled selected>
                  Class Starts
                </option>
                <option value={"07:45"}>07:45AM</option>
                <option value={"08:00"}>08:00AM</option>
                <option value={"08:10"}>08:10AM</option>
                <option value={"08:15"}>08:15AM</option>
                <option value={"08:20"}>08:20AM</option>
                <option value={"08:30"}>08:30AM</option>
                <option value={"08:40"}>08:40AM</option>
                <option value={"08:45"}>08:45AM</option>
              </select>
            </div>

            <div className="flex flex-col w-full">
              <p>Last Class ends: </p>
              <select
                className="border-blue-950 select select-info flex-1"
                // value={endClass}
                onChange={(e) => setEndClass(e.target.value)}
              >
                <option disabled selected>
                  Class Ends
                </option>
                <option value={"14:30"}>02:30PM</option>
                <option value={"14:45"}>02:45PM</option>
                <option value={"14:50"}>02:50PM</option>
                <option value={"15:00"}>03:00PM</option>
                <option value={"15:30"}>03:30PM</option>
                <option value={"15:45"}>03:45PM</option>
                <option value={"16:00"}>04:00PM</option>
              </select>
            </div>
          </div>

          {/* break */}
          <div className="flex flex-col gap-6 w-full lg:flex-row mt-5">
            <div className="flex flex-col w-full">
              <p>Break Begins: </p>
              <select
                className=" border-blue-950 select select-info flex-1"
                // value={startBreak}
                onChange={(e) => setStartBreak(e.target.value)}
              >
                <option disabled selected>
                  Break begins
                </option>
                <option value={"10:30"}>10:30AM</option>
                <option value={"10:40"}>10:40AM</option>
                <option value={"10:45"}>10:45AM</option>
                <option value={"11:00"}>11:00AM</option>
                <option value={"11:20"}>11:20AM</option>
                <option value={"11:30"}>11:30AM</option>
                <option value={"11:40"}>11:40AM</option>
                <option value={"12:00"}>12:00NOON</option>
              </select>
            </div>

            <div className="flex flex-col w-full">
              <p>Break ends: </p>
              <select
                className=" border-blue-950 select select-info flex-1"
                // value={endBreak}
                onChange={(e) => setEndBreak(e.target.value)}
              >
                <option disabled selected>
                  Break ends
                </option>
                <option value={"11:00"}>11:00AM</option>
                <option value={"11:20"}>11:20AM</option>
                <option value={"11:30"}>11:30AM</option>
                <option value={"11:45"}>11:45AM</option>
                <option value={"11:50"}>11:50AM</option>
                <option value={"12:00"}>12:00NOON</option>
                <option value={"12:20"}>12:20PM</option>
                <option value={"12:30"}>12:30PM</option>
                <option value={"12:45"}>12:45PM</option>
                <option value={"13:00"}>1:00PM</option>
              </select>
            </div>
          </div>

          {/* period */}
          <div className="flex gap-6 mt-5">
            <div className="flex flex-col w-full">
              <p>Period per class: </p>
              <select
                className=" border-blue-950 select select-info flex-1"
                // value={period}
                onChange={(e: any) => setPeriod(e.target.value)}
              >
                <option disabled selected>
                  Period per class
                </option>
                <option value={30}>30Mins</option>
                <option value={35}>35Mins</option>
                <option value={40}>40Mins</option>
                <option value={45}>45Mins</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <Button
        name={toggle ? "Processing" : "Update Table Detail"}
        icon={
          toggle && (
            <ClipLoader
              size={15}
              color="white"
              className="absolute -ml-3 -mt-2"
            />
          )
        }
        className="bg-blue-950 mt-10 ml-0 py-4 mx-5"
        onClick={async () => {
          setToggle(true);

          timeTableSetups(data?._id, {
            startBreak,
            startClass,
            endClass,
            endBreak,
            peroid: parseInt(period),
          })
            .then((res) => {
              if (res.data.status === 201) {
                toast.success("Updated Successfully...!");
              }
            })
            .finally(() => {
              setToggle(false);
            });
        }}
      />
    </div>
  );
};

export default TimeTableSettingsScreen;
