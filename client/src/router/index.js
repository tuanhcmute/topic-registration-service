import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { ErrorPage } from "../pages/error";
import { OAuth2RedirectHandler } from "../pages/login";
import { PrivatePage } from "../utils/common";

const HomePage = React.lazy(() =>
  import("../pages/home").then((module) => {
    return { default: module.HomePage };
  })
);
const ProfilePage = React.lazy(() =>
  import("../pages/profile").then((module) => {
    return { default: module.ProfilePage };
  })
);
const LecturePage = React.lazy(() =>
  import("../pages/lecture").then((module) => {
    return { default: module.LecturePage };
  })
);
const TopicPage = React.lazy(() =>
  import("../pages/topic").then((module) => {
    return { default: module.TopicPage };
  })
);
const LoginPage = React.lazy(() =>
  import("../pages/login").then((module) => {
    return { default: module.LoginPage };
  })
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivatePage component={HomePage} />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/profile",
    element: <PrivatePage component={ProfilePage} />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/lecture",
    element: <PrivatePage component={LecturePage} />,
  },
  {
    path: "/topic",
    element: <PrivatePage component={TopicPage} />,
  },
  {
    path: "/oauth2/redirect",
    element: <OAuth2RedirectHandler />,
  },
]);

export default router;
