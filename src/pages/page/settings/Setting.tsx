import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { RiPagesLine } from "react-icons/ri";
import { HiMiniBuildingOffice2 } from "react-icons/hi2";
import LittleHeader from "../../../components/layout/LittleHeader";
import Button from "../../../components/reUse/Button";
import { MdClose, MdFeedback } from "react-icons/md";
import Input from "../../../components/reUse/Input";
import { GiPadlock } from "react-icons/gi";
import { useSchoolData } from "../../hook/useSchoolAuth";
import {
  downlaodSchoolData,
  URL,
  updateSchoolResumptionTeamInfo,
  updateClassTeacherGradingToggle,
  changeSchoolEnrollmentID,
} from "@/pages/api/schoolAPIs";
import toast from "react-hot-toast";
import { FaSpinner } from "react-icons/fa6";
import { IoCalendarOutline } from "react-icons/io5";
import { mutate } from "swr";

// Utility function to format date as "10th Sept 2025"
const formatDateOrdinal = (date: Date): string => {
  const day = date.getDate();
  const suffix = ["st", "nd", "rd"][(((day + 90) % 100) - 10) % 10] || "th";
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${day}${suffix} ${month} ${year}`;
};

// Utility function to convert "10th Sept 2025" back to "2025-09-10"
const parseOrdinalDate = (str: string): string => {
  const match = str.match(/(\d+)\w+\s+(\w+)\s+(\d{4})/);
  if (!match) return "";
  const [, day, month, year] = match;
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  const monthIndex = months.indexOf(month) + 1;
  return `${year}-${String(monthIndex).padStart(2, "0")}-${String(day).padStart(
    2,
    "0"
  )}`;
};

const ChangeEnrollmentIDCard = () => {
  const { data } = useSchoolData();
  const [currentEnrollmentID, setCurrentEnrollmentID] = useState("");
  const [newEnrollmentID, setNewEnrollmentID] = useState("");
  const [confirmEnrollmentID, setConfirmEnrollmentID] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentEnrollmentID.trim()) {
      toast.error("Please enter your present Enrollment ID");
      return;
    }
    if (!newEnrollmentID.trim()) {
      toast.error("Please enter a new Enrollment ID");
      return;
    }
    if (newEnrollmentID.trim() !== confirmEnrollmentID.trim()) {
      toast.error("New Enrollment ID and Confirmation do not match");
      return;
    }
    if (currentEnrollmentID.trim() === newEnrollmentID.trim()) {
      toast.error("New Enrollment ID must be different from present Enrollment ID");
      return;
    }

    setLoading(true);
    try {
      const res: any = await changeSchoolEnrollmentID(data?._id, {
        currentEnrollmentID: currentEnrollmentID.trim(),
        newEnrollmentID: newEnrollmentID.trim(),
      });

      if (res?.status === 201 || res?.data?.status === 201) {
        toast.success("Enrollment ID updated successfully!");
        setCurrentEnrollmentID("");
        setNewEnrollmentID("");
        setConfirmEnrollmentID("");
        mutate(`api/view-school/${data?._id}`);
      } else {
        const errorMsg =
          res?.response?.data?.message ||
          res?.data?.message ||
          "Present Enrollment ID is incorrect";
        toast.error(errorMsg);
      }
    } catch (err: any) {
      toast.error("An error occurred while updating Enrollment ID");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border rounded-lg p-6 bg-white shadow-md max-w-4xl mt-6">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-blue-950">
          Change Admin Enrollment ID
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          Provide your present Enrollment ID to verify your authorization before setting a new Enrollment ID.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Present Enrollment ID <span className="text-red-500">*</span>
            </label>
            <Input
              type="password"
              placeholder="Enter present Enrollment ID"
              value={currentEnrollmentID}
              onChange={(e) => setCurrentEnrollmentID(e.target.value)}
              className="w-full h-11 mt-0 ml-0"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              New Enrollment ID <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              placeholder="Enter new Enrollment ID"
              value={newEnrollmentID}
              onChange={(e) => setNewEnrollmentID(e.target.value)}
              className="w-full h-11 mt-0 ml-0"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Confirm New Enrollment ID <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              placeholder="Confirm new Enrollment ID"
              value={confirmEnrollmentID}
              onChange={(e) => setConfirmEnrollmentID(e.target.value)}
              className="w-full h-11 mt-0 ml-0"
            />
          </div>
        </div>

        <div className="flex justify-end mt-2">
          <Button
            name={loading ? "Updating..." : "Update Enrollment ID"}
            icon={loading ? <FaSpinner className="animate-spin" size={18} /> : undefined}
            className="bg-blue-950 text-white px-6 py-2.5 rounded-md hover:bg-blue-900 transition-all font-medium"
            onClick={() => {}}
            type="submit"
          />
        </div>
      </form>
    </div>
  );
};

const SettingScreen: FC = () => {
  document.title = "School's Profile settings";

  const pathData = [
    {
      icon: <RiPagesLine size={45} />,
      title: "school's Info Settings",
      detail:
        "Provide basic info that would be used for your school's landing page.",
      url: "/my-personal-info/info",
      size: 35,
    },
    {
      icon: <RiPagesLine size={45} />,

      title: "School's Account Settings",
      detail: "Provide personal details and how we can reach you.",
      url: "/my-personal-info/main-account-setting",
      size: 35,
    },

    // {
    //   icon: <HiMiniBuildingOffice2 size={45} />,
    //   title: "School's Page Settings",
    //   detail: "Provide studio details and how we can reach you.",
    //   url: "/my-personal-info/theme-settings",
    //   size: 35,
    // },

    {
      icon: <HiMiniBuildingOffice2 size={45} />,
      title: "Timetable Setup",
      detail:
        "This enable school to setup structure with which the time-table can be build up off.",
      url: "/my-personal-info/timetable-setting",
      size: 35,
    },
  ];

  const { data } = useSchoolData();

  const [view, setView] = useState<boolean>(false);
  const [codeValue, setCodeValue] = useState<string>("");
  const [showDownloadModal, setShowDownloadModal] = useState<boolean>(false);
  const [teamFormData, setTeamFormData] = useState({
    NumberOfDays: "",
    SchoolTeamResumption: "",
    SchoolTeamCloses: "",
  });
  const [teamLoading, setTeamLoading] = useState<boolean>(false);
  const [gradingLoading, setGradingLoading] = useState<boolean>(false);
  const [showResumptionPicker, setShowResumptionPicker] =
    useState<boolean>(false);
  const [showClosesPicker, setShowClosesPicker] = useState<boolean>(false);
  const [resumptionMonth, setResumptionMonth] = useState(new Date());
  const [closesMonth, setClosesMonth] = useState(new Date());

  return (
    <div className="relative min-h-[88vh] text-blue-950 flex flex-col ">
      <LittleHeader name={document.title} />
      <div className="w-full m-auto py-8 my-4 flex gap-24 max-lg:block max-md:pt-1">
        {/* profile Account Detail */}
        <div>
          <div className="font-bold text-[30px] text-blue-950 ">
            Main Settings Page
          </div>
          <div className="text-[13px]">
            &middot;
            <div
              className="underline text-red-500 text-[18px] hover:text-red-600 capitalize font-medium transition-all duration-300 cursor-pointer"
              onClick={() => setShowDownloadModal(true)}
            >
              <span>Download School Data</span>
            </div>
          </div>
        </div>
      </div>
      {/* profile Account Detail Card */}
      <div
        className="my-6 text-blue-950 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2 transition-all duration-300 lg:[&>*:nth-child(3)]:col-span-2 xl:[&>*:nth-child(3)]:col-span-1
      "
      >
        {pathData.map((props: any, i: number) => {
          return (
            <div>
              {i === 1 ? (
                <div>
                  <div
                    className="min-w-[300px] border rounded-md p-3 min-h-[200px] text-blue-950 shadow-md flex flex-col hover:shadow-lg cursor-pointer"
                    onClick={() => {
                      if (!document.startViewTransition) {
                        setView(true);
                      } else {
                        document.startViewTransition(() => {
                          setView(true);
                        });
                      }
                    }}
                  >
                    <div className="flex-1  text-blue-950">{props.icon}</div>

                    <div className="font-[500] mb-2 text-[20px]">
                      {props.title}
                    </div>
                    <div className="text-[15px] leading-4 font-[300]">
                      {props.detail}
                    </div>
                  </div>

                  {view && (
                    <div className="absolute top-0 left-0 backdrop-blur-md h-[99%] w-full rounded-lg flex items-center pt-[200px] flex-col">
                      <div className="w-[90%] lg:w-[700px] h-[300px] bg-white border rounded-md p-4 flex flex-col shadow-sm">
                        <div>
                          <h2 className="font-semibold mb-2">
                            Security Measure
                          </h2>
                          <p className="text-[14px] md:text-[16px]">
                            You are about to enter a very sensitive area, as a
                            measure of security, You would be required to
                            provider your{" "}
                            <strong className="font-medium">
                              "Secure Code"
                            </strong>
                            ...
                          </p>
                        </div>
                        <div className="flex-1" />
                        <div className="flex-col flex">
                          <label className="text-[14px] md:text-[16px] font-semibold mb-3">
                            Enter your Admin secret code
                          </label>
                          <Input
                            placeholder="Enter Secret Code"
                            className="w-[90%] ml-0 mt-0"
                            value={codeValue}
                            onChange={(e) => {
                              setCodeValue(e.target.value);
                            }}
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button
                            icon={<MdClose size={30} />}
                            name={"Close"}
                            className=" bg-red-500 text-white"
                            onClick={() => {
                              if (!document.startViewTransition) {
                                setView(false);
                              } else {
                                document.startViewTransition(() => {
                                  setView(false);
                                });
                              }
                            }}
                          />
                          {data?.adminCode === codeValue ? (
                            <Link to={`${props.url}`}>
                              <Button
                                icon={<GiPadlock size={30} />}
                                name={"Proceed"}
                                className="ml-2 bg-blue-950 "
                              />
                            </Link>
                          ) : (
                            <Button
                              icon={<GiPadlock size={30} />}
                              name={"Proceed"}
                              className="ml-2 bg-blue-950 "
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link to={`${props.url}`} key={i} className="text-black">
                  <div className="min-w-[300px] border rounded-md p-3 min-h-[200px] text-blue-950 shadow-md flex flex-col hover:shadow-lg">
                    <div className="flex-1  text-blue-950">{props.icon}</div>

                    <div className="font-[500] mb-2 text-[20px]">
                      {props.title}
                    </div>
                    <div className="text-[15px] leading-4 font-[300]">
                      {props.detail}
                    </div>
                  </div>
                </Link>
              )}
            </div>
          );
        })}
      </div>

      
<div className="mt-5">
  <hr/>
</div>



        <p className="text-lg font-semibold mb-4 mt-10">Administrative Permissions</p>

        {/* Grading Permission Toggle */}
        <div className="border rounded-lg p-6 bg-white shadow-md max-w-4xl">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold text-blue-950">
                Class Teacher Grading Access
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Toggle whether Class Teachers are allowed to enter or edit scores for subjects they do not teach personally.
              </p>
            </div>
            <div className="flex items-center gap-3">
              {gradingLoading && <FaSpinner className="animate-spin text-blue-950" />}
              <div 
                className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
                  data?.allowClassTeacherGrading ? "bg-green-500" : "bg-gray-300"
                }`}
                onClick={async () => {
                  if (gradingLoading) return;
                  setGradingLoading(true);
                  try {
                    const res = await updateClassTeacherGradingToggle(data?._id, !data?.allowClassTeacherGrading);
                    if (res.status === 201) {
                      toast.success(`Permission ${!data?.allowClassTeacherGrading ? 'Enabled' : 'Disabled'} Successfully`);
                      mutate(`api/view-school/${data?._id}`);
                    }
                  } catch (err) {
                    toast.error("Failed to update setting");
                  } finally {
                    setGradingLoading(false);
                  }
                }}
              >
                <div 
                  className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${
                    data?.allowClassTeacherGrading ? "translate-x-6" : ""
                  }`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Change Enrollment ID Card */}
        <ChangeEnrollmentIDCard />

      <main className="flex flex-col w-full">
        <div className="my-10 border-t" />
        <p className="text-lg font-semibold mb-4">Team's Data</p>

        {/* Team Resumption Form */}
        <div className="border rounded-lg p-6 bg-white shadow-md max-w-4xl">
          <h3 className="text-base font-semibold mb-4 text-blue-950">
            School Team Resumption Settings
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Number of Days
              </label>
              <Input
                type="number"
                placeholder="Enter number of days"
                value={teamFormData.NumberOfDays}
                onChange={(e) =>
                  setTeamFormData((prev) => ({
                    ...prev,
                    NumberOfDays: e.target.value,
                  }))
                }
                className="w-[98%] h-11 mt-0 ml-0"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                School Team Resumption Date
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowResumptionPicker(!showResumptionPicker)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-700 flex items-center gap-2 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-950"
                >
                  <IoCalendarOutline size={18} />
                  <span>
                    {teamFormData.SchoolTeamResumption
                      ? teamFormData.SchoolTeamResumption
                      : "Select date"}
                  </span>
                </button>
                {showResumptionPicker && (
                  <div className="absolute top-full mt-2 z-50 bg-white border border-gray-300 rounded-lg shadow-lg p-6 w-80">
                    <div className="flex justify-between items-center mb-4">
                      <button
                        type="button"
                        onClick={() =>
                          setResumptionMonth(
                            new Date(
                              resumptionMonth.getFullYear(),
                              resumptionMonth.getMonth() - 1
                            )
                          )
                        }
                        className="px-3 py-1 hover:bg-gray-200 rounded font-semibold text-lg"
                      >
                        ←
                      </button>
                      <span className="font-semibold text-lg">
                        {resumptionMonth.toLocaleString("default", {
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setResumptionMonth(
                            new Date(
                              resumptionMonth.getFullYear(),
                              resumptionMonth.getMonth() + 1
                            )
                          )
                        }
                        className="px-3 py-1 hover:bg-gray-200 rounded font-semibold text-lg"
                      >
                        →
                      </button>
                    </div>
                    <div className="grid grid-cols-7 gap-2 mb-2">
                      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                        (day) => (
                          <div
                            key={day}
                            className="h-10 flex items-center justify-center text-xs font-bold text-gray-600"
                          >
                            {day}
                          </div>
                        )
                      )}
                    </div>
                    <div className="grid grid-cols-7 gap-2">
                      {Array.from({ length: 42 }).map((_, i) => {
                        const firstDay = new Date(
                          resumptionMonth.getFullYear(),
                          resumptionMonth.getMonth(),
                          1
                        ).getDay();
                        const daysInMonth = new Date(
                          resumptionMonth.getFullYear(),
                          resumptionMonth.getMonth() + 1,
                          0
                        ).getDate();
                        const dayNum = i - firstDay + 1;

                        if (dayNum <= 0 || dayNum > daysInMonth) {
                          return (
                            <div
                              key={i}
                              className="w-8 h-8 flex items-center justify-center"
                            />
                          );
                        }

                        const date = new Date(
                          resumptionMonth.getFullYear(),
                          resumptionMonth.getMonth(),
                          dayNum
                        );
                        const formatted = formatDateOrdinal(date);
                        const isSelected =
                          teamFormData.SchoolTeamResumption === formatted;

                        return (
                          <button
                            key={i}
                            type="button"
                            onClick={() => {
                              setTeamFormData((prev) => ({
                                ...prev,
                                SchoolTeamResumption: formatted,
                              }));
                              setShowResumptionPicker(false);
                            }}
                            className={`h-10 flex items-center justify-center rounded text-sm font-semibold ${
                              isSelected
                                ? "bg-blue-950 text-white"
                                : "hover:bg-gray-200 text-gray-700"
                            }`}
                          >
                            {dayNum}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                School Team Closes Date
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowClosesPicker(!showClosesPicker)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-700 flex items-center gap-2 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-950"
                >
                  <IoCalendarOutline size={18} />
                  <span>
                    {teamFormData.SchoolTeamCloses
                      ? teamFormData.SchoolTeamCloses
                      : "Select date"}
                  </span>
                </button>
                {showClosesPicker && (
                  <div className="absolute top-full mt-2 z-50 bg-white border border-gray-300 rounded-lg shadow-lg p-6 w-80">
                    <div className="flex justify-between items-center mb-4">
                      <button
                        type="button"
                        onClick={() =>
                          setClosesMonth(
                            new Date(
                              closesMonth.getFullYear(),
                              closesMonth.getMonth() - 1
                            )
                          )
                        }
                        className="px-3 py-1 hover:bg-gray-200 rounded font-semibold text-lg"
                      >
                        ←
                      </button>
                      <span className="font-semibold text-lg">
                        {closesMonth.toLocaleString("default", {
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setClosesMonth(
                            new Date(
                              closesMonth.getFullYear(),
                              closesMonth.getMonth() + 1
                            )
                          )
                        }
                        className="px-3 py-1 hover:bg-gray-200 rounded font-semibold text-lg"
                      >
                        →
                      </button>
                    </div>
                    <div className="grid grid-cols-7 gap-2 mb-2">
                      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                        (day) => (
                          <div
                            key={day}
                            className="h-10 flex items-center justify-center text-xs font-bold text-gray-600"
                          >
                            {day}
                          </div>
                        )
                      )}
                    </div>
                    <div className="grid grid-cols-7 gap-2">
                      {Array.from({ length: 42 }).map((_, i) => {
                        const firstDay = new Date(
                          closesMonth.getFullYear(),
                          closesMonth.getMonth(),
                          1
                        ).getDay();
                        const daysInMonth = new Date(
                          closesMonth.getFullYear(),
                          closesMonth.getMonth() + 1,
                          0
                        ).getDate();
                        const dayNum = i - firstDay + 1;

                        if (dayNum <= 0 || dayNum > daysInMonth) {
                          return (
                            <div
                              key={i}
                              className="w-8 h-8 flex items-center justify-center"
                            />
                          );
                        }

                        const date = new Date(
                          closesMonth.getFullYear(),
                          closesMonth.getMonth(),
                          dayNum
                        );
                        const formatted = formatDateOrdinal(date);
                        const isSelected =
                          teamFormData.SchoolTeamCloses === formatted;

                        return (
                          <button
                            key={i}
                            type="button"
                            onClick={() => {
                              setTeamFormData((prev) => ({
                                ...prev,
                                SchoolTeamCloses: formatted,
                              }));
                              setShowClosesPicker(false);
                            }}
                            className={`h-10 flex items-center justify-center rounded text-sm font-semibold ${
                              isSelected
                                ? "bg-blue-950 text-white"
                                : "hover:bg-gray-200 text-gray-700"
                            }`}
                          >
                            {dayNum}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <Button
            name={teamLoading ? "Updating..." : "Update Team Info"}
            disabled={
              teamLoading ||
              !teamFormData.NumberOfDays ||
              !teamFormData.SchoolTeamResumption ||
              !teamFormData.SchoolTeamCloses
            }
            className="bg-blue-950 text-white hover:bg-blue-900 disabled:bg-gray-400"
            icon={
              teamLoading ? (
                <FaSpinner className="animate-spin text-10" />
              ) : undefined
            }
            onClick={async () => {
              setTeamLoading(true);
              try {
                const res = await updateSchoolResumptionTeamInfo(data?._id, {
                  NumberOfDays: parseInt(teamFormData.NumberOfDays).toString(),
                  SchoolTeamResumption: parseOrdinalDate(
                    teamFormData.SchoolTeamResumption
                  ),
                  SchoolTeamCloses: parseOrdinalDate(
                    teamFormData.SchoolTeamCloses
                  ),
                });

                if (
                  res &&
                  res.message === "school account detail updated successfully"
                ) {
                  toast.success("Team info updated successfully");
                  setTeamFormData({
                    NumberOfDays: "",
                    SchoolTeamResumption: "",
                    SchoolTeamCloses: "",
                  });
                } else {
                  toast.error("Failed to update team info");
                }
              } catch (err) {
                console.error("Error updating team info:", err);
                toast.error("Error updating team info");
              } finally {
                setTeamLoading(false);
              }
            }}
          />
        </div>

      </main>


      <div className="flex-1 " />
      <div className="flex justify-end gap-4">
        <label
          htmlFor="feedback"
          className="px-6 py-2 border-blue-950 border rounded-md m-2 overflow-hidden flex items-center justify-center text-blue-950 gap-2"
        >
          <MdFeedback size={30} />
          <div>Give us Feedback</div>
        </label>
      </div>
      {/* Download School Data Modal */}
      {showDownloadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md">
            <h2 className="text-xl font-semibold mb-2">Download School Data</h2>
            <p className="mb-4 text-gray-700">
              You are about to download your school's data. This may include
              sensitive information. Do you want to proceed?
            </p>
            <div className="flex justify-end gap-3 mt-4">
              <button
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium"
                onClick={() => setShowDownloadModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded bg-blue-950 hover:bg-blue-900 text-white font-medium"
                onClick={async () => {
                  try {
                    const res = await downlaodSchoolData(data?._id);
                    if (res && res.data) {
                      // If the API returns a file URL or blob for a zip file
                      if (res.data.url) {
                        // Download via anchor tag
                        const link = document.createElement("a");
                        link.href = res.data.url;
                        link.download = "school-data.zip";
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                      } else if (res.data instanceof Blob) {
                        // If response is a Blob (zip)
                        const blobUrl = window.URL.createObjectURL(res.data);
                        const link = document.createElement("a");
                        link.href = blobUrl;
                        link.download = "school-data.zip";
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                        window.URL.revokeObjectURL(blobUrl);
                      }
                    }
                  } catch (err) {
                    // Optionally show error toast
                  }
                  setShowDownloadModal(false);
                }}
              >
                <a href={`${URL}/export-data-file/${data?._id}`}>Proceed</a>
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Put this part before </body> tag */}
      <input type="checkbox" id="feedback" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <div className="flex justify-between items-center ">
            <h3 className="text-lg font-medium leading-tight">
              We will Love to know how we can serve you better!
            </h3>
            <label
              htmlFor="feedback"
              className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer hover:bg-slate-200 transition-all duration-300 bg-slate-100"
            >
              <MdClose />
            </label>
          </div>
          <p className="py-4 leading-tight text-[12px]">
            Tell us what we should add in our next update and complains you
            have... so we can improve on this software!
          </p>
        </div>
        <label className="modal-backdrop" htmlFor="feedback">
          Close
        </label>
      </div>
      
    </div>
  );
};

export default SettingScreen;
