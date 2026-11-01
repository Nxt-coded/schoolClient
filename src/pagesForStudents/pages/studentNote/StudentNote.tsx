import { NavLink } from "react-router-dom";
import { FaBook, FaEye, FaThumbsUp } from "react-icons/fa6";
import { MdAutoAwesome } from "react-icons/md";
import {
  useClassLessonNote,
  useStudentInfo,
} from "../../../pagesForStudents/hooks/useStudentHook";
import LittleHeader from "../../../components/layout/LittleHeader";
import { BsArrowRight } from "react-icons/bs";
import { FiLoader } from "react-icons/fi";
import { FcApproval, FcCancel } from "react-icons/fc";
import pic from "../../../assets/pix.jpg";
import moment from "moment";
import { useState } from "react";
import Input from "../../../components/reUse/Input";

const ClassLessonNote = () => {
  const { studentInfo } = useStudentInfo();
  const [searchNote, setSearchNote] = useState("");

  const { classLessonNote } = useClassLessonNote(studentInfo?.presentClassID);

  const readNote = classLessonNote?.lessonNotes.filter(
    (item: any) => item?.adminSignation === true
  );

  const filteredNotes = readNote?.filter((notes: any) => {
    const allNotes = `${notes?.subject} ${notes?.topic}`.toLowerCase();
    return allNotes.includes(searchNote.toLowerCase());
  });

  classLessonNote?.lessonNotes?.reverse();

  return (
    <div>
      <LittleHeader name="Teacher's Lesson Notes" />
      <div className="min-h-[82vh] text-blue-950">
        <div>
          <div className="flex float-end"></div>
          <div className="py-9 w-full mt-[20px] p-3 border-b-2">
            <p className="font-bold mb-7">Lesson Note</p>
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
                  <div className="mt-5 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 sm:grid-cols-1 gap-5 freshh">
                    {filteredNotes?.map((props: any, i: number) => (
                      <div
                        key={props?._id || i}
                        className="py-5 px-5 min-h-[200px] border rounded-[15px] shadow-sm flex items-start justify-center flex-col overflow-hidden"
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
                            <div className="w-[280px] sm:w-auto mt-4 sm:mt-0 mb-3 text-[23px] lg:text-[27px] font-bold flex items-center gap-3 ">
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
                        <div className="flex-1" />

                        <div className="w-full flex justify-between items-start">
                          {/* Click to View button */}
                          <div className="mt-5">
                            <NavLink to={props?._id}>
                              <div className="py-2 px-3 bg-blue-950 text-white rounded-md flex justify-center items-center gap-2 transition-all duration-300 cursor-pointer ">
                                <h1>View Lesson Note</h1>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassLessonNote;
