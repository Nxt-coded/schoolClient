document.title = "class room Detail's Page";
import LittleHeader from "../../../components/layout/LittleHeader";
import Button from "../../../components/reUse/Button";
import { FaCheckDouble, FaSpinner, FaStar } from "react-icons/fa6";
import pix from "../../../assets/pix.jpg";
import { MdCheck, MdClose, MdEditDocument, MdSave } from "react-icons/md";
import { useDispatch } from "react-redux";
import { displaySession } from "../../../global/reduxState";
import { FC, useRef, useState } from "react";
import Input from "../../../components/reUse/Input";
import { Link, useParams } from "react-router-dom";
import { X, DollarSign, TrendingUp } from "lucide-react";
import BeatLoader from "react-spinners/ClipLoader";
import toast from "react-hot-toast";
import {
  useClassAttendance,
  useClassSubjects,
  useSchoolClassRMDetail,
  useSchoolCookie,
  useSchoolData,
  useSchoolTeacher,
} from "../../hook/useSchoolAuth";
import {
  createSchoolSubject,
  updateClassName,
  updateClassroomTeacher,
} from "../../api/schoolAPIs";
import {
  useClassStudent,
  useTeacherDetail,
} from "../../../pagesForTeachers/hooks/useTeacher";
import ClassModel from "./ClassModel";
import ViewClassStudent from "./ViewClassStudent";
import { mutate } from "swr";
import TimeTableScreen from "../../../pagesForTeachers/pages/class/TimeTableScreen";
import { updateTermFee } from "../../../pagesForStudents/api/studentAPI";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import AdminPrintReportCardScreen from "../ResultHistory/ViewStudentPrintResultScreen";
import ReportCardScreenDone from "./ResultCardDone";
// import { usePDF } from "@react-pdf/renderer";
import moment from "moment";
import { usePDF } from "react-to-pdf";
import { opacity } from "html2canvas/dist/types/css/property-descriptors/opacity";
import { matchesCurrentAssessmentPeriod } from "../../../lib/assessmentPeriod";

// import { updateTermFee } from "../../../pagesForStudents/api/studentAPI";

interface iProps {
  props?: string;
}
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className: string;
}

const ClassSubjectScreen: FC<{ classroom: any; school: any }> = ({
  classroom,
  school,
}) => {
  const { classID } = useParams();
  const { readSubject } = useClassSubjects(classID!);

  if (!classroom || !school) {
    return (
      <div className="flex flex-col items-center justify-center p-10">
        <FaSpinner className="animate-spin text-blue-950" size={30} />
        <p className="mt-4 text-[14px] font-medium text-gray-500">
          Loading class details from server...
        </p>
      </div>
    );
  }

  return (
    <div className="">
      {readSubject?.length > 0 ? (
        <div className="mt-1 w-full gap-2 grid grid-cols-1 lg:grid-cols-2  xl:grid-cols-3">
          {readSubject?.map((props: any) => {
            const currentTerm = school?.presentTerm;
            const currentSession = school?.presentSession;

            const hasExam = matchesCurrentAssessmentPeriod(
              props?.examination,
              currentTerm,
              currentSession
            );

            const hasVisibleExam = props?.examination?.some((exam: any) => {
              return (
                matchesCurrentAssessmentPeriod(
                  exam,
                  currentTerm,
                  currentSession
                ) && exam?.startExam === true
              );
            });

            const hasMidTest = matchesCurrentAssessmentPeriod(
              props?.midTest,
              currentTerm,
              currentSession
            );

            const hasVisibleMidTest = props?.midTest?.some((test: any) => {
              return (
                matchesCurrentAssessmentPeriod(
                  test,
                  currentTerm,
                  currentSession
                ) && test?.startMidTest === true
              );
            });

            return (
              <div
                key={props._id}
                className="bg-white border flex flex-col rounded-2xl pb-2 min-h-[200px] px-4 pt-4"
              >
                <div className="mt-3 flex justify-between items-center font-bold">
                  <p>{props?.subjectTitle}</p>
                  <Link
                    to={`/admin-test-exam-grade/${props._id}`}
                    className="w-8 h-8 transition-all duration-300 rounded-full hover:bg-slate-50 cursor-pointer flex justify-center items-center"
                  >
                    <MdEditDocument className="hover:text-blue-900" />
                  </Link>
                </div>
                <div className="flex gap-2">
                  <p className="text-[12px] bg-slate-100 rounded-sm py-2 pl-1 shadow-sm pr-4 mb-5">
                    class subject
                  </p>
                  {hasExam && (
                    <p className="flex items-center gap-2 text-[10px] bg-green-100 text-green-700 rounded-sm py-1 px-2 shadow-sm mb-7 font-bold uppercase border border-green-200">
                      {hasVisibleExam && (
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                      )}
                      <span>Exam Added</span>
                    </p>
                  )}
                  {hasMidTest && (
                    <p className="flex items-center gap-2 text-[10px] bg-orange-100 text-orange-700 rounded-sm py-1 px-2 shadow-sm mb-7 font-bold uppercase border border-orange-200">
                      {hasVisibleMidTest && (
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                        </span>
                      )}
                      <span>Mid-Test Added</span>
                    </p>
                  )}
                </div>
                <div className="flex-1" />
                <p className="text-[13px] font-medium">
                  Subject Teacher Name: <span></span>
                </p>
                <div className="flex gap-2 flex-wrap">
                  <div className="text-blue-950  rounded-mlg mt-1 px-0 border-t font-medium py-2 text-[17px] ">
                    {props?.subjectTeacherName}
                  </div>
                </div>

                <div className="flex">
                  <Link to={`/subjects/${props?._id}`}>
                    <p className="text-[12px] font-medium bg-blue-950 hover:bg-blue-900 cursor-pointer text-white rounded-md py-2 px-4">
                      Goto CBT Area
                    </p>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div>
          <div className="flex flex-col items-center justify-center px-4 py-1 mt-3">
            <FaCheckDouble size={13} />
            <p className="mt-3 text-[12px] font-medium">No Subject added yet</p>
          </div>
        </div>
      )}
    </div>
  );
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50 rounded-lg ">
      <div className="relative  rounded-lg  lg:w-full w-[90%] h-[698px] flex flex-col items-center justify-around">
        {/* <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-gray-500 text-white w-6 h-6 flex items-center justify-center rounded-full focus:outline-none"
        >
          X
        </button> */}
        {children}
      </div>
    </div>
  );
};

const StaffDetail: FC<iProps> = ({ props }) => {
  const { teacherDetail } = useTeacherDetail(props!);

  return (
    <div className="flex gap-2 mt-1 items-start  ">
      <img
        className="w-10 h-10 object-cover rounded-full"
        src={teacherDetail?.avatar ? teacherDetail?.avatar : pix}
      />
      <p>
        <p className="m-0 leading-tight text-[14px] font-bold">
          {teacherDetail?.staffName
            ? teacherDetail?.staffName
            : "Hasn't been assigned"}
        </p>
        <p className="text-[12px] mt-2 flex items-center gap-1">
          <span className="font-bold text-[15px]">
            {teacherDetail?.staffRating?.toFixed(2)}
          </span>{" "}
        </p>
      </p>
    </div>
  );
};

const ClassDetailScreen = () => {
  const { classID } = useParams();
  const { dataID } = useSchoolCookie();
  const { classroom } = useSchoolClassRMDetail(classID!);
  const dispatch = useDispatch();
  const [subject, setSubject] = useState<string>("");
  const [isFeeModalOpen, setFeeModalOpen] = useState<boolean>(false);
  const [firstTermFee, setFirstTermFee] = useState<string>("");
  const [secondTermFee, setSecondTermFee] = useState<string>("");
  const [thirdTermFee, setThirdTermFee] = useState<string>("");

  const isFormFilled =
    firstTermFee !== "" && secondTermFee !== "" && thirdTermFee !== "";

  const openFeeModal = () => setFeeModalOpen(true);
  const closeFeeModal = () => setFeeModalOpen(false);

  const { schoolTeacher } = useSchoolTeacher();

  const [teacher, setTeacher] = useState<string>("");

  const handleToggleMenuFalse = () => {
    if (!document.startViewTransition) {
      dispatch(displaySession(false));
    } else {
      document.startViewTransition(() => {
        dispatch(displaySession(false));
      });
    }
  };

  const addClassSubject = async () => {
    try {
      const res = await createSchoolSubject(dataID!, {
        classID,
        subjectTeacherName: teacher,
        subjectTitle: subject,
        designated: classroom?.className,
      });

      if (res?.status !== 201) {
        toast.error(
          res?.response?.data?.message ||
            res?.message ||
            "Unable to add subject to this class"
        );
        handleToggleMenuFalse();
        return;
      }

      void mutate(`api/view-class-info/${classID}`);
      toast.success("Subject added successfully");
      handleToggleMenuFalse();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to add subject to this class"
      );
      handleToggleMenuFalse();
    }
  };

  const updateTeacher = () => {
    updateClassroomTeacher(dataID!, classID!, {
      classTeacherName: teacher,
    }).then((res) => {
      if (res.status === 201) {
        mutate(`api/view-classrooms/${classID}`);

        toast.success("class teacher updated");
        handleToggleMenuFalse();
      } else {
        toast.error(`${res?.response?.data?.messgae}`);
        handleToggleMenuFalse();
      }
    });
  };

  const { data } = useSchoolData();

  const { mainAttendance } = useClassAttendance(classID!);

  const [loading, setLoading] = useState<boolean>(false);
  const [toggle, setToggle] = useState<boolean>(false);
  const [className, setClassName] = useState<string>("");

  const { classStudents } = useClassStudent(classID!);

  const allStudents = classStudents?.students;

  const sortedStudents = classStudents?.students?.sort((a: any, b: any) =>
    a.studentLastName?.localeCompare(b.studentLastName)
  );
  const reportRef = useRef<HTMLDivElement>(null);

  const printAllStudents = async () => {
    if (!classStudents?.students || classStudents?.students?.length === 0) {
      toast.error("No students found in this class.");
      return;
    }

    for (const student of classStudents?.students) {
      const input = reportRef.current;
      if (!input) continue;

      // Generate the report card for each student
      const canvas = await html2canvas(input, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("landscape", "px", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(
        `${student?.studentFirstName}-${student?.studentLastName}-report-card.pdf`
      );
    }

    toast.success("All students' report cards have been downloaded.");
  };
  const printRef = useRef(null);

  const { toPDF, targetRef }: any = usePDF({
    filename: `${classroom?.className}-${moment(Date.now()).format("lll")}.pdf`,
    page: {
      orientation: "portrait", // Ensure landscape orientation
      // unit: "px", // Use pixels for dimensions
      // format: [2820, 1080],
      //  // Set custom dimensions (e.g., full HD resolution)
    },
  });
  const [loadingState, setLoadingState] = useState<boolean>(false);
  const handlePrintAll = () => {
    // window.print(); // If printing the full page
    // OR if using react-to-print:
    // const print = useReactToPrint({ content: () => printRef.current });
    // print();

    setLoadingState(true);

    toPDF().finally(() => {
      setLoadingState(false);
      toast.success("Result downloaded.");
    });
  };

  const handlePrint1 = () => {
    const target = targetRef.current;

    if (!target) {
      toast.error("No content to print.");
      return;
    }

    // Save the original styles of the body and target
    const originalBodyStyles = document.body.style.cssText;
    const originalTargetStyles = target.style.cssText;

    // Apply styles to hide all other elements and focus on the target
    document.body.style.cssText = `
    display: flex;
    justify-content: center;
    align-items: flex-start;
    background: white;
    margin: 0;
    padding: 0;
    height: auto;
  `;
    target.style.cssText = `
    position: relative;
    width: 100%;
    height: auto;
    margin: 0;
    padding: 0;
    background: white;
    z-index: 9999;
  `;

    // Hide all other elements except the target
    Array.from(document.body.children).forEach((child) => {
      if (child !== target) {
        (child as HTMLElement).style.display = "none";
      }
    });

    // Trigger the print dialog
    window.print();

    // Restore the original styles of the body and target
    document.body.style.cssText = originalBodyStyles;
    target.style.cssText = originalTargetStyles;

    // Restore visibility of other elements
    Array.from(document.body.children).forEach((child) => {
      if (child !== target) {
        (child as HTMLElement).style.display = "";
      }
    });
  };
  // const printAllStudents = async () => {
  //   if (!classStudents?.students || classStudents?.students?.length === 0) {
  //     toast.error("No students found in this class.");
  //     return;
  //   }

  //   await new Promise((resolve) => setTimeout(resolve, 500)); // Wait for content to render

  //   const input = targetRef.current;
  //   if (!input) {
  //     toast.error("No content to print.");
  //     return;
  //   }

  //   const canvas = await html2canvas(input, { scale: 2 });
  //   const imgData = canvas.toDataURL("image/png");
  //   const pdf = new jsPDF("landscape", "px", "a4");
  //   const pdfWidth = pdf.internal.pageSize.getWidth();
  //   const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

  //   pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
  //   pdf.save("class-report.pdf");
  // };
  const handlePrint = async () => {
    const target = targetRef.current;

    if (!target) {
      toast.error("No content to print.");
      return;
    }

    setLoadingState(true);

    try {
      console.log("Target Ref Content:", target);

      // Wait for content to render
      await new Promise((resolve) => setTimeout(resolve, 5000));

      // Generate the canvas
      const canvas = await html2canvas(target, {
        scale: 2, // Improve rendering quality
        useCORS: true, // Handle cross-origin issues
        backgroundColor: "#ffffff", // Ensure a white background
      });

      // Debug the generated image
      console.log("Canvas Data URL:", canvas.toDataURL());

      // Convert canvas to image data
      const imgData = canvas.toDataURL("image/png");

      // Create a new PDF
      const pdf = new jsPDF("landscape", "px", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      // Add the image to the PDF
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

      // Save the PDF
      pdf.save("class-report.pdf");

      toast.success("PDF downloaded successfully.");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to generate PDF. Please try again.");
    } finally {
      setLoadingState(false);
    }
  };

  const handlePrintAllAgain = async () => {
    if (!classStudents?.students || classStudents?.students?.length === 0) {
      toast.error("No students found in this class.");
      return;
    }

    setLoadingState(true);

    try {
      await toPDF(targetRef.current);
      toast.success("PDF downloaded successfully.");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to generate PDF. Please try again.");
    } finally {
      setLoadingState(false);
    }
  };

  const [fees, setFees] = useState({
    term1: "",
    term2: "",
    term3: "",
  });
  const [isOpen, setIsOpen] = useState(true);
  const [isOpenLoading, setIsOpenLoading] = useState(false);

  const handleUpdateFee = () => {
    setIsOpenLoading(true);
    updateTermFee(dataID!, classID!, {
      class1stFee: parseInt(fees.term1),
      class2ndFee: parseInt(fees.term2),
      class3rdFee: parseInt(fees.term3),
    })
      .then((res) => {
        if (res.status === 201) {
          toast.success("class fee updated");
          closeFeeModal();
          setIsOpenLoading(false);
        } else {
          toast.error(`${res?.response?.data?.messgae}`);
          closeFeeModal();
          setIsOpenLoading(false);
        }
      })
      .finally(() => {});
    // console.log(`Fee updated to: ${feeAmount}`);
  };

  const handleChange = (term, value) => {
    setFees((prev) => ({ ...prev, [term]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated fees:", fees);
    handleUpdateFee();
  };

  if (!isOpen) return null;

  return (
    <div className="text-blue-950">
      <LittleHeader name="Class room Details" back />
      <div>Class: {classroom?.className} </div>
      <span
        className="text-[12px] bg-red-500 text-white px-4 py-1 mb-10 rounded-[4px] cursor-pointer"
        onClick={() => {
          if (!document.startViewTransition) {
            setToggle(!toggle);
          } else {
            document.startViewTransition(() => {
              setToggle(!toggle);
            });
          }
        }}
      >
        Edit className
      </span>
      <Link
        to={`/class-broad-sheet-result-approve/${classID}`}
        className="text-[12px] ml-2 bg-orange-500 text-white px-4 py-1 mb-10 rounded-[4px] cursor-pointer"
      >
        View class Broad sheet
      </Link>
      <div>
        {toggle ? (
          <div
            className="absolute top-[9%] z-10 
                h-[200px] w-[100%] sm:w-[120%] md:w-[60%] rounded-md pr-10 bg-blue-500 py-4
                "
            style={{
              background: "rgba(252, 254, 255, 0.45)",
              backdropFilter: " blur( 4px )",
            }}
          >
            <div className="z-20">
              <div className="flex w-full">
                <Input
                  className="flex-1 mr-1 text-white text-[18px] placeholder:text-gray-400 "
                  defaultValue={classroom?.className}
                  value={classroom?.className}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setClassName(e.target.value);
                  }}
                />
              </div>
              <div>
                <Button
                  name={`${loading ? " Loading" : "Change Class Name"}`}
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
                    updateClassName(data?._id, classID, className).then(() => {
                      toast.success("class name Updated successfully");
                      setLoading(false);
                      setToggle(false);
                      mutate(`api/view-classrooms/${classID}`);
                    });
                  }}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="text-[12px] leading-4 text-[gray] mb-4 mr-8 mt-1">
            By clicking the above, you'll be editing the class name
          </div>
        )}
      </div>
      <div className="w-full text-blue-950 md:h-[90px] h-[70px] rounded-lg border flex justify-between overflow-hidden mt-5">
        <div className="bg-blue-950 text-white w-[160px] md:w-[300px] px-4 py-2 rounded-lg ">
          <div className="md:text-[17px] text-[10px]">
            Total Number of Students:
          </div>
          <div className="font-medium md:text-[27px] text-[14px] mt-[5px]">
            {classroom?.students?.length}{" "}
            <span className="md:text-[27px] text-[14px]">Students</span>
          </div>
        </div>
        <div className=" px-4 py-1 rounded-lg text-center flex items-end flex-col">
          <div className="flex-1" />
          <div className="mr-0 md:text-[15px] text-[12px] font-semibold">
            Manage/Approve class Action
          </div>
          <p className="font-medium"></p>
        </div>
      </div>
      <div className="my-6 border-t" />
      <div className="mt-6 w-full min-h-[80px] pb-4 bg-slate-50 rounded-lg border pt-2 px-4">
        <div className="px-3 opacity-100 rounded-md bg-orange-400 text-white mb-2 py-2 md:flex md:justify-between md:items-center">
          <div className="flex gap-4 font-normal ml-[12px] md:ml-0 mb-[10px] md:mb-0">
            <div className="text-center">
              <p className="font-normal text-[15px]">First Term</p>
              <p className="font-bold">
                ₦{classroom?.class1stFee?.toLocaleString()}
              </p>
            </div>
            <div className="text-center">
              <p className="font-normal text-[15px]">Second Term</p>
              <p className="font-bold">
                ₦{classroom?.class2ndFee?.toLocaleString()}
              </p>
            </div>
            <div className="text-center">
              <p className="font-normal text-[15px]">Third Term</p>
              <p className="font-bold">
                ₦{classroom?.class3rdFee?.toLocaleString()}
              </p>
            </div>
          </div>
          <button
            className="btn text-blue-950 bg-white hover:bg-blue-50 transition-all duration-300 px-8 uppercase text-[15px]"
            onClick={openFeeModal}
          >
            Update Class Fee
          </button>
          <Modal
            isOpen={isFeeModalOpen}
            // onClose
            onClose={closeFeeModal}
            className="rounded-lg shadow-xl w-[800px] bg-green-500 mx-auto"
          >
            {/* <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
              Class Fee Update
            </h2>
            <p className="text-gray-600 mb-10 text-center">
              By doing this you are about to update this class fee
            </p>

            <div className="space-y-6">
              <div className="relative">
                <input
                  type="text"
                  value={firstTermFee}
                  onChange={(e) => setFirstTermFee(e.target.value)}
                  className="outline-none p-2 h-14 w-[300px] text-[14px] text-gray-800 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 transition"
                  placeholder="Enter 1st Term Fee"
                />
              </div>

              <div className="relative">
                <input
                  type="text"
                  value={secondTermFee}
                  onChange={(e) => setSecondTermFee(e.target.value)}
                  className="outline-none p-2 h-14 w-[300px] text-[14px] text-gray-800 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 transition"
                  placeholder="Enter 2nd Term Fee"
                />
              </div>

              <div className="relative">
                <input
                  type="text"
                  value={thirdTermFee}
                  onChange={(e) => setThirdTermFee(e.target.value)}
                  className="outline-none p-2 h-14 w-[300px] text-[14px] text-gray-800 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 transition"
                  placeholder="Enter 3rd Term Fee"
                />
              </div>
            </div>

            <div className="mt-10 flex justify-center">
              <button
                onClick={handleUpdateFee}
                className="bg-blue-950 text-white px-8 py-3 rounded-lg text-[16px] font-semibold hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Update Fees
              </button>
            </div> */}

            <div className=" w-full  flex items-center justify-center p-4">
              <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden">
                {/* Decorative gradient background */}
                <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 opacity-10"></div>

                {/* Close button */}
                <button
                  // onClick={() => setIsOpen(false)}
                  onClick={closeFeeModal}
                  className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-200 hover:rotate-90 transform"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>

                {/* Header section */}
                <div className="relative pt-8 pb-6 px-8">
                  <div className="flex items-center justify-center mb-4">
                    <div className="p-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg">
                      <TrendingUp className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">
                    Class Fee Update
                  </h2>
                  <p className="text-gray-500 text-center text-sm">
                    Update the fee structure for all three terms
                  </p>
                </div>

                {/* Form section */}
                <form onSubmit={handleSubmit} className="px-8 pb-8">
                  <div className="space-y-5">
                    {/* 1st Term Fee */}
                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        1st Term Fee
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <DollarSign className="w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                        </div>
                        <input
                          type="number"
                          value={fees.term1}
                          onChange={(e) =>
                            handleChange("term1", e.target.value)
                          }
                          placeholder="Enter amount"
                          className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all duration-200 text-gray-800 placeholder-gray-400"
                        />
                      </div>
                    </div>

                    {/* 2nd Term Fee */}
                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        2nd Term Fee
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <DollarSign className="w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                        </div>
                        <input
                          type="number"
                          value={fees.term2}
                          onChange={(e) =>
                            handleChange("term2", e.target.value)
                          }
                          placeholder="Enter amount"
                          className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all duration-200 text-gray-800 placeholder-gray-400"
                        />
                      </div>
                    </div>

                    {/* 3rd Term Fee */}
                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        3rd Term Fee
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <DollarSign className="w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                        </div>
                        <input
                          type="number"
                          value={fees.term3}
                          onChange={(e) =>
                            handleChange("term3", e.target.value)
                          }
                          placeholder="Enter amount"
                          className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all duration-200 text-gray-800 placeholder-gray-400"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    className={`uppercase w-full mt-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300 ${
                      isOpenLoading && "opacity-90 cursor-not-allowed"
                    }`}
                    disabled={isOpenLoading}
                  >
                    {isOpenLoading ? (
                      <p className="flex items-center justify-center gap-2">
                        <FaSpinner className="animate-spin" /> Updating Fees...
                      </p>
                    ) : (
                      <p>Update Fees</p>
                    )}
                  </button>
                </form>

                {/* Decorative bottom element */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600"></div>
              </div>
            </div>
          </Modal>
        </div>
        <p>Manage Class Teacher: </p>
        <p className="text-[13px] flex items-center font-bold">
          Class teacher is responsible for day to day activities of the class{" "}
          <span className="font-bold flex items-center gap-1"></span>
        </p>
        {/* + Assign class Teacher{ */}
        <div className="mt-5 text-[13px] font-medium">
          <div className="mt-5 text-[13px] font-medium">
            <label
              htmlFor="assign_teacher"
              className=" my-3 text-blue-500 transition-all duration-300 hover:text-blue-600 cursor-pointer "
            >
              + Assign class Teacher
            </label>
            <div className="mt-3" />
            {/* Put this part before </body> tag */}
            <input
              type="checkbox"
              id="assign_teacher"
              className="modal-toggle"
            />
            <div className="modal rounded-md" role="dialog">
              <div className="modal-box  rounded-md bg-white">
                <p className="flex items-center justify-between my-4 ">
                  <p className="font-bold">Assigning Teacher to this class</p>

                  <label
                    htmlFor="assign_teacher"
                    className="hover:bg-blue-50 transition-all duration-300  cursor-pointer rounded-full flex items-center justify-center w-6 h-6 font-bold "
                  >
                    <MdClose />
                  </label>
                </p>
                <hr />

                <p className="mt-2 leading-tight text-[13px] font-medium">
                  Please note that this teacher you're about to assign to this
                  class will exhibit all feature, roles and previlage to
                  supervise this class.
                  <br />
                  <br />
                  <div className="flex gap-2  items-center">
                    <p> Teacher: {teacher}</p>
                    {teacher && (
                      <div className="flex items-center font-bold">
                        <span>selected</span>
                        <MdCheck className="text-green-500 text-[25px] mb-1 " />
                      </div>
                    )}
                  </div>
                </p>

                <div className="mt-10 w-full gap-2 flex flex-col items-center">
                  <div className="w-full flex flex-col">
                    <label className="font-medium text-[12px]">
                      Subject Teacher <span className="text-red-500">*</span>
                    </label>
                    <select
                      className="select border border-slate-200 text-[12px] py-0 px-2 w-full max-w-xs mb-3 bg-white"
                      value={teacher}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        setTeacher(e.target.value);
                      }}
                    >
                      <option disabled defaultValue={"Select a Teacher"}>
                        Select a Teacher
                      </option>
                      {schoolTeacher?.staff?.map((props: any, i: number) => (
                        <option key={i} value={props?.staffName}>
                          {props?.staffName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="w-full flex justify-end transition-all duration-300">
                  {teacher !== "" ? (
                    <label
                      htmlFor="assign_teacher"
                      className={`${
                        data?.categoryType === "Secondary"
                          ? "bg-blue-950"
                          : "bg-red-950"
                      } text-white px-8 py-3 rounded-md cursor-pointer`}
                      onClick={updateTeacher}
                    >
                      Proceed
                    </label>
                  ) : (
                    <Button
                      name="Can't Proceed"
                      className={`bg-[lightgray] ${
                        data?.categoryType === "Secondary"
                          ? "text-blue-950"
                          : "text-green-950"
                      } mx-0 cursor-not-allowed`}
                    />
                  )}
                </div>
              </div>

              <label className="modal-backdrop" htmlFor="assign_teacher">
                Close
              </label>
            </div>
          </div>
        </div>
        <div className="text-[12px]"> class Teacher Assigned</div>
        <StaffDetail props={classroom?.teacherID} />
      </div>

      <div className="my-6 border-t" />
      {/* SUbjects */}

      <div className="w-full min-h-[180px] pb-10 bg-slate-50 rounded-lg border py-2 px-4">
        <p>Manage Class Subject for {classroom?.className} </p>
        <p className="text-[13px] font-bold">
          Add/Remove Subjects for this class
        </p>

        <div className="mt-5 text-[13px] font-medium">
          <label
            htmlFor="assign_class_subject"
            className=" my-3 text-blue-500 transition-all duration-300 hover:text-blue-600 cursor-pointer "
          >
            {/* Look into */}
            {/* + Add Subject */}
          </label>
          <div className="mt-5" />
          {/* Put this part before </body> tag */}
          <input
            type="checkbox"
            id="assign_class_subject"
            className="modal-toggle"
          />
          <div className="modal rounded-md" role="dialog">
            <div className="modal-box  rounded-md">
              <p className="flex items-center justify-between my-4 ">
                <p className="font-bold">Add New Subject</p>

                <label
                  htmlFor="assign_class_subject"
                  className="hover:bg-blue-50 transition-all duration-300  cursor-pointer rounded-full flex items-center justify-center w-6 h-6 font-bold "
                >
                  <MdClose />
                </label>
              </p>
              <hr />
              <p className="mt-2 leading-tight text-[13px] font-medium">
                Please note that by assigning this subject to this class, it
                automtically becomes one of the class must take suject.
                <br />
                <br />
                You are about to add this subject:{" "}
                {subject ? subject : "********"} to this class:{" "}
                {classroom?.className} and assigning it to: {teacher}
              </p>
              <div className="mt-10 w-full gap-2 flex flex-col items-center">
                <div className="w-full">
                  <label className="font-medium text-[12px]">
                    Subject Title <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter the here: English"
                      className="mx-0 h-12 w-[100%]"
                      value={subject}
                      onChange={(e: any) => {
                        setSubject(e.target.value);
                      }}
                    />
                    <div className="-mt-4 w-full gap-2 flex flex-col items-center">
                      <div className="w-full flex flex-col">
                        <label className="font-medium text-[12px] mb-2">
                          Subject Teacher{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <select
                          className="select border border-slate-200 text-[12px] py-0 px-2 w-full max-w-xs mb-3"
                          value={teacher}
                          onChange={(
                            e: React.ChangeEvent<HTMLSelectElement>
                          ) => {
                            setTeacher(e.target.value);
                          }}
                        >
                          <option disabled selected>
                            Select a Teacher
                          </option>
                          {schoolTeacher?.staff?.map(
                            (props: any, i: number) => (
                              <option key={i} value={props?.staffName}>
                                {props?.staffName}
                              </option>
                            )
                          )}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full flex justify-end transition-all duration-300">
                {subject !== "" && teacher !== "" ? (
                  <label
                    htmlFor="assign_class_subject"
                    className="bg-blue-950 text-white py-4 px-8 rounded-md cursor-pointer "
                    onClick={addClassSubject}
                  >
                    Proceed
                  </label>
                ) : (
                  <Button
                    name="Can't Proceed"
                    className="bg-[lightgray] text-blue-950 mx-0 cursor-not-allowed"
                  />
                )}
              </div>
            </div>

            <label className="modal-backdrop" htmlFor="assign_class_subject">
              Close
            </label>
          </div>
        </div>

        {/* Populate Class St */}
        <ClassSubjectScreen classroom={classroom} school={data} />
      </div>

      {/* Performance */}
      <div className="mt-6 w-full min-h-[100px] pb-10 bg-slate-50 rounded-lg border py-2 px-4 ">
        <p>Top Performing student </p>
        <p className="text-[13px]  flex items-center font-bold">
          Here is the list of the top 5 performing student:{" "}
        </p>
        <div className="flex gap-4 mt-5">
          <div className="w-full justify-center flex">
            <div className="flex flex-col items-center justify-center px-4 py-1 mt-3">
              <FaCheckDouble size={13} />
              <p className="mt-3 text-[12px] font-medium">
                No Student rated yet
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* All Students */}
      <div className="mt-6 w-full min-h-[100px] pb-10 bg-slate-50 rounded-lg border py-2 px-4 ">
        <p>Viewing Students</p>
        <p className="text-[13px]  flex items-center font-bold">
          Here are all the students in this class:{" "}
        </p>
        <div className="flex gap-4 mt-5 overflow-x-auto">
          <ViewClassStudent />
        </div>
      </div>
      {/* <div className="my-4">view All Result for Printing</div>
      <button
        onClick={() => {
          setLoadingState(!loadingState);
        }}
        style={{
          padding: "8px 16px",
          color: "#fff",
          borderRadius: "4px",
          border: "none",
          cursor: "pointer",
        }}
        className="mb-5 bg-blue-950"
      >
        🖨️ {loadingState ? "Viewing Student" : "Print All Results"}
      </button> */}

      {loadingState && (
        <div ref={targetRef} style={{ height: "100%" }}>
          {classStudents?.students.map((student) => (
            <div key={student._id} className="result-card my-5">
              {/* <div>{student?.studentFirstName}</div> */}
              <ReportCardScreenDone student={student} />
            </div>
          ))}
        </div>
      )}
      {/* timetable */}
      <div className="mt-6 w-full min-h-[100px] pb-10 bg-slate-50 rounded-lg border py-2 px-4 ">
        <div className="flex items-center w-full justify-between">
          <div>
            <p>Viewing Class TimeTable</p>
            <p className="text-[13px]  flex items-center font-bold">
              Here are all the students in this class:{" "}
            </p>
          </div>

          <ClassModel />
        </div>
        <div className="flex gap-4 mt-5 h-[450px]">
          {/* <TimeTableScreen /> */}
          <TimeTableScreen props={classID!} />
        </div>

        <div className="mt-6 w-full min-h-[60px] py-5 bg-slate-50 rounded-lg border  px-4 ">
          <p className="mb-2">
            Attendance Record:{" "}
            <span className="font-medium">
              {(
                (mainAttendance?.attendance?.filter(
                  (el: any) => el?.present === true
                ).length /
                  mainAttendance?.attendance?.length) *
                100
              ).toFixed(2)}
              %
            </span>
          </p>
          <div className="w-full flex gap-1">
            <div className="flex flex-wrap gap-1 w-full">
              {mainAttendance?.attendance?.map((props: any) => (
                <div
                  className="tooltip"
                  datatype={`${props.present ? "Present" : "Absent"}`}
                >
                  <div
                    className={`w-4 h-4 rounded-[3px] border ${
                      props?.present ? "bg-green-500" : "bg-white"
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassDetailScreen;
