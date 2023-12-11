import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextInput, Label, Button } from "flowbite-react";

import { Banner } from "../../components/banner";
import _ from "lodash";
import { fetchAllLectures } from "../../features/user";

function LecturePage() {
  const lectures = useSelector((state) => state?.user?.lectures);
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch lectures
    if (_.isEmpty(lectures) || _.isNull(lectures) || _.isUndefined(lectures)) {
      dispatch(fetchAllLectures());
    }
  }, []);

  return (
    <React.Fragment>
      {/* Banner */}
      <Banner title='DANH SÁCH GIẢNG VIÊN' />
      <div className='xl:w-[1140px] lg:w-[960px] md:w-full md:p-5 p-3 mx-auto my-0 md:mt-5 font-Roboto flex-col border dark:border-gray-400 rounded bg-white dark:bg-black-pearl'>
        <div className='w-full flex flex-col items-center mb-4'>
          <div className='grid md:grid-cols-3 grid-cols-1 sm:grid-cols-2 gap-3 w-full'>
            {/* Lecture name field */}
            <div className='mb-2 block font-Roboto'>
              <Label value='Ngành' className='mb-2 block' />
              <TextInput placeholder='Tìm kiếm theo ngành...' type='text' />
            </div>
            {/* End lecture filed */}
            {/* Major field */}
            <div className='mb-2 block font-Roboto'>
              <Label htmlFor='major' value='Mã GV' className='mb-2 block' />
              <TextInput placeholder='Tìm kiếm theo mã GV...' type='text' />
            </div>
            {/* End major field */}
            {/* Head field*/}
            <div className='mb-2 block font-Roboto'>
              <Label htmlFor='head' value='Họ và tên' className='mb-2 block' />
              <TextInput placeholder='Tìm kiếm theo họ tên...' type='text' />
            </div>
            {/* End head field */}
          </div>
          <Button color='gray'>Tìm kiếm</Button>
        </div>
        <div className='grid xl:grid-cols-4 lg:grid-cols-3 grid-cols-1 sm:grid-cols-2 gap-3 w-full'>
          {lectures?.map((item) => {
            return (
              <div className='flex flex-col items-center dark:bg-sambuca py-5 px-3 rounded bg-whiteSmoke gap-2 cursor-pointer'>
                {/* Image */}
                <img
                  src={
                    item?.user?.imageUrl ||
                    "https://portal.staralliance.com/cms/aux-pictures/prototype-images/avatar-default.png/@@images/image.png"
                  }
                  alt=''
                  className='w-32 h-32 object-cover rounded-full'
                />
                {/* Major */}
                <p className='text-sm font-bold text-primary dark:text-gray-300'>
                  Giảng viên - {item?.user?.major?.name}
                </p>
                <p className='text-sm font-bold text-primary dark:text-gray-300'>
                  {item?.user?.name}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      {/* End banner */}
    </React.Fragment>
  );
}

export default LecturePage;
