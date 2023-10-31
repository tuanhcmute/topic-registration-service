import { NavLink } from "react-router-dom";
import { useRef } from "react";
import { BsFolder } from "react-icons/bs";
import { GoPencil } from "react-icons/go";
import { AiOutlineFileProtect, AiOutlineApartment } from "react-icons/ai";
import { MdOutlineApproval, MdOutlineManageHistory } from "react-icons/md";
import { topicType } from "../../../utils/constants";
import { useSelector } from "react-redux";

import { roles } from "../../../utils/constants";

function Sidebar() {
  const folderRef = useRef();
  const currentUser = useSelector((state) => state.auth.currentUser);

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
            to={`/lecture/topic/${topicType.TLCN.toLowerCase()}`}
            className='flex items-center gap-2 px-5 py-3 hover:bg-primary hover:text-white cursor-pointer hover:rounded-b-md dark:hover:bg-transparent'
          >
            <GoPencil />
            <span className='font-medium text-sm'>Đăng ký đề tài</span>
          </NavLink>
          <NavLink
            to={`/lecture/topic/${topicType.TLCN.toLowerCase()}/management`}
            className='flex items-center gap-2 px-5 py-3 hover:bg-primary hover:text-white cursor-pointer hover:rounded-b-md dark:hover:bg-transparent'
          >
            <MdOutlineManageHistory />
            <span className='font-medium text-sm'>Quản lý tiến độ</span>
          </NavLink>
          <NavLink
            to={`/lecture/topic/${topicType.TLCN.toLowerCase()}/appreciation`}
            className='flex items-center gap-2 px-5 py-3 hover:bg-primary hover:text-white cursor-pointer hover:rounded-b-md dark:hover:bg-transparent'
          >
            <AiOutlineApartment />
            <span className='font-medium text-sm'>Phản biện đề tài</span>
          </NavLink>
          {currentUser?.userRoles?.includes(roles.ROLE_HEAD) && (
            <NavLink
              to='/lecture/topic/approval'
              className='flex items-center gap-2 px-5 py-3 hover:bg-primary hover:text-white cursor-pointer hover:rounded-b-md dark:hover:bg-transparent'
            >
              <MdOutlineApproval />
              <span className='font-medium text-sm'>Xét duyệt đề tài</span>
            </NavLink>
          )}

          {currentUser?.userRoles?.includes(roles.ROLE_HEAD) && (
            <NavLink
              to={`/lecture/topic/assignment`}
              className='flex items-center gap-2 px-5 py-3 hover:bg-primary hover:text-white cursor-pointer hover:rounded-b-md dark:hover:bg-transparent'
            >
              <AiOutlineFileProtect />
              <span className='font-medium text-sm'>Phân công phản biện</span>
            </NavLink>
          )}
        </div>
      </div>
      {/* <div className='w-full bg-white drop-shadow-sm hover:shadow-xl shadow-whiteSmoke transition-shadow ease-linear rounded-md border border-lightGrey dark:bg-sambuca dark:border-gray-500 dark:text-gray-200'>
        <div className='flex items-center gap-1 px-2 py-3 cursor-pointer hover:text-primary select-none dark:hover:text-gray-50'>
          <BsFolder className='w-4 h-4' />
          <span className='font-bold text-sm'>Khóa luận tốt nghiệp</span>
        </div>
        <div className=''>
          <NavLink
            to={`/lecture/topic/${KLTN.toLowerCase()}`}
            className='flex items-center gap-2 px-5 py-3 hover:bg-primary hover:text-white cursor-pointer hover:rounded-b-md dark:hover:bg-transparent'
          >
            <GoPencil />
            <span className='font-medium text-sm'>Đăng ký đề tài</span>
          </NavLink>
          <NavLink
            to={`/lecture/topic/${KLTN.toLowerCase()}`}
            className='flex items-center gap-2 px-5 py-3 hover:bg-primary hover:text-white cursor-pointer hover:rounded-b-md dark:hover:bg-transparent'
          >
            <GoPencil />
            <span className='font-medium text-sm'>Quản lý tiến độ</span>
          </NavLink>
          {currentUser?.userRoles?.includes(roles.ROLE_HEAD) && (
            <NavLink
              to={`/lecture/topic/approval`}
              className='flex items-center gap-2 px-5 py-3 hover:bg-primary hover:text-white cursor-pointer hover:rounded-b-md dark:hover:bg-transparent'
            >
              <MdOutlineApproval />
              <span className='font-medium text-sm'>Xét duyệt đề tài</span>
            </NavLink>
          )}

          {currentUser?.userRoles?.includes(roles.ROLE_HEAD) && (
            <NavLink
              to={`/lecture/topic/approval`}
              className='flex items-center gap-2 px-5 py-3 hover:bg-primary hover:text-white cursor-pointer hover:rounded-b-md dark:hover:bg-transparent'
            >
              <AiOutlineFileProtect />
              <span className='font-medium text-sm'>Phân công phản biện</span>
            </NavLink>
          )}
        </div>
      </div> */}
    </div>
  );
}

export default Sidebar;
