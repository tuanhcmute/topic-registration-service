import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { App as AppLayout } from "../app";
import { ErrorPage } from "../pages/error";
import { OAuth2RedirectHandler } from "../pages/login";
import ProtectedRoutes from "./ProtectedRoutes";
import { HomePage as HomeRoute } from "../pages/home";
import { ProfilePage as ProfileRoute } from "../pages/profile";
import { TopicPage as TopicRoute } from "../pages/topic";
import { LecturePage as LectureRoute } from "../pages/lecture";
import { LoginPage as LoginRoute } from "../pages/login";
import { roles } from "../utils/constants";
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
          { path: "topic", element: <TopicRoute /> },
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
