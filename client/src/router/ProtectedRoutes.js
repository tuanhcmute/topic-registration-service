import PropTypes from "prop-types";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { paths } from "../utils/constants";
import { toast } from "react-toastify";

function ProtectedRoutes({ role }) {
  const location = useLocation();
  console.log(location);
  const isAuthenticated = useSelector((state) => state.auth.authenticated);
  const currentUser = useSelector((state) => state.user?.currentUser);
  const userHasRequiredRole = currentUser?.userRoles?.some(
    (item) => item === role
  );
  if (!isAuthenticated) return <Navigate to={paths.LOGIN} replace />;
  if (isAuthenticated && !userHasRequiredRole) {
    toast.error("Truy cập bị từ chối");
    return <div className='dark:text-gray-200'>Access is denied</div>;
  }
  return <Outlet />;
}

export default ProtectedRoutes;

ProtectedRoutes.propTypes = {
  role: PropTypes.string.isRequired,
};
