import React from "react";
import { useOutlet } from "react-router-dom";

import { Banner } from "../../../components/banner";
import Sidebar from "./Sidebar";

function TopicPageWrapper() {
  const outlet = useOutlet();

  return (
    <React.Fragment>
      {/* Banner */}
      <Banner title='ĐỀ TÀI CỦA TÔI' />
      {/* End banner */}
      {/* Content */}
      <div className='xl:w-[1140px] lg:w-[960px] md:w-full md:p-5 p-3 mx-auto my-0 flex justify-start gap-5 font-Roboto flex-col xl:flex-row'>
        {/* Sidebar */}
        <Sidebar />
        {/* End sidebar */}
        {/* Right content */}
        {outlet || (
          <div className='w-full text-center dark:text-gray-300'>
            Không có nội dung
          </div>
        )}
        {/* End right content */}
      </div>
      {/* Enroll topic modal */}
      {/* End content */}
    </React.Fragment>
  );
}

export default TopicPageWrapper;
