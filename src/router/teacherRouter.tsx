import React, { Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { Fallback } from "../components/static/error/Fallbacks";
import { ErrorBoundary } from "react-error-boundary";
import ViewWeekReport from "@/pagesForTeachers/pages/report/ViewWeekReport";
import CreatePopQuizScreen from "../pagesForTeachers/pages/quiz/CreatePopQuizData";
import TeacherRportCardTemplateOne from "@/pagesForTeachers/pages/CardTemplate/TeacherReportCardTemplateOne";

const TeacherBroadSheetReportCardApproved = React.lazy(
  () => import("@/pagesForTeachers/pages/ReportCard/TeacherClassBroadSheet")
);

const MidTestSubjectGradeCard = React.lazy(
  () => import("@/pagesForTeachers/pages/subject/MidTestGradeCard")
);

const MidTestResultPerformance = React.lazy(
  () => import("@/pagesForTeachers/pages/quiz/MidTestResultPerformance")
);

const MidTestPreviewScreen = React.lazy(
  () => import("@/pagesForTeachers/pages/quiz/MidTestPreviewScreen")
);

const CreateMidTestScreen = React.lazy(
  () => import("@/pagesForTeachers/pages/quiz/CreateMidTestScreen")
);

const TeacherPrintReportCardScreen = React.lazy(
  () => import("../pagesForTeachers/pages/CardTemplate/DownloadStudentReport")
);

const SchemeOfWorkTable = React.lazy(
  () =>
    import(
      "../mainPage/TeamScreen/NextSuperAdmin/siderRoutePages/SchemeOfWork/SchemeOfWork"
    )
);

const SchemeDetails = React.lazy(
  () =>
    import(
      "../mainPage/TeamScreen/NextSuperAdmin/siderRoutePages/SchemeOfWork/SchemeDetails"
    )
);

const QuizDetails = React.lazy(
  () => import("../pagesForTeachers/pages/quiz/QuizDetails")
);

const CreateExamination = React.lazy(
  () => import("../pagesForTeachers/pages/quiz/CreateExamination")
);

const ExaminationPreviewScreen = React.lazy(
  () => import("../pagesForTeachers/pages/quiz/ExaminationPreview")
);

const ReportCardDesignScreen = React.lazy(
  () => import("../pagesForTeachers/pages/CardTemplate/ReportCardDesignScreen")
);

const ExamResultSetupScreen = React.lazy(
  () => import("../pagesForTeachers/pages/quiz/ExamResultPerformance")
);

const EditLessonNote = React.lazy(
  () => import("../pagesForTeachers/pages/lessonNote/EditLessonNote")
);

const ReportCardPrint = React.lazy(
  () => import("../pagesForTeachers/pages/CardTemplate/ReportCardPrint")
);
const CardReport = React.lazy(
  () => import("../pagesForTeachers/pages/ReportCard/CardReport")
);
// purchased-record
const PurchaseHistoryTeacher = React.lazy(
  () => import("../pagesForTeachers/pages/store/PurchasedScreen")
);

const ResultTermDetail = React.lazy(
  () => import("../pagesForTeachers/pages/class/ResultTermDetails")
);

const ResultHistryTrack = React.lazy(
  () => import("../pagesForTeachers/pages/class/ResultHistoryTrack")
);
const TeacherDashboard = React.lazy(
  () => import("../pagesForTeachers/TeacherDashboard")
);
const LoadingScreen = React.lazy(
  () => import("../components/static/LoadingScreen")
);
const TeacherLayout = React.lazy(
  () => import("../pagesForTeachers/components/layout/TeacherLayout")
);
const Schedule = React.lazy(
  () => import("../pagesForTeachers/pages/schedule/Schedule")
);

const MyClass = React.lazy(
  () => import("../pagesForTeachers/pages/class/MyClass")
);

const Subjects = React.lazy(
  () => import("../pagesForTeachers/pages/subject/Subjects")
);

const LessonNote = React.lazy(
  () => import("../pagesForTeachers/pages/lessonNote/LessonNote")
);

const WeekReport = React.lazy(
  () => import("../pagesForTeachers/pages/report/WeekReport")
);

const ViewStoreItems = React.lazy(
  () => import("../pagesForTeachers/pages/store/ViewStoreItems")
);

const StudentDetail = React.lazy(
  () => import("../pagesForTeachers/pages/class/StudentDetail")
);

const QuizSetupScreen = React.lazy(
  () => import("../pagesForTeachers/pages/quiz/QuizSetupScreen")
);
const QuizTestScreen = React.lazy(
  () => import("../pagesForTeachers/pages/quiz/QuizTestScreen")
);
const CreateQuiz = React.lazy(
  () => import("../pagesForTeachers/pages/quiz/CreateQuiz")
);

const CreateLesson = React.lazy(
  () => import("../pagesForTeachers/pages/lessonNote/CreateLessonNote")
);
const AttendanceScreen = React.lazy(
  () => import("../pagesForTeachers/pages/attendance/AttendanceScreen")
);
const ViewTeacherNote = React.lazy(
  () => import("../pagesForTeachers/pages/lessonNote/ViewTeacherNote")
);

const Article = React.lazy(
  () => import("../pagesForTeachers/pages/article/Article")
);
const GalleryScreen = React.lazy(
  () => import("../pagesForTeachers/pages/gallary/GallaryScreen")
);
const ViewReport = React.lazy(
  () => import("../pagesForTeachers/pages/complain/ViewReport")
);
const TableTag = React.lazy(
  () => import("../pagesForTeachers/pages/ReportCard/TableTag")
);

const SubjectGradeCard = React.lazy(
  () => import("../pagesForTeachers/pages/subject/SubjectGradeCard")
);
const TeacherMainSettings = React.lazy(
  () => import("../pagesForTeachers/settings/MainSettings")
);
const MyProfile = React.lazy(
  () => import("../pagesForTeachers/pages/myProfile/MyProfile")
);

export const teacherRouter = createBrowserRouter([
  {
    path: "/index.html",
    element: <Navigate to="/" replace />,
  },
  {
    path: "/",
    element: (
      <Suspense fallback={<LoadingScreen />}>
        <TeacherLayout />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <TeacherDashboard />
          </Suspense>
        ),
      },
      {
        index: true,
        path: "complain",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <ViewReport />
          </Suspense>
        ),
      },
      {
        path: "teacher-student-report-card/:studentID",
        index: true,
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <ErrorBoundary FallbackComponent={Fallback}>
              <TeacherRportCardTemplateOne />
            </ErrorBoundary>
          </Suspense>
        ),
      },
      {
        path: "teacher-student-report-card-one/:studentID",
        index: true,
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <ErrorBoundary FallbackComponent={Fallback}>
              <ReportCardDesignScreen />
            </ErrorBoundary>
          </Suspense>
        ),
      },
      {
        path: "print-student-report-card/:studentID",
        index: true,
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <ErrorBoundary FallbackComponent={Fallback}>
              <TeacherPrintReportCardScreen />
            </ErrorBoundary>
          </Suspense>
        ),
      },
      {
        path: "/dashboard",
        index: true,
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <TeacherDashboard />
          </Suspense>
        ),
      },
      {
        path: "my-schedule",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <Schedule />
          </Suspense>
        ),
      },
      {
        path: "generate-report-card",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <ReportCardPrint />
          </Suspense>
        ),
      },
      {
        path: "my-class",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <MyClass />
          </Suspense>
        ),
      },
      {
        path: "class-result-broad-sheet/:classID",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <TeacherBroadSheetReportCardApproved />
          </Suspense>
        ),
      },
      {
        path: "my-class/student-details/:studentID",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <StudentDetail />
          </Suspense>
        ),
      },
      {
        path: "my-class/result-history",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <ResultHistryTrack />
          </Suspense>
        ),
      },
      {
        path: "my-class/result-history/:session/:term",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <ResultTermDetail />
          </Suspense>
        ),
      },
      {
        path: "subjects",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <Subjects />
          </Suspense>
        ),
      },
      {
        path: "subjects/:subjectID",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            {" "}
            <QuizSetupScreen />
          </Suspense>
        ),
      },
      {
        path: "attendance",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            {" "}
            <AttendanceScreen />
          </Suspense>
        ),
      },
      {
        path: "quiz/details/:subjectID/:quizID",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <QuizDetails />
          </Suspense>
        ),
      },
      {
        path: "exam/details/:subjectID/:quizID",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <ExamResultSetupScreen />
          </Suspense>
        ),
      },
      {
        path: "mid-test/details/:subjectID/:midQuizID",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <MidTestResultPerformance />
          </Suspense>
        ),
      },
      {
        path: "mid-test-preview-details/:subjectID/:quizID",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            {/* <div>Start</div> */}
            <MidTestPreviewScreen />
          </Suspense>
        ),
      },
      {
        path: "examination-preview-details/:subjectID/:quizID",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            {/* <div>Start</div> */}
            <ExaminationPreviewScreen />
          </Suspense>
        ),
      },

      {
        path: "create-quiz/:subjectID",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <CreatePopQuizScreen />
            {/* <CreateQuiz /> */}
          </Suspense>
        ),
      },

      {
        path: "create-mid-test/:subjectID",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <CreateMidTestScreen />
          </Suspense>
        ),
      },

      {
        path: "create-examination/:subjectID",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <CreateExamination />
          </Suspense>
        ),
      },
      {
        path: "lesson-note",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <LessonNote />
          </Suspense>
        ),
      },
      {
        path: "table-tag",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <TableTag />
          </Suspense>
        ),
      },
      {
        path: "report-card",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <CardReport />
          </Suspense>
        ),
      },
      {
        path: "final-exam-grade/:subjectID/",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <SubjectGradeCard />
          </Suspense>
        ),
      },
      {
        path: "final-exam-grade/:subjectID/:examID",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <SubjectGradeCard />
          </Suspense>
        ),
      },
      {
        path: "mid-test-grade/:subjectID/:quizID",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <MidTestSubjectGradeCard />
          </Suspense>
        ),
      },
      {
        path: "view-articles/:view",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <Article />
          </Suspense>
        ),
      },

      {
        path: "purchase-history",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <PurchaseHistoryTeacher />
          </Suspense>
        ),
      },
      {
        path: "view-articles",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <Article />
          </Suspense>
        ),
      },
      {
        path: "lesson-note/:noteID",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <ViewTeacherNote />
          </Suspense>
        ),
      },
      {
        path: "edit-lesson-note/:noteID",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <EditLessonNote />
          </Suspense>
        ),
      },

      {
        path: "create-notes",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <CreateLesson />
          </Suspense>
        ),
      },

      // Scheme of work
      {
        index: true,
        path: "schemes",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <SchemeOfWorkTable />
          </Suspense>
        ),
      },
      {
        index: true,
        path: "schemes/:className/:subjectName/:term",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <SchemeDetails />
          </Suspense>
        ),
      },

      {
        path: "store",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            {" "}
            <ViewStoreItems />
          </Suspense>
        ),
      },

      {
        path: "exams",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            {" "}
            <QuizSetupScreen />
          </Suspense>
        ),
      },

      {
        path: "Gallary",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <GalleryScreen />
          </Suspense>
        ),
      },
      {
        path: "settings",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <TeacherMainSettings />
          </Suspense>
        ),
      },
      {
        path: "my-profile",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <MyProfile />
          </Suspense>
        ),
      },

      {
        path: "week-report",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            {" "}
            <WeekReport />
          </Suspense>
        ),
      },

      {
        path: "view-weekly-report/:studentID",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            {" "}
            <ViewWeekReport />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "*",
    element: (
      <Suspense fallback={<LoadingScreen />}>
        <LoadingScreen />
      </Suspense>
    ),
  },
]);
