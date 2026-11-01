document.title = "Welcome Back Dashboard";
import { Link, Outlet } from "react-router-dom";
import Button from "../../components/reUse/Button";
import LittleHeader from "../../components/static/LittleHeader";
import { useDispatch, useSelector } from "react-redux";
import {
  displayDelay,
  displayNotice,
  displayNoticeEvent,
  displayStudent,
  displaySubject,
} from "../../global/reduxState";
import AddAnyItem from "../../components/static/AddAnyItems";
import { useState } from "react";
import {
  createSchoolAnnouncement,
  createSchoolEvent,
  createSchoolSubject,
} from "../api/schoolAPIs";
import { useSchoolData, useSchoolSubject } from "../hook/useSchoolAuth";
import toast from "react-hot-toast";
import Announcement from "./Announcement";
import moment from "moment";
import { mutate } from "swr";
import { GiPadlock } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import Input from "../../components/reUse/Input";
import HandleDailyExpense from "../page/expenditure/HandleDailyExpense";
import { GrAction } from "react-icons/gr";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const showIV = useSelector((state: any) => state.subjectToggled);
  const notice = useSelector((state: any) => state.notice);
  const event = useSelector((state: any) => state.event);

  const { data } = useSchoolData();
  const { schoolSubject } = useSchoolSubject();

  const [subject, setSubject] = useState("");
  const [classAssigned, setClassAssigned] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  const [startDateTime, setStartDateTime] = useState<any>(new Date());
  const [title, setTitle] = useState<string>("");
  const [details, setDetails] = useState<string>("");

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDisplayStudent = () => {
    if (!document.startViewTransition) {
      dispatch(displayStudent(true));
      dispatch(displayDelay(true));
    } else {
      document.startViewTransition(() => {
        dispatch(displayStudent(true));
        const timer = setTimeout(() => {
          clearTimeout(timer);
          dispatch(displayDelay(true));
        }, 100);
      });
    }
    goToTop();
  };

  const handleDisplaySubjectOff = () => {
    if (!document.startViewTransition) {
      dispatch(displaySubject(false));
    } else {
      document.startViewTransition(() => {
        dispatch(displaySubject(false));
      });
    }
    goToTop();
  };

  const handleCreateSubject = () => {
    try {
      setLoading(true);
      createSchoolSubject(data?._id, {
        subjectTitle: subject,
        designated: classAssigned,
      }).then((res: any) => {
        if (res?.status === 201) {
          mutate(`api/view-school-subject/${data?._id}`);
          setLoading(false);
          handleDisplaySubject();
        } else {
          setLoading(false);
          toast.error(`${res?.response?.data?.message}`);
        }
      });

      goToTop();
    } catch (error) {
      return error;
    }
  };

  const handleCreateAnnouncement = () => {
    try {
      setLoading(true);
      createSchoolAnnouncement(data?._id, {
        title,
        details,
        date: moment(startDateTime).format("LLL"),
      }).then((res: any) => {
        if (res.status === 201) {
          mutate(`api/view-announcement/${data?._id}`);
          setLoading(false);
          handleDisplayNotice();
          setStartDateTime(null);
          setTitle("");
          setDetails("");
        } else {
          setLoading(false);
          toast.error(`${res?.response?.data?.message}`);
        }
      });
      goToTop();
    } catch (error) {
      return error;
    }
  };

  const handleCreateEvent = () => {
    try {
      setLoading(true);
      createSchoolEvent(data._id, {
        title,
        details,
        date: moment(startDateTime).format("LLL"),
      }).then((res: any) => {
        mutate(`api/view-event/${data?._id}`);
        if (res.status === 201) {
          setLoading(false);
          handleDisplayNotice();
          setStartDateTime(null);
          setTitle("");
          setDetails("");
        } else {
          setLoading(false);
          toast.error(`${res.response.data.message}`);
        }
      });
      goToTop();
    } catch (error) {
      return error;
    }
  };

  const handleDisplayEvent = () => {
    if (!document.startViewTransition) {
      dispatch(displayNoticeEvent(!event));
    } else {
      document.startViewTransition(() => {
        dispatch(displayNoticeEvent(!event));
      });
    }
    goToTop();
  };

  const handleDisplayNotice = () => {
    if (!document.startViewTransition) {
      dispatch(displayNotice(!notice));
    } else {
      document.startViewTransition(() => {
        dispatch(displayNotice(!notice));
      });
    }
    goToTop();
  };

  const handleDisplaySubject = () => {
    if (!document.startViewTransition) {
      dispatch(displaySubject(!showIV));
    } else {
      document.startViewTransition(() => {
        dispatch(displaySubject(!showIV));
      });
    }
    goToTop();
  };

  const [view, setView] = useState<boolean>(false);
  const [codeValue, setCodeValue] = useState<string>("");

  return (
    <div>
      <LittleHeader name={"Dashboard"} />
      <div className=" relative grid w-full grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-2 ">
        <div className="mt-56 sm:mt-0 col-span-1 sm:col-span-2 md:col-span-3 rounded-md h-[100%]">
          <div className="w-full min-h-[130px] bg-blue-950 rounded-lg text-white p-3 mt-8">
            <p className="text-[20px] mb-2">Announcement/Event</p>
            <Announcement />
          </div>
          <Outlet />
        </div>

        <div className="order-first sm:order-last col-span-1 p-2 rounded-md h-[200px] md:sticky transition-all duration-300 mt-4 top-[4.5rem] sm:top-16">
          <div className="py-0 col-span-1 border p-2 rounded-md min-h-[200px] transition-all duration-300 -mt-5">
            <div className="font-[700] text-[14px] mb-5 flex justify-center items-center mt-3">
              {/* <GeneralDataScreen /> */}
              <div>Quick Actions</div>
              <div className="text-blue-950 text-[17px] ml-2">
                <GrAction />
              </div>
            </div>
            {/* <Link to="/scan-clocking ">
                <Button
                  name="Scan Clocking"
                  className="bg-slate-800 hover:bg-neutral-900 transition-all duration-300 text-[13px] w-[95%] py-2 mb-2"
                />
              </Link> */}

            <div>
              <HandleDailyExpense />

              <Button
                name="Push Announcement"
                className="bg-black hover:bg-neutral-800 transition-all duration-300 text-[13px] w-[95%] py-2 mb-2"
                onClick={handleDisplayNotice}
              />

              <Button
                name="Register new Student"
                className="bg-blue-900  hover:bg-blue-950 transition-all duration-300 text-[13px] w-[95%] py-2 mb-2"
                onClick={handleDisplayStudent}
              />

              <Button
                name="Create Event"
                className="bg-purple-900 hover:bg-purple-950 transition-all duration-300 text-[13px] w-[95%] py-2 mb-2"
                onClick={handleDisplayEvent}
              />

              <Button
                name="Add Subject"
                className="bg-pink-600 hover:bg-pink-700 transition-all duration-300 text-[13px] w-[95%] py-2 mb-2"
                onClick={handleDisplaySubject}
              />

              <Button
                name="Quick Chat (coming soon)"
                className="bg-orange-600 hover:bg-orange-700 transition-all duration-300 text-[13px] w-[95%] py-2 mb-2"
              />

              <Link to="/class-report-card-ready">
                <Button
                  name="Prepare Report-Card"
                  className="bg-neutral-700 hover:bg-neutral-900 transition-all duration-300 text-[13px] w-[95%] py-2 mb-2"
                />
              </Link>

              <Link to="/class-report-mid-card">
                <Button
                  name="Prepare MidTerm Report-Card"
                  className="bg-yellow-700 hover:bg-yellow-500 transition-all duration-300 text-[13px] w-[95%] py-2 mb-2"
                />
              </Link>

              <Link to="/school-fees-history">
                <Button
                  name="View School Fees Payments"
                  className="bg-black hover:bg-neutral-800 transition-all duration-300 text-[13px] w-[95%] py-2 mb-2"
                />
              </Link>

              <Button
                name="Expenditures"
                className="bg-green-600 hover:bg-green-700 transition-all duration-300 text-[13px] w-[95%] py-2 mb-2"
                onClick={() => {
                  setView(true);
                  goToTop();
                }}
              />
            </div>
          </div>

          <div className="hidden sm:block col-span-1 border p-2 rounded-md min-h-[200px] transition-all duration-300 top-16 mt-4">
            <p className="font-medium text-[14px] mb-5">Subjects</p>
            <div className="font-medium text-[12px] h-[280px]  overflow-y-auto ">
              {schoolSubject?.subjects?.map((props: any) => (
                <div key={props?._id} className="my-1">
                  <span className="font-bold">{props?.subjectTitle}</span>{" "}
                  &middot; {props?.designated} &middot;{" "}
                  {props?.subjectTeacherName}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {view && (
        <div className="absolute  top-0 left-0 backdrop-blur-md h-[99%] w-full rounded-lg flex items-center pt-[200px] flex-col">
          <div className="w-[90%] lg:w-[700px] h-[300px] bg-white border rounded-md p-4 flex flex-col shadow-sm">
            <div>
              <h2 className="font-semibold mb-2">Security Measure</h2>
              <p className="text-[12px]">
                You are about to enter a very sensitive area, as a measure of
                security, You would be required to provider your{" "}
                <strong className="font-medium">"Secure Code"</strong>
                ...
              </p>
            </div>
            <div className="flex-1" />
            <div className="flex-col flex">
              <label className="text-[12px] font-semibold mb-3">
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
                <Link to={`${"/expenditures"}`}>
                  <Button
                    icon={<GiPadlock size={30} />}
                    name={"Proceed"}
                    className="ml-2 bg-blue-950 "
                    onClick={handleDisplayNotice}
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

      {showIV && (
        <div
          className="-top-0 w-full h-full left-0 absolute rounded-md overflow-hidden"
          style={{
            background: `${
              data?.categoryType === "Secondary"
                ? "rgba(73, 154, 255, 0.2)"
                : "rgba(255, 73, 85, 0.3)"
            }`,
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(5px)",
            border: "1px solid rgba(73, 154, 255, 0.3)",
          }}
        >
          <AddAnyItem
            titleCall="Add New Subject"
            offFn={handleDisplaySubjectOff}
            en
            sub
            text="Place the title fo the subject you are about to create and the Class that is meant to have this created subject!"
            placeStart="Mathematics"
            placeEnd="JSS 1A"
            startTitle="Enter Subject Name"
            endTitle="Class Assigned"
            setEnd={setClassAssigned}
            setStart={setSubject}
            start={subject}
            end={classAssigned}
            handleFn={handleCreateSubject}
            loading={loading}
            setLoading={setLoading}
          />
        </div>
      )}

      {!notice && (
        <div
          className="-top-0 w-full h-full left-0 absolute rounded-md overflow-hidden"
          style={{
            background: `${
              data?.categoryType === "Secondary"
                ? "rgba(73, 154, 255, 0.2)"
                : "rgba(255, 73, 85, 0.3)"
            }`,
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(5px)",
            border: "1px solid rgba(73, 154, 255, 0.3)",
          }}
        >
          <AddAnyItem
            titleCall="Make Announcement"
            offFn={handleDisplayNotice}
            date
            text="Make a public Announcement to give an importance notice to all teachers and student about something very important...!"
            placeStart="Title this Announcement"
            placeEnd="Mon. 21st Feb 2024"
            startTitle="Enter Announcement Title"
            endTitle="Date the Announcement"
            setStart={setTitle}
            setAnnounce={setDetails}
            announce={details}
            start={title}
            end={classAssigned}
            handleFn={handleCreateAnnouncement}
            loading={loading}
            setLoading={setLoading}
            startDateTime={startDateTime}
            startDateTimeFn={(date: any) => setStartDateTime(date)}
          />
        </div>
      )}

      {event && (
        <div
          className="-top-0 w-full h-full left-0 absolute rounded-md overflow-hidden"
          style={{
            background: `${
              data?.categoryType === "Secondary"
                ? "rgba(73, 154, 255, 0.2)"
                : "rgba(255, 73, 85, 0.3)"
            }`,
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(5px)",
            border: "1px solid rgba(73, 154, 255, 0.3)",
          }}
        >
          <AddAnyItem
            titleCall="Create/Schedule a new Event"
            offFn={handleDisplayEvent}
            date
            text="Create/Schedule an Event and publish it so that everyone can see and get excited about this upcoming event!"
            placeStart="Title this Event"
            placeEnd="Mon. 21st Feb 2024"
            startTitle="Enter Event Title"
            endTitle="Date for the Event"
            setStart={setTitle}
            setAnnounce={setDetails}
            announce={details}
            start={title}
            end={classAssigned}
            handleFn={handleCreateEvent}
            loading={loading}
            setLoading={setLoading}
            startDateTime={startDateTime}
            startDateTimeFn={(date: any) => setStartDateTime(date)}
          />
        </div>
      )}
    </div>
  );
};

export default HomeScreen;
