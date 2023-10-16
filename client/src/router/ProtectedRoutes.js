import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { paths } from "../utils/constants";

function ProtectedRoutes() {
  const location = useLocation();
  const authenticated = useSelector((state) => state.auth.authenticated);

  return authenticated ? (
    <Outlet />
  ) : (
    <Navigate
      to={paths.LOGIN}
      replace
      state={{ from: location, status: "Unauthorized" }}
    />
  );
}

export default ProtectedRoutes;
