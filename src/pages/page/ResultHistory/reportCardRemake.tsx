import { useState } from "react";

const LagosReportCard = () => {
  // Student data
  const [studentData] = useState({
    name: "Adebayo Oluwaseun",
    class: "SS2A",
    term: "First Term",
    session: "2023/2024",
    admissionNumber: "LAG/2021/0456",
    attendance: {
      present: 85,
      absent: 5,
      total: 90,
    },
  });

  // Academic performance data
  const [subjects] = useState([
    { name: "English Language", score: 85, grade: "B", remark: "Very Good" },
    { name: "Mathematics", score: 92, grade: "A", remark: "Excellent" },
    { name: "Physics", score: 78, grade: "C", remark: "Good" },
    { name: "Chemistry", score: 88, grade: "B", remark: "Very Good" },
    { name: "Biology", score: 90, grade: "A", remark: "Excellent" },
    { name: "Economics", score: 82, grade: "B", remark: "Very Good" },
    { name: "Geography", score: 76, grade: "C", remark: "Good" },
    { name: "Civic Education", score: 94, grade: "A", remark: "Excellent" },
    { name: "Yoruba", score: 80, grade: "B", remark: "Very Good" },
    { name: "Computer Studies", score: 86, grade: "B", remark: "Very Good" },
  ]);

  // Skills assessment
  const [skills] = useState([
    { name: "Punctuality", rating: 4 },
    { name: "Neatness", rating: 5 },
    { name: "Attentiveness", rating: 4 },
    { name: "Participation", rating: 3 },
    { name: "Homework", rating: 4 },
    { name: "Teamwork", rating: 5 },
  ]);

  // Comments
  const [comments] = useState({
    classTeacher:
      "Adebayo has shown significant improvement this term. He is diligent and participates actively in class. Keep up the good work!",
    headTeacher:
      "Excellent performance overall. Adebayo demonstrates strong leadership qualities among his peers.",
    parent:
      "We are proud of Adebayo's progress. We appreciate the teachers' efforts and will continue to support his education at home.",
  });

  // Overall performance
  const [performance] = useState({
    totalScore: 851,
    average: 85.1,
    position: "3rd",
    nextTermBegins: "September 18, 2023",
  });

  // State for expanded comments
  const [showComments, setShowComments] = useState(false);

  // Calculate grade color
  const getGradeColor = (grade: string) => {
    switch (grade) {
      case "A":
        return "bg-green-100 text-green-800";
      case "B":
        return "bg-blue-100 text-blue-800";
      case "C":
        return "bg-yellow-100 text-yellow-800";
      case "D":
        return "bg-orange-100 text-orange-800";
      case "F":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Render star rating
  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-4 h-4 ${
              i < rating ? "text-yellow-400" : "text-gray-300"
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-green-800 text-white p-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="bg-white p-2 rounded-lg mr-4">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Lagos Secondary School</h1>
                <p className="text-green-100">Excellence in Education</p>
              </div>
            </div>
            <div className="text-center md:text-right">
              <h2 className="text-xl font-semibold">End of Term Report Card</h2>
              <p className="text-green-100">
                {studentData.term} • {studentData.session}
              </p>
            </div>
          </div>
        </div>

        {/* Student Info */}
        <div className="p-6 border-b border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Student Information
              </h3>
              <div className="space-y-2">
                <div className="flex">
                  <span className="w-32 text-gray-600">Name:</span>
                  <span className="font-medium">{studentData.name}</span>
                </div>
                <div className="flex">
                  <span className="w-32 text-gray-600">Class:</span>
                  <span className="font-medium">{studentData.class}</span>
                </div>
                <div className="flex">
                  <span className="w-32 text-gray-600">Admission No:</span>
                  <span className="font-medium">
                    {studentData.admissionNumber}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Attendance
              </h3>
              <div className="space-y-2">
                <div className="flex">
                  <span className="w-32 text-gray-600">Days Present:</span>
                  <span className="font-medium text-green-600">
                    {studentData.attendance.present}
                  </span>
                </div>
                <div className="flex">
                  <span className="w-32 text-gray-600">Days Absent:</span>
                  <span className="font-medium text-red-600">
                    {studentData.attendance.absent}
                  </span>
                </div>
                <div className="flex">
                  <span className="w-32 text-gray-600">Total School Days:</span>
                  <span className="font-medium">
                    {studentData.attendance.total}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Academic Performance */}
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Academic Performance
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subject
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Score
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Grade
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Remark
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {subjects.map((subject, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                      {subject.name}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-center text-gray-900 font-semibold">
                      {subject.score}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-center">
                      <span
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getGradeColor(
                          subject.grade
                        )}`}
                      >
                        {subject.grade}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {subject.remark}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Skills Assessment */}
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Skills Assessment
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="flex items-center p-3 bg-gray-50 rounded-lg"
              >
                <span className="text-sm font-medium text-gray-700 w-24">
                  {skill.name}
                </span>
                <div className="ml-2">{renderStars(skill.rating)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Overall Performance */}
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Overall Performance
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <p className="text-sm text-gray-600">Total Score</p>
              <p className="text-2xl font-bold text-green-700">
                {performance.totalScore}
              </p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <p className="text-sm text-gray-600">Average</p>
              <p className="text-2xl font-bold text-blue-700">
                {performance.average}%
              </p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg text-center">
              <p className="text-sm text-gray-600">Position</p>
              <p className="text-2xl font-bold text-yellow-700">
                {performance.position}
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <p className="text-sm text-gray-600">Next Term Begins</p>
              <p className="text-lg font-bold text-purple-700">
                {performance.nextTermBegins}
              </p>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="p-6 border-b border-gray-200">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => setShowComments(!showComments)}
          >
            <h3 className="text-lg font-semibold text-gray-800">
              Teacher's Comments
            </h3>
            <svg
              className={`w-5 h-5 text-gray-500 transform transition-transform ${
                showComments ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>

          {showComments && (
            <div className="mt-4 space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-800 mb-1">
                  Class Teacher
                </h4>
                <p className="text-gray-600 text-sm">{comments.classTeacher}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-800 mb-1">Head Teacher</h4>
                <p className="text-gray-600 text-sm">{comments.headTeacher}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-800 mb-1">
                  Parent's Comment
                </h4>
                <p className="text-gray-600 text-sm">{comments.parent}</p>
              </div>
            </div>
          )}
        </div>

        {/* Signatures */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="border-b border-gray-300 pb-8 mb-2">
                <p className="text-sm text-gray-600">Class Teacher</p>
              </div>
              <p className="text-sm text-gray-500">Mr. Adekunle</p>
            </div>
            <div className="text-center">
              <div className="border-b border-gray-300 pb-8 mb-2">
                <p className="text-sm text-gray-600">Head Teacher</p>
              </div>
              <p className="text-sm text-gray-500">Mrs. Okonjo</p>
            </div>
            <div className="text-center">
              <div className="border-b border-gray-300 pb-8 mb-2">
                <p className="text-sm text-gray-600">Parent/Guardian</p>
              </div>
              <p className="text-sm text-gray-500">Signature</p>
            </div>
          </div>

          <div className="mt-8 text-center text-sm text-gray-500">
            <p>
              Lagos Secondary School • 123 Education Avenue, Lagos •
              www.lagossecondary.edu.ng
            </p>
            <p className="mt-1">
              Generated on: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LagosReportCard;
