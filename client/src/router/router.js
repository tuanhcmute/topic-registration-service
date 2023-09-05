import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { ErrorPage, LoginPage } from "../pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

export default router;
