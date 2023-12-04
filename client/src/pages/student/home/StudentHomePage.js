import React from "react";
import { NavLink } from "react-router-dom";
import { Banner } from "../../../components/banner";

function StudentHomePage() {
  return (
    <React.Fragment>
      {/* Banner */}
      <Banner title='TRANG CHỦ' />
      {/* End banner */}
      {/* Navigation */}
      <div className='xl:w-[1140px] lg:w-[960px] md:w-full md:p-5 p-3 mx-auto my-0 flex flex-wrap justify-start gap-5'>
        <NavLink
          className='md:w-64 w-full h-64 flex items-center justify-center bg-banner bg-no-repeat bg-cover bg-center font-Roboto font-bold text-xl text-primary shadow-md cursor-pointer hover:shadow-xl transition-shadow ease-linear'
          to={"/student/topic"}
        >
          Đề tài của tôi
        </NavLink>
        <NavLink
          to={"/student/view"}
          className='md:w-64 w-full h-64 flex items-center justify-center bg-banner bg-no-repeat bg-cover bg-center font-Roboto font-bold text-xl text-primary shadow-md cursor-pointer hover:shadow-xl transition-shadow ease-linear'
        >
          Giảng viên
        </NavLink>
      </div>
      {/* End navigation */}
    </React.Fragment>
  );
}

export default StudentHomePage;
