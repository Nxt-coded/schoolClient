// src/screens/ExamQuizSetupScreen.js
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  FaTrashAlt,
  FaCheckDouble,
  FaSpinner,
  FaRegEdit,
} from "react-icons/fa";
import {
  MdPlayCircle,
  MdVisibilityOff,
  MdVisibility,
  MdClose,
} from "react-icons/md";

import pix from "../../../assets/pix.jpg";
import { GoGoal } from "react-icons/go";

// import {

//   useMidTest,
//   useSubjectAssignment,
//   useSujectQuiz,
//   useTeacherInfo,
// } from "../../hooks/useTeacher";

import { mutate } from "swr";

import _ from "lodash";
import { FaHandDots } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { displayDelay, displayStudent } from "@/global/reduxState";
import Button from "@/components/reUse/Button";
import toast, { Toaster } from "react-hot-toast";
import { useExaminationQuiz } from "@/pagesForTeachers/hooks/useMidTest";
import LittleHeader from "@/components/static/LittleHeader";
import { ConfirmDeleteModal } from "@/pagesForTeachers/pages/quiz/ConfirmDeleteModal";
import { ConfirmDeleteModalMidTest } from "@/pagesForTeachers/pages/quiz/ConfirmDeleteModal";
import {
  deleteExamination,
  deleteMidTestData,
  deleteQuiz,
  randomizeStartExam,
  randomizeStartMidTest,
  randomizeStopExam,
  randomizeStopMidTest,
  readClassInfo,
  startExamination,
  startMidTest,
  stopExamination,
  stopMidTest,
  updateExaminationData,
  updateMidTestData,
} from "@/pagesForTeachers/api/teachersAPI";

import {
  useMidTest,
  useSubjectAssignment,
  useSujectQuiz,
  useTeacherInfo,
  useSchoolAnnouncement,
} from "@/pagesForTeachers/hooks/useTeacher";
import { useSchoolData } from "@/pages/hook/useSchoolAuth";

const ExamQuizSetupScreen = () => {
  const { teacherInfo } = useTeacherInfo();
  const { schoolAnnouncement } = useSchoolAnnouncement(teacherInfo?.schoolIDs);
  const { data: schoolInfoData } = useSchoolData();
  const { subjectID } = useParams();

  const [state, setState] = useState<any>({});

  const normalize:any = (val: string) => val?.trim()?.toLowerCase();
  const currentTerm =
    schoolInfoData?.presentTerm ||
    schoolAnnouncement?.presentTerm ||
    state?.presentTerm;

  const { subjectQuiz } = useSujectQuiz(subjectID!);

  const { data: examination, mutate: examMutate } = useExaminationQuiz(
    subjectID!
  );
  const { midTest, midTestMutate } = useMidTest(subjectID!);

  const [isModalOpen, setModalOpen] = useState<Boolean>(false);
  const [isModalOpenExam, setModalOpenExam] = useState<Boolean>(false);
  const [examToDelete, setExamToDelete] = useState<string | null>(null);
  const [isMidTestModalOpen, setMidTestModalOpen] = useState<Boolean>(false);
  const [midTestToDelete, setMidTestToDelete] = useState<string | null>(null);

  const [loading, setLoading] = useState<Boolean>(false);
  const [loadingExam, setLoadingExam] = useState<Boolean>(false);
  const [loadingTest, setLoadingTest] = useState<Boolean>(false);
  const [toggleExam, setToggleExam] = useState<Boolean>(false);

  const [selectedQuizId, setSelectedQuizId] = useState<string | null>(null);

  useEffect(() => {
    if (subjectQuiz?.designated) {
      readClassInfo(subjectQuiz.designated).then((res: any) => {
        setState(res.data);
      });
    }
  }, [subjectQuiz, examination, midTest]);

  const { subjectAssignment } = useSubjectAssignment(state?._id!);

  const quiz: [] = subjectQuiz?.quiz;
  const assign: [] = subjectAssignment?.assignment;

  const combine: Array<any> = quiz?.concat(assign);

  const readQuiz = _.filter(quiz, (el: any) => el.status === "quiz");

  const handleDelete = (id: string) => {
    setSelectedQuizId(id);
    setModalOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedQuizId) {
      try {
        await deleteQuiz(selectedQuizId).then(() => {
          mutate(`api/view-subject-quiz/${subjectID}`);
        });
      } catch (error) {
        console.error("Failed to delete item:", error);
      }
      setModalOpen(false);
      setSelectedQuizId(null);
    }
  };

  const [duration, setDuration] = useState(
    midTest?.quiz?.instruction?.duration
  );
  const [mark, setMark] = useState(midTest?.quiz?.instruction?.mark);

  const [toggle, setToggle] = useState(false);
  const [toggleEdit, setToggleEdit] = useState(false);
  const [tExamRand, setTExamRand] = useState(false);
  const [tMidRand, setTMidRand] = useState(false);
  const [showMidTestConfirm, setShowMidTestConfirm] = useState(false);
  const [showExamConfirm, setShowExamConfirm] = useState(false);
  const navigate = useNavigate();

  const [markExam, setMarkExam] = useState<string | number | undefined>(
    examination?.exam?.quiz?.instruction?.mark ?? ""
  );

  const [dept, setDept] = useState<string | number | undefined>(
    examination?.exam?.quiz?.instruction?.dept ?? ""
  );

  const [durationExam, setDurationExam] = useState<string | number | undefined>(
    examination?.exam?.quiz?.instruction?.duration ?? ""
  );

  // Custom duration states for midTest and Exam
  const [isCustomDuration, setIsCustomDuration] = useState<boolean>(false);
  const [customMinutes, setCustomMinutes] = useState<string>("");
  const [isCustomDurationExam, setIsCustomDurationExam] =
    useState<boolean>(false);
  const [customMinutesExam, setCustomMinutesExam] = useState<string>("");

  // Keep local component state in sync when remote data updates
  useEffect(() => {
    setDuration(midTest?.quiz?.instruction?.duration ?? "");
    setMark(midTest?.quiz?.instruction?.mark ?? "");
  }, [midTest]);

  useEffect(() => {
    setDurationExam(examination?.exam?.quiz?.instruction?.duration ?? "");
    setMarkExam(examination?.exam?.quiz?.instruction?.mark ?? "");
  }, [examination]);

  const STANDARD_DURATIONS = [
    "0.084",
    "0.167",
    "0.333",
    "0.500",
    "0.667",
    "0.833",
    "1.000",
    "1.500",
  ];

  // detect if duration is a custom value (not in standard options)
  useEffect(() => {
    const cur = String(duration);
    if (cur && !STANDARD_DURATIONS.includes(cur)) {
      setIsCustomDuration(true);
      const mins = Number(cur) * 60;
      setCustomMinutes(Number.isFinite(mins) ? String(Math.round(mins)) : "");
    } else {
      setIsCustomDuration(false);
      setCustomMinutes("");
    }
  }, [duration]);

  useEffect(() => {
    const cur = String(durationExam);
    if (cur && !STANDARD_DURATIONS.includes(cur)) {
      setIsCustomDurationExam(true);
      const mins = Number(cur) * 60;
      setCustomMinutesExam(
        Number.isFinite(mins) ? String(Math.round(mins)) : ""
      );
    } else {
      setIsCustomDurationExam(false);
      setCustomMinutesExam("");
    }
  }, [durationExam]);

  // When user types custom minutes, update the duration in hours (string with 3 decimals)
  useEffect(() => {
    if (isCustomDuration) {
      if (customMinutes === "") {
        setDuration("");
      } else {
        const hrs = Number(customMinutes) / 60;
        setDuration(hrs.toFixed(3));
      }
    }
  }, [customMinutes]);

  useEffect(() => {
    if (isCustomDurationExam) {
      if (customMinutesExam === "") {
        setDurationExam("");
      } else {
        const hrs = Number(customMinutesExam) / 60;
        setDurationExam(hrs.toFixed(3));
      }
    }
  }, [customMinutesExam]);

  return (
    <div className="text-blue-950  relative">
      <LittleHeader name={`Viewing ${subjectQuiz?.subjectTitle} Quiz`} />

      <ConfirmDeleteModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={async () => {
          if (!examToDelete) return;
          setLoading(true);
          try {
            await deleteExamination(subjectID!, examToDelete);
            examMutate(`api/view-subject-exam/${subjectID}`);
          } catch (error) {
            console.error(error);
            toast.error(`Failed to delete ${currentTerm} examination`);
          } finally {
            setLoading(false);
            setModalOpen(false);
            setExamToDelete(null);
          }
        }}
      />

      <ConfirmDeleteModalMidTest
        isOpen={isMidTestModalOpen}
        onClose={() => setMidTestModalOpen(false)}
        onConfirm={async () => {
          if (!midTestToDelete) return;
          setLoading(true);
          try {
            await deleteMidTestData(subjectID!, midTestToDelete);
            // revalidate midTest list
            midTestMutate(`api/view-subject-mid-test/${subjectID}`);
          } catch (error) {
            console.error(error);
            toast.error(`Failed to delete ${currentTerm} mid-test`);
          } finally {
            setLoading(false);
            setMidTestModalOpen(false);
            setMidTestToDelete(null);
          }
        }}
      />

      <div className="mt-10" />

      {/* Confirm modal for Create Mid-Test */}
      {showMidTestConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-md p-6 w-[90%] max-w-md">
            <h3 className="font-semibold text-lg mb-3">Create {currentTerm} Mid-Test CBT</h3>
            <p className="text-sm text-gray-600 mb-4">
              Are you sure you're ready to create {currentTerm} Mid-Test's CBT for this
              subject?
              <br />
              <br />
              Please note that this should be created only once, if created
              again it will overwrite the previous one!
            </p>
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 rounded-md bg-gray-200"
                onClick={() => setShowMidTestConfirm(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-md bg-purple-500 text-white"
                onClick={() => {
                  setShowMidTestConfirm(false);
                  navigate(`/create-mid-test/${subjectID}`);
                }}
              >
                Proceed
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm modal for Create Exam */}
      {showExamConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-md p-6 w-[90%] max-w-md">
            <h3 className="font-semibold text-lg mb-3">
              Create {currentTerm} Examination CBT
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Are you sure you're ready to create {currentTerm} Examination's CBT for this
              subject?
              <br />
              <br />
              Please note that this should be created only once, if created
              again it will overwrite the previous one!
            </p>
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 rounded-md bg-gray-200"
                onClick={() => setShowExamConfirm(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-md bg-pink-500 text-white"
                onClick={() => {
                  setShowExamConfirm(false);
                  navigate(`/create-examination/${subjectID}`);
                }}
              >
                Proceed
              </button>
            </div>
          </div>
        </div>
      )}

      <div>
        <div className="mb-16 flex-col-reverse flex lg:flex-row justify-between items-center">
          <p className="mt-10 lg:mt-0">View Assignment/Test/Quiz</p>

          <div className=" place-content-end grid grid-cols-2 md:grid-cols-3 gap-2 ">
            {/* <Link to={`/create-quiz/${subjectID}`}>
              <p className="font-medium cursor-pointer bg-neutral-950 text-white px-6 py-2 rounded-sm uppercase text-[12px] text-center">
                + Create Pop Test
              </p>
            </Link> */}
            <button
              onClick={() => setShowMidTestConfirm(true)}
              className="font-medium cursor-pointer bg-purple-500 text-white px-6 py-2 rounded-sm uppercase text-[12px] text-center"
            >
              + Create {currentTerm} Mid-Test
            </button>
            <button
              onClick={() => setShowExamConfirm(true)}
              className="font-medium cursor-pointer bg-pink-500 blue-950 text-white px-6 py-2 rounded-sm uppercase text-[12px] text-center"
            >
              + Create {currentTerm} Exam
            </button>
            <Link
              to={examination?.exam?._id ? `/final-exam-grade/${subjectID}/${examination?.exam?._id}` : `/final-exam-grade/${subjectID}`}
            >
              <p className="col-span-2 md:col-span-1 font-medium cursor-pointer text-[12px] bg-orange-500 text-white px-6 py-2 rounded-sm uppercase text-center">
                + Record Report Card Scores
              </p>
            </Link>
          </div>
        </div>
      </div>

      <div>
        {examination?.exam &&
        (normalize(examination?.exam?.term) === normalize(currentTerm) ||
          !examination?.exam?.term) ? (
          <div className="relative overflow-hidden">
            <div className="border p-6 rounded-md min-h-[300px] flex flex-col relative overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <div className="absolute top-0 right-0 text-[200px] opacity-5 font-bold text-red-300">
                {1}
              </div>
              <div className="mt-4 text-center relative bottom-4">
                <>
                  <button
                    onClick={() => {
                      // open confirm modal and store target id
                      setExamToDelete(examination?.exam?._id || null);
                      setModalOpen(true);
                      // setModalOpenExam(false);
                    }}
                    className="flex items-center justify-center text-red-600 hover:text-red-400 transition-all duration-300 font-bold"
                  >
                    {loading ? (
                      <FaSpinner size={20} className="mr-1" />
                    ) : (
                      <FaTrashAlt size={20} className="mr-1" />
                    )}
                    {loading
                      ? ` Deleting ${currentTerm} Examination Question`
                      : ` Delete ${currentTerm} Examination Question`}
                  </button>

                  {/* Confirm delete modal for Examination */}

                  {isModalOpenExam && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                      <div className="bg-white rounded-md p-6 w-[90%] max-w-md">
                        <h3 className="font-semibold text-lg mb-3">
                          Delete {currentTerm} Examination
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                          Are you sure you want to delete this {currentTerm} examination? This
                          action cannot be undone.
                        </p>
                        <div className="flex justify-end gap-3">
                          <button
                            className="px-4 py-2 rounded-md bg-gray-200"
                            onClick={() => {
                              setModalOpen(false);
                              // setModalOpenExam(false);
                              setExamToDelete(null);
                            }}
                          >
                            Cancel
                          </button>
                          <button
                            className="px-4 py-2 rounded-md bg-red-500 text-white"
                            onClick={async () => {
                              if (!examToDelete) return;
                              setLoading(true);
                              try {
                                await deleteExamination(
                                  subjectID!,
                                  examToDelete
                                );
                                examMutate(
                                  `api/view-subject-exam/${subjectID}`
                                );
                              } catch (error) {
                                console.error(error);
                                toast.error(`Failed to delete ${currentTerm} examination`);
                              } finally {
                                setLoading(false);
                                setModalOpen(false);
                                setExamToDelete(null);
                              }
                            }}
                          >
                            Proceed
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex flex-col ">
                  <p className="font-semibold italicmt-0 text-[12px]">
                    {examination?.exam?.session}
                  </p>
                  <p className="font-bold text-[20px]">
                    {examination?.exam?.subjectTitle}
                  </p>
                </div>
                <Link
                  to={`/exam/detail-record/${subjectID}/${examination?.exam?._id}`}
                >
                  <MdPlayCircle
                    size={40}
                    className="opacity-60 text-red-600 hover:text-red-400 transition-all duration-300"
                  />
                </Link>
              </div>

              <div className="flex flex-col mb-3">
                <div className="flex">
                  <p className="px-4 py-1 rounded-md text-[12px] border bg-blue-50 tracking-widest font-medium">
                    {examination?.exam?.term || currentTerm} Examination
                  </p>
                </div>
                <div className="flex">
                  {!examination?.exam?.randomize ? (
                    <button
                      className="cursor-pointer font-semibold text-[12px] mt-2 bg-red-500 text-white px-4 py-1 rounded-md"
                      onClick={() => {
                        setTExamRand(true);
                        randomizeStartExam(examination?.exam?._id)
                          .then(() => {
                            examMutate(`api/view-subject-exam/${subjectID}`);
                            setTExamRand(false);
                          })
                          .finally(() => {
                            setTExamRand(false);
                          });
                      }}
                    >
                      {tExamRand ? (
                        <span className="flex items-center">
                          <FaSpinner className="animate-spin " /> Randomizating
                          Question
                        </span>
                      ) : (
                        <span>Click to Stop Randomization of Question</span>
                      )}
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setTExamRand(true);
                        randomizeStopExam(examination?.exam?._id)
                          ?.then(() => {
                            examMutate(`api/view-subject-exam/${subjectID}`);
                          })
                          .finally(() => {
                            setTExamRand(false);
                          });
                      }}
                      className="cursor-pointer font-semibold text-[12px] mt-2 bg-neutral-900 text-white px-4 py-1 rounded-md"
                    >
                      Click to Start Randomization of Question
                    </button>
                  )}
                </div>
              </div>

              <div>
                <p className="text-[14px] my-5 italic">
                  Students can't access this {currentTerm} Examination Questions yet, <br />{" "}
                  change the accessibility of students to take test!{" "}
                </p>
              </div>

              <div className="flex-1" />

              <div className="flex justify-between text-[13px]">
                <div>
                  Questions:{" "}
                  <span className="font-bold">
                    {examination?.exam?.quiz?.question
                      ? examination?.exam?.quiz?.question.length
                      : 0}
                  </span>
                </div>
                <div>
                  Mark/Question:{" "}
                  <span className="font-bold">
                    {examination?.exam?.quiz?.instruction
                      ? examination?.exam?.quiz?.instruction.mark
                      : 0}
                  </span>
                  <div>
                    Time:{" "}
                    {(
                      examination?.exam?.quiz?.instruction?.duration * 60
                    ).toFixed(2)}{" "}
                    Minutes
                  </div>
                  <div>
                    Dept:
                    <strong className="font-semibold">
                      {" "}
                      {examination?.exam?.quiz?.instruction?.dept}
                    </strong>
                  </div>
                </div>
              </div>
              <div className="text-[12px] mt-2 font-bold">
                Instruction:{" "}
                <span className="font-normal">
                  {examination?.exam?.quiz?.instruction?.instruction
                    ? `${examination?.exam?.quiz?.instruction?.instruction}`.slice(
                        0,
                        70
                      ) + "..."
                    : "..."}
                </span>
              </div>

              <div className="text-[14px] mt-2 font-bold">
                <div className="text-[16px] mb-2">Instruction:</div>
                <div
                  className="font-normal line-clamp-3"
                  dangerouslySetInnerHTML={{
                    __html: examination?.exam?.quiz?.instruction?.instruction,
                  }}
                />
              </div>
              <div className="flex items-end justify-between">
                <div className="flex gap-3">
                  <div
                    className={`mt-10 cursor-pointer flex gap-3 items-center ${
                      examination?.exam?.startExam
                        ? "bg-blue-950"
                        : "bg-red-500"
                    } text-white px-6 py-3 rounded-md`}
                    onClick={() => {
                      setLoadingExam(true);

                      examination?.exam?.startExam
                        ? stopExamination(examination?.exam?._id)
                            .then((res) => {
                              console.log("res: ", res);
                              examMutate(`api/view-subject-exam/${subjectID}`);
                            })
                            .finally(() => {
                              setLoadingExam(false);
                            })
                        : startExamination(examination?.exam?._id)
                            .then((res) => {
                              console.log("res: ", res);
                              examMutate(`api/view-subject-exam/${subjectID}`);
                            })
                            .finally(() => {
                              setLoadingExam(false);
                            });
                    }}
                  >
                    {loadingExam ? (
                      "Laoding"
                    ) : (
                      <span>
                        {examination?.startExam
                          ? "Exam can Start "
                          : "Change Visibility"}
                      </span>
                    )}
                    {examination?.startExam ? (
                      <MdVisibility
                        size={20}
                        className=" text-white transition-all duration-300"
                      />
                    ) : (
                      <MdVisibilityOff
                        size={20}
                        className=" text-white transition-all duration-300"
                      />
                    )}
                  </div>
                  <Link
                    to={`/examination-preview-details/${subjectID}/${examination?.exam?._id}`}
                    className={`mt-10 cursor-pointer flex gap-3 items-center 
                   bg-orange-500 text-white px-6 py-3 rounded-md italic font-semibold`}
                  >
                    {<span>Preview Questions</span>}
                  </Link>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <div
                      className="flex items-center gap-2 border border-gray-200 px-4 py-2 rounded-md cursor-pointer"
                      onClick={() => {
                        setToggleExam(true);
                      }}
                    >
                      <FaRegEdit />
                      <p className="uppercase text-[14px] text-red-500 font-medium">
                        Edit Exam Details
                      </p>
                    </div>
                  </div>
                </div>

                {toggleExam && (
                  <div className=" absolute right-0 top-0 h-full w-[300px] border bg-white p-4">
                    <div className="flex">
                      <div className="flex justify-end w-full mb-5">
                        <MdClose
                          className="text-[20px] cursor-pointer"
                          onClick={() => setToggleExam(false)}
                        />
                      </div>
                    </div>
                    <p className="text-[16px] leading-1 border-b pb-5">
                      Want to make some Edit
                    </p>

                    <div className="flex items-center gap-2">
                      <p
                        className={`text-[12px] mt-6
                          ${
                            dept === "General"
                              ? "bg-blue-950 text-white"
                              : "bg-gray-200 text-black"
                          }
                          rounded-md px-4 py-1
                        cursor-pointer`}
                        onClick={() => {
                          setDept("General");
                        }}
                      >
                        Gen.
                      </p>
                      <p
                        className={`text-[12px] mt-6
                          ${
                            dept === "Art"
                              ? "bg-blue-950 text-white"
                              : "bg-gray-200 text-black"
                          }
                          rounded-md px-4 py-1
                        cursor-pointer`}
                        onClick={() => {
                          setDept("Art");
                        }}
                      >
                        Art
                      </p>
                      <p
                        className={`text-[12px] mt-6
                          ${
                            dept === "Commercial"
                              ? "bg-blue-950 text-white"
                              : "bg-gray-200 text-black"
                          }
                          rounded-md px-4 py-1
                        cursor-pointer`}
                        onClick={() => {
                          setDept("Commercial");
                        }}
                      >
                        Com.
                      </p>
                      <p
                        className={`text-[12px] mt-6
                          ${
                            dept === "Science"
                              ? "bg-blue-950 text-white"
                              : "bg-gray-200 text-black"
                          }
                          rounded-md px-4 py-1
                        cursor-pointer`}
                        onClick={() => {
                          setDept("Science");
                        }}
                      >
                        Sci.
                      </p>
                    </div>

                    <div className="text-[12px] mt-6">
                      <p>Set updated Exam marks</p>
                      <input
                        className="border w-full h-[45px] rounded-md outline-none px-2"
                        value={markExam}
                        onChange={(e: any) => setMarkExam(e.target.value)}
                        placeholder="update the Mark"
                        defaultValue={examination?.quiz?.instruction?.mark}
                      />
                    </div>
                    <div className="flex flex-col mt-5">
                      <label className="text-[12px]">
                        Time/Duration(Hours)
                      </label>
                      <select
                        className="border border-blue-950 w-full h-[50px] rounded-md  mt-2 px-2 relative transition-all duration-300 mb-6 select select-bordered max-w-xs "
                        name="hour"
                        id="hour"
                        // defaultValue={testQuestion[0]?.instruction?.duration}
                        value={isCustomDurationExam ? "custom" : durationExam}
                        defaultValue={examination?.quiz?.instruction?.duration}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                          const val = e.target.value;
                          if (val === "custom") {
                            setIsCustomDurationExam(true);
                            // preserve existing custom minutes if any, otherwise use 30
                            if (!customMinutesExam) setCustomMinutesExam("30");
                          } else {
                            setIsCustomDurationExam(false);
                            setCustomMinutesExam("");
                            setDurationExam(val);
                          }
                        }}
                      >
                        <option disabled selected>
                          choose
                        </option>

                        <option value="0.084">5 Minutes</option>
                        <option value="0.167">10 Minutes</option>
                        <option value="0.333">20 Minutes</option>
                        <option value="0.500">30 Minutes</option>
                        <option value="0.667">40 Minutes</option>
                        <option value="0.833">50 Minutes</option>
                        <option value="1.000">60 Minutes</option>
                        <option value="1.500">90 Minutes</option>
                        <option value="custom">Custom minutes...</option>
                      </select>
                      {isCustomDurationExam && (
                        <div className="flex flex-col ml-3 -mt-4">
                          <label className="text-[12px] mb-[2px]">
                            Custom Timer (minutes)
                          </label>
                          <input
                            className="border w-[180px] text-[14px] h-[50px] rounded-md outline-none px-2 mt-2"
                            placeholder="Enter minutes (e.g. 7)"
                            value={customMinutesExam}
                            onChange={(e) => {
                              const v = e.target.value;
                              if (v === "" || /^\d+$/.test(v)) {
                                setCustomMinutesExam(v);
                              }
                            }}
                          />
                        </div>
                      )}
                    </div>

                    <Button
                      name={"update"}
                      className="bg-blue-950 transition-all duration-300 hover:bg-blue-900 cursor-pointer uppercase font-medium pr-7"
                      onClick={() => {
                        updateExaminationData(examination?.exam?._id, {
                          mark: parseInt(String(markExam)) || 0,
                          duration: durationExam,
                          dept: String(dept),
                        })
                          .then((res) => {
                            toast.success("Updated successfully");
                            examMutate(`api/view-subject-exam/${subjectID}`);
                          })
                          .finally(() => {
                            setToggleExam(false);
                          });
                      }}
                    />
                  </div>
                )}
              </div>
            </div>

            {toggleEdit && (
              <div className=" absolute right-0 top-0 h-full w-[300px] border bg-white p-4">
                <div className="flex">
                  <div className="flex justify-end w-full mb-5">
                    <MdClose
                      className="text-[20px] cursor-pointer"
                      onClick={() => setToggleEdit(false)}
                    />
                  </div>
                </div>
                <p className="text-[14px] leading-1 border-b pb-5">
                  Want to make some Edit on the Time to take the Test and the
                  Duration
                </p>

                <div className="text-[12px] mt-10">
                  <p>Set updated marks</p>
                  <input
                    className="border w-full h-[45px] rounded-md outline-none px-2"
                    value={mark}
                    onChange={(e: any) => setMark(e.target.value)}
                    placeholder="update the Mark"
                    defaultValue={examination?.quiz?.instruction?.mark}
                  />
                </div>
                <div className="flex flex-col mt-5">
                  <label className="text-[12px]">Time/Duration(Hours)</label>
                  <select
                    className="border border-blue-950 w-full h-[50px] rounded-md  mt-2 px-2 relative transition-all duration-300 mb-6 select select-bordered max-w-xs "
                    name="hour"
                    id="hour"
                    // defaultValue={testQuestion[0]?.instruction?.duration}
                    value={duration}
                    defaultValue={examination?.quiz?.instruction?.duration}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                      setDuration(e.target.value);
                    }}
                  >
                    <option disabled selected>
                      choose
                    </option>

                    <option value="0.084">5 Minutes</option>
                    <option value="0.167">10 Minutes</option>
                    <option value="0.333">20 Minutes</option>
                    <option value="0.500">30 Minutes</option>
                    <option value="0.667">40 Minutes</option>
                    <option value="0.833">50 Minutes</option>
                    <option value="1.000">60 Minutes</option>
                    <option value="1.500">90 Minutes</option>
                  </select>
                </div>

                <Button
                  name={"update"}
                  className="bg-blue-950 transition-all duration-300 hover:bg-blue-900 cursor-pointer uppercase font-medium pr-7"
                  onClick={() => {
                    updateMidTestData(midTest?._id, {
                      mark: parseInt(mark),
                      duration,
                    })
                      .then((res) => {
                        toast.success("Updated successfully");
                        midTestMutate(`api/view-subject-mid-test/${subjectID}`);
                      })
                      .finally(() => {
                        setToggle(false);
                      });
                  }}
                />
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-10 border border-dashed rounded-md bg-white shadow-sm">
            <MdVisibilityOff size={40} className="text-gray-300 mb-2" />
            <p className="text-gray-500 font-bold">
              No examination record yet for {currentTerm || "this term"}
            </p>
          </div>
        )}
      </div>

      <div className="mt-10 bg-slate-50">
        {midTest &&
        normalize(midTest?.term) ===
          normalize(currentTerm) ? (
          <div className="relative">
            <Toaster />
            <div className="border p-6 rounded-md min-h-[300px] flex flex-col relative overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 ">
              <div className="absolute top-0 right-0 text-[200px] opacity-5 font-bold text-red-300">
                {1}
              </div>

              <div className="mt-4 text-center relative bottom-4">
                <>
                  <button
                    onClick={() => {
                      // open confirm modal for mid-test deletion
                      setMidTestToDelete(midTest?._id || null);
                      setMidTestModalOpen(true);
                    }}
                    className="flex items-center justify-center text-red-600 hover:text-red-400 transition-all duration-300 font-bold"
                  >
                    {loading ? (
                      <FaSpinner size={20} className="mr-1" />
                    ) : (
                      <FaTrashAlt size={20} className="mr-1" />
                    )}
                    {loading ? ` Deleting ${currentTerm} Mid-Test` : ` Delete ${currentTerm} Mid-Test`}
                  </button>

                  {false && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                      <div className="bg-white rounded-md p-6 w-[90%] max-w-md">
                        <h3 className="font-semibold text-lg mb-3">
                          Delete {currentTerm} Mid-Test
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                          Are you sure you want to delete this {currentTerm} mid-test? This
                          action cannot be undone.
                        </p>
                        <div className="flex justify-end gap-3 mt-10">
                          <button
                            className="px-4 py-2 rounded-md bg-gray-200"
                            onClick={() => {
                              setMidTestModalOpen(false);
                              setMidTestToDelete(null);
                            }}
                          >
                            Cancel
                          </button>
                          <button
                            className="px-4 py-2 rounded-md bg-red-500 text-white"
                            onClick={async () => {
                              if (!midTestToDelete) return;
                              setLoading(true);
                              try {
                                await deleteMidTestData(
                                  subjectID!,
                                  midTestToDelete
                                );
                                // revalidate midTest list
                                midTestMutate(
                                  `api/view-subject-mid-test/${subjectID}`
                                );
                              } catch (error) {
                                console.error(error);
                                toast.error(`Failed to delete ${currentTerm} mid-test`);
                              } finally {
                                setLoading(false);
                                setMidTestModalOpen(false);
                                setMidTestToDelete(null);
                              }
                            }}
                          >
                            Proceed
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex flex-col ">
                  <p className="font-semibold italicmt-0 text-[12px]">
                    {midTest?.session}
                  </p>
                  <p className="font-bold text-[20px]">
                    {" "}
                    {midTest?.subjectTitle}
                  </p>
                </div>
                <Link to={`/quiz/detail-record/${subjectID}/${midTest?._id}`}>
                  <MdPlayCircle
                    size={40}
                    className="opacity-60 text-red-600 hover:text-red-400 transition-all duration-300"
                  />
                </Link>
              </div>
              <div className="flex flex-col mb-3">
                <div className="flex">
                  <p className="px-4 tracking-widest font-semibold capitalize py-1 rounded-md text-[12px] border bg-purple-200">
                    {midTest?.term || currentTerm} Mid-Test
                  </p>
                </div>
                <div className="flex">
                  {!midTest?.randomize ? (
                    <button
                      className="cursor-pointer font-semibold text-[12px] mt-2 bg-red-500 text-white px-4 py-1 rounded-md"
                      onClick={() => {
                        setTMidRand(true);
                        randomizeStartMidTest(midTest?._id)
                          .then(() => {
                            mutate(`api/view-subject-mid-test/${subjectID}`);
                            setTMidRand(false);
                          })
                          .finally(() => {
                            setTMidRand(false);
                          });
                      }}
                    >
                      {tMidRand ? (
                        <span className="flex items-center">
                          <FaSpinner className="animate-spin " /> Randomizating
                          Question
                        </span>
                      ) : (
                        <span>Click to Stop Randomization of Question</span>
                      )}
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setTMidRand(true);
                        randomizeStopMidTest(midTest?._id)
                          ?.then(() => {
                            mutate(`api/view-subject-mid-test/${subjectID}`);
                          })
                          .finally(() => {
                            setTMidRand(false);
                          });
                      }}
                      className="cursor-pointer font-semibold text-[12px] mt-2 bg-neutral-900 text-white px-4 py-1 rounded-md"
                    >
                      Click to Start Randomization of Question
                    </button>
                  )}
                </div>
              </div>
              <div>
                <p className="text-[14px] my-5 italic">
                  Students can't access this {currentTerm} Mid-Test Questions yet, <br />{" "}
                  change the accessibility of students to take test!{" "}
                </p>
              </div>
              <div className="flex-1" />
              <div className="flex justify-between text-[13px]">
                <div>
                  Questions:{" "}
                  <span className="font-bold">
                    {midTest?.quiz?.question
                      ? midTest?.quiz?.question?.length
                      : 0}
                  </span>
                </div>
                <div>
                  Mark/Question:
                  <span className="font-bold">
                    {midTest?.quiz?.instruction
                      ? midTest?.quiz?.instruction?.mark
                      : 0}
                  </span>
                </div>
              </div>
              <div className="text-[14px] mt-2 font-bold">
                <div className="text-[16px] mb-2">Instruction:</div>
                <div
                  className="font-normal line-clamp-3"
                  dangerouslySetInnerHTML={{
                    __html: midTest?.quiz?.instruction?.instruction,
                  }}
                />
              </div>
              <div className="flex justify-between items-end">
                <div className="flex gap-3">
                  <div
                    className={`mt-10 cursor-pointer flex gap-3 items-center ${
                      midTest?.startMidTest ? "bg-purple-600" : "bg-red-500"
                    } text-white font-semibold px-6 py-3 rounded-md`}
                    onClick={() => {
                      midTest?.startMidTest
                        ? stopMidTest(midTest?._id)
                            .then((res) => {
                              mutate(`api/view-subject-mid-test/${subjectID}`);
                            })
                            .finally(() => {
                              setLoadingTest(false);
                            })
                        : startMidTest(midTest?._id)
                            .then((res) => {
                              mutate(`api/view-subject-mid-test/${subjectID}`);
                            })
                            .finally(() => {
                              setLoadingTest(false);
                            });
                    }}
                  >
                    {loadingTest ? (
                      "changing test"
                    ) : (
                      <span>
                        {midTest?.startMidTest
                          ? "Mid Test can Start "
                          : "Change Visibility"}
                      </span>
                    )}
                    {midTest?.startMidTest ? (
                      <MdVisibility
                        size={20}
                        className=" text-white transition-all duration-300"
                      />
                    ) : (
                      <MdVisibilityOff
                        size={20}
                        className=" text-white transition-all duration-300"
                      />
                    )}
                  </div>

                  <Link
                    to={`/mid-test-preview-details/${subjectID}/${midTest?._id}`}
                    className={`mt-10 cursor-pointer flex gap-3 items-center 
                   bg-orange-500 text-white px-6 py-3 rounded-md italic font-semibold`}
                  >
                    {<span>Preview Questions</span>}
                  </Link>
                </div>

                <div
                  className="flex items-center gap-2 border border-gray-200 px-4 py-2 rounded-md cursor-pointer"
                  onClick={() => {
                    setToggle(true);
                  }}
                >
                  <FaHandDots />
                  <p className="uppercase text-[14px] text-red-500 font-medium">
                    Make Edit
                  </p>
                </div>
              </div>

              {toggle && (
                <div className=" absolute right-0 top-0 h-full w-[300px] border bg-white p-4">
                  <div className="flex">
                    <div className="flex justify-end w-full mb-5">
                      <MdClose
                        className="text-[20px] cursor-pointer"
                        onClick={() => setToggle(false)}
                      />
                    </div>
                  </div>
                  <p className="text-[14px] leading-1 border-b pb-5">
                    Want to make some Edit on the Time to take the Test and the
                    Duration
                  </p>

                  <div className="text-[12px] mt-10">
                    <p>Set updated marks</p>
                    <input
                      className="border w-full h-[45px] rounded-md outline-none px-2"
                      value={mark}
                      onChange={(e: any) => setMark(e.target.value)}
                      placeholder="update the Mark"
                      defaultValue={midTest?.quiz?.instruction?.mark}
                    />
                  </div>
                  <div className="flex flex-col mt-5">
                    <label className="text-[12px]">Time/Duration(Hours)</label>
                    <select
                      className="border border-blue-950 w-full h-[50px] rounded-md  mt-2 px-2 relative transition-all duration-300 mb-6 select select-bordered max-w-xs "
                      name="hour"
                      id="hour"
                      // defaultValue={testQuestion[0]?.instruction?.duration}
                      value={duration}
                      defaultValue={midTest?.quiz?.instruction?.duration}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        setDuration(e.target.value);
                      }}
                    >
                      <option disabled selected>
                        choose
                      </option>

                      <option value="0.084">5 Minutes</option>
                      <option value="0.167">10 Minutes</option>
                      <option value="0.333">20 Minutes</option>
                      <option value="0.500">30 Minutes</option>
                      <option value="0.667">40 Minutes</option>
                      <option value="0.833">50 Minutes</option>
                      <option value="1.000">60 Minutes</option>
                      <option value="1.500">90 Minutes</option>
                    </select>
                  </div>

                  <Button
                    name={"update"}
                    className="bg-blue-950 transition-all duration-300 hover:bg-blue-900 cursor-pointer uppercase font-medium pr-7"
                    onClick={() => {
                      updateMidTestData(midTest?._id, {
                        mark: parseInt(mark),
                        duration,
                      })
                        .then((res) => {
                          toast.success("Updated successfully");
                          midTestMutate(
                            `api/view-subject-mid-test/${subjectID}`
                          );
                        })
                        .finally(() => {
                          setToggle(false);
                        });
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-10 border border-dashed rounded-md bg-white shadow-sm">
            <FaCheckDouble size={40} className="text-gray-300 mb-2" />
            <p className="text-gray-500 font-bold">
              No mid-test record yet for {currentTerm || "this term"}
            </p>
          </div>
        )}
      </div>

      <div className="my-10">
        <hr />
      </div>

      {combine?.length > 0 ? (
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-2">
            {readQuiz?.map((props: any, i: number) => (
              <div key={props._id}>
                <div className="border p-6 rounded-sm min-h-[300px] flex flex-col relative overflow-hidden  hover:shadow-lg transition-shadow duration-300">
                  <div className="absolute top-0 right-0 text-[200px] opacity-5 font-bold text-red-300">
                    {i + 1}
                  </div>
                  <div className="mt-4 text-center relative bottom-4">
                    <button
                      onClick={() => handleDelete(props._id)}
                      className="flex items-center justify-center text-red-600 hover:text-red-400 transition-all duration-300 font-bold"
                    >
                      <FaTrashAlt size={20} className="mr-1" />
                      Delete
                    </button>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex justify-center items-center gap-3">
                      <p className="font-bold mt-0 text-[20px]">
                        {props?.subjectTitle}{" "}
                        {props?.quiz ? "Quiz" : "Assignment"}
                      </p>
                      <p className="font-semibold">
                        {new Date(props?.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <Link to={`/quiz/details/${subjectID}/${props?._id}`}>
                      <MdPlayCircle
                        size={40}
                        className="opacity-60 text-red-600 hover:text-red-400 transition-all duration-300"
                      />
                    </Link>
                  </div>

                  <div className="flex mt-2">
                    <p className="px-4 py-1 rounded-md text-[12px] border bg-blue-50">
                      Test
                    </p>
                  </div>

                  <div className="flex-1" />

                  <div className="text-[12px] my-4">
                    <p className="font-medium mb-2">Top Performing Student</p>

                    {props?.performance?.length > 0 ? (
                      <div className="flex gap-2">
                        <img
                          src={pix}
                          alt="Student"
                          className="w-[50px] h-[50px] border rounded-xl object-cover"
                        />
                        <div>
                          <p className="font-bold capitalize">Name</p>
                          <p>Points</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <GoGoal size={20} />
                        <p className="font-semibold text-[12px]">
                          No student has Attented this test yet.
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="flex mt-5 justify-between text-[13px] border-y py-4 mb-3">
                    <div>
                      Questions:{" "}
                      <span className="font-bold">
                        {props?.quiz && props?.quiz[1]?.question
                          ? props?.quiz[1]?.question.length
                          : 0}
                      </span>
                    </div>
                    <div>
                      Mark/Question:{" "}
                      <span className="font-bold">
                        {props?.quiz && props?.quiz[0]?.instruction
                          ? props?.quiz[0]?.instruction?.mark
                          : 0}
                      </span>
                    </div>
                  </div>
                  <div className="text-[14px] mt-2 font-bold">
                    <div className="text-[16px] mb-2">Instruction:</div>
                    <div
                      className="font-normal line-clamp-3"
                      dangerouslySetInnerHTML={{
                        __html: props?.quiz?.instruction?.instruction,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="my-8 border-t" />

          {/* Assignments Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-2">
            {assign?.map((props: any, i: number) => (
              <div key={props._id}>
                <div className="border p-6 rounded-md h-[300px] flex flex-col relative overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                  <div className="absolute top-0 right-0 text-[200px] opacity-5 font-bold text-green-300">
                    {i + 1}
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="font-bold mt-0 text-[20px]">
                      {props?.subjectTitle}
                      {""}
                      {props?.quiz ? "Quiz" : "Assignment"}
                    </p>
                  </div>

                  <div className="flex mt-2">
                    <p className="px-4 py-1 rounded-md text-[12px] border bg-blue-50">
                      Assignment
                    </p>
                  </div>

                  <div className="flex-1" />

                  <div className="text-[12px] my-4">
                    <p className="font-medium mb-2">Top Performing Student</p>
                    <div className="flex gap-2">
                      <img
                        src={pix}
                        alt="Student"
                        className="w-[50px] h-[50px] border rounded-xl object-cover"
                      />
                      <div>
                        <p className="font-bold capitalize">Name</p>
                        <p>Points</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between text-[13px]">
                    <div>
                      Questions Topic:{" "}
                      <span className="font-bold">
                        {props?.assignmentTopic}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between text-[13px]">
                    <div>
                      Submission Deadline:{" "}
                      <span className="font-bold">
                        {props?.assignmentDeadline}
                      </span>
                    </div>
                  </div>

                  <div className="text-[12px] mt-2 font-bold">
                    Question Detail:{" "}
                    <span className="font-normal">
                      {props?.assignmentDetails
                        ? `${props.assignmentDetails}`.slice(0, 70) + "..."
                        : "..."}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center px-4 py-1 mt-3">
          <FaCheckDouble size={13} />
          <p className="mt-3 text-[12px] font-medium">No Test set yet</p>
        </div>
      )}

      <div className="absolute top-0"></div>
    </div>
  );
};

export default ExamQuizSetupScreen;
