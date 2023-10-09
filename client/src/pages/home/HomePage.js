import React from "react";
import { NavLink } from "react-router-dom";

function HomePage() {
  return (
    <React.Fragment>
      {/* Banner */}
      <div className='xl:h-[300px] lg:h-72 md:h-64 h-60 bg-banner bg-no-repeat bg-center bg-cover flex items-center justify-center text-primary font-Roboto text-3xl font-bold shadow-sm'>
        TRANG CHỦ
      </div>
      {/* End banner */}
      {/* Navigation */}
      <div className='xl:w-[1140px] lg:w-[960px] md:w-full md:p-5 p-3 mx-auto my-0 flex flex-wrap justify-start gap-5'>
        <NavLink
          className='md:w-64 w-full h-64 flex items-center justify-center bg-banner bg-no-repeat bg-cover bg-center font-Roboto font-bold text-xl text-primary shadow-md cursor-pointer hover:shadow-xl transition-shadow ease-linear'
          to={"/topic"}
        >
          Đề tài của tôi
        </NavLink>
        <NavLink
          to={"/lecture"}
          className='md:w-64 w-full h-64 flex items-center justify-center bg-banner bg-no-repeat bg-cover bg-center font-Roboto font-bold text-xl text-primary shadow-md cursor-pointer hover:shadow-xl transition-shadow ease-linear'
        >
          Giảng viên
        </NavLink>
      </div>
      {/* End navigation */}
    </React.Fragment>
  );
}

export default HomePage;
