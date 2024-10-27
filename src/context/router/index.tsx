import NavFrame from "@/components/NavFrame";
import AllAchievementsPage from "@/pages/AllAchievements";
import AllSaintsPage from "@/pages/AllSaints";
import AllTeachingsPage from "@/pages/AllTeachings";
import BiblePage from "@/pages/Bible";
import BibleReadPage from "@/pages/BibleRead";
import HomePage from "@/pages/Home";
import ProfilePage from "@/pages/Profile";
import QuestionAnswersPage from "@/pages/QuestionArchive";
import QuestionsPage from "@/pages/Questions";
import SaintDetailsPage from "@/pages/SaintDetails";
import BibleSettingsPage from "@/pages/Settings/Bible";
import PreferencesPage from "@/pages/Settings/Preferences";
import SaintsSettingsPage from "@/pages/Settings/Saints";
import TeachingDetailsPage from "@/pages/TeachingDetails";
import { createHashRouter, Navigate, RouterProvider } from "react-router-dom";

const router = createHashRouter([
  {
    path: "/",
    element: <NavFrame />,
    children: [
      {
        path: "/",
        element: <Navigate to="/home" />,
      },
      {
        path: "/home",
        element: <HomePage />,
      },
      {
        path: "/bible",
        element: <BiblePage />,
      },
      {
        path: "/bible/:book/:chapter",
        element: <BibleReadPage />,
      },
      {
        path: "/home/teachings",
        element: <AllTeachingsPage />,
      },
      {
        path: "/home/teachings/:id",
        element: <TeachingDetailsPage />,
      },
      {
        path: "/saints",
        element: <AllSaintsPage />,
      },
      {
        path: "/saints/:id",
        element: <SaintDetailsPage />,
      },
      {
        path: "/questions",
        element: <QuestionsPage />,
      },
      {
        path: "/questions/:id",
        element: <QuestionAnswersPage />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "/profile/achievements",
        element: <AllAchievementsPage />,
      },
      {
        path: "/profile/preferences",
        element: <PreferencesPage />,
      },
      {
        path: "/profile/bible",
        element: <BibleSettingsPage />,
      },
      {
        path: "/profile/saints",
        element: <SaintsSettingsPage />,
      },
    ],
  },
  {
    path: "*",
    element: <h1>404</h1>,
  },
]);

const RouterProv = () => {
  return <RouterProvider router={router} />;
};

export default RouterProv;
