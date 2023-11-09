import { NavLink } from "react-router-dom";
import { useRef } from "react";
import { BsFolder } from "react-icons/bs";
import { GoPencil } from "react-icons/go";
import { AiOutlineApartment } from "react-icons/ai";
import { MdOutlineManageHistory } from "react-icons/md";
import { topicType } from "../../../utils/constants";

function StudentSidebar() {
  const folderRef = useRef();

  function toggleFolder() {
    folderRef.current.classList.toggle("hidden");
  }

  return (
    <div className='md:w-[350px] w-full h-fit flex flex-col gap-5'>
      <div className='w-full bg-white drop-shadow-sm hover:shadow-xl shadow-whiteSmoke transition-shadow ease-linear rounded-md border border-lightGrey dark:bg-sambuca dark:border-gray-500 dark:text-gray-200'>
        <div
          className='flex items-center gap-1 px-2 py-3 cursor-pointer hover:text-primary select-none dark:hover:text-gray-50'
          onClick={toggleFolder}
        >
          <BsFolder className='w-4 h-4' />
          <span className='font-bold text-sm'>Tiểu luận chuyên ngành</span>
        </div>
        <div className='' ref={folderRef}>
          <NavLink
            to={`/student/topic/${topicType.TLCN.toLowerCase()}`}
            className='flex items-center gap-2 px-5 py-3 hover:bg-primary hover:text-white cursor-pointer hover:rounded-b-md dark:hover:bg-transparent'
          >
            <GoPencil />
            <span className='font-medium text-sm'>Đăng ký đề tài</span>
          </NavLink>
          <NavLink
            to={`/student/topic/${topicType.TLCN.toLowerCase()}/progression`}
            className='flex items-center gap-2 px-5 py-3 hover:bg-primary hover:text-white cursor-pointer hover:rounded-b-md dark:hover:bg-transparent'
          >
            <MdOutlineManageHistory />
            <span className='font-medium text-sm'>Quản lý tiến độ</span>
          </NavLink>
          <NavLink
            to={`/student/topic/${topicType.TLCN.toLowerCase()}/appreciation`}
            className='flex items-center gap-2 px-5 py-3 hover:bg-primary hover:text-white cursor-pointer hover:rounded-b-md dark:hover:bg-transparent'
          >
            <AiOutlineApartment />
            <span className='font-medium text-sm'>Phản biện đề tài</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default StudentSidebar;
