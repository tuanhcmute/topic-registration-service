import { useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { App } from "../../app";

function PrivatePage({ component: Component, ...rest }) {
  const navigate = useNavigate();
  const authenticated = useSelector((state) => state.auth.authenticated);
  useEffect(() => {
    if (!authenticated) navigate("/login");
  }, [authenticated, navigate]);

  return (
    authenticated && (
      <App>
        <Component {...rest} />
      </App>
    )
  );
}

export default PrivatePage;

PrivatePage.propTypes = {
  component: PropTypes.func.isRequired,
};
