import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

import { App as AppLayout } from "../app";
import { ErrorPage } from "../pages/error";
import { OAuth2RedirectHandler } from "../pages/login";
import ProtectedRoutes from "./ProtectedRoutes";
import { HomePage as HomeRoute } from "../pages/home";
import { ProfilePage as ProfileRoute } from "../pages/profile";
import { LectureTopicPageWrapper as LectureTopicRoutes } from "../pages/topic";
import { TopicManagementPage as TopicManagementRoute } from "../pages/topic/lecture/topicManagement";
import { AppreciationManagementPage as AppreciationManagementPageRoute } from "../pages/topic/lecture/appreciationManagement";
import { ApprovalTopicManagementPage as ApprovalTopicManagementPageRoute } from "../pages/topic/lecture/approvalTopicManagement";
import { LecturePage as LectureRoute } from "../pages/lecture";
import { LoginPage as LoginRoute } from "../pages/login";

import { paths, roles, topicType } from "../utils/constants";
import AppLectureHeader from "../app/AppLectureHeader";
import { useSelector } from "react-redux";

const RedirectRoute = () => {
  const isAuthenticated = useSelector((state) => state.auth.authenticated);
  const currentUser = useSelector((state) => state.auth.currentUser);
  if (!isAuthenticated) return <Navigate to={paths.LOGIN} replace />;
  const isStudent = currentUser?.userRoles?.some(
    (item) => item === roles.ROLE_STUDENT
  );
  return isStudent ? (
    <Navigate to='/student/home' replace />
  ) : (
    <Navigate to='/lecture/home' replace />
  );
};

const router = createBrowserRouter([
  { path: "", element: <RedirectRoute /> },
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
              {
                path: `${topicType.TLCN.toLowerCase()}/approval`,
                element: <ApprovalTopicManagementPageRoute />,
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
