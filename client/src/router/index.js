import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { App as AppLayout } from "../app";
import { ErrorPage } from "../pages/error";
import { OAuth2RedirectHandler } from "../pages/login";
import ProtectedRoutes from "./ProtectedRoutes";
import { HomePage as HomeRoute } from "../pages/home";
import { ProfilePage as ProfileRoute } from "../pages/profile";
import { TopicPageWrapper as TopicPageWrapperRoutes } from "../pages/topic";
import { TopicManagementPage as LectureTopicManagementRoute } from "../pages/topic/lecture/topicManagement";
import { AppreciationManagementPage as AppreciationManagementPageRoute } from "../pages/topic/lecture/appreciationManagement";
import { ApprovalTopicManagementPage as ApprovalTopicManagementPageRoute } from "../pages/topic/lecture/approvalTopicManagement";
import { LecturePage as LectureRoute } from "../pages/lecture";
import { LoginPage as LoginRoute } from "../pages/login";
import { ProgressionManagement } from "../pages/topic/lecture/progressionManagement";
import { DivisionTopicManagement } from "../pages/topic/lecture/divisionTopicManagement";
import { TopicManagementPage as StudentTopicManagementRoute } from "../pages/topic/student/topicManagement";

import { paths, roles, topicType } from "../utils/constants";
import AppLectureHeader from "../app/AppLectureHeader";
import AppStudentHeader from "../app/AppStudentHeader";
import Sidebar from "../pages/topic/lecture/Sidebar";
import StudentSidebar from "../pages/topic/student/StudentSidebar";

const RedirectRoute = () => {
  const isAuthenticated = useSelector((state) => state.auth.authenticated);
  const currentUser = useSelector((state) => state.user?.currentUser);
  if (!isAuthenticated) return <Navigate to={paths.LOGIN} replace />;
  const isAnonymous = currentUser?.userRoles?.some(
    (item) => item === roles.ROLE_ANONYMOUS
  );
  if (isAnonymous) {
    return <Navigate to='/student/home' replace />;
  }
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
    path: "student",
    element: <AppLayout header={AppStudentHeader} />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <ProtectedRoutes role={roles.ROLE_STUDENT} />,
        children: [
          {
            path: "home",
            element: <HomeRoute />,
          },
          { path: "lecture", element: <LectureRoute /> },
          { path: "profile", element: <ProfileRoute /> },
          {
            path: "topic",

            element: (
              <TopicPageWrapperRoutes>
                <StudentSidebar />
              </TopicPageWrapperRoutes>
            ),
            children: [
              {
                path: topicType.TLCN.toLowerCase(),
                element: <StudentTopicManagementRoute />,
              },
              {
                path: `${topicType.TLCN.toLowerCase()}/progression`,
                element: <ProgressionManagement />,
              },
              {
                path: `${topicType.TLCN.toLowerCase()}/appreciation`,
                element: <AppreciationManagementPageRoute />,
              },
            ],
          },
        ],
      },
    ],
  },
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
            element: (
              <TopicPageWrapperRoutes>
                <Sidebar />
              </TopicPageWrapperRoutes>
            ),
            children: [
              {
                path: topicType.TLCN.toLowerCase(),
                element: <LectureTopicManagementRoute />,
              },
              {
                path: `${topicType.TLCN.toLowerCase()}/appreciation`,
                element: <AppreciationManagementPageRoute />,
              },
              {
                path: `${topicType.TLCN.toLowerCase()}/approval`,
                element: <ApprovalTopicManagementPageRoute />,
              },
              {
                path: `${topicType.TLCN.toLowerCase()}/division`,
                element: <DivisionTopicManagement />,
              },
              {
                path: `${topicType.TLCN.toLowerCase()}/progression`,
                element: <ProgressionManagement />,
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
