import React from "react";
import { ToastContainer } from "react-toastify";
import { Outlet } from "react-router-dom";

import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";

function App() {
  return (
    <React.Fragment>
      <AppHeader />
      <main
        id='app-main'
        className='xl:mt-24 lg:mt-20 md:mt-16 mt-14 bg-whiteSmoke dark:bg-slate'
      >
        <Outlet />
      </main>
      <AppFooter />
      <ToastContainer />
    </React.Fragment>
  );
}

export default App;
