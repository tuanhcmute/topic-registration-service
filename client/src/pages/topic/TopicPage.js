import React, { useRef, useState } from "react";
import { BsFolder } from "react-icons/bs";
import { LiaEditSolid } from "react-icons/lia";
import { Button } from "flowbite-react";
import Select from "react-select";

import { Banner } from "../../components/banner";
import EnrollTopicModal from "./components/EnrollTopicModal";
import EditTopicModal from "./components/EditTopicModal";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

function TopicPage() {
  const [openModal, setOpenModal] = useState(undefined);
  const [openEditTopicModal, setOpenEditTopicMode] = useState(undefined);
  const folderRef = useRef();

  function toggleFolder() {
    folderRef.current.classList.toggle("hidden");
  }

  return (
    <React.Fragment>
      {/* Banner */}
      <Banner title='ĐỀ TÀI CỦA TÔI' />
      {/* End banner */}
      {/* Content */}
      <div className='xl:w-[1140px] lg:w-[960px] md:w-full md:p-5 p-3 mx-auto my-0 flex justify-start gap-5 font-Roboto flex-col md:flex-row'>
        {/* Sidebar */}
        <div className='md:w-[350px] w-full h-fit flex flex-col gap-5'>
          <div className='w-full bg-white drop-shadow-sm hover:shadow-xl shadow-whiteSmoke transition-shadow ease-linear rounded-md border border-lightGrey'>
            <div
              className='flex items-center gap-1 border-b border-whiteSmoke px-2 py-3 cursor-pointer hover:text-primary select-none'
              onClick={toggleFolder}
            >
              <BsFolder className='w-4 h-4' />
              <span className='font-bold text-sm'>Tiểu luận chuyên ngành</span>
            </div>
            <div className='' ref={folderRef}>
              <div className='flex items-center gap-2 px-5 py-3 hover:bg-primary hover:text-white cursor-pointer hover:rounded-b-md'>
                <BsFolder />
                <span className='font-medium text-sm'>Đăng ký đề tài</span>
              </div>
            </div>
          </div>
        </div>
        {/* End sidebar */}
        {/*  */}
        {/* Right content */}
        <div className='w-full border border-lightGrey bg-white h-fit rounded-md'>
          {/* Register topic */}
          <div className='flex items-center justify-between p-3 border-b border-lightGrey'>
            <span className='uppercase font-bold text-base text-primary'>
              TIỂU LUẬN CHUYÊN NGÀNH
            </span>
            <Button
              color='gray'
              className='rounded-md p-0'
              onClick={() => setOpenModal("default")}
            >
              ĐĂNG KÝ
            </Button>
          </div>
          {/* End register topic */}
          {/* Select */}
          <div className='p-3'>
            <Select className='w-full' options={options} isSearchable={false} />
          </div>
          {/* End select */}
          {/* Table */}
          <div className='p-3'>
            <div className='overflow-x-auto rounded-md'>
              <div className='bg-gray-100 flex items-center justify-center font-Roboto'>
                <div className='w-full'>
                  <div className='bg-white shadow-md rounded'>
                    <table className='min-w-max w-full table-auto border border-collapse border-lightGrey'>
                      <thead>
                        <tr className='bg-gray-200 text-gray-600 text-sm leading-normal p-3'>
                          <th className='p-3 text-center border border-collapse border-lightGrey'>
                            STT
                          </th>
                          <th className='p-3 text-center border border-collapse border-lightGrey'>
                            Đề tài
                          </th>
                          <th className='p-3 text-center border border-collapse border-lightGrey'>
                            GVHD
                          </th>
                          <th className='p-3 text-center border border-collapse border-lightGrey'>
                            Trạng thái
                          </th>
                          <th className='p-3 text-center border border-collapse border-lightGrey'>
                            Số SVTH
                          </th>
                          <th className='py-3 px-6 text-center border border-collapse border-lightGrey'></th>
                        </tr>
                      </thead>
                      <tbody className='text-gray-600 text-sm font-light'>
                        {[...Array(10).keys()].map((item) => {
                          return (
                            <tr
                              className={item % 2 === 0 && "bg-whiteSmoke"}
                              key={item}
                            >
                              <td className='p-3 text-center whitespace-nowrap border border-collapse border-lightGrey'>
                                {item + 1}
                              </td>
                              <td className='p-3 text-left border border-collapse border-lightGrey w-[300px]'>
                                <p className='font-normal'>
                                  Thiết kế website quản lý đề tài khoa CNTT
                                </p>
                              </td>
                              <td className='p-3 text-left border border-collapse border-lightGrey'>
                                <div className=''>
                                  <span className='bg-orange-400 py-1 px-2 text-sm font-normal rounded'>
                                    9513
                                  </span>
                                  <span className='block mt-2 font-normal'>
                                    Nguyễn Trần Thi Văn
                                  </span>
                                </div>
                              </td>
                              <td className='p-3 text-center border border-collapse border-lightGrey'>
                                <span className='bg-orange-400 py-1 px-3 text-sm font-normal rounded'>
                                  Đang duyệt
                                </span>
                              </td>
                              <td className='p-3 text-center border border-collapse border-lightGrey'>
                                <span className='bg-orange-400 py-1 px-3 text-sm font-normal rounded'>
                                  2
                                </span>
                              </td>
                              <td className='border border-collapse border-lightGrey'>
                                <div className='flex justify-center'>
                                  <LiaEditSolid
                                    className='w-6 h-6 cursor-pointer'
                                    onClick={() =>
                                      setOpenEditTopicMode("default")
                                    }
                                  />
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* End table */}
        </div>
        {/* End right content */}
      </div>
      {/* Enroll topic modal */}
      <EnrollTopicModal openModal={openModal} setOpenModal={setOpenModal} />
      <EditTopicModal
        openModal={openEditTopicModal}
        setOpenModal={setOpenEditTopicMode}
      />
      {/* End content */}
    </React.Fragment>
  );
}

export default TopicPage;
