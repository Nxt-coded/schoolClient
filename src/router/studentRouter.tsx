import React, { Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

import LoadingScreen from "../pagesForStudents/static/LoadingScreen";
import { Fallback } from "../components/static/error/Fallbacks";
import { ErrorBoundary } from "react-error-boundary";
import FinalMidTestScreenReport from "@/pagesForStudents/pages/quiz/FinalMidTestScreenReport";
import CourseDetail from "@/pagesForStudents/screen/CourseDetail";
import LearnScreen from "@/pagesForStudents/pages/learning/LearnScreen";
import MyClassRoomTestExamScreen from "@/pagesForStudents/pages/testExam/MyClassRoom";
import ReportCardTemplateOne from "@/pagesForStudents/pages/CardTemplate/ReportCardTemplateOne";
// import MyClassRoomTestExamScreen from "../pagesForStudents/pages/class/MyClassRoom";
// import MidTestReportScreen from "@/pagesForStudents/pages/CardTemplate/midTest/MidTestReportScreen";

// const OtherPayments = React.lazy(
//   () => import("../pagesForStudents/schoolFee/OtherPaymentRecipt")
// );

const MidTestReportScreen = React.lazy(
  () =>
    import("@/pagesForStudents/pages/CardTemplate/midTest/MidTestReportScreen")
);

const MidTestScreen = React.lazy(
  () => import("@/pagesForStudents/pages/quiz/MidTestScreen")
);

const OtherPaymentRecipt = React.lazy(
  () => import("../pagesForStudents/schoolFee/OtherPaymentRecipt")
);

const ConfirmPaymentRecipt = React.lazy(
  () => import("../pagesForStudents/schoolFee/DownloadTest")
);

const PrintReportCardScreen = React.lazy(
  () => import("../pagesForStudents/pages/CardTemplate/PrintScreen")
);

const Correction = React.lazy(
  () => import("../pagesForStudents/pages/CBT_SS3/Correction")
);

const SchoolFeePaidScreen = React.lazy(
  () => import("../pagesForStudents/schoolFee/SchoolFeePaidScreen")
);

const DownloadTest = React.lazy(
  () => import("../pagesForStudents/schoolFee/DownloadTest")
);

const PrintReportCard = React.lazy(
  () => import("../pagesForStudents/pages/CardTemplate/PrintReportCard")
);

const Finances = React.lazy(
  () => import("../pagesForStudents/pages/Finances/Finances")
);

const ExaminationTestScreen = React.lazy(
  () => import("../pagesForStudents/pages/quiz/ExaminationScreen")
);

const StudentProfile = React.lazy(
  () => import("../pagesForStudents/StudentProfile")
);
const QuizResultScreen = React.lazy(
  () => import("../pagesForStudents/pages/quiz/QuizResultScreen")
);
const ReportCardPrint = React.lazy(
  () => import("../pagesForStudents/pages/CardTemplate/ReportCardPrint")
);
//
const SchoolFeesHistoryScreenStudent = React.lazy(
  () => import("../pagesForStudents/pages/screens/SchoolFeeHistory")
);

const PurchaseHistory = React.lazy(
  () => import("../pagesForStudents/pages/store/PurchaseHistory")
);

const CardReportHistory = React.lazy(
  () => import("../pagesForTeachers/pages/Result/CardReport")
);

const StudentDashboard = React.lazy(
  () => import("../pagesForStudents/StudentDashboard")
);

const Assignment = React.lazy(() => import("../pagesForStudents/Assignment"));
const Article = React.lazy(() => import("../pagesForStudents/Article"));
const TimeTable = React.lazy(() => import("../pagesForStudents/TimeTable"));

const StudentSettings = React.lazy(
  () => import("../pagesForStudents/Settings/StudentSettings")
);

const Layout = React.lazy(() => import("../pagesForStudents/layout/Layout"));
// import Layout from "../pagesForStudents/layout/Layout";
const MyClassroom = React.lazy(
  () => import("../pagesForStudents/pages/subjects/Subject")
);

const QuizSetupScreen = React.lazy(
  () => import("../pagesForStudents/pages/quiz/QuizSetupScreen")
);
const QuizRecordScreen = React.lazy(
  () => import("../pagesForStudents/pages/quiz/QuizRecordScreen")
);
const QuizTestScreen = React.lazy(
  () => import("../pagesForStudents/pages/quiz/QuizTestScreen")
);
const MyClassRoomScreen = React.lazy(
  () => import("../pagesForStudents/pages/class/MyClassRoom")
);
const ReportScreen = React.lazy(
  () => import("../pagesForStudents/pages/report/ReportScreen")
);
const ClassLessonNote = React.lazy(
  () => import("../pagesForStudents/pages/studentNote/StudentNote")
);
const ViewClassNoteDetail = React.lazy(
  () => import("../pagesForStudents/pages/studentNote/ViewNotes")
);

const CreateArticle = React.lazy(
  () => import("../pagesForStudents/pages/article/CreateArticle")
);

const StudentGalleryScreen = React.lazy(
  () => import("../pagesForStudents/pages/Gallary/GallaryScreen")
);

const ViewReport = React.lazy(
  () => import("../pagesForStudents/pages/complain/ViewReport")
);
const PassQuestionQuiz = React.lazy(
  () => import("../pagesForStudents/pages/CBT_SS3/PassQuestionQuiz")
);
const PastQuestionScreen = React.lazy(
  () => import("../pagesForStudents/pages/CBT_SS3/PastQuestionScreen")
);
const PastQuestionYears = React.lazy(
  () => import("../pagesForStudents/pages/CBT_SS3/PastQuestionYears")
);
const QuizHistory = React.lazy(
  () => import("../pagesForStudents/pages/quiz/QuizHistory")
);

const ViewStoreItems = React.lazy(
  () => import("../pagesForStudents/pages/store/ViewStoreItems")
);

export const studentRouter = createBrowserRouter([
  {
    path: "/index.html",
    element: <Navigate to="/" replace />,
  },
  {
    path: "/",
    element: (
      <Suspense fallback={<LoadingScreen />}>
        <Layout />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <StudentDashboard />{" "}
          </Suspense>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <StudentDashboard />
          </Suspense>
        ),
      },
      {
        path: "/mid",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <ErrorBoundary FallbackComponent={Fallback}>
              <MidTestReportScreen />
            </ErrorBoundary>
          </Suspense>
        ),
      },
      {
        path: "/download-result",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <ErrorBoundary FallbackComponent={Fallback}>
              <PrintReportCardScreen />
            </ErrorBoundary>
          </Suspense>
        ),
      },

      {
        path: "/learning",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <ErrorBoundary FallbackComponent={Fallback}>
              <LearnScreen />
            </ErrorBoundary>
          </Suspense>
        ),
      },

      {
        path: "/learning/:courseID",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <ErrorBoundary FallbackComponent={Fallback}>
              <CourseDetail />
            </ErrorBoundary>
          </Suspense>
        ),
      },

      {
        path: "/print-result",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <ErrorBoundary FallbackComponent={Fallback}>
              <ReportCardTemplateOne />
            </ErrorBoundary>
          </Suspense>
        ),
      },

      {
        path: "/print-result-one",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <ErrorBoundary FallbackComponent={Fallback}>
              <PrintReportCard />
            </ErrorBoundary>
          </Suspense>
        ),
      },
      {
        path: "/print-result1",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <ReportCardPrint />
          </Suspense>
        ),
      },
      {
        path: "/school-fee-history",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <SchoolFeesHistoryScreenStudent />
          </Suspense>
        ),
      },

      {
        path: "/purchase-history",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <PurchaseHistory />
          </Suspense>
        ),
      },
      {
        path: "/store",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            {" "}
            <ViewStoreItems />
          </Suspense>
        ),
      },
      // {
      //   path: "/make-other-payments",
      //   element: (
      //     <Suspense fallback={<LoadingScreen />}>
      //       <OtherPayments />
      //     </Suspense>
      //   ),
      // },
      {
        path: "/result",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <CardReportHistory />
          </Suspense>
        ),
      },
      {
        path: "/my-finances",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <Finances />
          </Suspense>
        ),
      },
      {
        path: "/time-table",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <TimeTable />
          </Suspense>
        ),
      },
      {
        path: "/your-profile",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <StudentProfile />
          </Suspense>
        ),
      },
      {
        path: "/your-settings",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <StudentSettings />
          </Suspense>
        ),
      },
      {
        path: "/my-classroom",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <MyClassRoomScreen />
          </Suspense>
        ),
      },
      {
        path: "/my-classroom-test-exam",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <MyClassRoomTestExamScreen />
          </Suspense>
        ),
      },
      {
        path: "/lesson",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <ClassLessonNote />
          </Suspense>
        ),
      },
      {
        path: "/lesson/:noteID",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            {" "}
            <ViewClassNoteDetail />
          </Suspense>
        ),
      },
      {
        path: "/quiz-result/:quizID",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            {" "}
            <QuizResultScreen />
          </Suspense>
        ),
      },
      {
        path: "/confirm-quiz-take/:studentID",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            {" "}
            <FinalMidTestScreenReport />
          </Suspense>
        ),
      },
      {
        path: "/gallary",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <StudentGalleryScreen />
          </Suspense>
        ),
      },
      {
        path: "/articles",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <Article />
          </Suspense>
        ),
      },
      {
        path: "/articles/:view",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <Article />
          </Suspense>
        ),
      },
      {
        path: "/create-article",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <CreateArticle />
          </Suspense>
        ),
      },
      {
        path: "/your-subjects",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <MyClassroom />
          </Suspense>
        ),
      },
      {
        path: "subjects/:subjectID",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <QuizSetupScreen />
          </Suspense>
        ),
      },
      {
        path: "/examination/details/:examID",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <ExaminationTestScreen />
          </Suspense>
        ),
      },
      {
        path: "/mid-test/details/:subjectID/:midTestID",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <MidTestScreen />
          </Suspense>
        ),
      },
      {
        path: "/quiz/details/:quizID",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <QuizTestScreen />
          </Suspense>
        ),
      },
      {
        path: "/quiz-record/:studentID",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <QuizRecordScreen />
          </Suspense>
        ),
      },
      {
        path: "/assignment",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <Assignment />
          </Suspense>
        ),
      },
      {
        path: "history/cbt",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <QuizHistory />
          </Suspense>
        ),
      },
      {
        path: "/CBT",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <PassQuestionQuiz />
          </Suspense>
        ),
      },
      {
        path: "/CBT/:subject/:year",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <PastQuestionScreen />
          </Suspense>
        ),
      },
      {
        path: "/CBT/:subject",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <PastQuestionYears />
          </Suspense>
        ),
      },
      {
        path: "/:subject/:year/:cbtID",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <Correction />
          </Suspense>
        ),
      },
      {
        path: "/report",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <ReportScreen />
          </Suspense>
        ),
      },
      {
        path: "/complain",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <ViewReport />
          </Suspense>
        ),
      },
    ],
  },

  {
    path: "/school-fee-payment1",
    element: (
      <Suspense fallback={<LoadingScreen />}>
        <SchoolFeePaidScreen />
      </Suspense>
    ),
  },
  {
    path: "/school-fee-payment",
    element: (
      <Suspense fallback={<LoadingScreen />}>
        <ConfirmPaymentRecipt />
      </Suspense>
    ),
  },
  {
    path: "/other-school-payment",
    element: (
      <Suspense fallback={<LoadingScreen />}>
        <OtherPaymentRecipt />
      </Suspense>
    ),
  },
]);
