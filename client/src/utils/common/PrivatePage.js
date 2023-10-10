import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { App } from "../../app";
import { paths } from "../constants";

function PrivatePage({ component: Component, ...rest }) {
  const authenticated = useSelector((state) => state.auth.authenticated);
  console.log(authenticated);
  return authenticated ? (
    <App>
      <Component {...rest} />
    </App>
  ) : (
    <Navigate to={paths.LOGIN} />
  );
}

export default PrivatePage;

PrivatePage.propTypes = {
  component: PropTypes.object.isRequired,
};
