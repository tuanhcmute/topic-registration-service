import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loggedIn } from "../../features/auth/authSlice";

function OAuth2RedirectHandler(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function getUrlParameter(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    const regex = new RegExp("[\\?&]" + name + "=([^&#]*)");

    const results = regex.exec(props.location.search);
    return results === null
      ? ""
      : decodeURIComponent(results[1].replace(/\+/g, " "));
  }

  const token = getUrlParameter("token");

  if (token) {
    dispatch(loggedIn(token));
    return navigate("/");
  }
  return navigate("/login");
}

export default OAuth2RedirectHandler;
