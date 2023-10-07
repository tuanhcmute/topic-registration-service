import { Tooltip } from "react-tooltip";
import { AiOutlineUser } from "react-icons/ai";
import { FaBars } from "react-icons/fa";
import { PiUserCircleGearLight } from "react-icons/pi";
import { useRef } from "react";
import { NavLink } from "react-router-dom";

function AppHeader() {
  const overlayRef = useRef();
  const navigationRef = useRef();

  function toggleOverlay() {
    console.log("toogle overlay");
    overlayRef.current.classList.toggle("hidden");
    toggleNavigation();
  }

  function toggleNavigation() {
    console.log("Toggle navigation");
    navigationRef.current.classList.toggle("-translate-x-full");
  }

  function handleClickBarsIcon() {
    toggleOverlay();
  }

  return (
    <header
      id='app-header'
      className='xl:h-24 lg:h-20 md:h-16 h-14 font-Roboto text-xs fixed top-0 left-0 right-0 bg-alabaster shadow-alabaster-500/40 z-10'
    >
      <div className='xl:w-[1140px] lg:w-[960px] md:w-full md:px-5 px-3 h-full mx-auto my-0 flex items-center justify-between gap-4'>
        {/* Logo UTE */}
        <NavLink
          to={"/"}
          className='xl:w-[200px] lg:w-44 md:w-40 w-36 object-cover cursor-pointer bg-header-logo bg-contain bg-no-repeat h-full bg-center'
        ></NavLink>
        {/* Navigation */}
        <div
          className='flex md:items-center md:justify-between md:w-full md:flex-row md:static md:bg-transparent md:-translate-x-0 gap-2 flex-col fixed z-30 top-0 bottom-0 left-0 bg-white -translate-x-full transition-all ease-in-out min-w-[180px]'
          ref={navigationRef}
        >
          <div className='flex md:items-center md:flex-row md:border-none font-bold text-primary flex-col items-start border-b'>
            <NavLink
              to={"/topic"}
              className='hover:bg-primary hover:text-white transition-all ease-in-out block w-full min-w-fit text-start p-2'
            >
              Đề tài của tôi
            </NavLink>
            <NavLink
              to={"/lecture"}
              className='hover:bg-primary hover:text-white transition-all ease-in-out block w-full min-w-fit text-start p-2'
            >
              Giảng viên
            </NavLink>
          </div>
          {/* Profile */}
          <div
            className='flex md:items-center gap-1 text-primary cursor-pointer px-2 py-3'
            id='info'
            data-tooltip-variant='light'
          >
            <AiOutlineUser className='w-4 h-4' />
            <span className='font-bold'>Nguyễn Trần Thi Văn</span>
          </div>
        </div>
        {/* Bar will be displayed in mobile */}
        <FaBars
          className='md:hidden font-bold cursor-pointer h-5 w-5 text-primary'
          onClick={handleClickBarsIcon}
        />
      </div>
      {/* Overlay will be displayed when clicking on FaBars */}
      <div
        className='bg-black w-screen h-screen fixed top-0 opacity-40 hidden z-20'
        ref={overlayRef}
        onClick={toggleOverlay}
      ></div>
      {/* Dropdown will be displayed when hovering on Profile */}
      <Tooltip
        disableStyleInjection={true}
        anchorSelect='#info'
        place='top'
        clickable
        className='border border-primary p-0'
        classNameArrow='hidden'
      >
        <div className='w-40 font-medium text-xs'>
          <div className='flex items-center gap-1 w-full p-[10px] cursor-pointer text-primary hover:bg-primary hover:text-white transition-all ease-in-out border-b'>
            <PiUserCircleGearLight />
            <span>Thông tin cá nhân</span>
          </div>
          <div className='flex items-center gap-1 w-full p-[10px] cursor-pointer text-primary hover:bg-primary hover:text-white transition-all ease-in-out'>
            <PiUserCircleGearLight />
            <span>Thông tin cá nhân</span>
          </div>
        </div>
      </Tooltip>
    </header>
  );
}

export default AppHeader;
