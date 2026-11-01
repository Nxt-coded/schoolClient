import { useState, useEffect } from "react";
import Input from "../../../components/reUse/Input";
import Button from "../../../components/reUse/Button";
import { MdSave } from "react-icons/md";
import BeatLoader from "react-spinners/ClipLoader";
import { useSchoolCookie, useSchoolData } from "../../hook/useSchoolAuth";
import {
  changeSchoolName,
  changeSchoolPersonalName,
  changeSchoolPhone,
  deleteAllStudent,
  updateSchoolSignature,
  updateSchoolStamp,
  updateSchoolSMS,
  makeSMSPayment,
  testSchoolSMS,
} from "../../api/schoolAPIs";
import { mutate } from "swr";
import toast, { Toaster } from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import { ConfirmSMSModal } from "../../../components/modals/ConfirmSMSModal";

const PersonalInfoScreen = () => {
  const { data } = useSchoolData();
  const schoolID = useSchoolCookie().dataID;

  const [spin, setSpin] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [popup, setPopup] = useState<string | null>(null);
  const [changeText, setchangeText] = useState<boolean>(false);

  const [toggle, setToggle] = useState<boolean>(false);
  const [toggle1, setToggle1] = useState<boolean>(false);
  const [toggle2, setToggle2] = useState<boolean>(false);
  const [toggle3, setToggle3] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [pendingSMSValue, setPendingSMSValue] = useState<boolean>(false);

  const [smsToggle, setSmsToggle] = useState<boolean>(false);
  const [smsLoadingText, setSmsLoadingText] = useState<string>("");
  const [testPhone, setTestPhone] = useState<string>("");
  const [testMessage, setTestMessage] = useState<string>("");
  const [testLoading, setTestLoading] = useState<boolean>(false);
  const [selectedChannel, setSelectedChannel] = useState<string>("dnd");

  useEffect(() => {
    if (data) {
      setSmsToggle(data?.sendSMS);
    }
  }, [data?.sendSMS]);

  const [signature, setSignature] = useState<string>("");
  const [stamp, setStamp] = useState<string>("");
  const [stampFile, setStampFile] = useState<string>("");

  const [firstName, setFirstName] = useState<string>(
    `${data?.name ? data?.name : ""}`
  );
  const [lastName, setLastName] = useState<string>(
    `${data?.name2 ? data?.name2 : ""}`
  );

  const [phone, setPhone] = useState<string>(
    `${data?.phone ? data?.phone : ""}`
  );

  const onToggle = () => {
    if (!document.startViewTransition) {
      setToggle(!toggle);
      setToggle2(false);
    } else {
      document.startViewTransition(() => {
        setToggle2(false);
        setToggle(!toggle);
      });
    }
  };

  const onToggle1 = () => {
    if (!document.startViewTransition) {
      setToggle1(!toggle1);
      setToggle2(false);
    } else {
      document.startViewTransition(() => {
        setToggle1(!toggle1);
        setToggle2(false);
      });
    }
  };

  const onToggle2 = () => {
    if (!document.startViewTransition) {
      setToggle2(!toggle2);
      setToggle(false);
    } else {
      document.startViewTransition(() => {
        setToggle2(!toggle2);
        setToggle(false);
      });
    }
  };

  const onToggle3 = () => {
    if (!document.startViewTransition) {
      setToggle3(!toggle3);
      setToggle(false);
    } else {
      document.startViewTransition(() => {
        setToggle3(!toggle3);
        setToggle(false);
      });
    }
  };

  const onToggleSMS = async (value: boolean) => {
    if (!value) {
      setIsModalOpen(false); // Close modal when disabling
      // Disabling logic
      setSmsToggle(value); // Immediate UI reflection
      const originalData = data;
      const key = `api/view-school/${schoolID}/seconded-data`;

      // Optimistic update
      mutate(key, { ...data, sendSMS: value }, false);

      try {
        setLoading(true);
        const res = await updateSchoolSMS(schoolID, value);
        if (res.status === 201) {
          toast.success("SMS Notification status updated");
          mutate(key);
        } else {
          throw new Error("Update failed");
        }
      } catch (error) {
        toast.error("Error updating SMS Notification status");
        setSmsToggle(!value); // Rollback UI reflection
        mutate(key, originalData, false);
      } finally {
        setLoading(false);
      }
    } else {
      // Enabling logic (trigger payment)
      // Keep modal open to show loading state
      try {
        setLoading(true);
        const res = await makeSMSPayment(schoolID, { email: data?.email });

        if (res.status === 201) {
          toast.success("Initializing payment...");
          setSmsLoadingText("Redirecting to Paystack...");
          setTimeout(() => {
            window.location.href = res.data.data.authorization_url;
            // No need to close modal, the page will redirect
          }, 1500);
        } else {
          setIsModalOpen(false); // Close on error
          setLoading(false);
          setSmsLoadingText("");
          toast.error("Failed to initialize payment");
        }
      } catch (error) {
        setIsModalOpen(false);
        setLoading(false);
        setSmsLoadingText("");
        toast.error("Error initializing payment");
      }
    }
  };

  const handleTestSMS = async () => {
    if (!testPhone) {
      toast.error("Please enter a phone number to test");
      return;
    }

    try {
      setTestLoading(true);
      const res = await testSchoolSMS(testPhone, selectedChannel, testMessage);
      if (res.status === 200) {
        toast.success(`Test SMS (${selectedChannel}) Triggered!`);
      } else {
        toast.error(`Failed on ${selectedChannel} channel. Try another?`);
      }
    } catch (error) {
      toast.error("Error triggering test SMS");
    } finally {
      setTestLoading(false);
    }
  };

  const handleToggleClick = (newValue: boolean) => {
    setPendingSMSValue(newValue);
    setIsModalOpen(true);
  };

  const handleDeleteAllStudents = () => {
    setSpin(true);
    setTimeout(() => {
      try {
        deleteAllStudent(schoolID).then((res) => {
          if (res.status === 200) {
            if (res?.data?.length < 1) {
              toast.error("There Are No Students Registered");
              return res.data;
            } else {
              toast.success("All Student Has Been Successfully Deleted");
              return res.data;
            }
          }
        });
      } catch (error) {
        toast.error("Error In Deleting All Student");
        console.log(error);
      } finally {
        setSpin(false);
      }
      clearTimeout;
    }, 2000);
  };

  return (
    <>
      <div className="grid col-span-6 lg:col-span-3 pr-0 h-[100px] text-blue-950">
        <Toaster position="top-center" />
        {/* forms */}
        <div>
          <div className="flex w-[100%] justify-between h-[100px] relative ">
            <div>
              <div>Legal Name</div>
              {toggle ? (
                <div
                  className="absolute top-6 z-10 -left-1
                h-[200px] w-[100%] sm:w-[120%] md:w-[105%] lg:w-[110%]  bg-blue-500 py-4
                "
                  style={{
                    background: "rgba(252, 254, 255, 0.25)",
                    backdropFilter: " blur( 4px )",
                  }}
                >
                  <div className="z-20">
                    <div className="flex w-full">
                      <Input
                        className="flex-1 mr-1 placeholder:text-gray-400 "
                        placeholder={data?.name ? "" : "Enter First Name"}
                        defaultValue={data?.name}
                        value={firstName}
                        onChange={(e: any) => {
                          setFirstName(e.target.value);
                        }}
                      />
                      <Input
                        className="flex-1 ml-1"
                        placeholder={data?.name2 ? "" : "Enter Last Name"}
                        defaultValue={data?.name2}
                        value={lastName}
                        onChange={(e: any) => {
                          setLastName(e.target.value);
                        }}
                      />
                    </div>
                    <div>
                      <Button
                        name={`${loading ? " Loading" : "save name"}`}
                        icon={
                          loading ? (
                            <BeatLoader
                              color={"color"}
                              size={18}
                              className="mb-[0.12rem]"
                            />
                          ) : (
                            <MdSave />
                          )
                        }
                        className={` bg-blue-950 transition-all duration-300 ${
                          loading && "h-12"
                        }`}
                        onClick={() => {
                          setLoading(true);
                          changeSchoolPersonalName(data?._id, {
                            name: firstName,
                            name2: lastName,
                          }).then((res) => {
                            setLoading(false);
                            setToggle(false);

                            toast.success("Legal Name updated successfully");
                            mutate(`api/view-school/${data?._id}`);
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  {data?.name || data?.name2 ? (
                    <div>
                      {data?.name} {data?.name2}
                    </div>
                  ) : (
                    <div>No Legal Name yet</div>
                  )}
                </div>
              )}
            </div>
            <div
              className="text-[12px] underline font-[500] hover:cursor-pointer  ml-10"
              onClick={onToggle}
            >
              Change
            </div>
          </div>
        </div>

        {/* forms */}
        <div>
          <div className="flex w-full justify-between h-[100px] relative ">
            {" "}
            <div>
              <div>Email address</div>
              <div className="text-[12px] leading-4 text-[gray] mb-4 ">
                Use an address you’ll always have access to.
              </div>
              <div className="font-[400] mt-3">
                {toggle1 ? (
                  <div>{data?.email}</div>
                ) : (
                  <div>
                    {data?.email.substring(0, 2)}****@
                    {data?.email.split("@")[1]}
                  </div>
                )}
              </div>
            </div>
            <div
              className="text-[12px] underline font-[500] hover:cursor-pointer "
              onClick={onToggle1}
            >
              View
            </div>
          </div>
        </div>

        {/* forms */}
        <div>
          <div className="flex w-full justify-between h-[100px] relative mt-10 ">
            {" "}
            <div>
              <div>Phone numbers</div>

              {toggle2 ? (
                <div
                  className="absolute top-5 z-10 
                h-[200px] w-[100%] sm:w-[120%] md:w-[90%]   bg-blue-500 py-4
                "
                  style={{
                    background: "rgba(252, 254, 255, 0.25)",
                    backdropFilter: " blur( 4px )",
                  }}
                >
                  <div className="z-20">
                    <div className="flex w-full">
                      <Input
                        className="flex-1 mr-1 placeholder:text-gray-400 "
                        placeholder={
                          data?.phone ? "" : "Enter your contact mobile number "
                        }
                        defaultValue={phone}
                        value={phone}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setPhone(e.target.value);
                        }}
                      />
                    </div>
                    <div>
                      <Button
                        name={`${loading ? " Loading" : "save number"}`}
                        icon={
                          loading ? (
                            <BeatLoader
                              color={"color"}
                              size={18}
                              className="mb-[0.12rem]"
                            />
                          ) : (
                            <MdSave />
                          )
                        }
                        className={` bg-blue-950 transition-all duration-300 ${
                          loading && "h-12"
                        }`}
                        onClick={() => {
                          setLoading(true);
                          changeSchoolPhone(data?._id, phone).then(() => {
                            toast.success("Phone Number Updated successfully");
                            setLoading(false);
                            setToggle2(false);
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-[12px] leading-4 text-[gray] mb-4 mr-8 ">
                  Add a your contact phone Number: {data?.phoneNumber}
                </div>
              )}

              <div>
                <div className="font-[400] mt-3">
                  {toggle2 ? (
                    <div>{data?.phoneNumber}</div>
                  ) : (
                    <div>
                      {data?.phone ? (
                        <div>{data?.phone}</div>
                      ) : (
                        <div>No phone contact yet</div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div
              className="text-[12px] underline font-[500] hover:cursor-pointer "
              onClick={onToggle2}
            >
              Change
            </div>
          </div>
        </div>

        {/* forms */}
        <div>
          <div className="flex w-full justify-between relative mt-10">
            <div>
              <div>Change School Name</div>

              {toggle3 ? (
                <div
                  className="absolute top-8 z-10 
                h-[200px] w-[100%] sm:w-[120%] md:w-[90%] bg-blue-500 py-4
                "
                  style={{
                    background: "rgba(252, 254, 255, 0.25)",
                    backdropFilter: " blur( 4px )",
                  }}
                >
                  <div className="z-20">
                    <div className="flex w-full">
                      <Input
                        className="flex-1 mr-1 placeholder:text-gray-400 "
                        value={phone}
                        defaultValue={data?.schoolName}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setPhone(e.target.value);
                        }}
                      />
                    </div>
                    <div>
                      <Button
                        name={`${loading ? " Loading" : "save school name"}`}
                        icon={
                          loading ? (
                            <BeatLoader
                              color={"color"}
                              size={18}
                              className="mb-[0.12rem]"
                            />
                          ) : (
                            <MdSave />
                          )
                        }
                        className={` bg-blue-950 transition-all duration-300 ${
                          loading && "h-12"
                        }`}
                        onClick={() => {
                          setLoading(true);
                          changeSchoolName(data?._id, { schoolName: phone }).then(
                            () => {
                              setLoading(false);
                              onToggle3();
                              mutate(`api/view-school/${data?._id}`);
                            }
                          );
                        }}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-[12px] leading-4 text-[gray] mb-4 mr-8 ">
                  You can always update your school name here:{" "}
                  <span className="font-medium">{data?.schoolName}</span>
                </div>
              )}

              <div className="mt-10 mb-10">
                <div className="flex items-center gap-4">
                  <div className="text-[16px] font-medium">SMS Notifications</div>
                  <div
                    className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-all duration-300 ${
                      smsToggle ? "bg-green-500" : "bg-gray-400"
                    }`}
                    onClick={() => handleToggleClick(!smsToggle)}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white transition-all duration-300 transform ${
                        smsToggle ? "translate-x-6" : "translate-x-0"
                      }`}
                    />
                  </div>
                </div>
                <p className="text-[12px] text-gray-500 mt-1">
                  Enable this to send SMS notifications to parents when their child
                  clocks in or out.
                </p>
                <div className="mt-4 flex flex-col gap-3 max-w-[300px]">
                  <p className="text-[14px] font-semibold text-blue-900">Manual SMS Test</p>
                  
                  <div className="flex flex-col gap-2 bg-gray-50 p-2 rounded border border-gray-200">
                    <p className="text-[12px] font-medium text-gray-700">Select Channel:</p>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-1 text-[12px] cursor-pointer">
                        <input 
                          type="radio" 
                          name="channel" 
                          value="generic" 
                          checked={selectedChannel === "generic"}
                          onChange={() => setSelectedChannel("generic")}
                        /> Generic
                      </label>
                      <label className="flex items-center gap-1 text-[12px] cursor-pointer">
                        <input 
                          type="radio" 
                          name="channel" 
                          value="dnd" 
                          checked={selectedChannel === "dnd"}
                          onChange={() => setSelectedChannel("dnd")}
                        /> DND
                      </label>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <input
                      type="text"
                      placeholder="Phone (e.g. 080123...)"
                      className="border rounded px-2 py-1 text-[13px] outline-none border-gray-300 focus:border-blue-500"
                      value={testPhone}
                      onChange={(e) => setTestPhone(e.target.value)}
                    />
                    <textarea
                      placeholder="Optional Custom Message..."
                      className="border rounded px-2 py-1 text-[13px] outline-none border-gray-300 focus:border-blue-500 h-[60px] resize-none"
                      value={testMessage}
                      onChange={(e) => setTestMessage(e.target.value)}
                    />
                    <button
                      disabled={testLoading}
                      onClick={handleTestSMS}
                      className={`px-3 py-2 rounded text-[12px] font-bold text-white transition-all w-full ${
                        testLoading
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-blue-600 hover:bg-blue-700"
                      }`}
                    >
                      {testLoading ? "Sending..." : "Send Test"}
                    </button>
                  </div>
                  <p className="text-[11px] text-gray-400 italic leading-tight">
                    Try **DND** channel if Generic gives a 404 (Sender Not Found) error.
                  </p>
                </div>
              </div>

              <div className="flex gap-2 items-center w-full ">
                <div className="mt-0  p-5 uppercase">
                  {data?.signature ? (
                    <img
                      src={data?.signature}
                      className="w-[200px] h-[120px] border mb-10 object-contain"
                    />
                  ) : (
                    <div className="w-[200px] h-[120px] border mb-10 flex justify-center items-center text-[12px] font-semibold italic">
                      <p>NO SIGNATURE YET</p>
                    </div>
                  )}
                  <div>
                    {signature ? (
                      <button
                        className={`bg-red-500 ${
                          loading
                            ? "cursor-not-allowed bg-red-400 animate-pulse"
                            : "cursor-pointer"
                        } text-white px-[45px] py-4 rounded-md text-[12px]`}
                        disabled={loading}
                        onClick={() => {
                          setLoading(true);
                          const formData: any = new FormData();
                          formData.append("avatar", signature);
                          updateSchoolSignature(data?._id, formData)
                            .then((res) => {
                              if (res.status === 201) {
                                toast.success(
                                  "signature updated successfully"
                                );
                                mutate(`api/api/view-school/${data?._id}`);
                              } else {
                                toast.error("signature updated Error");
                              }
                            })
                            .finally(() => {
                              setLoading(false);
                            });
                        }}
                      >
                        {loading ? "Loading..." : "upload Signature"}
                      </button>
                    ) : (
                      <div>
                        <label
                          htmlFor="signature-upload"
                          className="mt-4 bg-blue-950 text-white px-12 py-4 rounded-md text-[12px] cursor-pointer"
                        >
                          Update Signature
                        </label>
                        <input
                          className="hidden"
                          type="file"
                          id="signature-upload"
                          onChange={(e: any) => {
                            setSignature(e.target.files[0]);
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-0  p-5 uppercase">
                  {data?.stamp ? (
                    <img
                      src={data?.stamp}
                      className="w-[200px] h-[120px] border mb-10 object-contain"
                    />
                  ) : (
                    <div className="w-[200px] h-[120px]  border mb-10 flex justify-center items-center text-[12px] font-semibold italic overflow-hidden">
                      {stamp === "" ? (
                        <p>NO STAMP YET</p>
                      ) : (
                        <img
                          src={stampFile}
                          className="h-[120px] border mb-10 object-cover"
                        />
                      )}
                    </div>
                  )}
                  <div>
                    {stamp ? (
                      <button
                        className={`bg-red-500 ${
                          loading
                            ? "cursor-not-allowed bg-red-400 animate-pulse"
                            : "cursor-pointer"
                        } text-white px-[45px] py-4 rounded-md text-[12px]`}
                        disabled={loading}
                        onClick={() => {
                          setLoading(true);
                          const formData: any = new FormData();
                          formData.append("avatar", stamp);
                          updateSchoolStamp(data?._id, formData)
                            .then((res) => {
                              if (res.status === 201) {
                                toast.success("stamp updated successfully");
                                mutate(`api/api/view-school/${data?._id}`);
                              } else {
                                toast.error("stamp updated Error");
                              }
                            })
                            .finally(() => {
                              setLoading(false);
                              setStamp("");
                            });
                        }}
                      >
                        {loading ? "Loading..." : "upload stamp"}
                      </button>
                    ) : (
                      <div>
                        <label
                          htmlFor="stamp-upload"
                          className="mt-4 bg-blue-950 text-white px-12 py-4 rounded-md text-[12px] cursor-pointer"
                        >
                          Update stamp
                        </label>
                        <input
                          className="hidden"
                          type="file"
                          id="stamp-upload"
                          onChange={(e: any) => {
                            setStamp(e.target.files[0]);
                            setStampFile(
                              URL.createObjectURL(e.target.files[0])
                            );
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div
              className="text-[12px] underline font-[500] hover:cursor-pointer "
              onClick={onToggle3}
            >
              Change
            </div>
          </div>
        </div>

        {/* Delete All Students section removed / commented out */}
      </div>
      <ConfirmSMSModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => onToggleSMS(pendingSMSValue)}
        currentStatus={smsToggle}
        loading={loading}
        loadingText={smsLoadingText}
        totalCost={data?.students?.length * 960}
      />
    </>
  );
};

export default PersonalInfoScreen;
