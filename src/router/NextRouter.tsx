import { createBrowserRouter } from "react-router-dom";
import TeacherLayout from "../mainPage/TeamScreen/NextSuperAdmin/components/layout/TeacherLayout";
import DashboardDisplay from "../mainPage/TeamScreen/NextSuperAdmin/siderRoutePages/DashboardDisplay";
import TotalSchools from "../mainPage/TeamScreen/NextSuperAdmin/siderRoutePages/TotalSchools";
import TotalStudents from "../mainPage/TeamScreen/NextSuperAdmin/siderRoutePages/TotalStudents";
import Finances from "../mainPage/TeamScreen/NextSuperAdmin/siderRoutePages/Finances";
import Feedbacks from "../mainPage/TeamScreen/NextSuperAdmin/siderRoutePages/Feedbacks";
import Reports from "../mainPage/TeamScreen/NextSuperAdmin/siderRoutePages/Reports";
import Settings from "../mainPage/TeamScreen/NextSuperAdmin/siderRoutePages/Settings";
import Daisy from "../mainPage/TeamScreen/DaisyComponents/Daisy";

export const NextRouter = createBrowserRouter([
  {
    path: "/team-account",
    element: <TeacherLayout />,
    children: [
      {
        index: true,
        element: <DashboardDisplay />,
      },
      {
        path: "main-dashboard",
        element: <DashboardDisplay />,
      },
      {
        path: "total-schools",
        element: <TotalSchools />,
      },
      {
        path: "total-students",
        element: <TotalStudents />,
      },
      {
        path: "finances",
        element: <Finances />,
      },
      {
        path: "feedbacks",
        element: <Feedbacks />,
      },
      {
        path: "reports",
        element: <Reports />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
  {
    path: "/daisy",
    element: <Daisy />,
  },
]);
