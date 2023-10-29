import PropTypes from "prop-types";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import { paths } from "../utils/constants";

function ProtectedRoutes({ role }) {
  const isAuthenticated = useSelector((state) => state.auth.authenticated);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const userHasRequiredRole = currentUser?.userRoles?.some(
    (item) => item === role
  );
  if (!isAuthenticated) return <Navigate to={paths.LOGIN} replace />;
  if (isAuthenticated && !userHasRequiredRole)
    return <div>Access is denied</div>;
  return <Outlet />;
}

export default ProtectedRoutes;

ProtectedRoutes.propTypes = {
  role: PropTypes.string.isRequired,
};
