import React from "react";
import { useSelector } from "react-redux";
import { TextInput, Label, Button } from "flowbite-react";

import { Banner } from "../../components/banner";

function LecturePage() {
  const currentUser = useSelector((state) => state.user?.currentUser);

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
          {[...Array(10).keys()].map((item) => {
            return (
              <div className='flex flex-col items-center dark:bg-sambuca py-5 px-3 rounded bg-whiteSmoke gap-2 cursor-pointer'>
                {/* Image */}
                <img
                  src={currentUser?.imageUrl}
                  alt=''
                  className='w-32 h-32 object-cover rounded-full'
                />
                {/* Major */}
                <p className='text-sm font-bold text-primary dark:text-gray-300'>
                  Giảng viên - {currentUser?.major?.name}
                </p>
                <p className='text-sm font-bold text-primary dark:text-gray-300'>
                  {currentUser?.name}
                </p>
              </div>
            );
          })}
          <div className='flex flex-col items-center dark:bg-sambuca py-5 px-3 rounded bg-whiteSmoke gap-2 cursor-pointer'>
            {/* Image */}
            <img
              src={currentUser?.imageUrl}
              alt=''
              className='w-32 h-32 object-cover rounded-full'
            />
            {/* Major */}
            <p className='text-sm font-bold text-primary dark:text-gray-300'>
              Giảng viên - {currentUser?.major?.name}
            </p>
            <p className='text-sm font-bold text-primary dark:text-gray-300'>
              {currentUser?.name}
            </p>
          </div>
        </div>
      </div>
      {/* End banner */}
    </React.Fragment>
  );
}

export default LecturePage;
