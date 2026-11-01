import { FC, useEffect, useRef, useState } from "react";
import pix from "../../../assets/logo.png";
import { GrDownload } from "react-icons/gr";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import moment from "moment";

interface iSchool {
  schoolName: string;
  schoolAddress: string;
  studentDetails: any;
  subjects: any;
}

const ReportCardTemplate: FC<iSchool> = ({
  schoolName,
  schoolAddress,
  studentDetails,
  subjects,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const preprocessContent = () => {
    const content = contentRef.current;
    if (!content) return;

    // Traverse the DOM and replace "oklch" color functions with a fallback color
    const elementsWithUnsupportedColors = content.querySelectorAll("*");
    elementsWithUnsupportedColors.forEach((element: HTMLElement) => {
      const computedStyles = window.getComputedStyle(element);

      // Handle text color
      if (computedStyles.color.includes("oklch")) {
        element.style.color = "#000000"; // Fallback color for text
      }

      // Handle background color
      if (computedStyles.backgroundColor.includes("oklch")) {
        element.style.backgroundColor = "#ffffff"; // Fallback color for background
      }

      // Handle border color
      if (computedStyles.borderColor.includes("oklch")) {
        element.style.borderColor = "#000000"; // Fallback color for border
      }
    });
  };

  // preprocessContent();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    preprocessContent();
  }, []);

  const downloadPDF = () => {
    const input = contentRef.current;

    if (!input) {
      console.error("No content to export");
      return;
    }

    // Use html2canvas to capture the content
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const imgWidth = 210; // A4 width in mm
        const pageHeight = 297; // A4 height in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        let heightLeft = imgHeight;
        let position = 0;

        // Add the first page
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        // Handle multiple pages if necessary
        while (heightLeft > 0) {
          position = heightLeft - imgHeight; // Move to the next page's start
          pdf.addPage();
          pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        // Save the generated PDF
        pdf.save(`webpage-${new Date().toISOString()}.pdf`);
      })
      .catch((error) => {
        console.error("Error generating PDF:", error);
      });
  };

  return (
    <div className="text-[12px] w-full min-h-screen overflow-x-auto mx-auto md:p-8 p-3 shadow-md rounded-lg flex justify-center items-center ">
      <div
        className="bg-gray-200 w-full min-h-[100vh] shadow lg:p-5"
        ref={contentRef}
      >
        <div className="h-auto md:h-[100px] w-full flex justify-center items-center gap-3 p-4">
          <div className="min-h-[100px] w-full border-b border-gray-400 flex flex-col md:flex-row gap-3 p-3 px-4">
            <div className="flex-shrink-0 w-full md:w-[25%] flex justify-center items-center">
              <img
                src={pix}
                alt=""
                className="w-full h-auto max-w-[100px] md:max-w-[150px] object-cover"
              />
            </div>
            <div className="flex-1 flex flex-col justify-center items-start text-left">
              <h1 className="font-bold text-[16px] md:text-[20px] lg:text-[27px] break-words">
                {schoolName}
              </h1>
              <p className="text-[12px] md:text-[14px] mt-1">{schoolAddress}</p>
              <div
                className="py-2 px-4 bg-blue-950 text-white flex items-center gap-2 rounded-md cursor-pointer mt-2"
                onClick={downloadPDF}
              >
                <div>
                  {loading ? "Generating PDF..." : "Download Resut as PDF"}
                </div>
                <GrDownload className="mb-1" />
              </div>
            </div>
          </div>
        </div>

        <div className="mx-4 mb-2 mt-5">
          <hr />
        </div>

        <div className="p-4 flex justify-center items-center">
          <div className="w-[90%] grid grid-cols-2 md:grid-cols-3 gap-9">
            <div>
              <p className="font-semibold">Name:</p>
              <p>{studentDetails.name}</p>
            </div>
            <div>
              <p className="font-semibold">Class:</p>
              <p>{studentDetails.class}</p>
            </div>
            <div>
              <p className="font-semibold">Roll Number:</p>
              <p>{studentDetails?.enrollmentID}</p>
            </div>
            <div>
              <p className="font-semibold">Attendance:</p>
              <p>{studentDetails?.attendance}%</p>
            </div>
            <div>
              <p className="font-semibold">Session:</p>
              <p>{studentDetails?.session}</p>
            </div>
            <div>
              <p className="font-semibold">Term:</p>
              <p>{studentDetails?.term}</p>
            </div>
          </div>
        </div>

        <div
          className="w-full flex justify-center items-center mt-7 p-4 flex-col 
        "
        >
          <div className="overflow-y-auto w-full">
            <table className="w-[100%] border-collapse border border-gray-300 overflow-y-auto">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 w-10 pl-2 text-left">
                    S/N
                  </th>
                  <th className="border border-gray-300 w-28 pl-2 text-left">
                    Subject
                  </th>
                  <th className="border border-gray-300 lg:w-36 w-full pl-2 text-left">
                    CA Test Score
                  </th>
                  <th className="border border-gray-300 w-36 pl-2 text-left">
                    Exam Score
                  </th>
                  <th className="border border-gray-300 w-64 py-2 pl-2 text-left">
                    continous Assessment
                    <table className="w-full mt-1">
                      <thead>
                        <tr className="h-full w-full font-medium">
                          <th className="w-20 border">1</th>
                          <th className="w-20 border">2</th>
                          <th className="w-20 border">3</th>
                          <th className="w-20 border">4</th>
                          <th className="w-20 border  ">T</th>
                        </tr>
                      </thead>
                    </table>
                  </th>
                  <th className="border border-gray-300 w-36 pl-2 text-left">
                    Exam No
                  </th>
                  <th className="border border-gray-300 w-20 pl-3 text-left">
                    total mark
                  </th>
                  <th className="border border-gray-300 w-20 pl-3 text-left">
                    Grade
                  </th>
                  <th className="border border-gray-300 w-20 pl-2 text-left">
                    position
                  </th>
                </tr>
              </thead>
              <tbody>
                {(subjects?.result || []).filter((el: any) => {
                  const total = (el.test1 || 0) + (el.test2 || 0) + (el.test3 || 0) + (el.test4 || 0) + (el.exam || 0);
                  return total > 0;
                }).map((props: any, i: any) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-gray-100" : ""}>
                    <td className="border border-gray-300 lg:px-6 px-8 py-3 text-[12px] lg:text-[15px]">
                      {i + 1}
                    </td>
                    <td className="border border-gray-300 lg:px-6 px-8 py-3 text-[12px] lg:text-[15px]">
                      {props.subject}
                    </td>
                    <td className="border border-gray-300 lg:px-6 px-8 py-3 text-[12px] lg:text-[15px]">
                      {`${
                        props?.test1 +
                        props?.test2 +
                        props?.test3 +
                        props?.test4
                      }/40`}
                    </td>
                    <td className="border border-gray-300 lg:px-6 px-8 py-3 text-[12px] lg:text-[15px]">
                      {`${props.exam}/60`}
                    </td>
                    <thead>
                      <tbody>
                        {/* <tr> */}
                        <td className="border lg:w-20 w-24 lg:pl-2 lg:h-12 px-3 h-24">
                          {props?.test1}
                        </td>
                        <td className="border w-20 lg:pl-2 px-3 h-12">
                          {props?.test2}
                        </td>
                        <td className="border w-20 lg:pl-2 px-3 h-12">
                          {" "}
                          {props?.test3}
                        </td>
                        <td className="border w-20 lg:pl-2 px-3 h-12">
                          {" "}
                          {props?.test4}
                        </td>
                        <td className="border w-20 lg:pl-2 px-3 h-12">
                          {props?.test1 +
                            props?.test2 +
                            props?.test3 +
                            props?.test4}
                        </td>
                        {/* </tr> */}
                      </tbody>
                    </thead>
                    <td className="border border-gray-300 lg:px-6 py-3 px-10">
                      <p className="text-[12px]">{props.exam}</p>
                    </td>
                    <td className="border border-gray-300 px-6 py-3 font-semibold">
                      {props?.test1 +
                        props?.test2 +
                        props?.test3 +
                        props?.test4 +
                        props?.exam}
                    </td>
                    <td className="border border-gray-300 px-6 py-3 font-semibold">
                      {props.grade}
                    </td>
                    <td className="border border-gray-300 px-6 py-3">
                      {props.position}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="overflow-x-auto lg:w-full">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border border-gray-300 py-2 px-3 text-left text-[10px] sm:text-[12px] md:text-[14px] lg:text-[16px]">
                    Total Mark
                  </th>
                  <th className="border border-gray-300 py-2 px-3 text-center text-[10px] sm:text-[12px] md:text-[14px] lg:text-[16px]">
                    {`${(subjects?.result || []).filter((el: any) => {
                      const total = (el.test1 || 0) + (el.test2 || 0) + (el.test3 || 0) + (el.test4 || 0) + (el.exam || 0);
                      return total > 0;
                    })
                      ?.map((el: any) => el.points)
                      .reduce(
                        (a: number, b: number) => a + b,
                        0
                      )}/${(subjects?.result || []).filter((el: any) => {
                      const total = (el.test1 || 0) + (el.test2 || 0) + (el.test3 || 0) + (el.test4 || 0) + (el.exam || 0);
                      return total > 0;
                    })
                      ?.map((el: any) => el.score)
                      .reduce((a: number, b: number) => a + b, 0)}`}
                  </th>
                  <th className="border border-gray-300 py-2 px-3 text-left text-[10px] sm:text-[12px] md:text-[14px] lg:text-[16px]">
                    {subjects?.grade}
                  </th>
                </tr>
                <tr>
                  <th className="border border-gray-300 py-2 px-3 text-left text-[10px] sm:text-[12px] md:text-[14px] lg:text-[16px]">
                    Total Percentage
                  </th>
                  <th className="border border-gray-300 py-2 px-3 text-center text-[10px] sm:text-[12px] md:text-[14px] lg:text-[16px]">
                    {subjects?.points}%
                  </th>
                </tr>
              </thead>
              <tbody>{/* Optional: Add rows if necessary */}</tbody>
            </table>
          </div>
          {/* <table className="w-[100%] border-collapse border border-gray-300 bg-gray-400 overflow-y-auto">
            <thead>
              <tr>
                <th className="border border-gray-300 w-50 py-3 text-center pl-6 font-bold">
                  Co-Schorlastic Areas
                </th>
                <th className="border border-gray-300 w-32 py-3 text-center pl-6 font-bold">
                  Grade
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th className="border bg-white border-gray-300 text-left w-50 py-3 pl-6 font-bold">
                  Readings
                </th>
                <th className="border border-gray-300 w-32 py-3 text-center pl-6 font-bold">
                  A
                </th>
              </tr>
              <tr>
                <th className="border bg-white border-gray-300 text-left w-50 py-3 pl-6 font-bold">
                  Writing
                </th>
                <th className="border border-gray-300 w-32 py-3 text-center pl-6 font-bold">
                  B
                </th>
              </tr>
              <tr>
                <th className="border bg-white border-gray-300 text-left w-50 py-3 pl-6 font-bold">
                  Speaking
                </th>
                <th className="border border-gray-300 w-32 py-3 text-center pl-6 font-bold">
                  C
                </th>
              </tr>
            </tbody>
          </table> */}
          <div className="p-4 bg-gray-200 w-full min-h-[100px] text-center font-bold lg:text-[20px] text-[15px]">
            Students's Performance Chart
          </div>

          <div className="p-4 w-full lg:h-[180px] min-h-[70px] mb-2 bg-gray-300 mt-3 border ">
            <h1 className="font-bold text-white pl-6 py-2 bg-gray-500">
              Principal's Comment
            </h1>
            <p className="lg:text-[13px] text-[15px] lg:pb-0 font-medium mt-2 text-left">
              {subjects?.adminComment}
            </p>
          </div>
          <div className="p-4 w-full lg:h-[180px] min-h-[70px] mb-12 bg-gray-400 mt-3 border ">
            <h1 className="font-bold text-white pl-6 py-2 bg-gray-500">
              Class Teacher's Comment
            </h1>
            <p className="lg:text-[13px] text-[15px] lg:pb-0 font-medium mt-2 text-left">
              {subjects?.classTeacherComment}
            </p>
          </div>
          <div className="p-4 w-full bg-gray-200 mt-3 border shadow-sm">
            <div className="w-full h-10 bg-gray-500 flex items-center pl-4">
              <h1 className="font-bold text-white text-[14px] lg:text-[20px]">
                Grade's Boundaries
              </h1>
            </div>
            <div className="p-4 w-full bg-gray-200">
              <p className="text-[12px] lg:text-[14px] font-medium pt-2 flex flex-wrap gap-2 lg:gap-4 pl-3">
                <span className="font-bold text-[14px] lg:text-[17px]">
                  A:{" "}
                  <span className="font-medium text-[12px] lg:text-[15px]">
                    100-80
                  </span>
                </span>
                <span className="font-bold text-[14px] lg:text-[17px]">
                  B:{" "}
                  <span className="font-medium text-[12px] lg:text-[15px]">
                    79-70
                  </span>
                </span>
                <span className="font-bold text-[14px] lg:text-[17px]">
                  C:{" "}
                  <span className="font-medium text-[12px] lg:text-[15px]">
                    69-60
                  </span>
                </span>
                <span className="font-bold text-[14px] lg:text-[17px]">
                  D:{" "}
                  <span className="font-medium text-[12px] lg:text-[15px]">
                    59-50
                  </span>
                </span>
                <span className="font-bold text-[14px] lg:text-[17px]">
                  E:{" "}
                  <span className="font-medium text-[12px] lg:text-[15px]">
                    49-40
                  </span>
                </span>
                <span className="font-bold text-[14px] lg:text-[17px]">
                  F:{" "}
                  <span className="font-medium text-[12px] lg:text-[15px]">
                    39-0
                  </span>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportCardTemplate;
