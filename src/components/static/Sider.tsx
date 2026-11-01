import { useDispatch, useSelector } from "react-redux";
import { changeMenuState, changeStarting } from "../../global/reduxState";
import {
  useSchoolData,
  useSchoolSessionData,
  useViewTermDetail,
} from "../../pages/hook/useSchoolAuth";
import pix from "../../assets/pix.jpg";
import StoreScreen from "./StoreScreen";
import ClipLoader from "react-spinners/ClipLoader";
import { useEffect, useState } from "react";
import { makePayment } from "../../pages/api/schoolAPIs";
import Button from "../reUse/Button";
import PrimaryAdminScreen from "./PrimaryAdminScreen";
import SecondaryAdminScreen from "./SecondaryAdminScreen";
import {
  clockIn,
  clockOut,
  findStudentWidthID,
} from "../../pagesForStudents/api/studentAPI";
import toast from "react-hot-toast";
import { mutate } from "swr";
import MakeOtherPayment from "../../pages/page/payment/MakeOtherPayment";
import { Countdown } from "./CountDown";
import Achievements from "./AchievementCOmponent";
import QueueAdmin from './QueueAdmin';

const Sider = () => {
  const dispatch = useDispatch();
  const toggleImage = useSelector((state: any) => state.imageToggle);
  const user = useSelector((state: any) => state.user);

  const [roll, setRoll] = useState<Boolean>(false);

  const { data } = useSchoolData();

  const { schoolInfo, loading }: any = useSchoolSessionData(user.id);

  let refID = schoolInfo;

  let obj: any = {};

  if (refID?.length > 0) {
    for (let i = 0; i < refID?.length; i++) {
      obj = refID[0];
    }
  }

  let termID: string = "";

  if (obj !== null) {
    for (let i = 0; i < obj?.term?.reverse()?.length; i++) {
      termID = obj?.term[0];
    }
  }

  const { termData } = useViewTermDetail(termID);

  const handleToggleMenuFalse = () => {
    if (!document.startViewTransition) {
      dispatch(changeMenuState(false));
    } else {
      document.startViewTransition(() => {
        dispatch(changeMenuState(false));
      });
    }
  };

  let term = [];
  useEffect(() => {
    if (schoolInfo?.length === 1 || schoolInfo?.length === 0) {
      for (let i = 0; i < schoolInfo?.length; i++) {
        term = schoolInfo[i].term;
      }

      if (term?.length === 1) {
        dispatch(changeStarting(true));
      } else {
        dispatch(changeStarting(false));
      }
    } else {
      dispatch(changeStarting(false));
    }
  }, []);

  const [enrollmentID, setEnrollmentID] = useState<string>("");
  const [loadings, setLoading] = useState<boolean>(false);
  const [showQueueAdmin, setShowQueueAdmin] = useState(false);
  const [queuedCount, setQueuedCount] = useState<number>(0);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const { getAllQueued } = await import('@/lib/offlineQueue');
        const all = await getAllQueued();
        if (mounted) setQueuedCount(all.length || 0);
      } catch (err) {}
    })();

    try {
      const bc = new BroadcastChannel('ss-queue');
      bc.addEventListener('message', async (ev) => {
        const d = ev.data;
        if (d && (d.type === 'processed' || d.type === 'failed')) {
          const { getAllQueued } = await import('@/lib/offlineQueue');
          const all = await getAllQueued();
          if (mounted) setQueuedCount(all.length || 0);
        }
      });
    } catch (err) {}

    return () => { mounted = false; };
  }, []);

  return (
    <div
      className={`overflow-y-auto min-h-[100vh] w-full border-r bg-white ${
        data?.categoryType === "Secondary" ? "text-blue-900" : "text-green-900"
      } flex flex-col `}
    >
      <div className="w-full flex px-2 mt-6 ">
        <div className=" w-16 h-16 object-cover flex border rounded-full items-center justify-center ">
          {toggleImage ? (
            <div className="flex justify-center items-center w-full h-full object-cover rounded-full border">
              <ClipLoader size={20} color="#172554" />
            </div>
          ) : (
            <img
              className="w-full h-full object-cover rounded-full border"
              src={data?.avatar ? data?.avatar : pix}
            />
          )}
        </div>

        <div className="ml-2">
          {/* TODO: Add tooltip */}
          <div className="break-words font-bold text-[16px]">
            {data?.schoolName?.length > 15 ? (
              <p>{data?.schoolName.substring(0, 15)}...</p>
            ) : (
              // <Tooltip side={true} tip={data?.schoolName}>
              // </Tooltip>
              data?.schoolName
            )}
          </div>
          <p className="break-words font-medium text-slate-400 text-[14px] mt-2">
            ID: {data?.enrollmentID}
          </p>
          <p className="break-words font-medium text-slate-400  text-[14px] -mt-1">
            Session: {loading ? "" : data?.presentSession}
          </p>

          <p className="text-[12px] font-bold">
            Term: {/* *************here***************** */}
            {loading ? (
              ""
            ) : data?.presentTerm ? (
              data?.presentTerm
            ) : (
              <span className="text-red-400 ml-1">Please create TERM</span>
            )}
          </p>

          {/* PICK */}
        </div>
      </div>
      <div className="mx-2">
        {" "}
        {data?.freeMode ? (
          <div className="mt-3 py-2 text-center flex flex-col border mx-0 rounded-md py-1 bg-blue-50">
            <div className="mb-2 px-2 text-[12px] text-left font-medium ">
              We are using this space to Appreciate you for considering us over
              many.
              <br />
              <p className="mt-1 font-bold ">Thank you for coming on board!</p>
            </div>
          </div>
        ) : (
          <div>
            {!termData?.plan && termData?.payRef === "" && (
              <Button
                name={
                  roll ? (
                    <span className="ml-3">Processing...</span>
                  ) : (
                    "Please Renew your Plan"
                  )
                }
                icon={
                  roll && (
                    <ClipLoader
                      size={10}
                      color="white"
                      className="absolute -mt-1 ml-1"
                    />
                  )
                }
                className="text-[14px] w-full uppercase px-0 pr-2 font-bold bg-red-500 ml-0"
                onClick={() => {
                  setRoll(true);
                  makePayment(user?.id, data?.email)
                    .then((res: any) => {
                      if (res?.data?.status === 201) {
                        location.replace(
                          res?.data?.data?.data?.authorization_url
                        );
                      }
                    })
                    .then(() => {
                      setRoll(false);
                    });
                }}
              />
            )}
          </div>
        )}
      </div>
      {/* top box */}

      {/* {
        <div className="mt-4 px-2 text-center flex flex-col justify-center items-center border mx-2 rounded-md py-4">
          <div className=" text-[13px] font-medium ">
            <Countdown style1="16px" style2="14px" />
          </div>
        </div>
      } */}
      <div className="mt-3"/>
      <Achievements />

      {/* top box */}
      <div className="mt-10 px-2 text-center flex flex-col border mx-2 rounded-md py-4">
        <div className="mb-4 text-[13px] font-medium ">
          Encourage Parents to Purchase Learning Materials for thier child by
          having more items in your Library Store{" "}
        </div>
        <div className="flex w-full justify-center">
          <StoreScreen />
        </div>
        <div className="mt-2" />

        <MakeOtherPayment />
      </div>
      <div className="mt-2 px-2 center flex flex-col border mx-2 rounded-md py-1">
        <div className="mb-4 text-[14px] uppercase font-bold">
          Clocking Students
        </div>
        <div className="flex w-full justify-center">
          <div className="flex flex-col">
            <input
              className="border text-[14px] rounded-md h-[45px] outline-none pl-2 w "
              placeholder="Student ID"
              value={enrollmentID}
              onChange={(e) => setEnrollmentID(e.target.value)}
            />
            <Button
              name={loadings ? "clocking student..." : "Clock-in/Clock-Out"}
              disabled={loadings}
              className={`${
                loadings
                  ? "bg-red-400 cursor-not-allowed animate-pulse "
                  : "bg-red-500"
              } text-white mx-0 border-none font-medium py-4 px-2 text-[12px] uppercase leading-tight`}
              onClick={() => {
                setLoading(true);

                findStudentWidthID(enrollmentID)
                  .then((res) => {
                    console.log(res);
                    if (res.status === 201) {
                      if (!res.data?.data?.clockIn) {
                        clockIn(
                          res.data?.data?.schoolIDs,
                          res.data?.data?._id
                        ).then((res) => {
                          if (res.status === 201) {
                            mutate(
                              `api/view-student-info/${res.data?.data?._id}`
                            );
                            toast.success(
                              `${res.data?.studentFirstName}, has been clock in`
                            );
                          } else {
                            toast.error(
                              "student has been clocked in yet, Please try again!"
                            );
                          }
                        });
                      } else {
                        clockOut(
                          res.data?.data?.schoolIDs,
                          res.data?.data?._id
                        ).then((res) => {
                          if (res.status === 201) {
                            mutate(
                              `api/view-student-info/${res.data?.data?._id}`
                            );
                            toast.success(
                              `${res.data?.studentFirstName}, has been clock out`
                            );
                          } else {
                            toast.error(
                              "student has been clocked out yet, Please try again!"
                            );
                          }
                        });
                      }
                    } else {
                      toast.error("something went wrong");
                    }
                  })
                  .finally(() => {
                    setLoading(false);
                    setEnrollmentID("");
                  });
              }}
            />
          </div>

          {/* </NavLink> */}
        </div>
      </div>
      <div>
        {/* <div className="mt-2 flex items-center gap-2">
          <button onClick={() => setShowQueueAdmin(true)} className="px-3 py-2 bg-neutral-100 rounded flex items-center gap-2">
            Queued Requests
            {queuedCount > 0 && <span className="bg-red-500 text-white px-2 py-0.5 rounded-full text-xs">{queuedCount}</span>}
          </button>
        </div> */}
        {data?.categoryType === "Secondary" ||
        data?.schoolTags[0]?.val === "Secondary School." ? (
          <SecondaryAdminScreen />
        ) : (
          <PrimaryAdminScreen />
        )}
      </div>
      {showQueueAdmin && <QueueAdmin onClose={() => setShowQueueAdmin(false)} />}
    </div>
  );
};

export default Sider;
