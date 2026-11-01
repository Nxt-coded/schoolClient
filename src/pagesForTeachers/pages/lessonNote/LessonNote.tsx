import { Link, NavLink } from "react-router-dom";
import { FaBook, FaDisplay, FaEye, FaReply, FaThumbsUp } from "react-icons/fa6";
import { MdAutoAwesome, MdCheck, MdClose } from "react-icons/md";
import { useLessonNote } from "../../../pagesForStudents/hooks/useStudentHook";
import LittleHeader from "../../../components/layout/LittleHeader";
import { useTeacherInfo } from "../../hooks/useTeacher";
import Button from "../../components/reUse/Button";
import { FiLoader } from "react-icons/fi";
import { useEffect, useState } from "react";
import { IoCreateOutline } from "react-icons/io5";
import { BsArrowRight } from "react-icons/bs";
import pic from "../../../assets/pix.jpg";
import moment from "moment";
import { FcApproval, FcCancel } from "react-icons/fc";
import { LuSend } from "react-icons/lu";
import { useSchoolSessionData } from "../../../pages/hook/useSchoolAuth";
import { readSchool } from "../../../pages/api/schoolAPIs";
import Input from "../../components/reUse/Input";

const LessonNote = () => {
  document.title = "Teacher's Lesson Notes";

  const { teacherInfo } = useTeacherInfo();
  const { lessonNote } = useLessonNote(
    teacherInfo?.schoolIDs,
    teacherInfo?._id
  );
  const [searchNote, setSearchNote] = useState("");

  const filteredNotes = lessonNote?.lessonNotes?.filter((notes: any) => {
    const allNotes = `${notes?.subject} ${notes?.topic}`.toLowerCase();
    return allNotes.includes(searchNote.toLowerCase());
  });

  lessonNote?.lessonNotes?.reverse();

  const [id, setID] = useState<string>("");
  const [obj, setObj] = useState<any>({});

  const { schoolInfo } = useSchoolSessionData(teacherInfo?.schoolIDs);
  const [schoolData, setSchoolData] = useState<any>([]);

  useEffect(() => {
    const fetchSchoolData = async () => {
      if (teacherInfo?.schoolIDs) {
        try {
          const data = await readSchool(teacherInfo.schoolIDs);
          setSchoolData(data);
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchSchoolData();
  }, [teacherInfo?.schoolIDs]);

  return (
    <div>
      <LittleHeader name="Teacher's Lesson Notes" />
      <div className="min-h-[82vh] text-blue-950 overflow-hidden">
        <div>
          {/* <div className="flex float-end">
            <NavLink to="/create-notes">
              <Button
                name="Add Note"
                className="py-4 px-4 bg-black text-white"
              />
            </NavLink>
          </div> */}

          <div className="w-full flex justify-end">
            <Link to="/create-notes">
              <div className="flex items-center gap-1">
                <IoCreateOutline size={25} />
                <p className="text-[12px] font-bold text-blue-950">
                  Create New Lesson Note
                </p>
              </div>
            </Link>
          </div>

          <div className="py-9 w-full mt-4 p-3 border-b-2">
            <p className="font-bold mb-3">Lesson Note</p>
            <div>
              <Input
                placeholder="Search By Subject Or Topic"
                value={searchNote}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setSearchNote(e.target.value);
                }}
              />
            </div>

            <div className="">
              <div className="">
                {filteredNotes?.length > 0 ? (
                  <div className="mt-5 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-3 sm:grid-cols-1 freshh">
                    {filteredNotes?.map((props: any, i: number) => (
                      <div
                        key={props?._id || i}
                        className="pt-6 pb-3 px-5 min-h-[200px] border rounded-[15px] shadow-sm flex items-start justify-center flex-col overflow-hidden"
                      >
                        <div className="w-full mb-3 flex justify-between items-start">
                          <div className="w-[75%]">
                            <div className="mb-2 block md:flex items-center gap-2">
                              <h3
                                className={`font-semibold text-[15px] sm:text-[19px] lg:text-[21px] flex items-center gap-2`}
                              >
                                <FaBook />
                                {props?.subject}
                              </h3>
                              <p className=" mt-2 text-green-500 text-[12px] font-medium">
                                {moment(props?.createdAt).fromNow()}
                              </p>
                            </div>
                            <div className="w-[280px] sm:w-auto mt-4 sm:mt-0 mb-3 text-[23px] lg:text-[27px] font-bold flex items-center gap-3">
                              <h1>{props?.topic}</h1>
                            </div>
                          </div>

                          <div className="w-[20%] h-full flex justify-center items-start gap-2">
                            <img
                              src={props?.profilePic ? props?.profilePic : pic}
                              alt="teacher_profile_pic"
                              className="h-[60px] w-[60px] border object-cover rounded-full"
                            />
                          </div>
                        </div>
                        <div className="mb-3">
                          <p className="break-words text-wrap">
                            {props?.summary ? (
                              props?.summary.substring(0, 250)
                            ) : (
                              <div className="opacity-50">No summary</div>
                            )}
                          </p>
                        </div>
                        <div className="w-full border mb-3" />
                        <div className="mb-2 flex items-center font-semibold ">
                          <h2 className="w-[70px]">By:</h2>
                          <h2 className="">{props?.teacher}</h2>
                        </div>
                        <div className="mb-2 flex items-center font-semibold ">
                          <h2 className="w-[70px]">For:</h2>
                          <h2 className="">{props?.classes}</h2>
                        </div>
                        <div className="mb-8 font-semibold flex items-center">
                          <h2 className="w-[70px]">Status</h2>
                          {props?.adminSignation ? (
                            <h2 className="font-semibold text-green-500 flex items-center gap-1">
                              Approved <FcApproval />
                            </h2>
                          ) : (
                            <h2 className="font-semibold text-red-500 flex items-center gap-1">
                              Not Approved <FcCancel />
                            </h2>
                          )}
                        </div>
                        <div className="flex-1" />

                        <div className="w-full smallphon flex justify-between items-start">
                          {/* Send Response to Admin Button */}
                          <div>
                            {props?.adminSignation ? (
                              <div>
                                <div className="w-full mb-[25px] flex justify-center items-center">
                                  <label
                                    htmlFor=""
                                    className="py-3 px-3 bg-green-700 text-white text-[11px] sm:text-[14px] lg:text-[13px] xl:text-[14px] font-semibold rounded-md flex justify-center items-center gap-2 transition-all duration-300 "
                                  >
                                    Lesson Note has been Approved
                                    <FaThumbsUp className="mb-1" />
                                  </label>
                                </div>
                              </div>
                            ) : (
                              <div className="w-[90%] mb-[25px] flex justify-center items-center">
                                {props?.messageSent ? (
                                  <div className="w-full flex justify-center items-center">
                                    <label
                                      htmlFor="view_response"
                                      className="py-2 px-4 w-[270px] h-[43px] bg-blue-950 text-white rounded-md flex justify-center items-center gap-2 transition-all duration-300 cursor-pointer "
                                      onClick={() => {
                                        setID(props?._id);
                                        setObj(props);
                                      }}
                                    >
                                      View Admin's Reply
                                      <FaEye className="ml-3 text-[18px] animate-pulse" />
                                    </label>
                                  </div>
                                ) : (
                                  <div className="py-4 px-3 h-[50px] bg-blue-950 text-white rounded-md flex justify-center items-center gap-2 cursor-pointer opacity-30">
                                    <div>Awaiting Administrator's Response</div>
                                    <FiLoader className="animate-spin transition-all duration-1000" />
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                          {/* Click to View button */}
                          <div>
                            <NavLink to={props?._id}>
                              <div
                                // style={{ color: randomBg }}
                                className="w-[40px] h-[40px] flex justify-center items-center bg-blue-950 text-[25px] font-extrabold rounded-lg text-white cursor-pointer scale-105"
                              >
                                <BsArrowRight className="animate-pulse scale-105" />
                              </div>
                            </NavLink>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="freshh">No Lesson Note Created Yet</div>
                )}
              </div>
              {/* Comparison */}
            </div>
          </div>
        </div>
      </div>
      {/* Put this part before </body> tag */}
      <input type="checkbox" id="view_response" className="modal-toggle" />
      <div className="modal rounded-md text-blue-950 text-left" role="dialog">
        {lessonNote?.lessonNotes?.map((props: any) => (
          <div className="modal-box bg-white  rounded-md">
            <div className="flex items-center justify-between my-4 ">
              <p className="font-bold">Response From The Administrator</p>

              <label
                htmlFor="view_response"
                className="hover:bg-blue-50 transition-all duration-300  cursor-pointer rounded-full flex items-center justify-center w-6 h-6 font-bold "
              >
                <MdClose />
              </label>
            </div>
            <hr />

            <div className="mt-10 w-full gap-2 flex flex-col items-center">
              <div className="w-full">
                <label className="font-medium text-[12px]">
                  Response Message Detail{" "}
                  <span className="text-red-500">*</span>
                </label>

                {/* // readSubject */}
                <h1>{obj?.responseDetail}</h1>
                <br />
              </div>
              <div className="w-full">
                <label className="font-medium text-[12px]">
                  Deadline to update and submit Lesson Note Message Detail{" "}
                  <span className="text-red-500">*</span>
                </label>

                <h1 className="font-bold">{obj?.deadline}</h1>

                <br />
                <Link to={`/edit-lesson-note/${id}`}>
                  <button className="btn btn-neutral">
                    Rework on The Lesson Note
                  </button>
                </Link>

                <p></p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LessonNote;
