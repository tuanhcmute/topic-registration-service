import React from "react";
import PropTypes from "prop-types";
import { ToastContainer } from "react-toastify";
import { Outlet } from "react-router-dom";

import AppFooter from "./AppFooter";

function App(props) {
  const { header: Header } = props;
  return (
    <React.Fragment>
      <Header />
      <main
        id='app-main'
        className='xl:mt-24 lg:mt-20 md:mt-16 mt-14 bg-whiteSmoke dark:bg-black-pearl pb-5'
      >
        <Outlet />
      </main>
      <AppFooter />
      <ToastContainer />
    </React.Fragment>
  );
}

export default App;

App.propTypes = {
  header: PropTypes.func.isRequired,
};
