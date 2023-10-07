import { createBrowserRouter } from "react-router-dom";
import { LoginPage, OAuth2RedirectHandler } from "../pages/login";
import { HomePage } from "../pages/home";
import { PageNotFound } from "../pages/error";
import { PrivatePage } from "../utils/common";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivatePage component={HomePage} />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/oauth2/redirect",
    element: <OAuth2RedirectHandler />,
  },
  {
    path: "/topic",
    element: <PrivatePage component={HomePage} />,
  },
  {
    path: "/lecture",
    element: <PrivatePage component={HomePage} />,
  },
  {
    path: "/404",
    element: <PageNotFound />,
  },
]);

export default router;
