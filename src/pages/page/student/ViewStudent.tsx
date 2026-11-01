document.title = "View Students";
import { useDispatch } from "react-redux";
import pix from "../../../assets/pix.jpg";
import Button from "../../../components/reUse/Button";
import LittleHeader from "../../../components/static/LittleHeader";
import { displayDelay, displayStudent } from "../../../global/reduxState";
import { Link, useParams } from "react-router-dom";
import { v4 as uuid } from "uuid";
import {
  useSchoolCookie,
  useSchoolData,
  useSchoolStudents,
  useStudentAttendance,
} from "../../hook/useSchoolAuth";
import moment from "moment";
import React, { FC, useEffect, useMemo, useState } from "react";
import {
  bulkUploadofStudent,
  // deleteAllStudent,
  deleteStudent,
  outGoneStudent,
  verifyPayment1st,
  verifyPayment2nd,
  verifyPayment3rd,
} from "../../api/schoolAPIs";
import toast from "react-hot-toast";
import {
  useStudentInfo,
  useStudentInfoData,
} from "../../../pagesForStudents/hooks/useStudentHook";
// import { mutate } from "swr";
import { schoolPaymentEndPoint } from "../../../pagesForStudents/api/studentAPI";
import Input from "../../../pagesForTeachers/components/reUse/Input";

import { FaSpinner } from "react-icons/fa6";
import PrintReciptScreen from "./PrintReceipt";
import { useReactToPrint } from "react-to-print";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { MdClose, MdQrCode } from "react-icons/md";
import StudentIDCardModal from "../../../components/modals/StudentIDCardModal";
import { PDFDownloadLink, pdf } from "@react-pdf/renderer";
import StudentIDCardPDF from "../../../components/pdf/StudentIDCardPDF";

interface iProps {
  props?: any;
  id?: string;
  data?: any;
}

const Remark: FC<iProps> = ({ id, data }) => {
  const { mainStudentAttendance } = useStudentAttendance(id!);

  let name2 = data?.studentFirstName;

  let result = mainStudentAttendance?.data?.attendance?.find((el: any) => {
    return el?.studentFirstName === name2;
  });

  let timer = Date.now();

  return (
    <div
      className={`w-[100px] border-r 
      ${
        result?.present
          ? "text-green-600"
          : result?.absent
          ? "text-red-600"
          : null
      }`}
    >
      {moment(result?.createdAt).format("ll") === moment(timer).format("ll") &&
      result?.present
        ? "Present"
        : result?.absent
        ? "Absent"
        : null}
    </div>
  );
};

const AttendanceRatio: FC<iProps> = ({ props }) => {
  const { mainStudentAttendance } = useStudentAttendance(props?._id);

  return (
    <div>
      {(mainStudentAttendance?.data?.attendance?.filter(
        (el: any) => el.present === true
      )?.length /
        mainStudentAttendance?.data?.attendance?.length) *
      100 ? (
        <div>
          {(
            (mainStudentAttendance?.data?.attendance?.filter(
              (el: any) => el.present === true
            )?.length /
              mainStudentAttendance?.data?.attendance?.length) *
            100
          ).toFixed(2)}
          %
        </div>
      ) : (
        <p>0%</p>
      )}
    </div>
  );
};

const ViewStudent = () => {
  const dispatch = useDispatch();
  const [searchStudents, setSearchStudents] = useState("");
  const [showButton, setShowButton] = useState(true);
  const [loading, setLoading] = useState(false);
  const { studentInfo } = useStudentInfo();

  const getValue = (length: number): string => {
    const alphanumericChars: string =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result: string = "";
    for (let i = 0; i < length; i++) {
      const randomIndex: number = Math.floor(
        Math.random() * alphanumericChars.length
      );
      result += alphanumericChars.charAt(randomIndex);
    }
    return result;
  };

  const { data: UI } = useSchoolData();
  const { students, mutate: mutateStudents } = useSchoolStudents(UI?._id);
  const [viewstudent1stfees, setViewStudent1stFees] = useState(false);
  const [viewstudent2ndfees, setViewStudent2ndFees] = useState(false);
  const [viewstudent3rdfees, setViewStudent3rdFees] = useState(false);

  const [ID, setID] = useState<string>("");

  const handleToggleCheckbox1st = (studentID: any) => {
    setViewStudent1stFees(!viewstudent1stfees);

    const prevData = students;
    const updatedList = students?.data?.students?.map((s: any) =>
      s._id === studentID ? { ...s, feesPaid1st: true } : s
    );

    mutateStudents(
      { ...students, data: { ...students.data, students: updatedList } },
      false
    );

    verifyPayment1st(UI?._id, studentID!).then((res: any) => {
      if (res.status === 200) {
        schoolPaymentEndPoint(studentID, {
          date: moment(Date.now()).format("lll"),
          amount: "2000",
          purchasedID: getValue(10),
          reference: getValue(10),
        }).then((res) => {
          setID("");
          toast.success("1st term SchoolFees has been Approved");
          mutateStudents();
        });
      } else {
        toast.error("Fail to approve this 1st term SchoolFees");
        mutateStudents(prevData);
        setID("");
      }
    });
  };

  const handleToggleCheckbox2nd = (studentID: any) => {
    setViewStudent2ndFees(!viewstudent2ndfees);

    const prevData = students;
    const updatedList = students?.data?.students?.map((s: any) =>
      s._id === studentID ? { ...s, feesPaid2nd: true } : s
    );

    mutateStudents(
      { ...students, data: { ...students.data, students: updatedList } },
      false
    );

    verifyPayment2nd(UI?._id, studentID!).then((res: any) => {
      if (res.status === 200) {
        setID("");
        toast.success("2nd term SchoolFees has been Approved");
        mutateStudents();
      } else {
        setID("");
        toast.error("Fail to approve this 2nd term SchoolFees");
        mutateStudents(prevData);
      }
    });
  };

  const handleToggleCheckbox3rd = (studentID: any) => {
    setViewStudent3rdFees(!viewstudent3rdfees);

    const prevData = students;
    const updatedList = students?.data?.students?.map((s: any) =>
      s._id === studentID ? { ...s, feesPaid3rd: true } : s
    );

    mutateStudents(
      { ...students, data: { ...students.data, students: updatedList } },
      false
    );

    verifyPayment3rd(UI?._id, studentID!).then((res: any) => {
      if (res.status === 200) {
        schoolPaymentEndPoint(studentID, {
          date: moment(Date.now()).format("lll"),
          amount: "2000",
          purchasedID: getValue(6),
          reference: getValue(6),
        }).then(() => {
          setID("");
          toast.success("3rd term SchoolFees has been Approved");
          mutateStudents();
        });
      } else {
        setID("");
        toast.error("Fail to approve this 3rd term SchoolFees");
        mutateStudents(prevData);
      }
    });
  };

  const handleDisplayStaff = () => {
    if (!document.startViewTransition) {
      dispatch(displayStudent(true));
      dispatch(displayDelay(true));
    } else {
      document.startViewTransition(() => {
        dispatch(displayDelay(true));
        dispatch(displayStudent(true));
      });
    }
  };

  const [file, setFile] = useState();
  const [toggle, setToggle] = useState<boolean>(false);

  const handleBulkStudent = () => {
    setToggle(true);
    const formData = new FormData();
    formData.append("file", file);

    bulkUploadofStudent(UI?._id, formData)
      .then(() => {
        toast.success("Students Have Been Successfully Imported");
        mutateStudents();
      })
      .finally(() => {
        setToggle(false);
      });
  };

  const [valueStored, setValueStored] = useState<Array<string>>([]);

  useEffect(() => {}, [valueStored]);

  // getting schoolID
  const schoolID = useSchoolCookie().dataID;

  const handeDeleteStudent = (studentID: any) => {
    try {
      setShowButton(true);
      setLoading(true);

      // Optimistic Update
      const prevData = students;
      const filteredStudentsList =
        students?.data?.students?.filter((s: any) => s._id !== studentID) || [];

      mutateStudents(
        {
          ...students,
          data: { ...students.data, students: filteredStudentsList },
        },
        false
      );

      outGoneStudent(schoolID, studentID)
        .then((res) => {
          if (res?.status === 201 || res?.status === 200) {
            toast.success("Student Has Been Successfully Deleted");
            mutateStudents(); // Revalidate
            setShowButton(false);
            setLoading(false);
          } else {
            toast.error("Failed to delete student");
            mutateStudents(prevData); // Revert
            setShowButton(false);
            setLoading(false);
          }
        })
        .finally(() => {
          setShowButton(false);
          setLoading(false);
        });
    } catch (error) {
      toast.error("An error occurred while deleting student");
      mutateStudents(); // Revert
      setShowButton(false);
      setLoading(false);
      console.log(error);
    }
  };

  const sortedStudents = useMemo(() => {
    return students?.data?.students
      ? [...students.data.students].sort((a: any, b: any) =>
          a.studentLastName?.localeCompare(b.studentLastName)
        )
      : [];
  }, [students]);

  // Search Function
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchStudents(e.target.value);
  };

  const filteredStudents = useMemo(() => {
    const search = searchStudents.toLowerCase();
    return sortedStudents?.filter((student: any) => {
      const fullName =
        `${student?.studentLastName} ${student?.studentFirstName} ${student?.classAssigned}`.toLowerCase();
      return fullName.includes(search);
    });
  }, [sortedStudents, searchStudents]);

  const [stateID, setStateID] = useState<string>("");
  const [toggleView, setToggleView] = useState<boolean>(false);
  const [showIDCard, setShowIDCard] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [isDownloadingCards, setIsDownloadingCards] = useState(false);

  const BACKEND_URL = "https://start-school-be.vercel.app/api";

  const generateQRCodeDataURL = (student: any): Promise<string> => {
    return new Promise((resolve) => {
      const qrValue = `${BACKEND_URL}/qr-scan/${student?.schoolIDs}/${student?._id}`;
      // Use a temporary canvas to generate the QR code
      const canvas = document.createElement("canvas");
      // We need to import QRCode from qrcode.react to draw on canvas
      // But since we are in a function, we might need a better way if we don't want to render.
      // For now, let's assume we can use a library or just use an image from a service if easier
      // Actually, let's use a hidden QRCodeCanvas component approach in the render if possible.
      // Or just use an online QR generator for the PDF for now to ensure it works,
      // but local is better.
      // Let's use a simple data URL generator or similar.
      // Alternative: Use the qrcode-generator micro library if I can.
      // Actually, I'll use the StudentIDCardPDF with an image URL that gets generated.
      resolve(`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(qrValue)}`);
    });
  };

  const handleDownloadAllIDCards = async () => {
    if (!paginatedStudents || paginatedStudents.length === 0) {
      toast.error("No students to download");
      return;
    }

    setIsDownloadingCards(true);
    toast.loading("Generating ID cards PDF...", { id: "generating-pdf" });

    try {
      const qrCodesMap: { [key: string]: string } = {};
      
      for (const student of paginatedStudents) {
        qrCodesMap[student._id] = await generateQRCodeDataURL(student);
      }

      const blob = await pdf(
        <StudentIDCardPDF students={paginatedStudents} qrCodes={qrCodesMap} />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `Student_ID_Cards_Page_${currentPage}.pdf`;
      link.click();
      
      toast.success("ID cards PDF downloaded", { id: "generating-pdf" });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to generate PDF", { id: "generating-pdf" });
    } finally {
      setIsDownloadingCards(false);
    }
  };

  // Pagination
  const STUDENTS_PER_PAGE = 18;
  const [currentPage, setCurrentPage] = useState(1);

  // Reset to page 1 when search changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchStudents]);

  const totalPages = Math.ceil(
    (filteredStudents?.length || 0) / STUDENTS_PER_PAGE
  );
  const paginatedStudents = useMemo(() => {
    return filteredStudents?.slice(
      (currentPage - 1) * STUDENTS_PER_PAGE,
      currentPage * STUDENTS_PER_PAGE
    );
  }, [filteredStudents, currentPage, STUDENTS_PER_PAGE]);

  const handleDownloadAllStudentsPDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["S/N", "Full Name", "Reg ID", "Class", "Gender"];
    const tableRows: any[] = [];

    filteredStudents.forEach((student: any, index: number) => {
      const studentData = [
        index + 1,
        `${student.studentLastName} ${student.studentFirstName}`,
        student.enrollmentID,
        student.classAssigned,
        student.gender,
      ];
      tableRows.push(studentData);
    });

    doc.setFontSize(18);
    doc.text("All Students List", 14, 22);
    doc.setFontSize(11);
    doc.setTextColor(100);

    // Simple manual table generation since jspdf-autotable isn't installed
    let yPos = 35;
    doc.setFont("helvetica", "bold");
    tableColumn.forEach((col, i) => {
      doc.text(col, 14 + i * 40, yPos);
    });

    doc.setFont("helvetica", "normal");
    yPos += 10;
    tableRows.forEach((row) => {
      if (yPos > 280) {
        doc.addPage();
        yPos = 20;
      }
      row.forEach((cell: any, i: number) => {
        doc.text(String(cell), 14 + i * 40, yPos);
      });
      yPos += 8;
    });

    doc.save(`All_Students_${UI?.schoolName || "List"}.pdf`);
    toast.success("Student list PDF downloaded");
  };

  return (
    <div className="relative">
      {/* header */}
      <div className="mb-0" />
      <LittleHeader name={"viewing all Students"} />

      <div className="mt-10" />

      <div className=" sm:flex w-full justify-between items-start">
         <div><Input
          placeholder="Search Student Name or Class"
          className="ml-0"
          value={searchStudents}
          onChange={handleSearch}
        />
          <div className="flex items-center gap-2 -mt-4">
            <Button
              name="Download Students"
              className="uppercase md:text-[12px] text-[11px] font-medium bg-orange-500 hover:bg-orange-600 cursor-pointer transition-all duration-300"
              onClick={handleDownloadAllStudentsPDF}
            />

            <Button
              name={isDownloadingCards ? "Generating..." : "Download ID Cards"}
              className="uppercase md:text-[12px] text-[11px] font-medium bg-blue-800 hover:bg-blue-900 cursor-pointer transition-all duration-300"
              onClick={handleDownloadAllIDCards}
              disabled={isDownloadingCards}
            />
          </div>
          </div>
        <div className="mb-3 sm:mb-0 flex items-center">
         
          <Button
            name="Add a new Student"
            className="uppercase md:text-[12px] text-[11px] font-medium bg-blue-950 py-2 sm:py-4 md:py-2 lg:py-4 md:px-4 hover:bg-blue-900 cursor-pointer transition-all duration-300"
            onClick={handleDisplayStaff}
          />
          <input
            id="file"
            type="file"
            accept=".csv"
            hidden
            onChange={(e: any) => {
              setFile(e.target.files[0]);
            }}
          />
         

          {file ? (
            <Button
              name={
                toggle ? (
                  <div className="flex items-center gap-2 duration-300 transition-all">
                    <FaSpinner className="animate-spin text-[18px]" />
                    <span>Uploading Data</span>
                  </div>
                ) : (
                  "Add file to Student"
                )
              }
              className="uppercase lg:text-[12px] text-[9px] font-medium bg-red-500 py-2 sm:py-4 md:py-2 lg:py-4 md:px-4 hover:bg-red-600 cursor-pointer transition-all duration-300"
              onClick={handleBulkStudent}
            />
          ) : (
            <label
              htmlFor="file"
              className="uppercase lg:text-[12px]font-medium bg-neutral-950 py-2 sm:py-4 md:py-2 lg:py-4 md:px-4 hover:bg-neutral-900 cursor-pointer transition-all duration-300 px-5 border rounded-md m-2 overflow-hidden flex items-center justify-center text-white  md:text-[13px] text-[11px]"
            >
              upload file for Bulk Entry
            </label>
          )}

         
        </div>
      </div>
      <div className="py-6 px-2 border rounded-md min-w-[300px] overflow-y-hidden">
        <div className="text-[gray] w-[2220px] z-50 flex  gap-2 text-[12px] font-medium uppercase mb-10 px-4">
          <div className="w-[50px] border-r">S/N</div>
          <div className="w-[150px] border-r">student Image</div>
          <div className="w-[200px] border-r">student Name</div>
          <div className="w-[180px] border-r">View Detail</div>

          <div className="w-[130px] border-r">Reg. Date</div>


          <div className="w-[270px] border-r">Session Fee</div>
          <div className="w-[130px] border-r">Receipt</div>
          <div className="w-[100px] border-r">Gender</div>

          <div className="w-[100px] border-r">student Class</div>

          <div className="w-[150px] border-r">Parent Contact</div>
          <div className="w-[200px] border-r">Address </div>

          <div className="w-[100px] border-r">Today's Attendance</div>
          <div className="w-[100px] border-r">Student's Attendance Ratio</div>
          <div className="w-[200px] border-r">Performance Rating</div>

          <div className="w-[80px] border-r">QR Code</div>
          
          <div className="w-[80px] border-r">QR ID</div>
          <div className="w-[180px] border-r">Student Action</div>
        </div>

        <div className=" w-[2220px] overflow-hidden">
          {filteredStudents?.length >= 0 ? (
            <div>
              {paginatedStudents?.map((props: any, i: number) => {
                const globalIndex = (currentPage - 1) * STUDENTS_PER_PAGE + i;
                return (
                  <div>
                    <div>
                      <div
                        key={props}
                        className={`w-full flex items-center gap-2 text-[12px] font-medium  h-16 px-4 my-2  overflow-hidden ${
                          i % 2 === 0 ? "bg-slate-50" : "bg-white"
                        }`}
                      >
                        <div className="w-[50px] border-r">{globalIndex + 1}</div>
                        {/* Image and Name */}
                        <div className="w-[150px] flex justify-center border-r">
                          <img
                            className="w-14 h-14 rounded-md border object-cover"
                            src={props?.avtar ? props?.avatar : pix}
                          />
                        </div>
                        <div className="w-[200px] border-r gap-2 font-bold">
                          {props?.studentLastName} {props?.studentFirstName}
                          <div className="text-slate-500 font-medium">
                            RegID: {props?.enrollmentID}
                          </div>
                        </div>

                          <Link
                          to={`student-details/${props?._id}`}
                          className="w-[180px] border-r"
                        >
                          <Button
                            name="View Detail"
                            className="py-3 w-[85%] bg-black text-white  hover:bg-neutral-800 transition-all duration-300 hover:scale-105"
                            onClick={() => {}}
                          />
                        </Link>
                        <div className="w-[130px] border-r">
                          {moment(props?.createdAt).format("ll")}
                        </div>

                       

                        <div className="w-[270px] border-r flex gap-4">
                          <div className="flex flex-col items-center">
                            <label>1st Term</label>

                            <label htmlFor="my_modal_6 relative">
                              <label
                                htmlFor="my_modal_6"
                                // className={`btn text-[12px] font-medium text-white `}
                              >
                                <input
                                  type="checkbox"
                                  className={`
                                -z-20 
                            toggle toggle-sm mt-2 ${
                              props?.feesPaid1st
                                ? "bg-blue-950 border-blue-950"
                                : "bg-neutral-500 border-neutral-500"
                            }
                            `}
                                  checked={props?.feesPaid1st}
                                  onClick={() => {
                                    console.log("free: ", props?.classTermFee);
                                    schoolPaymentEndPoint(props?._id, {
                                      date: moment(Date.now()).format("lll"),
                                      amount: props?.classTermFee,
                                      reference: "paid in cash",
                                      confirm: true,
                                      purchasedID: uuid().slice(0, 7),
                                    }).then((res) => {
                                      if (res.status === 201) {
                                        toast.success(
                                          "SchoolFee has been registered paid but not confirmed yet"
                                        );
                                      } else {
                                        toast.error(
                                          `Has been paid but not confirmed yet`
                                        );
                                      }
                                    });
                                  }}
                                />
                              </label>

                              {/* Put this part before </body> tag */}
                              <input
                                type="checkbox"
                                id="my_modal_6"
                                className="modal-toggle"
                              />
                              {/* Payment Modal */}
                              <div className="modal" role="dialog">
                                <div className="modal-box bg-white">
                                  <h3 className="font-bold text-lg">
                                    Confirm this payment
                                  </h3>
                                  <p className="py-4">
                                    Are you sure you want to confirm this
                                    payment?
                                    <br />
                                  </p>
                                  <div className="modal-action">
                                    <label
                                      htmlFor="my_modal_6"
                                      className="btn px-8 bg-green-500 text-white hover:bg-green-600 "
                                      onClick={() => {
                                        handleToggleCheckbox1st(ID);
                                      }}
                                    >
                                      Yes
                                    </label>

                                    <label
                                      htmlFor="my_modal_6"
                                      className="btn px-8 bg-red-500 text-white hover:bg-red-600 "
                                      onClick={() => {}}
                                    >
                                      No
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </label>
                          </div>{" "}
                          <div className="flex flex-col items-center">
                            <label>2nd Term</label>

                            <label htmlFor="my_modal_6 relative ">
                              <label htmlFor="my_modal_6">
                                {/* Second Term Toggle Comment */}
                                {/* <label
                                htmlFor="my_modal_6"
                                className="absolute z-80 bg-transparent hover:bg-transparent border-0 btn"
                                onClick={() => {
                                  setID(props?._id);
                                }}
                              /> */}
                                <input
                                  type="checkbox"
                                  className={`
                                -z-20
                            toggle toggle-sm mt-2  ${
                              props?.feesPaid2nd
                                ? "bg-blue-950 border-blue-950"
                                : "bg-neutral-500 border-neutral-500"
                            }
                            `}
                                  onChange={() => {}}
                                  checked={props?.feesPaid2nd}
                                  onClick={() => {
                                    schoolPaymentEndPoint(props?._id, {
                                      date: moment(Date.now()).format("lll"),
                                      amount: props?.classTermFee,
                                      reference: "paid in cash",
                                      confirm: true,
                                      purchasedID: uuid().slice(0, 7),
                                    }).then((res) => {
                                      if (res.status === 201) {
                                        toast.success(
                                          "SchoolFee has been registered paid but not confirmed yet"
                                        );
                                      } else {
                                        toast.error(
                                          `Has been paid but not confirmed yet`
                                        );
                                      }
                                    });
                                  }}
                                />
                              </label>

                              {/* Put this part before </body> tag */}
                              <input
                                type="checkbox"
                                id="my_modal_6"
                                className="modal-toggle"
                              />
                              <div className="modal" role="dialog">
                                <div className="modal-box">
                                  <h3 className="font-bold text-lg">
                                    Confirm 2nd Term school-fees payment
                                  </h3>
                                  <p className="py-4">
                                    Are you sure you want to confirm this
                                    payment?
                                    <br />
                                  </p>
                                  <div className="modal-action">
                                    <label
                                      htmlFor="my_modal_6"
                                      className="btn px-8 bg-green-500 text-white hover:bg-green-600 "
                                      onClick={() => {
                                        handleToggleCheckbox2nd(ID);
                                      }}
                                    >
                                      Yes
                                    </label>

                                    <label
                                      htmlFor="my_modal_6"
                                      className="btn px-8 bg-red-500 text-white hover:bg-red-600 "
                                      onClick={() => {}}
                                    >
                                      No
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </label>
                          </div>
                          <div className="flex flex-col items-center">
                            <label>3rd Term</label>
                            {/* <input
                            type="checkbox"
                            className={`
                            toggle toggle-sm mt-2  ${
                              props?.feesPaid3rd
                                ? "bg-blue-950 border-blue-950"
                                : "bg-neutral-500 border-neutral-500"
                            }
                            `}
                            onChange={() => handleToggleCheckbox3rd(props?._id)}
                            checked={props?.feesPaid4rd}
                          /> */}

                            <label htmlFor="my_modal_6 relative ">
                              <label htmlFor="my_modal_6">
                                {/* 3rd Term toggle Comment */}
                                {/* <label
                                htmlFor="my_modal_6"
                                className="absolute z-80 bg-transparent hover:bg-transparent border-0 btn"
                                onClick={() => {
                                  setID(props?._id);
                                }}
                              /> */}
                                <input
                                  type="checkbox"
                                  className={`
                                -z-20
                            toggle toggle-sm mt-2  ${
                              props?.feesPaid3rd
                                ? "bg-blue-950 border-blue-950"
                                : "bg-neutral-500 border-neutral-500"
                            }
                            `}
                                  onChange={() => {}}
                                  checked={props?.feesPaid3rd}
                                  onClick={() => {
                                    schoolPaymentEndPoint(props?._id, {
                                      date: moment(Date.now()).format("lll"),
                                      amount: props?.classTermFee,
                                      reference: "paid in cash",
                                      confirm: true,
                                      purchasedID: uuid().slice(0, 7),
                                    }).then((res) => {
                                      if (res.status === 201) {
                                        toast.success(
                                          "SchoolFee has been registered paid but not confirmed yet"
                                        );
                                      } else {
                                        toast.error(
                                          `Has been paid but not confirmed yet`
                                        );
                                      }
                                    });
                                  }}
                                />
                              </label>

                              {/* Put this part before </body> tag */}
                              <input
                                type="checkbox"
                                id="my_modal_6"
                                className="modal-toggle"
                              />
                              <div className="modal" role="dialog">
                                <div className="modal-box">
                                  <h3 className="font-bold text-lg">
                                    Confirm 3rd Term school-fees payment
                                  </h3>
                                  <p className="py-4">
                                    Are you sure you want to confirm this
                                    payment?
                                    <br />
                                  </p>
                                  <div className="modal-action">
                                    <label
                                      htmlFor="my_modal_6"
                                      className="btn px-8 bg-green-500 text-white hover:bg-green-600 "
                                      onClick={() => {
                                        handleToggleCheckbox3rd(ID);
                                      }}
                                    >
                                      Yes
                                    </label>

                                    <label
                                      htmlFor="my_modal_6"
                                      className="btn px-8 bg-red-500 text-white hover:bg-red-600 "
                                      onClick={() => {}}
                                    >
                                      No
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </label>
                          </div>
                        </div>
                        <div className="w-[130px] border-r">
                          {stateID !== "" && toggleView && (
                            <div className="text-white p-4 w-full h-screen bg-black/5 rounded-md absolute top-0 left-0">
                              <Modal
                                props={stateID}
                                setToggleView={setToggleView}
                                setStateID={setStateID}
                              />{" "}
                            </div>
                          )}

                          {UI?.presentTerm === "1st Term" &&
                          props?.feesPaid1st ? (
                            <button
                              className="bg-blue-950 text-white  px-4 py-2 rounded-md cursor-pointer hover:bg-blue-900 transition-all duration-300"
                              onClick={() => {
                                setStateID(props?._id);
                                setToggleView(true);
                              }}
                            >
                              Get Receipt
                            </button>
                          ) : // <PrintReciptScreen props={props} />
                          UI?.presentTerm === "2nd Term" &&
                            props?.feesPaid2nd ? (
                            <button
                              className="bg-blue-950 text-white  px-4 py-2 rounded-md cursor-pointer hover:bg-blue-900 transition-all duration-300"
                              onClick={() => {
                                setStateID(props?._id);
                                setToggleView(true);
                              }}
                            >
                              Get Receipt
                            </button>
                          ) : UI?.presentTerm === "3rd Term" &&
                            props?.feesPaid3rd ? (
                            <button
                              className="bg-blue-950 text-white  px-4 py-2 rounded-md cursor-pointer hover:bg-blue-900 transition-all duration-300"
                              onClick={() => {
                                setStateID(props?._id);
                                setToggleView(true);
                              }}
                            >
                              Get Receipt
                            </button>
                          ) : null}
                        </div>
                        <div className="w-[100px] border-r">
                          {props?.gender}
                        </div>

                        <div className="w-[100px] border-r  ">
                          {props?.classAssigned}
                        </div>
                        <div className="w-[150px] border-r  ">
                          {props?.phone ? props?.phone : "Not yet Added"}
                        </div>
                        <div className="w-[200px] border-r  ">
                          {props?.studentAddress
                            ? props?.studentAddress
                            : "Not yet Added"}
                        </div>
                        <Remark data={props} id={props?._id} />
                        <div className="w-[100px] border-r">
                          <AttendanceRatio props={props} />
                        </div>
                        <div className="w-[200px] border-r  ">
                          {props?.totalPerformance
                            ? parseFloat(props?.totalPerformance.toFixed(2))
                            : "0"}
                        </div>
                        <div className="w-[80px] border-r flex justify-center">
                          <MdQrCode
                            size={24}
                            className="cursor-pointer text-blue-950 hover:text-blue-700 transition-all duration-200"
                            onClick={() => {
                              setSelectedStudent(props);
                              setShowIDCard(true);
                            }}
                          />
                        </div>
                        <div className="w-[80px] border-r">3 of 5</div>
                       

                        {/* Delete Toggle Modal And Fuctions Are Below */}
                        <div
                          className="w-[180px] border-r"
                          onClick={() => {
                            valueStored.push(props?._id);
                          }}
                        >
                          <div>
                            <label
                              htmlFor="my_modal_delete"
                              className="py-3 px-1 w-[85%] border rounded-md bg-red-500 text-[12px] text-white transition-all duration-300 hover:scale-105 cursor-pointer inline-block text-center"
                            >
                              Delete Student
                            </label>
                          </div>
                          <input
                            type="checkbox"
                            id="my_modal_delete"
                            className="modal-toggle"
                            name="props_data"
                          />
                          <div className="modal modal-middle">
                            <div className="modal-box bg-white">
                              <h3 className="font-bold mb-3 text-lg text-center text-blue-950">
                                Student Deletion Notice
                              </h3>
                              <div className="mb text-blue-950">
                                <p className="mb-3 text-[14px]">
                                  You are about to permanently delete this
                                  student record from your database. This action
                                  is irreversible and cannot be undone, and will
                                  result in the complete removal of all
                                  associated data, including academic history,
                                  contact information, and every other student
                                  detail
                                </p>
                                <div className="flex items-center justify-center gap-3 font-semibold  text-[15px]">
                                  <p>
                                    If{" "}
                                    <span className="text-red-500 text-[20px]">
                                      YES
                                    </span>{" "}
                                    continue,
                                  </p>
                                  <p className="">
                                    If <span className="text-[20px]">NO</span>{" "}
                                    cancel.
                                  </p>
                                </div>
                              </div>

                              <div className="modal-action flex items-center">
                                {loading ? (
                                  <Button
                                    disabled={true}
                                    name="Deleting Student"
                                    className="px-3 bg-red-500 text-[15px] !rounded-lg text-white transition-all duration-300 hover:scale-105 py-[14px]"
                                    icon={
                                      <FaSpinner className="animate-spin text-[14px]" />
                                    }
                                  />
                                ) : (
                                  showButton && (
                                    <Button
                                      // disabled={showButton}
                                      name={
                                        loading ? (
                                          <span className="flex items-center gap-2">
                                            {/* <FaSpinner className="animate-spin text-[10px]" /> */}
                                            Deleting Student
                                          </span>
                                        ) : (
                                          "Delete Student"
                                        )
                                      }
                                      className="px-3 py-3 bg-red-500 text-[15px] text-white transition-all duration-300 hover:scale-105"
                                      onClick={() => {
                                        setLoading(true);
                                        console.log("to delete: ");
                                        console.log("to delete: ", loading);
                                        if (valueStored?.length <= 2) {
                                          // console.log("read: ", valueStored);
                                          handeDeleteStudent(valueStored[0]);
                                        } else {
                                          handeDeleteStudent(valueStored[1]);
                                        }
                                      }}
                                    />
                                  )
                                )}
                                {showButton ? (
                                  <label
                                    htmlFor="my_modal_delete"
                                    className="btn text-white py-4 px-6 bg-blue-950 border hover:bg-blue-950 scale-105"
                                    onClick={() => {
                                      setLoading(false);
                                      setValueStored([]);
                                    }}
                                  >
                                    Cancel
                                  </label>
                                ) : (
                                  <label
                                    htmlFor="my_modal_delete"
                                    className="btn text-white py-4 px-6 bg-blue-950 border hover:bg-blue-950 scale-105"
                                    onClick={() => {
                                      setValueStored([]);
                                      setShowButton(true);
                                    }}
                                  >
                                    Close
                                  </label>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-end text-[12px] font-bold"></div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div>No student yet</div>
          )}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6 px-4 flex-wrap gap-3">
            <p className="text-[12px] text-gray-500 font-medium">
              Showing {(currentPage - 1) * STUDENTS_PER_PAGE + 1}–{Math.min(currentPage * STUDENTS_PER_PAGE, filteredStudents?.length || 0)} of {filteredStudents?.length || 0} students
            </p>
            <div className="flex items-center gap-1 flex-wrap">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 text-[12px] font-medium rounded-md border bg-white hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
              >
                ← Prev
              </button>
              {Array.from({ length: totalPages }, (_, idx) => idx + 1)
                .filter((page) => page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1)
                .reduce<(number | string)[]>((acc, page, index, arr) => {
                  if (index > 0 && (page as number) - (arr[index - 1] as number) > 1) acc.push("...");
                  acc.push(page);
                  return acc;
                }, [])
                .map((item, idx) =>
                  item === "..." ? (
                    <span key={`ellipsis-${idx}`} className="px-2 text-gray-400 text-[12px]">...</span>
                  ) : (
                    <button
                      key={item}
                      onClick={() => setCurrentPage(item as number)}
                      className={`w-8 h-8 text-[12px] font-medium rounded-md border transition-all duration-200 ${
                        currentPage === item
                          ? "bg-blue-950 text-white border-blue-950"
                          : "bg-white hover:bg-gray-100 text-gray-700"
                      }`}
                    >
                      {item}
                    </button>
                  )
                )}
              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-2 text-[12px] font-medium rounded-md border bg-white hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
              >
                Next →
              </button>
            </div>
          </div>
        )}
      </div>

      {showIDCard && selectedStudent && (
        <StudentIDCardModal
          student={selectedStudent}
          onClose={() => {
            setShowIDCard(false);
            setSelectedStudent(null);
          }}
        />
      )}
    </div>
  );
};

export default ViewStudent;

const Modal: React.FC<any> = ({ props, setStateID, setToggleView }) => {
  const { studentInfoData } = useStudentInfoData(props);
  const { data } = useSchoolData();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleDownloadPDF = () => {
    const capture = document.getElementById("receipt-content");
    if (capture) {
      html2canvas(capture, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
        pdf.save(`School_Fee_Receipt_${studentInfoData?.studentFirstName}.pdf`);
      });
    }
  };

  const contentRef = React.useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({ contentRef });

  return (
    <div
      className="cursor-pointer fixed inset-0 flex items-center justify-center bg-black/5  bg-opacity-5 z-50 "
      ref={contentRef}
      onClick={() => setToggleView(false)}
    >
      <div
        className=" relative w-full max-w-2xl mx-auto bg-white shadow-md rounded-2xl p-8 border border-gray-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute text-[20px] font-[400] top-0 -left-60 text-blue-950/50 -z-1 -rotate-45 h-full ">
          {Array.from({ length: 20 }, (_, i: number) => {
            return (
              <div className="flex gap-4 my-10 text-[25px] opacity-5" key={i}>
                <div className=" flex gap-4 tracking-widest ">
                  <p>School Fee Receipt</p>
                  <p>{studentInfoData?.schoolName || "School Name"}</p>
                  {/* <p>School Fee Receipt</p> */}
                </div>
              </div>
            );
          })}
        </div>
        <div className="absolute text-[20px] font-[400] -top-80 -right-40 text-blue-950/50 -z-1 -rotate-45 h-full ">
          {Array.from({ length: 20 }, (_, i: number) => {
            return (
              <div className="flex gap-4 my-10 text-[25px] opacity-5" key={i}>
                <div className=" flex gap-4 tracking-widest ">
                  <p>School Fee Receipt</p>
                  <p>{studentInfoData?.schoolName || "School Name"}</p>
                  {/* <p>School Fee Receipt</p> */}
                </div>
              </div>
            );
          })}
        </div>

        <button
          className="absolute top-3 right-3 bg-gray-300 rounded-full p-1"
          onClick={() => {
            setToggleView(false);
            setStateID("");
          }}
        >
          <MdClose size={25} className="text-gray-700" />
        </button>

        <div id="receipt-content">
          <div className="mt-10 bg-gray-100 p-4 rounded-lg flex justify-between items-center">
            <p className="text-lg uppercase font-semibold text-gray-700">
              School Fee Receipt
            </p>
            <div className="flex gap-2 absolute z-10 right-12">
              <button
                onClick={handleDownloadPDF}
                className="bg-blue-950 text-white py-2 px-4 rounded-md cursor-pointer hover:bg-blue-900 transition-all duration-300 "
              >
                Download Now
              </button>
              {/* window.print(); */}
              <button
                onClick={() => handlePrint()}
                className="bg-blue-950 text-white py-2 px-4 rounded-md cursor-pointer hover:bg-blue-900 transition-all duration-300"
              >
                Print/Send
              </button>
            </div>
          </div>

          <div className="border-t border-dashed border-gray-300 my-6" />
          <div className="flex w-full justify-between mt-5">
            <div className=" mt-5 mb-6">
              <h2 className="text-2xl font-bold text-gray-700">
                {studentInfoData?.schoolName || "School Name"}
              </h2>
              <p className="text-[16px] leading-4 text-gray-500 w-[300px]">
                {data?.address || "Address"}
              </p>
              <p className="text-sm mt-3  text-gray-500 w-[300px] font-[300]">
                {data?.phone || "Phono"}
              </p>
              <p className="text-sm   text-gray-500 w-[300px] font-[300]">
                {data?.email || "email"}
              </p>
            </div>
            <div>
              <img
                src={data?.avatar}
                className="h-[120px] bg-blue-50 rounded-lg object-cover w-[150px]"
              />
            </div>
          </div>
          <div className="border-t border-dashed border-gray-300 my-6" />

          <div className="my-6 space-y-3 text-sm text-gray-600">
            <p className="flex flex-wrap">
              <span className="font-semibold text-blue-950 italic w-[300px]">
                Received from:
              </span>{" "}
              <span className="text-[16px] font-[500]">
                {studentInfoData?.studentFirstName}{" "}
                {studentInfoData?.studentLastName}{" "}
              </span>
            </p>
            <p className="flex">
              <span className="font-semibold text-blue-950 italic max-w-[300px]">
                Parent / Gurdian email:
              </span>{" "}
              <span className="text-[16px] font-[500]">
                {studentInfoData?.parentEmail || "Email not Provided"}
              </span>
            </p>
            <p className="flex">
              <span className="font-semibold text-blue-950 italic w-[300px]">
                Student ID :
              </span>{" "}
              <span className="text-[16px] font-[500]">
                {" "}
                {studentInfoData?.enrollmentID}
              </span>
            </p>
            <div className="flex items-center gap-10">
              <p className="flex">
                <span className="font-semibold text-blue-950 italic w-[300px]">
                  Class :
                </span>{" "}
                <span className="text-[16px] font-[500]">
                  {" "}
                  {studentInfoData?.classAssigned}
                </span>
              </p>
              <br />
            </div>
            <p className="flex">
              <span className="font-semibold text-blue-950 italic w-[300px]">
                Term :
              </span>{" "}
              {data?.presentTerm}
            </p>
            <p className="flex">
              <span className="font-semibold text-blue-950 italic w-[300px]">
                Payment Date :
              </span>{" "}
              <span className="text-[16px] font-[500]">
                {moment(Date.now()).format("LLL")}
              </span>
            </p>
            <p className="flex">
              <span className="font-semibold text-blue-950 italic w-[300px]">
                Amount Paid :
              </span>{" "}
              <span className="text-green-600 font-bold">
                <span className="text-[16px] font-[500]">
                  ₦
                  {studentInfoData?.classTermFee
                    ? studentInfoData.classTermFee.toLocaleString()
                    : "0"}
                </span>
              </span>
            </p>
            <p className="flex">
              <span className="font-semibold text-blue-950 italic w-[300px]">
                Payment Method :
              </span>{" "}
              <span className="text-[16px] font-[500]"> In-Person</span>
            </p>
          </div>

          <div className="border-t border-dashed border-gray-300 my-6" />
          <div className="">
            <p className="font-semibold text-blue-950 italic w-[300px] mb-2">
              STATEMENT OF ACKNOWLEDGMENT:
            </p>{" "}
            <p className="text-blue-950 ">
              This payment covers tuition fees otherwise known as{" "}
              <strong>School-Fees</strong> for {data?.presentTerm} period.
              Please retain this acknowledgment along with your receipt for
              future reference.
              <br />
              Should you have any questions or require further clarification,
              kindly contact the school office.
              <br />
              <br />
              Thank you for your prompt payment and continued support.
            </p>
          </div>
          <div className="border-t border-dashed border-gray-300 my-6" />

          <p className="text-center text-sm text-gray-500 italic">
            Thank you for your payment!
          </p>
        </div>
      </div>
    </div>
  );
};
