import React, { Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import ClockingScreen from "../pages/page/clocking/ClockingScreen";

const PersonalSetting = React.lazy(
  () => import("../pages/page/settings/PersonalSetting")
);
const PersonalInfoScreen = React.lazy(
  () => import("../pages/page/settings/PersonalInfoScreen")
);
const SettingScreen = React.lazy(
  () => import("../pages/page/settings/Setting")
);
const StudentDetail = React.lazy(
  () => import("../pages/page/student/StudentDetail")
);
const StaffDetail = React.lazy(() => import("../pages/page/staff/StaffDetail"));
const ViewStaffScreen = React.lazy(
  () => import("../pages/page/staff/ViewStaffScreen")
);
const ViewStudent = React.lazy(
  () => import("../pages/page/student/ViewStudent")
);
const ViewReport = React.lazy(() => import("../pages/page/report/ViewReport"));
const HomeView = React.lazy(() => import("../pages/home/HomeView"));
const HomeScreen = React.lazy(() => import("../pages/home/HomeScreen"));

const Layout = React.lazy(() => import("../components/layout/Layout"));
const MakeShift = React.lazy(() => import("./MakeShift"));

const SuccessPage = React.lazy(
  () => import("../pages/page/payment/SuccessPage")
);

const PrivateRouter = React.lazy(() => import("./PrivateRouter"));

const SessionHistory = React.lazy(
  () => import("../pages/page/ResultHistory/SessionHistory")
);

const SuccessfulPaymentScreen = React.lazy(
  () => import("../pages/page/payment/PaymentSuccessfulScreen")
);

const SMSPaymentSuccess = React.lazy(
  () => import("../pages/page/payment/SMSPaymentSuccess")
);

const DownloadTest = React.lazy(
  () => import("../pages/page/payment/DownloadTest")
);

const AllExpenditures = React.lazy(
  () => import("../pages/page/expenditure/AllExpenditures")
);

const SchemeDetails = React.lazy(
  () =>
    import(
      "../mainPage/TeamScreen/NextSuperAdmin/siderRoutePages/SchemeOfWork/SchemeDetails"
    )
);

const SchemeOfWorkTable = React.lazy(
  () =>
    import(
      "../mainPage/TeamScreen/NextSuperAdmin/siderRoutePages/SchemeOfWork/SchemeOfWork"
    )
);

const ReportCardDesignAdminScreen = React.lazy(
  () => import("../pages/page/ResultHistory/ViewingStudentRecportCard")
);

const ViewHistoricalResult = React.lazy(
  () => import("../pages/page/ResultHistory/ViewHistoricalResult")
);

const Expenditure = React.lazy(
  () => import("../pages/page/expenditure/expenditure")
);

const AllArticle = React.lazy(
  () => import("../pages/home/screens/AllArticles")
);

const TimeTableSettingsScreen = React.lazy(
  () => import("../pages/page/settings/TimeTableSettings")
);
const ClassReportCardReady = React.lazy(
  () => import("../pages/page/ResultHistory/ClassReportReady")
);

const ClassMidTermReady = React.lazy(
  () => import("../pages/page/ResultHistory/ClassMidTermReady")
);

const ReportCardApproved = React.lazy(
  () => import("../pages/page/ResultHistory/ReportCard")
);

const MidReportCardApproved = React.lazy(
  () => import("../pages/page/ResultHistory/MidReportCard")
);

const ResultDetailClass = React.lazy(
  () => import("../pages/page/ResultHistory/ResultDetailClass")
);

const SchoolFeesHistoryScreen = React.lazy(
  () => import("../pages/page/payment/SchoolPaymentScreen")
);

const PurchaseHistoryScreen = React.lazy(
  () => import("../pages/page/store/PurchasedStores")
);

const StudentResult = React.lazy(
  () => import("../pages/page/ResultHistory/StudentResult")
);
const ReadClassStudentResult = React.lazy(
  () => import("../pages/page/ResultHistory/ReadClassStudentResult")
);
const Result = React.lazy(() => import("../pages/page/ResultHistory/Result"));
const LoadingScreen = React.lazy(
  () => import("../components/static/LoadingScreen")
);
const ThirdScreen = React.lazy(() => import("../pages/home/start/ThirdStep"));
const SecondStep = React.lazy(() => import("../pages/home/start/SecondStep"));
const ClassRoomScreen = React.lazy(
  () => import("../pages/page/class/ClassRoomScreen")
);
const ClassDetailScreen = React.lazy(
  () => import("../pages/page/class/ClassDetailScreen")
);
const ViewSubjects = React.lazy(
  () => import("../pages/page/subject/ViewSubject")
);
const AdminLessonNote = React.lazy(
  () => import("../pages/page/less/LessonNote")
);
const ViewTeacherNoteByAdmin = React.lazy(
  () => import("../pages/page/less/ViewTeacherNote")
);
const ViewSchoolSettings = React.lazy(
  () => import("../pages/page/settings/ViewSchoolSettings")
);
const SchoolTheme = React.lazy(
  () => import("../pages/page/settings/SchoolTheme")
);
const GallerySettings = React.lazy(
  () => import("../pages/page/settings/GallerySettings")
);
const GallaryScreen = React.lazy(
  () => import("../pages/page/gallary/GallaryScreen")
);
const ThemeScreen = React.lazy(
  () => import("../pages/page/settings/ThemeScreen")
);
const TestGallary = React.lazy(
  () => import("../pages/page/gallary/TestGallary")
);

const ViewStoreItems = React.lazy(
  () => import("../pages/page/store/ViewStoreItems")
);

const OtherPaymentRecipt = React.lazy(
  () => import("../pagesForStudents/schoolFee/OtherPaymentRecipt")
);

const AdminPrintReportCardScreen = React.lazy(
  () => import("../pages/page/ResultHistory/ViewStudentPrintResultScreen")
);

// const AdminSubjectGradeCard = React.lazy(
//   () => import("../pages/page/subject/AdminGradeExam")
// );

const AdminSubjectGradeCardScreen = React.lazy(
  () => import("@/pages/page/subject/AdminGradeScreen")
);

const AnalyticScreen = React.lazy(
  () => import("@/pages/page/analytics/AnalyticsScreen")
);

import { ErrorBoundary } from "react-error-boundary";
import { Fallback } from "../components/static/error/Fallbacks";
import ViewAllStudentResult from "@/pages/page/resultOption/ViewAllResults";
import StudentResultsDetail from "@/pages/page/resultOption/InputStudentsScore";
import PrintReportCardDesignAdminScreen from "@/pages/page/resultOption/PrintStudentHistoryResult";
import QuizSetupScreen from "@/pagesForTeachers/pages/quiz/QuizDetails";
import ExamQuizSetupScreen from "@/pages/page/quizArea/QuizArea";
import CreateMidQuizScreen from "@/pages/page/quizArea/CreateMidQuiz";
import CreateExaminationScreen from "@/pages/page/quizArea/CreateExamination";
import ExamResultSetupRecordScreen from "@/pages/page/quizArea/ExamResultPerformance";
import MidTestResultPerformanceScreen from "@/pages/page/quizArea/MidTestResultPerformance";
import ExaminationPreviewScreen from "@/pages/page/quizArea/ExaminationPreview";
import MidTestPreviewScreen from "@/pages/page/quizArea/MidTestPreviewScreen";

import SubjectGradeCard from "@/pages/page/subject/SubjectGradeCard";
import MidTestSubjectGradeCardAdmin from "@/pages/page/subject/AdminGradeExamination";
import AdminReportCardTemplateOne from "@/pages/page/ResultHistory/ReportCardTemplateOne";

const BroadSheetReportCardApproved = React.lazy(
  () => import("@/pages/page/ResultHistory/BoardSheet")
);
export const adminRouter = createBrowserRouter([
  {
    path: "/index.html",
    element: <Navigate to="/" replace />,
  },
  {
    path: "/",
    element: (
      <Suspense fallback={<LoadingScreen />}>
        <PrivateRouter>
          <MakeShift />
        </PrivateRouter>
      </Suspense>
    ),
    children: [
      {
        path: "successful-payment-screen",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <SuccessPage />
          </Suspense>
        ),
      },

      {
        path: "sms-payment-success",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <SMSPaymentSuccess />
          </Suspense>
        ),
      },

      {
        path: "other-school-payment",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <OtherPaymentRecipt />
          </Suspense>
        ),
      },

      {
        path: "test-payment",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <SuccessfulPaymentScreen />
          </Suspense>
        ),
      },
      {
        path: ":token/successful-payment",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <DownloadTest />
          </Suspense>
        ),
      },

      {
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <Layout />
          </Suspense>
        ),

        children: [
          {
            element: (
              <Suspense fallback={<LoadingScreen />}>
                <HomeScreen />
              </Suspense>
            ),
            children: [
              {
                index: true,
                element: (
                  <Suspense fallback={<LoadingScreen />}>
                    <HomeView />
                  </Suspense>
                ),
              },
              {
                index: true,
                path: "dashboard",
                element: (
                  <Suspense fallback={<LoadingScreen />}>
                    <HomeView />
                  </Suspense>
                ),
              },
            ],
          },

          {
            path: "admin-test-exam-grade/:subjectID/:quizID",
            element: (
              <Suspense fallback={<LoadingScreen />}>
                <MidTestSubjectGradeCardAdmin />
              </Suspense>
            ),
          },

          // {
          //   path: "admin-test-exam-grade/:subjectID",
          //   element: (
          //     <Suspense fallback={<LoadingScreen />}>
          //       <AdminSubjectGradeCard />
          //     </Suspense>
          //   ),
          // },

          {
            path: "admin-test-exam-grade/:subjectID/",
            element: (
              <Suspense fallback={<LoadingScreen />}>
                <SubjectGradeCard />
              </Suspense>
            ),
          },

          {
            path: "view-students-report-card/:studentID",
            element: (
              <Suspense fallback={<LoadingScreen />}>
                <ErrorBoundary FallbackComponent={Fallback}>
                  <AdminReportCardTemplateOne />
                </ErrorBoundary>
              </Suspense>
            ),
          },

          {
            path: "view-students-report-card-one/:studentID",
            element: (
              <Suspense fallback={<LoadingScreen />}>
                <ErrorBoundary FallbackComponent={Fallback}>
                  <ReportCardDesignAdminScreen />
                </ErrorBoundary>
              </Suspense>
            ),
          },

          {
            path: "view-students-report-card-historical/:studentID",
            element: (
              <Suspense fallback={<LoadingScreen />}>
                <ErrorBoundary FallbackComponent={Fallback}>
                  <ViewHistoricalResult />
                </ErrorBoundary>
              </Suspense>
            ),
          },

          {
            path: "print-students-historical-report-card/:studentID/:id",
            element: (
              <Suspense fallback={<LoadingScreen />}>
                <ErrorBoundary FallbackComponent={Fallback}>
                  <PrintReportCardDesignAdminScreen />
                </ErrorBoundary>
              </Suspense>
            ),
          },

          {
            path: "download-students-report-card/:studentID",
            element: (
              <Suspense fallback={<LoadingScreen />}>
                <ErrorBoundary FallbackComponent={Fallback}>
                  <AdminPrintReportCardScreen />
                </ErrorBoundary>
              </Suspense>
            ),
          },

          {
            index: true,
            path: "school-fees-history",
            element: (
              <Suspense fallback={<LoadingScreen />}>
                {" "}
                <SchoolFeesHistoryScreen />
              </Suspense>
            ),
          },
          {
            index: true,
            path: "test",
            element: (
              <Suspense fallback={<LoadingScreen />}>
                {" "}
                <TestGallary />
              </Suspense>
            ),
          },

          {
            index: true,
            path: "lesson-note",
            element: (
              <Suspense fallback={<LoadingScreen />}>
                <AdminLessonNote />
              </Suspense>
            ),
          },
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
            index: true,
            path: "expenditures",
            element: (
              <Suspense fallback={<LoadingScreen />}>
                <AllExpenditures />
              </Suspense>
            ),
          },
          {
            index: true,
            path: "result-history/:session/:term",
            element: (
              <Suspense fallback={<LoadingScreen />}>
                <Result />
              </Suspense>
            ),
          },
          {
            index: true,
            path: "result-history/:termID/student-result/:ID",
            element: (
              <Suspense fallback={<LoadingScreen />}>
                <StudentResult />
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
            index: true,
            path: "result-history/:termID/:session/:term",
            element: (
              <Suspense fallback={<LoadingScreen />}>
                <Result />
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
            path: "mid-test-preview-details/:subjectID/:quizID",
            element: (
              <Suspense fallback={<LoadingScreen />}>
                {/* <div>Start</div> */}
                <MidTestPreviewScreen />
              </Suspense>
            ),
          },

          {
            index: true,
            path: "result-history/:termID/:session/:term/student-result/:ID",
            element: (
              <Suspense fallback={<LoadingScreen />}>
                <ResultDetailClass />
              </Suspense>
            ),
          },
          // *****
          {
            index: true,
            path: "class-result-approve/:classID",
            element: (
              <Suspense fallback={<LoadingScreen />}>
                <ReportCardApproved />
              </Suspense>
            ),
          },
          {
            index: true,
            path: "class-broad-sheet-result-approve/:classID",
            element: (
              <Suspense fallback={<LoadingScreen />}>
                <BroadSheetReportCardApproved />
              </Suspense>
            ),
          },
          {
            index: true,
            path: "class-midresult-approve/:classID",
            element: (
              <Suspense fallback={<LoadingScreen />}>
                <MidReportCardApproved />
              </Suspense>
            ),
          },
          {
            index: true,
            path: "student-result/",
            element: (
              <Suspense fallback={<LoadingScreen />}>
                <StudentResult />
              </Suspense>
            ),
          },

          {
            path: "purchase-history",
            element: (
              <Suspense fallback={<LoadingScreen />}>
                <PurchaseHistoryScreen />
              </Suspense>
            ),
          },

          {
            index: true,
            path: "class-report-card-ready",
            element: (
              <Suspense fallback={<LoadingScreen />}>
                <ClassReportCardReady />
              </Suspense>
            ),
          },

          {
            index: true,
            path: "class-report-mid-card",
            element: (
              <Suspense fallback={<LoadingScreen />}>
                <ClassMidTermReady />
              </Suspense>
            ),
          },

          {
            index: true,
            path: "result-history",
            element: (
              <Suspense fallback={<LoadingScreen />}>
                <SessionHistory />
              </Suspense>
            ),
          },

          {
            index: true,
            path: "/lesson-note/:noteID",
            element: (
              <Suspense fallback={<LoadingScreen />}>
                <ViewTeacherNoteByAdmin />
              </Suspense>
            ),
          },

          {
            path: "analytics",
            element: (
              <Suspense fallback={<LoadingScreen />}>
                <AnalyticScreen />
              </Suspense>
            ),
          },

          {
            index: true,
            path: "subjects",
            element: (
              <Suspense fallback={<LoadingScreen />}>
                <ViewSubjects />
              </Suspense>
            ),
          },

          {
            index: true,
            path: "subjects/:subjectID",
            element: (
              <Suspense fallback={<LoadingScreen />}>
                <ExamQuizSetupScreen />
              </Suspense>
            ),
          },

          {
            index: true,
            path: "exam/detail-record/:subjectID/:examID",
            element: (
              <Suspense fallback={<LoadingScreen />}>
                <ExamResultSetupRecordScreen />
              </Suspense>
            ),
          },

          {
            index: true,
            path: "quiz/detail-record/:subjectID/:midQuizID",
            element: (
              <Suspense fallback={<LoadingScreen />}>
                <MidTestResultPerformanceScreen />
              </Suspense>
            ),
          },

          {
            index: true,
            path: "create-mid-test/:subjectID",
            element: (
              <Suspense fallback={<LoadingScreen />}>
                <CreateMidQuizScreen />
              </Suspense>
            ),
          },

          {
            index: true,
            path: "create-examination/:subjectID",
            element: (
              <Suspense fallback={<LoadingScreen />}>
                <CreateExaminationScreen />
              </Suspense>
            ),
          },

          {
            index: true,
            path: "report",
            element: (
              <Suspense fallback={<LoadingScreen />}>
                <ViewReport />
              </Suspense>
            ),
          },
          {
            index: true,
            path: "view-student-result-history",
            element: (
              <Suspense fallback={<LoadingScreen />}>
                <ViewAllStudentResult />
              </Suspense>
            ),
          },
          {
            index: true,
            path: "viewing-student-result-history/:studentID",
            element: (
              <Suspense fallback={<LoadingScreen />}>
                <StudentResultsDetail />
              </Suspense>
            ),
          },
          {
            index: true,
            path: "view-student-result-history/:studentID",
            element: (
              <Suspense fallback={<LoadingScreen />}>
                <StudentResultsDetail />
              </Suspense>
            ),
          },
          {
            index: true,
            path: "view-students",
            element: (
              <Suspense fallback={<LoadingScreen />}>
                <ViewStudent />
              </Suspense>
            ),
          },
          {
            index: true,
            path: "scan-clocking",
            element: (
              <Suspense fallback={<LoadingScreen />}>
                <ClockingScreen />
              </Suspense>
            ),
          },
          {
            index: true,
            path: "view-staff",
            element: (
              <Suspense fallback={<LoadingScreen />}>
                <ViewStaffScreen />
              </Suspense>
            ),
          },
          {
            path: "/articles",
            element: (
              <Suspense fallback={<LoadingScreen />}>
                <AllArticle />
              </Suspense>
            ),
          },
          {
            path: "/articles/:view",
            element: (
              <Suspense fallback={<LoadingScreen />}>
                <AllArticle />
              </Suspense>
            ),
          },

          {
            index: true,
            path: "class-room",
            element: (
              <Suspense fallback={<LoadingScreen />}>
                <ClassRoomScreen />
              </Suspense>
            ),
          },
          {
            index: true,
            path: "class-room/class-details/:classID",
            element: (
              // <Suspense fallback={<LoadingScreen />}>
              //   <ClassDetailScreen />
              // </Suspense>
              <Suspense fallback={<LoadingScreen />}>
                <ErrorBoundary FallbackComponent={Fallback}>
                  <ClassDetailScreen />
                </ErrorBoundary>
              </Suspense>
            ),
          },
          {
            index: true,
            path: "view-staff/staff-details/:staffID",
            element: (
              <Suspense fallback={<LoadingScreen />}>
                {" "}
                <StaffDetail />
              </Suspense>
            ),
          },
          {
            index: true,
            path: "view-students/student-details/:studentID",
            element: (
              <Suspense fallback={<LoadingScreen />}>
                <StudentDetail />
              </Suspense>
            ),
          },

          {
            index: true,
            path: "settings",
            element: (
              <Suspense fallback={<LoadingScreen />}>
                <SettingScreen />
              </Suspense>
            ),
          },

          {
            index: true,
            path: "store",
            element: (
              <Suspense fallback={<LoadingScreen />}>
                <ViewStoreItems />
              </Suspense>
            ),
          },

          {
            index: true,
            path: "gallary",
            element: (
              <Suspense fallback={<LoadingScreen />}>
                <GallaryScreen />
              </Suspense>
            ),
          },

          {
            index: true,
            path: "class-students",
            element: (
              <Suspense fallback={<LoadingScreen />}>
                <ReadClassStudentResult />
              </Suspense>
            ),
          },

          {
            path: "my-personal-info",
            element: (
              <Suspense fallback={<LoadingScreen />}>
                {" "}
                <PersonalSetting />
              </Suspense>
            ),
            children: [
              {
                index: true,
                path: "info",
                element: (
                  <Suspense fallback={<LoadingScreen />}>
                    <PersonalInfoScreen />
                  </Suspense>
                ),
              },

              {
                index: true,
                path: "theme-settings",
                element: (
                  <Suspense fallback={<LoadingScreen />}>
                    <SchoolTheme />
                  </Suspense>
                ),
              },
              {
                index: true,
                path: "main-account-setting",
                element: (
                  <Suspense fallback={<LoadingScreen />}>
                    <ThemeScreen />
                  </Suspense>
                ),
              },
              {
                index: true,
                path: "timetable-setting",
                element: (
                  <Suspense fallback={<LoadingScreen />}>
                    <TimeTableSettingsScreen />
                  </Suspense>
                ),
              },
            ],
          },

          {
            path: "school-info",
            element: (
              <Suspense fallback={<LoadingScreen />}>
                <ViewSchoolSettings />
              </Suspense>
            ),
            children: [
              {
                index: true,
                path: "view-school-settings",
                element: (
                  <Suspense fallback={<LoadingScreen />}>
                    <ViewSchoolSettings />
                  </Suspense>
                ),
              },
            ],
          },

          {
            index: true,
            path: "view-gallery",
            element: (
              <Suspense fallback={<LoadingScreen />}>
                <GallerySettings />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },

  {
    path: "/step-two-data",
    element: (
      <Suspense fallback={<LoadingScreen />}>
        <ThirdScreen />
      </Suspense>
    ),
  },

  {
    path: "/step-third-data",
    element: (
      <Suspense fallback={<LoadingScreen />}>
        <SecondStep />
      </Suspense>
    ),
  },

  {
    path: "*",
    element: <LoadingScreen />,
  },
]);
