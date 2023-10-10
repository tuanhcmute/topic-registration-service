import { Navigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loggedIn, fetchUserInfo } from "../../features/auth/authSlice";
import { ACCESS_TOKEN, paths } from "../../utils/constants";

// The task of this function is to get access token from URL and redirect to home page
// This function isn't completed
function OAuth2RedirectHandler() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const token = getUrlParameter(ACCESS_TOKEN);

  function getUrlParameter(name) {
    const result = searchParams.get(name);
    return result;
  }

  if (token) {
    dispatch(loggedIn(token));
    dispatch(fetchUserInfo());
    return <Navigate to={paths.HOME} replace />;
  }
  return <Navigate to={paths.LOGIN} />;
}

export default OAuth2RedirectHandler;
