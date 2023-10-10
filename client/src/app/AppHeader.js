import { useRef } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { FaBars } from "react-icons/fa";
import { PiUserCircleGearLight } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { Dropdown } from "../components/dropdown";
import { logout } from "../features/auth/authSlice";
import { paths } from "../utils/constants";

const dropdownItems = [
  {
    id: uuidv4(),
    text: "Thông tin cá nhân",
    icon: PiUserCircleGearLight,
    to: paths.PROFILE,
  },
  {
    id: uuidv4(),
    text: "Đăng xuất",
    icon: BiLogOut,
    to: paths.LOGOUT,
  },
];

function AppHeader() {
  const dispatch = useDispatch();
  const overlayRef = useRef();
  const navigationRef = useRef();
  const currentUser = useSelector((state) => state.auth.currentUser);

  function toggleOverlay() {
    overlayRef.current.classList.toggle("hidden");
    toggleNavigation();
  }

  function toggleNavigation() {
    navigationRef.current.classList.toggle("-translate-x-full");
  }

  function handleClickBarsIcon() {
    toggleOverlay();
  }

  function handleLogout(e) {
    e.preventDefault();
    dispatch(logout());
  }

  return (
    <header
      id='app-header'
      className='xl:h-24 lg:h-20 md:h-16 h-14 font-Roboto text-xs fixed top-0 left-0 right-0 bg-alabaster shadow-sm shadow-alabaster-500/40 z-10'
    >
      <div className='xl:w-[1140px] lg:w-[960px] md:w-full md:px-5 px-3 h-full mx-auto my-0 flex items-center justify-between gap-4'>
        {/* Logo UTE */}
        <NavLink
          to={paths.HOME}
          className='xl:w-[200px] lg:w-44 md:w-40 w-36 object-cover cursor-pointer bg-header-logo bg-contain bg-no-repeat h-full bg-center'
        ></NavLink>
        {/* End logo UTE */}
        {/* Navigation */}
        <div
          className='flex md:items-center md:justify-between md:w-full md:flex-row md:static md:bg-transparent md:-translate-x-0 gap-2 flex-col fixed z-30 top-0 bottom-0 left-0 bg-white -translate-x-full transition-all ease-in-out min-w-[200px]'
          ref={navigationRef}
        >
          <div className='flex md:items-center md:flex-row md:border-none font-bold text-primary flex-col items-start border-b'>
            <NavLink
              to={"/topic"}
              className='hover:bg-primary hover:text-white transition-all ease-in-out block w-full min-w-fit text-start md:p-2 px-2 py-3'
            >
              Đề tài của tôi
            </NavLink>
            <NavLink
              to={"/lecture"}
              className='hover:bg-primary hover:text-white transition-all ease-in-out block w-full min-w-fit text-start md:p-2 px-2 py-3'
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
            <span className='font-bold'>{currentUser.fullName}</span>
          </div>
          {/* End profile */}
          {/* Dropdown will be displayed when hovering on Profile */}
          <Dropdown className='p-0 bg-white' anchorSelect='#info'>
            <div className='w-44 font-medium text-sm shadow-md hover:shadow-lg transition-shadow ease-linear'>
              {dropdownItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    className='flex items-center gap-1 w-full p-[10px] cursor-pointer text-black hover:text-primary transition-all ease-in-out'
                    key={item.id}
                    to={item.to}
                    onClick={
                      item.to === paths.LOGOUT ? (e) => handleLogout(e) : null
                    }
                  >
                    <Icon className='text-lg' />
                    <span>{item.text}</span>
                  </NavLink>
                );
              })}
            </div>
          </Dropdown>
          {/* End dropdown */}
        </div>
        {/* End navigation */}
        {/* Bar will be displayed in mobile */}
        <FaBars
          className='md:hidden font-bold cursor-pointer h-5 w-5 text-primary'
          onClick={handleClickBarsIcon}
        />
        {/* End FaBars */}
      </div>
      {/* Overlay will be displayed when clicking on FaBars */}
      <div
        className='bg-black w-screen h-screen fixed top-0 opacity-40 hidden z-20'
        ref={overlayRef}
        onClick={toggleOverlay}
      ></div>
    </header>
  );
}

export default AppHeader;
