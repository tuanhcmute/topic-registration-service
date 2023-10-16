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

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <ProtectedRoutes />,
        children: [
          {
            path: "",
            element: <HomeRoute />,
          },
          { path: "topic", element: <TopicRoute /> },
          { path: "lecture", element: <LectureRoute /> },
          { path: "profile", element: <ProfileRoute /> },
        ],
      },
    ],
  },
  { path: "oauth2/redirect", element: <OAuth2RedirectHandler /> },
  {
    path: "/login",
    element: <LoginRoute />,
  },
]);

export default router;
