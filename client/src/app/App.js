import React from "react";
import PropsType from "prop-types";

import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";

function App({ children }) {
  return (
    <React.Fragment>
      <AppHeader />
      <main
        id='app-main'
        className='h-[1000px] xl:mt-24 lg:mt-20 md:mt-16 mt-14 bg-whiteSmoke'
      >
        {children}
      </main>
      <AppFooter />
    </React.Fragment>
  );
}

export default App;

App.propsType = {
  children: PropsType.node.isRequired,
};
