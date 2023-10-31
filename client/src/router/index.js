import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { App as AppLayout } from "../app";
import { ErrorPage } from "../pages/error";
import { OAuth2RedirectHandler } from "../pages/login";
import ProtectedRoutes from "./ProtectedRoutes";
import { HomePage as HomeRoute } from "../pages/home";
import { ProfilePage as ProfileRoute } from "../pages/profile";
import { LectureTopicPageWrapper as LectureTopicRoutes } from "../pages/topic";
import { TopicManagementPage as TopicManagementRoute } from "../pages/topic/lecture/topicManagement";
import { AppreciationManagementPage as AppreciationManagementPageRoute } from "../pages/topic/lecture/appreciationManagement";
import { LecturePage as LectureRoute } from "../pages/lecture";
import { LoginPage as LoginRoute } from "../pages/login";
import { roles, topicType } from "../utils/constants";
import AppLectureHeader from "../app/AppLectureHeader";

const router = createBrowserRouter([
  {
    path: "lecture",
    element: <AppLayout header={AppLectureHeader} />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <ProtectedRoutes role={roles.ROLE_LECTURE} />,
        children: [
          {
            path: "home",
            element: <HomeRoute />,
          },
          {
            path: "topic",
            element: <LectureTopicRoutes />,
            children: [
              {
                path: topicType.TLCN.toLowerCase(),
                element: <TopicManagementRoute />,
              },
              {
                path: `${topicType.TLCN.toLowerCase()}/appreciation`,
                element: <AppreciationManagementPageRoute />,
              },
            ],
          },
          { path: "view", element: <LectureRoute /> },
          { path: "profile", element: <ProfileRoute /> },
        ],
      },
    ],
  },
  { path: "oauth2/redirect", element: <OAuth2RedirectHandler /> },
  {
    path: "login",
    element: <LoginRoute />,
  },
]);

export default router;
