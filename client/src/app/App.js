import React from "react";
import PropTypes from "prop-types";

import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";

function App({ children }) {
  return (
    <React.Fragment>
      <AppHeader />
      <main
        id='app-main'
        className='xl:mt-24 lg:mt-20 md:mt-16 mt-14 bg-whiteSmoke'
      >
        {children}
      </main>
      <AppFooter />
    </React.Fragment>
  );
}

export default App;

App.propTypes = {
  children: PropTypes.node.isRequired,
};
