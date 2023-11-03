import { useEffect } from "react";
import { toast } from "react-toastify";
import { Navigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { userLogin } from "../../features/auth/authSlice";
import { ACCESS_TOKEN, paths } from "../../utils/constants";
import { fetchUserInfo } from "../../features/user/userSlice";

// The task of this function is to get access token from URL and redirect to home page
// This function isn't completed
function OAuth2RedirectHandler() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const authenticated = useSelector((state) => state.auth.authenticated);
  const darkMode = useSelector((state) => state.theme.darkMode);

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
    if (token) {
      dispatch(userLogin({ [ACCESS_TOKEN]: token }));
    } else {
      dispatch(userLogin({ error: "Error" }));
    }
  }, [dispatch, searchParams]);

  if (!authenticated) return <Navigate to={paths.LOGIN} replace />;
  // if (currentUser?.userRoles.includes(roles.ROLE_STUDENT))
  //   return <Navigate to='/student/home' replace />;
  return <Navigate to='/lecture/home' replace />;
}

export default OAuth2RedirectHandler;
