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
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/oauth2/redirect",
    element: <OAuth2RedirectHandler />,
  },
]);

export default router;
