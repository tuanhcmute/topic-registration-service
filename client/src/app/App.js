import React from "react";
import PropsType from "prop-types";

import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";

function App({ children }) {
  return (
    <React.Fragment>
      <AppHeader />
      <main id='app-main'>{children}</main>
      <AppFooter />
    </React.Fragment>
  );
}

export default App;

App.propsType = {
  children: PropsType.node.isRequired,
};
