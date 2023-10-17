import { Navigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loggedIn, fetchUserInfo } from "../../features/auth/authSlice";
import { ACCESS_TOKEN, paths } from "../../utils/constants";
import { useEffect } from "react";
import { toast } from "react-toastify";

// The task of this function is to get access token from URL and redirect to home page
// This function isn't completed
function OAuth2RedirectHandler() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const authenticated = useSelector((state) => state.auth.authenticated);

  // Display message after login successful
  useEffect(() => {
    console.log("OAuth2RedirectHandler re-render");
    if (authenticated) {
      toast.success("Đăng nhập thành công!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }, [authenticated]);

  useEffect(() => {
    function getUrlParameter(name) {
      return searchParams.get(name);
    }
    const token = getUrlParameter(ACCESS_TOKEN);
    if (token) {
      dispatch(loggedIn(token));
      dispatch(fetchUserInfo());
    }
  }, [dispatch, searchParams]);

  console.log("OAuth2RedirectHandler will mount");

  return authenticated ? (
    <Navigate to={paths.HOME} replace />
  ) : (
    <Navigate to={paths.LOGIN} />
  );
}

export default OAuth2RedirectHandler;
