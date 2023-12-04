import { useEffect } from "react";
import { toast } from "react-toastify";
import { Navigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { userLogin } from "../../features/auth";
import { ACCESS_TOKEN, REFRESH_TOKEN, roles } from "../../utils/constants";
import { fetchUserInfo } from "../../features/user";

// The task of this function is to get access token from URL and redirect to home page
// This function isn't completed
function OAuth2RedirectHandler() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const authenticated = useSelector((state) => state.auth.authenticated);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const currentUser = useSelector((state) => state.user.currentUser);

  // Display message after login successful
  useEffect(() => {
    if (authenticated) {
      toast.success("Đăng nhập thành công!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: darkMode ? "dark" : "light",
      });
      dispatch(fetchUserInfo());
    }
  }, [authenticated, dispatch, darkMode]);

  useEffect(() => {
    function getUrlParameter(name) {
      return searchParams.get(name);
    }
    const token = getUrlParameter(ACCESS_TOKEN);
    const refreshToken = getUrlParameter(REFRESH_TOKEN);
    if (token && refreshToken) {
      dispatch(
        userLogin({ [ACCESS_TOKEN]: token, [REFRESH_TOKEN]: refreshToken })
      );
    } else {
      dispatch(userLogin({ error: "Error" }));
    }
  }, [dispatch, searchParams]);

  const isAnonymous = currentUser?.userRoles?.some(
    (item) => item === roles.ROLE_ANONYMOUS
  );
  if (authenticated && isAnonymous)
    return <Navigate to='/student/home' replace />;

  const isAdmin = currentUser?.userRoles?.some(
    (item) => item === roles.ROLE_ADMIN
  );
  if (authenticated && isAdmin) return <Navigate to='/admin/home' replace />;

  if (
    authenticated &&
    currentUser?.userRoles?.some((item) => item === roles.ROLE_STUDENT)
  )
    return <Navigate to='/student/home' replace />;
  else if (
    authenticated &&
    currentUser?.userRoles?.some((item) => item === roles.ROLE_LECTURE)
  )
    return <Navigate to='/lecture/home' replace />;
}

export default OAuth2RedirectHandler;
