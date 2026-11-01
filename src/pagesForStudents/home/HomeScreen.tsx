document.title = "Welcome Back Dashboard";
import { Outlet } from "react-router-dom";
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
import toast from "react-hot-toast";
import Announcement from "./Announcement";
import moment from "moment";
import {
  createSchoolSubject,
  createSchoolAnnouncement,
  createSchoolEvent,
} from "../../pages/api/schoolAPIs";
import { useSchoolData } from "../../pages/hook/useSchoolAuth";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const showIV = useSelector((state: any) => state.subjectToggled);
  const notice = useSelector((state: any) => state.notice);
  const event = useSelector((state: any) => state.event);

  const { data } = useSchoolData();

  const [subject, setSubject] = useState("");
  const [classAssigned, setClassAssigned] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  const [startDateTime, setStartDateTime] = useState<any>(new Date());
  const [title, setTitle] = useState<string>("");
  const [details, setDetails] = useState<string>("");

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
  };

  const handleDisplaySubject = () => {
    if (!document.startViewTransition) {
      dispatch(displaySubject(!showIV));
    } else {
      document.startViewTransition(() => {
        dispatch(displaySubject(!showIV));
      });
    }
  };

  const handleDisplaySubjectOff = () => {
    if (!document.startViewTransition) {
      dispatch(displaySubject(false));
    } else {
      document.startViewTransition(() => {
        dispatch(displaySubject(false));
      });
    }
  };

  const handleCreateSubject = () => {
    try {
      setLoading(true);
      createSchoolSubject(data?._id, {
        subjectTitle: subject,
        designated: classAssigned,
      }).then((res: any) => {
        if (res?.status === 201) {
          setLoading(false);
          handleDisplaySubject();
        } else {
          setLoading(false);
          toast.error(`${res?.response?.data?.message}`);
        }
      });
    } catch (error) {
      return error;
    }
  };

  const handleCreateAnnouncement = () => {
    try {
      setLoading(true);
      createSchoolAnnouncement(data._id, {
        title,
        details,
        date: moment(startDateTime).format("LLL"),
      }).then((res: any) => {
        if (res.status === 201) {
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
  };

  const handleDisplayNotice = () => {
    if (!document.startViewTransition) {
      dispatch(displayNotice(!notice));
    } else {
      document.startViewTransition(() => {
        dispatch(displayNotice(!notice));
      });
    }
  };

  return (
    <div>
      <LittleHeader name={"Dashboard"} />
      <div className="grid w-full grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-2 ">
        <div className="mt-24 sm:mt-0 col-span-1 sm:col-span-2 md:col-span-3   rounded-md h-[100%]">
          <div className="w-full min-h-[130px] bg-blue-950 rounded-lg mt-1 text-white p-3">
            <p className="text-[20px] mb-2">Announcement/Event</p>
            <Announcement />
          </div>
          <Outlet />
        </div>

        <div className="bg-white order-first sm:order-last col-span-1 p-2 rounded-md h-[200px] sticky transition-all duration-300 mt-4 top-[4.5rem] sm:top-16">
          <div className="bg-white py-5 col-span-1 border p-2 rounded-md min-h-[200px] transition-all duration-300 -mt-5 ">
            <p className="font-medium text-[14px] mb-5">
              {/* <GeneralDataScreen /> */}
              Quick Action
            </p>
            <div>
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
                name="Quick Chat"
                className="bg-orange-600 hover:bg-orange-700 transition-all duration-300 text-[13px] w-[95%] py-2 mb-2"
                onClick={handleDisplayStudent}
              />
            </div>
          </div>

          <div className="hidden sm:block col-span-1 border p-2 rounded-md min-h-[200px] transition-all duration-300 top-16 mt-4">
            <p className="font-medium text-[14px] mb-5">
              {/* <GeneralDataScreen /> */}
              Subjects
            </p>
            <div className="font-medium text-[13px]">
              <div>Junior Mathimatics</div>
              <div>Senior Mathimatics</div>
              <div>Junior English</div>
              <div>Senior English</div>
              <div>Chemistry</div>
              <div>Physics</div>
              <div>Biology</div>
              <div>Integrated Science</div>
              <div>Introduction to Technology</div>
              <div>Economics</div>
              <div>Agricultural Science</div>
            </div>
          </div>
        </div>
      </div>

      {showIV && (
        <div
          className="-top-0 w-full h-full left-0 absolute rounded-md overflow-hidden"
          style={{
            background: "rgba(73, 154, 255, 0.2)",
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

      {notice && (
        <div
          className="-top-0 w-full h-full left-0 absolute rounded-md overflow-hidden"
          style={{
            background: "rgba(73, 154, 255, 0.2)",
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
            background: "rgba(73, 154, 255, 0.2)",
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
