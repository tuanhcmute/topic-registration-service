import React from "react";
import { useSelector } from "react-redux";
import { createBrowserRouter, Navigate } from "react-router-dom";

import { App as AppLayout } from "../app";
import { ErrorPage } from "../pages/error";
import ProtectedRoutes from "./ProtectedRoutes";
import { OAuth2RedirectHandler } from "../pages/login";
import { LoginPage as LoginRoute } from "../pages/login";
import { ProfilePage as ProfileRoute } from "../pages/profile";

import { AdminHomePage as AdminHomeRoute } from "../pages/admin/home";
import { TimeManagementPage as TimeManagementRoute } from "../pages/admin/timeManagement";
import { UserManagementPage as UserManagementRoute } from "../pages/admin/userManagement";
import { TopicManagementPage as AdminTopicManagementRoute } from "../pages/admin/topicManagement";

import { LecturePage as LectureRoute } from "../pages/lecture";
import { LectureHomePage as LectureHomeRoute } from "../pages/lecture/home";
import { TopicPageWrapper as TopicPageWrapperRoutes } from "../pages/lecture";
import { ProgressionManagement } from "../pages/lecture/progressionManagement";
import { DivisionTopicManagement } from "../pages/lecture/divisionTopicManagement";
import { TopicManagementPage as LectureTopicManagementRoute } from "../pages/lecture/topicManagement";
import { AppreciationManagementPage as AppreciationManagementPageRoute } from "../pages/lecture/appreciationManagement";
import { ApprovalTopicManagementPage as ApprovalTopicManagementPageRoute } from "../pages/lecture/approvalTopicManagement";

import { StudentHomePage as StudentHomeRoute } from "../pages/student/home";
import { TopicManagementPage as StudentTopicManagementRoute } from "../pages/student/topicManagement";

import AppAdminHeader from "../app/AppAdminHeader";
import AppLectureHeader from "../app/AppLectureHeader";
import AppStudentHeader from "../app/AppStudentHeader";

import Sidebar from "../pages/lecture/Sidebar";
import AdminSidebar from "../pages/admin/AdminSidebar";
import StudentSidebar from "../pages/student/StudentSidebar";

import { paths, roles, topicType } from "../utils/constants";

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

  const isAdmin = currentUser?.userRoles?.some(
    (item) => item === roles.ROLE_ADMIN
  );
  if (isAdmin) return <Navigate to='/admin/home' replace />;

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
    path: "admin",
    element: <AppLayout header={AppAdminHeader} />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <ProtectedRoutes role={roles.ROLE_ADMIN} />,
        children: [
          {
            path: "home",
            element: <AdminHomeRoute />,
          },
          {
            path: "management",

            element: (
              <TopicPageWrapperRoutes>
                <AdminSidebar />
              </TopicPageWrapperRoutes>
            ),
            children: [
              {
                path: "topic",
                element: <AdminTopicManagementRoute />,
              },
              {
                path: "user",
                element: <UserManagementRoute />,
              },
              {
                path: "time",
                element: <TimeManagementRoute />,
              },
            ],
          },
        ],
      },
    ],
  },
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
            element: <StudentHomeRoute />,
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
            element: <LectureHomeRoute />,
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
